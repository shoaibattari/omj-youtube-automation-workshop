import React from "react";
import {
  MdLocationOn,
  MdWatchLater,
  MdCalendarToday,
  MdCheckCircle,
  MdPhone,
  MdLanguage,
} from "react-icons/md";
import {
  FaYoutube,
  FaRocket,
  FaLightbulb,
  FaTools,
  FaChartLine,
} from "react-icons/fa";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* HERO SECTION */}
      <div className="relative bg-slate-900 py-20 overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 hidden lg:block">
          <FaYoutube size={400} className="text-red-600" />
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="flex items-center gap-5 mb-6">
              <img
                src="omj-logo.png"
                alt="OMJ Logo"
                className="h-18 w-18 bg-white rounded-full object-cover p-1"
              />
              <span className="text-white font-black tracking-[0.2em] uppercase text-sm">
                The Okhai Memon Jamat Presents
              </span>
            </div>

            <h1 className="text-5xl lg:text-8xl font-black leading-none mb-6 text-white tracking-tighter">
              YOUTUBE <br />
              <span className="text-red-600 italic">AUTOMATION</span> <br />
            </h1>

            <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-md font-black text-xl mb-8 skew-x-[-10deg]">
              FUNDAMENTALS COURSE
            </div>

            <p className="text-xl text-slate-300 mb-10 max-w-lg leading-relaxed">
              Turn your{" "}
              <span className="text-white font-bold text-2xl italic">
                ideas
              </span>{" "}
              into{" "}
              <span className="text-white font-bold text-2xl italic">
                income-generating
              </span>{" "}
              YouTube channels. Learn systems used by successful creators!
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
                <MdCheckCircle className="text-red-600" />
                <span className="text-white text-xs font-black uppercase tracking-widest">
                  Onsite Classes
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
                <MdLocationOn className="text-red-600" />
                <span className="text-white text-xs font-black uppercase tracking-widest">
                  Hussainabad
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href={"/registration"}
                className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white hover:text-red-600 transition-all shadow-2xl shadow-red-900/20 text-center uppercase tracking-widest"
              >
                Register Now – Don't Wait!
              </Link>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-red-600 to-red-900 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-slate-800 rounded-[3rem] overflow-hidden border border-slate-700 shadow-2xl">
              <img
                src="/main-poster.jpeg"
                alt="Course Flyer"
                className="w-full h-full object-contain transform group-hover:scale-105 transition duration-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MENTOR SECTION - Placed after Quick Info */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 relative">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 blur-[100px] rounded-full"></div>

            {/* Trainer Image / Avatar Area */}
            <div className="w-full lg:w-1/3 flex justify-center relative">
              <div className="relative group">
                <div className="absolute -inset-1 bg-red-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative w-64 h-80 bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 flex flex-col items-center justify-center">
                  {/* Placeholder for Trainer Image */}
                  <FaYoutube className="text-red-600 text-8xl mb-4 opacity-50 group-hover:scale-110 transition-transform" />
                  <div className="text-center px-4">
                    <p className="text-red-500 font-black text-[10px] uppercase tracking-widest mb-1">
                      Course Instructor
                    </p>
                    <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">
                      Ms. Saba Vayani
                    </h3>
                  </div>
                </div>
                {/* Experience Badge */}
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-xl transform -rotate-3 border border-slate-100">
                  <p className="text-slate-900 font-black text-lg leading-none">
                    YT Expert
                  </p>
                  <p className="text-red-600 font-bold text-[10px] uppercase tracking-tighter">
                    Certified Mentor
                  </p>
                </div>
              </div>
            </div>

            {/* Mentor Content */}
            <div className="w-full lg:w-2/3 text-left">
              <div className="inline-block bg-red-600/10 text-red-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                Meet Your Mentor
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 italic tracking-tighter">
                LEARN FROM{" "}
                <span className="text-red-600 underline decoration-slate-700">
                  MS. SABA VAYANI
                </span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed font-medium max-w-2xl">
                Pakistan's leading voice in YouTube Automation. With years of
                experience in creating faceless channels that generate
                consistent passive income, she is here to reveal the exact
                systems used by the top 1% of creators.
              </p>

              {/* Feature list for Trainer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Step-by-Step Practical Training",
                  "Niche Research Mastery",
                  "AI Content Systems",
                  "Monetization Secrets",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <MdCheckCircle
                      className="text-red-600 shrink-0"
                      size={20}
                    />
                    <span className="text-slate-300 font-bold text-sm uppercase tracking-tight">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK INFO BOXES (Updated per Poster) */}
      <section className="container mx-auto px-6 mt-16 relative z-20">
        <div className="grid md:grid-cols-3 gap-0 rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-white">
          <div className="bg-white p-10 flex items-center gap-5 border-r border-slate-100">
            <div className="bg-red-50 p-4 rounded-2xl text-red-600">
              <MdCalendarToday size={35} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                Batch Starts
              </p>
              <p className="font-black text-xl text-slate-900">1st Feb, 2026</p>
              <p className="text-xs font-bold text-red-600 italic">
                Every Sunday
              </p>
            </div>
          </div>

          <div className="bg-white p-10 flex items-center gap-5 border-r border-slate-100">
            <div className="bg-red-50 p-4 rounded-2xl text-red-600">
              <MdWatchLater size={35} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                Class Timing
              </p>
              <p className="font-black text-xl text-slate-900">
                11:00 AM - 1:00 PM
              </p>
              <p className="text-xs font-bold text-slate-500 italic text-nowrap">
                8 Power-Packed Sessions
              </p>
            </div>
          </div>

          <div className="bg-slate-900 p-10 flex items-center gap-5 text-white">
            <div className="bg-red-600 p-4 rounded-2xl">
              <MdLanguage size={35} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest text-nowrap">
                Exclusive Offer
              </p>
              <p className="font-black text-2xl text-yellow-400 tracking-tighter">
                50% DISCOUNT
              </p>
              <p className="text-[10px] font-bold text-slate-300 uppercase">
                For Memon Students
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU WILL GAIN SECTION */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <p className="text-red-600 font-black tracking-[0.3em] uppercase text-xs mb-3">
            Course Roadmap
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-4 italic tracking-tighter">
            WHAT YOU WILL{" "}
            <span className="text-red-600 underline decoration-slate-200">
              GAIN?
            </span>
          </h2>
          <div className="w-24 h-2 bg-slate-900 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Faceless Channels",
              icon: <FaYoutube />,
              desc: "Build YouTube channels without showing your face.",
            },
            {
              title: "Master AI Tools",
              icon: <FaTools />,
              desc: "Learn automation tools from zero to Pro.",
            },
            {
              title: "Avoid Mistakes",
              icon: <FaLightbulb />,
              desc: "Save months of trial by avoiding beginner errors.",
            },
            {
              title: "Smart Growth",
              icon: <FaChartLine />,
              desc: "Discover monetization & smart growth strategies.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-slate-50 rounded-4xl hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-red-100 group"
            >
              <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-500">
                {item.icon}
              </div>
              <h3 className="font-black text-xl mb-3 uppercase tracking-tighter">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
