"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaSearch, FaGraduationCap, FaCalendarAlt, FaShieldAlt, FaClock, FaTools } from "react-icons/fa";

export default function ExamLookupForm({ onLookupSuccess, loading, errorMessage, onClearError }) {
  const [identifier, setIdentifier] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const query = params.get("q") || params.get("roll");
      return query ? query.trim() : "";
    }
    return "";
  });

  // Automatically trigger search on mount if arriving with ?q=... or ?roll=... from home page search
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const query = params.get("q") || params.get("roll");
      if (query && query.trim()) {
        onLookupSuccess(query.trim());
      }
    }
  }, [onLookupSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    onLookupSuccess(identifier.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Brand & Badge Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
          <FaGraduationCap className="text-amber-400 text-sm" />
          Official Examination Portal
        </div>

        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 md:w-20 md:h-20 relative bg-white/5 rounded-2xl p-2 border border-white/10 shadow-lg">
            <Image
              src="/omj-logo.png"
              alt="The Okhai Memon Jamat Logo"
              width={80}
              height={80}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
          FINAL PRACTICAL <span className="text-red-500">ASSESSMENT</span>
        </h1>

        <p className="text-lg md:text-xl font-bold text-slate-300 mt-2">
          Fundamentals of YouTube Automation — <span className="text-amber-400">Batch 2</span>
        </p>

        <p className="text-xs md:text-sm text-slate-400 font-medium mt-1">
          The Okhai Memon Jamat (OMJ) • Social Welfare Committee
        </p>

        {/* Schedule & Timezone banner */}
        <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800">
          <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <FaCalendarAlt /> Sunday, 8 November 2026
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 text-amber-400 font-bold">
            <FaClock /> Reporting: 10:00 AM
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 text-red-400 font-bold">
            <FaClock /> Test Publish: 10:30 AM
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 font-medium">150 Total Marks</span>
        </div>
      </div>

      {/* Main Search Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-6">
          <label
            htmlFor="exam-search-input"
            className="block text-sm font-bold text-slate-200 uppercase tracking-wider mb-2"
          >
            Enter Roll Number or Registered WhatsApp Number
          </label>
          <p className="text-xs text-slate-400 mb-4">
            Enter your official Roll Number (e.g. <span className="text-amber-300 font-mono">2001</span> or{" "}
            <span className="text-amber-300 font-mono">2501</span>) or your registered WhatsApp number (e.g.{" "}
            <span className="text-amber-300 font-mono">0321XXXXXXX</span> or{" "}
            <span className="text-amber-300 font-mono">+923XXXXXXXXX</span>).
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                id="exam-search-input"
                type="text"
                autoComplete="off"
                placeholder="Roll Number (e.g. 2001) or WhatsApp Number"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (errorMessage) onClearError();
                }}
                disabled={loading}
                className="w-full bg-slate-950 border-2 border-slate-700 focus:border-amber-400 text-white placeholder-slate-500 rounded-2xl px-5 py-4 text-lg font-bold outline-none transition-all duration-200 pr-12 shadow-inner disabled:opacity-50"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl pointer-events-none">
                <FaSearch />
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-950/80 border border-red-500/60 text-red-200 text-sm p-4 rounded-xl flex items-start gap-3">
                <FaShieldAlt className="text-red-400 text-lg shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Lookup Notice</p>
                  <p className="text-xs mt-0.5 text-red-300">{errorMessage}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !identifier.trim()}
              className="w-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-lg py-4 px-6 rounded-2xl uppercase tracking-wider shadow-lg hover:shadow-red-500/20 active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Searching Database...</span>
                </>
              ) : (
                <>
                  <FaSearch />
                  <span>Find My Test Paper</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Security & Eligibility notes */}
        <div className="border-t border-slate-800/80 pt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <FaShieldAlt className="text-amber-400" />
            Instant Direct Student Paper Access
          </span>
          <span>Full Online & Hybrid Students Supported</span>
        </div>
      </div>

      {/* Required Gadgets Reminder Card */}
      <div className="mt-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-5 md:p-6 text-left shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs md:text-sm font-black uppercase tracking-wider text-amber-400">
            <FaTools /> Required Gadgets for Final Test (Physical Session)
          </div>
          <span className="text-[11px] bg-red-600/20 text-red-400 border border-red-500/30 font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 w-fit">
            <FaClock /> Reporting: 10:00 AM • Test Publish: 10:30 AM
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-3.5">
          All students are requested to bring the following items to the venue (Husein Ebrahim Sports Complex):
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-200">
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-red-600/20 text-red-400 font-mono text-xs font-black flex items-center justify-center shrink-0">1</span>
            <span className="font-bold text-white">Laptop</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-mono text-xs font-black flex items-center justify-center shrink-0">2</span>
            <span className="font-bold text-white">Mobile Phone</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 font-mono text-xs font-black flex items-center justify-center shrink-0">3</span>
            <span className="font-bold text-white truncate">Mobile Data / Wi-Fi</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-black flex items-center justify-center shrink-0">4</span>
            <span className="font-bold text-white">Extension Board</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-yellow-500/20 text-yellow-400 font-mono text-xs font-black flex items-center justify-center shrink-0">5</span>
            <span className="font-bold text-white">Laptop Charger</span>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 font-mono text-xs font-black flex items-center justify-center shrink-0">6</span>
            <span className="font-bold text-white">Mobile Charger</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 mt-3 italic">
          * Please bring any other gadgets or accessories you may need for practical YouTube Automation tasks.
        </p>
      </div>
    </div>
  );
}

