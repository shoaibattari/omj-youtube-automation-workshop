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
      <div className="relative bg-slate-900 py-20 lg:py-32 overflow-hidden">
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
                className="w-full h-auto object-contain transform group-hover:scale-105 transition duration-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* QUICK INFO BOXES (Updated per Poster) */}
      <section className="container mx-auto px-6 -mt-16 relative z-20">
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

      {/* FOOTER - From Poster */}
      <footer className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-10">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
              Further Queries? Contact Us
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                <MdPhone className="text-red-600" size={24} />
                <span className="font-black text-slate-800">
                  Moiz Hanif Mamdani: 0321-2752209
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto border-t pt-10">
            <div className="text-center md:text-left">
              <p className="font-black text-slate-900 text-sm uppercase">
                Shahid Adam Kath
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                Chairman, Social Welfare Committee & Joint Secretary OMJ
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="font-black text-slate-900 text-sm uppercase">
                Muhammad Arif Tayyab Suriya
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                Hon. General Secretary
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
