"use client";
import Link from "next/link";
import { FaArrowRight, FaYoutube, FaPlay, FaCheckCircle } from "react-icons/fa";

export default function CTA() {
  return (
    <section
      id="register"
      className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <FaYoutube className="absolute -top-10 -left-10 text-[400px] rotate-12 text-red-600" />
        <FaYoutube className="absolute -bottom-20 -right-10 text-[350px] -rotate-12 text-red-600" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Badge */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-200 rotate-3">
            <FaPlay className="ml-1 text-xl" />
          </div>
          <div className="text-left">
            <span className="block text-red-600 font-black tracking-widest uppercase text-xs">
              Batch-01 Admission
            </span>
            <span className="block text-slate-400 font-bold text-[10px] uppercase">
              Limited Seats Available
            </span>
          </div>
        </div>

        <h2 className="text-5xl lg:text-7xl font-black mb-8 text-slate-900 tracking-tighter leading-[0.9]">
          READY TO BUILD YOUR <br />
          <span className="text-red-600 italic underline decoration-slate-200">
            DIGITAL EMPIRE?
          </span>
        </h2>

        <p className="text-xl mb-12 max-w-3xl mx-auto text-slate-600 leading-relaxed font-medium">
          Join the most demanded{" "}
          <span className="text-slate-900 font-black italic">
            YouTube Automation Fundamentals
          </span>{" "}
          course by{" "}
          <span className="text-red-600 font-bold">Okhai Memon Jamat</span>.
          Master faceless content and start your passive income journey today.
        </p>

        {/* Pricing Highlight for CTA */}
        <div className="mb-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
            <FaCheckCircle className="text-green-500" />
            <span className="font-black uppercase text-xs tracking-tighter">
              8 Power-Packed Sessions
            </span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-400 px-6 py-3 rounded-2xl shadow-md rotate-1">
            <span className="font-black uppercase text-xs tracking-tighter text-slate-900">
              50% Discount for Memons
            </span>
          </div>
        </div>

        <Link
          href={"/registration"}
          className="inline-flex w-full sm:w-fit bg-red-600 hover:bg-slate-900 text-white font-black py-6 px-16 rounded-4xl items-center justify-center mx-auto shadow-2xl shadow-red-900/30 transition-all duration-500 group hover:scale-105"
        >
          <span className="text-xl uppercase italic tracking-tighter">
            Apply for Admission
          </span>
          <FaArrowRight className="ml-4 group-hover:translate-x-3 transition-transform text-2xl" />
        </Link>

        {/* Footer Credits */}
        <div className="mt-16 pt-10 border-t border-slate-200 flex flex-col items-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">
            Organized By
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            <span className="font-black text-slate-900 italic uppercase text-sm tracking-tighter">
              Social Welfare Committee
            </span>
            <span className="font-black text-red-600 italic uppercase text-sm tracking-tighter">
              Okhai Memon Jamat
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
