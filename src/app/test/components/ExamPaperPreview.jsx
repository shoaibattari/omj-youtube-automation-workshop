"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaDownload,
  FaPrint,
  FaRedo,
  FaCheckCircle,
  FaFilePdf,
  FaExternalLinkAlt,
  FaAward,
  FaClock,
  FaTools,
  FaLaptop,
  FaMobileAlt,
  FaWifi,
  FaPlug,
  FaBolt,
  FaChargingStation,
} from "react-icons/fa";

export default function ExamPaperPreview({ student, assignment, onReset }) {
  const [downloading, setDownloading] = useState(false);
  const iframeRef = useRef(null);

  // Smooth scroll to top when preview opens
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const rollNumber = assignment?.rollNumber || student?.rollNumber || student?.participantId;
  const studentName = assignment?.studentName || student?.fullName || "Student";
  const safeStudentName = studentName
    .trim()
    .replace(/[^a-zA-Z0-9]/g, "_")
    .replace(/_+/g, "_");
  const fileName = `${safeStudentName}_${rollNumber}_Batch_2_Final_Test_Paper.pdf`;

  const pdfUrl = `/api/test/paper?roll=${encodeURIComponent(rollNumber || "")}&t=${Date.now()}`;
  const downloadUrl = `/api/test/paper?roll=${encodeURIComponent(rollNumber || "")}&download=1&t=${Date.now()}`;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download trigger failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.focus();
        iframeRef.current.contentWindow.print();
        return;
      } catch {
        // Fallback to direct print window
      }
    }
    const printWindow = window.open(`/api/test/paper?roll=${encodeURIComponent(rollNumber || "")}`, "_blank");
    if (printWindow) {
      printWindow.addEventListener("load", () => {
        printWindow.print();
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-3xl p-6 md:p-8 shadow-2xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-3xl shrink-0 shadow-lg">
            <FaAward />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-1 border border-emerald-500/30">
              <FaCheckCircle /> Paper Generated
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Congratulations! Your Final Test Paper Is Ready
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1">
              Your niche and topic have been permanently locked and official examination paper prepared.
            </p>
          </div>
        </div>

        {/* Action Buttons Top */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-sm px-6 py-3.5 rounded-xl uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
          >
            <FaDownload />
            <span>Download Test Paper (PDF)</span>
          </button>
        </div>
      </div>

      {/* Information Summary Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur-sm">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
          <span>Official Assessment Details</span>
          <span className="text-amber-400 font-mono text-xs">Total: 150 Marks</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-500 block uppercase font-bold">Student Name</span>
            <span className="text-white font-black text-lg block mt-1">
              {assignment?.studentName || student?.fullName}
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-500 block uppercase font-bold">Roll Number</span>
            <span className="text-amber-300 font-mono font-black text-xl block mt-1">
              {rollNumber}
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-500 block uppercase font-bold">Course Mode</span>
            <span className="text-slate-200 font-bold text-base block mt-1">
              {assignment?.courseMode || student?.mode || "Hybrid"}
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-500 block uppercase font-bold">Assigned Set & Niche</span>
            <span className="text-emerald-400 font-black text-base block mt-1">
              Set {assignment?.setCode}: {assignment?.nicheName}
            </span>
          </div>
        </div>

        {/* Assigned Topic Feature Box */}
        <div className="mt-4 bg-gradient-to-r from-amber-500/10 via-slate-950 to-slate-950 border-2 border-amber-500/40 rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <FaAward /> Assigned Topic / Question
            </span>
            <span className="text-[11px] text-amber-300 font-mono font-bold">
              Sunday, 8 Nov 2026 • Reporting: 10:00 AM • Test Publish: 10:30 AM
            </span>
          </div>
          <p className="text-xl md:text-2xl font-black text-white leading-snug">
            &ldquo;{assignment?.topicTitle}&rdquo;
          </p>
        </div>

        {/* Required Gadgets Checklist for Physical Session */}
        <div className="mt-5 bg-slate-950 border border-amber-500/30 rounded-2xl p-5 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400">
              <FaTools /> Required Gadgets to Bring to Venue
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                <FaClock /> Reporting: 10:00 AM
              </span>
              <span className="bg-red-600/20 text-red-400 border border-red-500/30 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                <FaClock /> Test Publish: 10:30 AM
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 mb-3">
            All students are requested to bring the following items for the physical YouTube Automation practical session at <strong>Husein Ebrahim Sports Complex</strong>:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center shrink-0 text-sm">
                <FaLaptop />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono">1. Device</span>
                <span className="font-bold text-white">Laptop</span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 text-sm">
                <FaMobileAlt />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono">2. Phone</span>
                <span className="font-bold text-white">Mobile Phone</span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 text-sm">
                <FaWifi />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono">3. Internet</span>
                <span className="font-bold text-white truncate">Mobile Data / Wi-Fi</span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 text-sm">
                <FaPlug />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono">4. Power Strip</span>
                <span className="font-bold text-white">Extension Board</span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0 text-sm">
                <FaBolt />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono">5. Adapter</span>
                <span className="font-bold text-white">Laptop Charger</span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 text-sm">
                <FaChargingStation />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-mono">6. Cable</span>
                <span className="font-bold text-white">Mobile Charger</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-3 italic">
            * Please bring any other gadgets or accessories you may need for practical YouTube Automation tasks.
          </p>
        </div>
      </div>

      {/* Embedded A-Series Portrait PDF Preview */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
              <FaFilePdf className="text-red-500" />
              Official Examination Paper Preview
            </h3>
            <p className="text-xs text-slate-400">
              Personalized document rendered from official OMJ template
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer border border-slate-700"
            >
              <FaPrint /> Print Paper
            </button>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs px-4 py-2.5 rounded-xl uppercase tracking-wider flex items-center gap-2 transition-colors border border-slate-700"
            >
              <FaExternalLinkAlt /> Full Screen
            </a>
          </div>
        </div>

        {/* Responsive A-Series Portrait Container */}
        <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-slate-950 aspect-[790.5/1119]">
          <iframe
            ref={iframeRef}
            src={pdfUrl}
            title="Official OMJ Batch 2 Practical Test Paper"
            className="w-full h-full border-0"
          />
        </div>

        {/* Primary Bottom Actions */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <button
            onClick={onReset}
            className="w-full md:w-auto text-xs text-slate-400 hover:text-white flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer font-bold"
          >
            <FaRedo /> Verify Another Student
          </button>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 md:flex-initial bg-slate-800 hover:bg-slate-700 text-white font-black text-sm px-6 py-3.5 rounded-xl uppercase tracking-wider transition-colors cursor-pointer border border-slate-700 flex items-center justify-center gap-2"
            >
              <FaPrint /> Print
            </button>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 md:flex-initial bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-sm px-8 py-3.5 rounded-xl uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <FaDownload />
              <span>Download Test Paper (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

