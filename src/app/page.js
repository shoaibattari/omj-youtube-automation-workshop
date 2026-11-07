"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FaYoutube,
  FaGraduationCap,
  FaCalendarAlt,
  FaFilePdf,
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
  FaWhatsapp,
  FaVideo,
  FaRobot,
  FaPalette,
  FaChartLine,
  FaIdCard,
  FaClock,
  FaMapMarkerAlt,
  FaGlobe,
  FaUsers,
  FaLightbulb,
  FaHandsHelping,
  FaClipboardList,
  FaLaptop,
  FaMobileAlt,
  FaWifi,
  FaPlug,
  FaBolt,
  FaChargingStation,
  FaTools,
} from "react-icons/fa";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  const router = useRouter();
  const [homeRollQuery, setHomeRollQuery] = useState("");

  const handleHomeSearch = (e) => {
    e.preventDefault();
    if (!homeRollQuery.trim()) {
      router.push("/test");
      return;
    }
    router.push(`/test?q=${encodeURIComponent(homeRollQuery.trim())}`);
  };

  const curriculum = [
    {
      icon: FaRobot,
      title: "AI Tools & Master Prompts",
      desc: "Harness AI to brainstorm viral ideas, perform niche research, and engineer high-retention prompts.",
    },
    {
      icon: FaVideo,
      title: "Faceless Video Creation",
      desc: "Produce 100% automated videos without showing your face using modern AI video generators and B-rolls.",
    },
    {
      icon: FaPalette,
      title: "High-CTR Thumbnail Design",
      desc: "Design click-worthy thumbnails using visual consistency, psychology, and high-contrast styling.",
    },
    {
      icon: FaChartLine,
      title: "YouTube SEO & Algorithms",
      desc: "Master search rankings, keyword tags, click-through rates, and algorithmic audience retention.",
    },
  ];

  const requiredGadgets = [
    {
      num: "01",
      title: "Laptop",
      icon: FaLaptop,
      badge: "Primary Device",
      desc: "Fully functional laptop with your editing tools (CapCut, Premiere, browser extensions) and battery backup.",
      border: "border-red-500/40",
      accent: "bg-red-500/10 text-red-400",
    },
    {
      num: "02",
      title: "Mobile Phone",
      icon: FaMobileAlt,
      badge: "Testing & Studio",
      desc: "Smartphone with active WhatsApp, camera, and access to YouTube Studio and mobile creation tools.",
      border: "border-amber-500/40",
      accent: "bg-amber-500/10 text-amber-400",
    },
    {
      num: "03",
      title: "Internet Connection (Mobile Data/Wi-Fi)",
      icon: FaWifi,
      badge: "Uninterrupted Data",
      desc: "Active 4G/5G mobile hotspot data bundle or portable Wi-Fi device for live practical exam tasks.",
      border: "border-cyan-500/40",
      accent: "bg-cyan-500/10 text-cyan-400",
    },
    {
      num: "04",
      title: "Extension Board",
      icon: FaPlug,
      badge: "Multi-Socket Strip",
      desc: "Power extension strip (min 3–4 sockets) to comfortably plug in both your laptop and phone chargers.",
      border: "border-emerald-500/40",
      accent: "bg-emerald-500/10 text-emerald-400",
    },
    {
      num: "05",
      title: "Laptop Charger",
      icon: FaBolt,
      badge: "Power Adapter",
      desc: "Original high-wattage charging adapter to keep your laptop running smoothly during video generation.",
      border: "border-yellow-500/40",
      accent: "bg-yellow-500/10 text-yellow-400",
    },
    {
      num: "06",
      title: "Mobile Charger",
      icon: FaChargingStation,
      badge: "Cable / Power Bank",
      desc: "Fast-charging phone cable and wall adapter (or high-capacity power bank) for continuous battery.",
      border: "border-purple-500/40",
      accent: "bg-purple-500/10 text-purple-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070714] text-white selection:bg-red-600 selection:text-white overflow-hidden font-sans">
      <Navbar />

      {/* ========================================================
          HERO SECTION - GRAND FINAL TEST & FAREWELL CELEBRATION
      ======================================================== */}
      <section className="relative px-4 pt-32 pb-16 overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/15 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

        {/* Subtle background YouTube watermark */}
        <div className="absolute top-20 right-8 opacity-5 pointer-events-none hidden lg:block">
          <FaYoutube size={550} className="text-red-600" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Top Organization Header Pill */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800/80">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-red-500/30 bg-red-600/10 px-4 py-2 text-xs md:text-sm font-bold text-red-400 backdrop-blur">
              <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white">
                <FaYoutube className="text-xs" />
              </div>
              <span className="uppercase tracking-widest">
                The Okhai Memon Jamat • Social Welfare Committee
              </span>
            </div>

            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
              Batch 2 • Grand Final & Farewell
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-block bg-gradient-to-r from-red-600 to-amber-600 text-white font-black text-xs md:text-sm px-4 py-1 rounded-md uppercase tracking-wider shadow">
                ONE BATCH • ONE CELEBRATION
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase leading-[0.95] tracking-tight">
                GRAND FINAL TEST & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-amber-400">
                  FAREWELL CELEBRATION
                </span>
              </h1>

              <p className="text-lg md:text-2xl font-bold text-amber-300 italic tracking-tight">
                &ldquo;Three months of learning. A lifetime of memories to celebrate.&rdquo;
              </p>

              <p className="text-base md:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                Dear Batch 2 Online and Onsite Students! Tamam students ke liye physical Grand Final Test mein attendance compulsory hai. Test ke foran baad isi venue par farewell celebration hogi.
              </p>

              {/* Event Time & Venue Badge Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                    <FaCalendarAlt className="text-base sm:text-lg" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Date</span>
                    <span className="text-xs sm:text-sm font-black text-white">8 Nov 2026</span>
                    <span className="text-[10px] text-amber-400 font-semibold block">Sunday</span>
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <FaClock className="text-base sm:text-lg" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Reporting</span>
                    <span className="text-xs sm:text-sm font-black text-white">10:00 AM</span>
                    <span className="text-[10px] text-amber-300 font-medium block">Students Arrive</span>
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                    <FaClock className="text-base sm:text-lg" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Test Publish</span>
                    <span className="text-xs sm:text-sm font-black text-white">10:30 AM</span>
                    <span className="text-[10px] text-red-300 font-medium block">Test Starts</span>
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt className="text-base sm:text-lg" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Venue</span>
                    <span className="text-xs sm:text-sm font-black text-white truncate block">Husein Ebrahim</span>
                    <span className="text-[10px] text-slate-400 font-medium block">Sports Complex</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl">
                <Link
                  href="/test"
                  className="col-span-1 sm:col-span-2 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 p-4 text-center font-black uppercase tracking-wider text-white shadow-2xl shadow-red-600/40 transition-all flex items-center justify-center gap-3 text-base md:text-lg border border-amber-400/40 active:scale-[0.99] group cursor-pointer"
                >
                  <FaGraduationCap className="text-2xl text-amber-300 group-hover:scale-110 transition-transform" />
                  <span>Download Final Test Paper</span>
                  <span className="text-[11px] bg-slate-950/70 px-2.5 py-1 rounded-full text-amber-300 font-mono border border-amber-400/30">
                    NO OTP REQUIRED
                  </span>
                </Link>

                <Link
                  href="/status"
                  className="rounded-2xl border border-slate-700 bg-slate-900/90 px-6 py-3.5 text-center font-bold text-sm uppercase text-slate-200 hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <FaIdCard className="text-red-500" />
                  <span>Check Student Status</span>
                </Link>

                <a
                  href="https://chat.whatsapp.com/JCX5PQRS11iK5tbmUZggNv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-emerald-500/30 bg-emerald-950/50 hover:bg-emerald-900/60 px-6 py-3.5 text-center font-bold text-sm uppercase text-emerald-300 transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <FaWhatsapp className="text-lg text-emerald-400" />
                  <span>Open Discussion Group</span>
                </a>
              </div>
            </div>

            {/* Right Hero Poster Showcase - Grand Final Test Poster */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-red-600/30 via-amber-500/20 to-red-900/30 blur-2xl pointer-events-none" />

              <div className="relative rounded-[2.5rem] border-2 border-amber-500/50 bg-slate-950 p-2.5 shadow-2xl shadow-red-600/30 overflow-hidden group">
                <Image
                  src="/grand-final-test-poster.jpg"
                  alt="Grand Final Test Followed by Farewell Celebration"
                  width={700}
                  height={700}
                  className="rounded-[2rem] w-full object-cover group-hover:scale-102 transition-transform duration-500 shadow-inner"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          DETAILED ANNOUNCEMENTS: FINAL TEST & FAREWELL GUIDELINES
      ======================================================== */}
      <section className="relative px-4 py-16 bg-gradient-to-b from-[#070714] via-slate-950 to-[#070714] border-y border-slate-800">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest bg-red-600/10 px-4 py-1.5 rounded-full border border-red-500/20">
              Official Batch 2 Guidelines
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white mt-4 tracking-tight">
              Test Instructions & <span className="text-amber-400">Farewell Details</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-2">
              Tamam zaroori maloomat aur guidelines neeche di gayi hain. Barahe karam dhyan se padhein.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Grand Final Test Guidelines */}
            <div className="bg-slate-900/90 border-2 border-red-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden text-left">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 text-xl mb-4">
                <FaGraduationCap />
              </div>

              <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
                Attendance Compulsory
              </span>
              <h3 className="text-2xl font-black text-white mt-1 uppercase">
                Grand Final Physical Test
              </h3>

              <div className="mt-4 space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                <div className="flex items-start gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                  <FaCheckCircle className="text-red-500 mt-1 shrink-0" />
                  <div>
                    <strong className="text-white">Physical Attendance Mandatory:</strong> Tamam onsite aur online students ke liye physical Grand Final Test mein attendance compulsory hai.
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                  <FaClock className="text-amber-400 mt-1 shrink-0" />
                  <div>
                    <strong className="text-white">Date & Reporting Timings:</strong> Sunday, 8 November 2026 at Husein Ebrahim Sports Complex.
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <span className="bg-amber-500/20 text-amber-300 font-bold px-2.5 py-1 rounded-lg border border-amber-500/30">
                        Students Reporting: 10:00 AM
                      </span>
                      <span className="bg-red-500/20 text-red-300 font-bold px-2.5 py-1 rounded-lg border border-red-500/30">
                        Test Publish: 10:30 AM
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                  <FaGlobe className="text-cyan-400 mt-1 shrink-0" />
                  <div>
                    <strong className="text-white">Special Online Test (Abroad / Genuine Reason):</strong> Abroad rehne wale ya kisi genuine majboori ka saamna karne wale students management ko application bhejein. Inke liye <strong>4:30 PM PKT</strong> par special online test hoga.
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                  <FaFilePdf className="text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <strong className="text-white">Assigned Test Paper:</strong> Har student apna personalized 150-mark paper niche aur assigned topic ke sath download karein.
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/test"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black py-3 px-5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <FaFilePdf /> Download My Test Paper
                </Link>
              </div>
            </div>

            {/* Card 2: Farewell Celebration & Student Planning */}
            <div className="bg-slate-900/90 border-2 border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden text-left flex flex-col justify-between">
              <div>
                <div className="mb-5 rounded-2xl overflow-hidden border border-amber-500/30 bg-slate-950 shadow-lg">
                  <Image
                    src="/farewell-celebration-poster.jpg"
                    alt="One Batch One Celebration - The Farewell"
                    width={700}
                    height={700}
                    className="w-full h-auto object-cover max-h-56"
                  />
                </div>

                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xl mb-4">
                  <FaUsers />
                </div>

                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Aapke Ideas • Aapka Event
                </span>
                <h3 className="text-2xl font-black text-white mt-1 uppercase">
                  Farewell Celebration
                </h3>

                <div className="mt-4 space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  <div className="flex items-start gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                    <FaHandsHelping className="text-amber-400 mt-1 shrink-0" />
                    <div>
                      <strong className="text-white">Onsite Farewell (8 Nov):</strong> Physical test ke foran baad isi venue par grand celebration hogi. Both onsite and online students invited!
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                    <FaGlobe className="text-cyan-400 mt-1 shrink-0" />
                    <div>
                      <strong className="text-white">Online Farewell (Saturday, 14 Nov):</strong> Jo students onsite join nahi kar sakte, unke liye special virtual celebration Saturday 14 Nov ko hogi.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                    <FaLightbulb className="text-yellow-400 mt-1 shrink-0" />
                    <div>
                      <strong className="text-white">Open Discussion Group mein Share Karein:</strong>
                      <ul className="mt-1 list-disc list-inside text-slate-400 space-y-0.5">
                        <li>Apna exciting activity idea share karein</li>
                        <li>Planning mein apni zimmedari batayein</li>
                        <li>Team bana kar plan management ke sath share karein</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                    <FaClipboardList className="text-emerald-400 mt-1 shrink-0" />
                    <div>
                      <strong className="text-white">Management Approval:</strong> Har activity aur arrangement final karne se pehle Social Welfare Committee ki approval zaroori hai.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="https://chat.whatsapp.com/JCX5PQRS11iK5tbmUZggNv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3 px-5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <FaWhatsapp className="text-base" /> Share Ideas on WhatsApp Group
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          REQUIRED GADGETS FOR THE FINAL TEST (PHYSICAL SESSION)
      ======================================================== */}
      <section className="relative px-4 py-16 bg-[#070714] border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-black border-2 border-amber-500/40 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Ambient background glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
                <FaTools /> Physical Session Preparation
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight">
                Required Gadgets for the <span className="text-red-500">Final Test</span>
              </h2>
              <p className="text-base md:text-lg font-bold text-amber-300 mt-2">
                (Physical YouTube Automation Session)
              </p>
              <p className="text-xs md:text-sm text-slate-300 mt-2">
                All students are requested to bring the following items:
              </p>

              <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-3 text-xs bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <FaClock /> Students Reporting Time: 10:00 AM
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1.5 text-red-400 font-bold">
                  <FaClock /> Test Publish: 10:30 AM
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-medium">Sunday, 8 Nov 2026</span>
              </div>
            </div>

            {/* 6 Gadgets Responsive Grid */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {requiredGadgets.map((gadget) => {
                const Icon = gadget.icon;
                return (
                  <div
                    key={gadget.num}
                    className={`bg-slate-900/90 border ${gadget.border} rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 shadow-xl group`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl ${gadget.accent} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner`}
                        >
                          <Icon />
                        </div>
                        <span className="text-xs font-mono font-black text-slate-500 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800">
                          #{gadget.num}
                        </span>
                      </div>

                      <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 mb-2">
                        {gadget.badge}
                      </div>

                      <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                        {gadget.num}. {gadget.title}
                      </h3>

                      <p className="text-xs text-slate-400 mt-2 leading-relaxed font-medium">
                        {gadget.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-emerald-400 font-bold">
                      <FaCheckCircle className="text-xs" /> Mandatory for Exam
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Accessories Callout */}
            <div className="relative mt-8 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 text-xl">
                  <FaTools />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Additional Gadgets & Accessories
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Please bring any other gadgets or accessories you may need for practical YouTube Automation tasks (e.g. mouse, headphones/earphones, USB drives).
                  </p>
                </div>
              </div>

              <Link
                href="/test"
                className="bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-xs uppercase tracking-wider py-3 px-5 rounded-xl shadow-lg shrink-0 flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
              >
                <FaFilePdf /> Get Test Paper
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          INTERACTIVE TEST PAPER QUICK LOOKUP BAR
      ======================================================== */}
      <section className="relative px-4 py-16 bg-[#070714]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-tr from-slate-950 via-slate-900 to-black border-2 border-red-500/40 rounded-3xl p-6 md:p-10 shadow-2xl text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-3">
              <FaGraduationCap /> Instant Paper Portal
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
              Get Your Batch 2 Assessment Paper
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-lg mx-auto">
              Apna official Roll Number (e.g. 2001, 2501) ya registered WhatsApp number darj karein aur apna paper download karein. Zero OTP required!
            </p>

            <form onSubmit={handleHomeSearch} className="mt-6 max-w-xl mx-auto flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                placeholder="Roll Number (e.g. 2001) or WhatsApp Number"
                value={homeRollQuery}
                onChange={(e) => setHomeRollQuery(e.target.value)}
                className="flex-1 bg-slate-950 border-2 border-slate-700 focus:border-amber-400 text-white placeholder-slate-500 rounded-xl px-5 py-3.5 text-base font-bold outline-none transition-all"
              />

              <button
                type="submit"
                className="bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black py-3.5 px-6 rounded-xl uppercase tracking-wider text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
              >
                <span>Find My Paper</span>
                <FaArrowRight />
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-slate-400 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <FaCheckCircle /> Fair Topic Rotation
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <FaShieldAlt /> Direct Instant Access
              </span>
              <span>•</span>
              <span>150 Total Marks</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          WHAT YOU MASTER IN YOUTUBE AUTOMATION
      ======================================================== */}
      <section className="relative px-4 py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-red-500 font-bold uppercase tracking-widest text-xs block mb-2">
              Batch 2 Core Competencies
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              What You Master in <span className="text-red-600">YouTube Automation</span>
            </h2>
            <p className="text-sm md:text-base text-slate-400 mt-3">
              Comprehensive practical skills designed to launch, grow, and monetize faceless YouTube automation channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {curriculum.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-red-500/40 transition-colors shadow-lg text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500 text-2xl mb-4">
                    <Icon />
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          TRAINER & EVALUATOR SECTION
      ======================================================== */}
      <section className="relative px-4 py-20 bg-[#070714]">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 flex justify-center">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl bg-slate-950 border-2 border-red-600/40 flex flex-col items-center justify-center p-6 shadow-xl relative group">
                  <FaYoutube className="text-red-600 text-6xl mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold text-red-400 uppercase tracking-widest">
                    Course Trainer
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">
                    Ms. Saba Vayani
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    YouTube Automation Trainer
                  </span>
                </div>
              </div>

              <div className="lg:col-span-8 text-left">
                <div className="inline-block bg-red-600/10 text-red-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border border-red-500/20">
                  Instruction & Evaluation Board
                </div>
                <h2 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tight">
                  Expert Training by <span className="text-red-600">Ms. Saba Vayani</span>
                </h2>
                <p className="text-sm md:text-base text-slate-300 mt-3 leading-relaxed">
                  Learn practical YouTube Automation techniques from industry practitioners. The assessment evaluates master prompt creation, script quality, AI voiceover clarity, video editing flow, and CTR thumbnail design.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300 border-t border-slate-800/80 pt-5">
                  <div>
                    <span className="text-slate-500 block uppercase font-bold text-[10px]">Trainer</span>
                    <span className="text-white font-bold text-sm">Ms. Saba Vayani</span>
                    <span className="text-slate-400 block text-[11px]">YouTube Automation Trainer</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block uppercase font-bold text-[10px]">Lead Evaluator</span>
                    <span className="text-white font-bold text-sm">Mr. Shoaib Khosa</span>
                    <span className="text-slate-400 block text-[11px]">Lead Evaluator</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Mobile Bottom Fixed Bar */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden flex gap-2">
        <Link
          href="/test"
          className="flex-1 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 px-3 py-3.5 text-center font-black uppercase shadow-xl text-xs text-white flex items-center justify-center gap-1.5 border border-amber-300/30"
        >
          <FaGraduationCap className="text-sm" /> Test Paper
        </Link>
        <Link
          href="/status"
          className="flex-1 rounded-2xl bg-slate-900 border border-slate-700 px-3 py-3.5 text-center font-black uppercase shadow-xl text-xs text-white flex items-center justify-center gap-1.5"
        >
          <FaIdCard className="text-red-500" /> Status
        </Link>
        <a
          href="https://chat.whatsapp.com/JCX5PQRS11iK5tbmUZggNv"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl bg-green-600 px-4 py-3.5 text-center font-black uppercase shadow-xl flex items-center justify-center text-white"
        >
          <FaWhatsapp className="text-lg" />
        </a>
      </div>
    </div>
  );
}
