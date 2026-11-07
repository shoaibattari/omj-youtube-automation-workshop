"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaLock,
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaRedo,
  FaWhatsapp,
  FaLaptop,
  FaMobileAlt,
  FaWifi,
  FaPlug,
  FaBolt,
  FaChargingStation,
  FaCheckCircle,
  FaUnlockAlt,
  FaKey,
} from "react-icons/fa";

// Target Unlock Time: Sunday, 8 November 2026 at 10:30 AM PKT (Asia/Karachi)
export const EXAM_UNLOCK_TIME_ISO = "2026-11-08T10:30:00+05:00";
export const EXAM_UNLOCK_TIMESTAMP = new Date(EXAM_UNLOCK_TIME_ISO).getTime();

export default function ExamPaperLockedCard({
  student,
  assignment,
  onReset,
  onAdminUnlock,
}) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = Math.max(0, EXAM_UNLOCK_TIMESTAMP - Date.now());
    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      totalMs: diff,
    };
  });

  const [showAdminBypass, setShowAdminBypass] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState("");
  const [adminError, setAdminError] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = Math.max(0, EXAM_UNLOCK_TIMESTAMP - Date.now());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds, totalMs: diff });

      // If timer hits 0 (10:30 AM reached), automatically notify parent to unlock!
      if (diff <= 0) {
        clearInterval(timer);
        if (onAdminUnlock) {
          onAdminUnlock();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onAdminUnlock]);

  const handleBypassSubmit = (e) => {
    e.preventDefault();
    const code = adminPasscode.trim();
    if (code === "OMJ-SWC-ADMIN-2026" || code === "1030" || code === "1100") {
      setAdminError("");
      if (onAdminUnlock) {
        onAdminUnlock();
      }
    } else {
      setAdminError("Invalid admin passcode. Required for early preview.");
    }
  };

  const rollNumber = assignment?.rollNumber || student?.rollNumber || student?.participantId;
  const studentName = assignment?.studentName || student?.fullName || "Student";
  const studentMode = assignment?.courseMode || student?.mode || "Hybrid";

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Primary Locked Hero Banner */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-black border-2 border-amber-500/50 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden text-center">
        {/* Atmospheric Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/15 blur-[120px] rounded-full pointer-events-none" />

        {/* Lock Icon with Pulsing Halo */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="absolute w-24 h-24 rounded-full bg-amber-500/20 animate-ping pointer-events-none" />
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-600 to-red-600 text-white flex items-center justify-center text-3xl shadow-xl shadow-red-600/30 border border-amber-300/40 relative z-10">
            <FaLock />
          </div>
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
          <FaClock /> Locked Until 10:30 AM PKT
        </div>

        <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight">
          Test Paper <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300">Locked</span>
        </h2>

        {/* Core Locked Message Requested by User */}
        <div className="mt-4 max-w-2xl mx-auto space-y-2">
          <p className="text-base md:text-xl font-bold text-amber-300">
            Grand Final Test Paper Sunday, 8 November 2026 ko theek 10:30 AM par open hoga.
          </p>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
            Aapki registration aur verification mukammal ho chuki hai. Aapka personalized 150-mark paper 10:30 AM par automatically open ho jayega.
          </p>
        </div>

        {/* Real-time Countdown Timer */}
        <div className="mt-8 max-w-xl mx-auto">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
            Time Remaining Until Paper Unlock
          </span>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
            <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 shadow-lg">
              <span className="block text-3xl sm:text-5xl font-black text-white font-mono">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider block mt-1">
                Hours
              </span>
            </div>

            <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 shadow-lg">
              <span className="block text-3xl sm:text-5xl font-black text-amber-300 font-mono">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider block mt-1">
                Minutes
              </span>
            </div>

            <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 shadow-lg">
              <span className="block text-3xl sm:text-5xl font-black text-red-400 font-mono">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-red-400 uppercase tracking-wider block mt-1">
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* Schedule & Reporting Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300">
          <span className="inline-flex items-center gap-1.5 font-bold text-white bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
            <FaCalendarAlt className="text-red-500" /> Sunday, 8 Nov 2026
          </span>
          <span className="inline-flex items-center gap-1.5 font-bold text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
            <FaClock className="text-amber-400" /> Reporting Time: 10:00 AM
          </span>
          <span className="inline-flex items-center gap-1.5 font-bold text-red-400 bg-red-600/10 px-3 py-1.5 rounded-xl border border-red-500/30">
            <FaUnlockAlt className="text-red-400" /> Paper Unlocks: 10:30 AM (Sharp)
          </span>
          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-400 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
            <FaMapMarkerAlt className="text-emerald-400" /> Husein Ebrahim Sports Complex
          </span>
        </div>
      </div>

      {/* Verified Student Details Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <FaCheckCircle /> Verified Examination Candidate
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white">
              {studentName}
            </h3>
          </div>

          <div className="inline-flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-bold uppercase">Roll Number:</span>
            <span className="text-amber-400 font-mono font-black text-lg">{rollNumber}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-500 block uppercase font-bold text-[10px]">Enrollment Mode</span>
            <span className="text-white font-bold text-sm block mt-1">{studentMode}</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-500 block uppercase font-bold text-[10px]">Official Course</span>
            <span className="text-white font-bold text-sm block mt-1">YouTube Automation Batch 2</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-slate-500 block uppercase font-bold text-[10px]">Assessment Marks</span>
            <span className="text-emerald-400 font-bold text-sm block mt-1">150 Total Marks</span>
          </div>
        </div>
      </div>

      {/* Required Gadgets Checklist Reminder */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8 text-left shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs md:text-sm font-black uppercase tracking-wider text-amber-400">
            <FaLaptop /> Required Gadgets for the Physical Session (Prepare Before 10:30 AM)
          </div>
          <span className="text-[11px] bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1 w-fit">
            <FaClock /> Arrive by 10:00 AM
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          All students are requested to bring and set up the following items at their seats before the 10:30 AM test publish:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-200">
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center shrink-0">
              <FaLaptop />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Item 1</span>
              <span className="font-bold text-white">Laptop</span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <FaMobileAlt />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Item 2</span>
              <span className="font-bold text-white">Mobile Phone</span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <FaWifi />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Item 3</span>
              <span className="font-bold text-white truncate">Mobile Data / Wi-Fi</span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <FaPlug />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Item 4</span>
              <span className="font-bold text-white">Extension Board</span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
              <FaBolt />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Item 5</span>
              <span className="font-bold text-white">Laptop Charger</span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <FaChargingStation />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Item 6</span>
              <span className="font-bold text-white">Mobile Charger</span>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 mt-3.5 italic">
          * Please bring any other gadgets or accessories you may need for practical YouTube Automation tasks.
        </p>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <button
          onClick={onReset}
          className="w-full sm:w-auto text-xs text-slate-400 hover:text-white flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer font-bold"
        >
          <FaRedo /> Verify Another Student
        </button>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <a
            href="https://chat.whatsapp.com/JCX5PQRS11iK5tbmUZggNv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial rounded-xl border border-emerald-500/30 bg-emerald-950/50 hover:bg-emerald-900/60 px-5 py-3 text-center font-bold text-xs uppercase text-emerald-300 transition flex items-center justify-center gap-2 shadow-lg"
          >
            <FaWhatsapp className="text-base text-emerald-400" />
            <span>Discussion Group</span>
          </a>

          {/* Admin Preview Unlock Button */}
          <button
            onClick={() => setShowAdminBypass(!showAdminBypass)}
            className="text-[11px] text-slate-500 hover:text-amber-400 transition-colors flex items-center gap-1.5 px-3 py-3 rounded-xl border border-slate-900 hover:border-slate-800 cursor-pointer"
            title="Organizer early testing preview"
          >
            <FaKey />
            <span>Admin Preview</span>
          </button>
        </div>
      </div>

      {/* Admin Passcode Modal for Evaluator Early Preview */}
      {showAdminBypass && (
        <form
          onSubmit={handleBypassSubmit}
          className="bg-slate-900 border border-amber-500/40 rounded-2xl p-4 max-w-md mx-auto space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <FaUnlockAlt /> Evaluator / Admin Early Preview
            </span>
            <button
              type="button"
              onClick={() => setShowAdminBypass(false)}
              className="text-xs text-slate-500 hover:text-white"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Enter administrator passcode to preview the official test paper prior to 10:30 AM.
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Admin Passcode"
              value={adminPasscode}
              onChange={(e) => setAdminPasscode(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 text-white text-xs px-3 py-2 rounded-xl outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
            >
              Unlock Preview
            </button>
          </div>
          {adminError && <p className="text-[11px] text-red-400">{adminError}</p>}
        </form>
      )}
    </div>
  );
}

