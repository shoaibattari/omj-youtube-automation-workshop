"use client";
import Link from "next/link";
import { FaArrowRight, FaYoutube, FaPlay } from "react-icons/fa";

export default function CTA() {
  return (
    <section
      id="register"
      className="py-20 bg-white text-slate-900 relative overflow-hidden border-t border-gray-100"
    >
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <FaYoutube className="absolute -top-10 -left-10 text-[300px] rotate-12" />
        <FaYoutube className="absolute -bottom-20 -right-10 text-[250px] -rotate-12" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-200">
            <FaPlay className="ml-1" />
          </div>
          <span className="text-red-600 font-black tracking-widest uppercase">
            Limited Seats Available
          </span>
        </div>

        <h2 className="text-4xl lg:text-6xl font-black mb-6 text-slate-900 tracking-tighter">
          START YOUR <span className="text-red-600">YOUTUBE</span> <br />
          AUTOMATION JOURNEY
        </h2>

        <p className="text-xl mb-10 max-w-2xl mx-auto text-slate-600 leading-relaxed">
          {/* Fixed: Used curly braces to avoid unescaped single quote build error */}
          {"Don't miss this chance to learn from "}
          <span className="font-bold text-slate-900">Ms. Saba Vayani</span>.
          {" Transform your digital future with faceless content creation."}
        </p>

        <Link
          href={"https://chat.whatsapp.com/EKH7bgABxlpLdL9GohvvF3"}
          className="w-fit bg-red-600 hover:bg-black text-white font-black py-5 px-12 rounded-full flex items-center mx-auto shadow-2xl shadow-red-200 transition-all duration-300 group hover:scale-105"
        >
          <span className="text-lg uppercase">Secure My Free Spot</span>
          <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
        </Link>

        <div className="mt-12 flex flex-col items-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
            Presented By
          </p>
          <div className="flex items-center gap-6">
            <span className="font-black text-slate-400 italic">
              OMJ SOCIAL WELFARE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
