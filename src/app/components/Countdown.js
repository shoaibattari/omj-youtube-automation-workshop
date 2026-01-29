"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  FaClock,
  FaCalendarAlt,
  FaHourglassHalf,
  FaFire,
} from "react-icons/fa";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Updated Target Date per Poster: February 1, 2026, at 11:00 AM
  const eventDate = "2026-03-22T11:00:00";

  useEffect(() => {
    const target = new Date(eventDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  return (
    <section className="py-20 bg-slate-950 text-center relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-red-600/10 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="inline-flex items-center bg-red-600 text-white px-6 py-2 rounded-full mb-8 shadow-lg shadow-red-900/20">
          <FaFire className="mr-2 animate-bounce" />
          <span className="font-black tracking-widest text-[10px] uppercase">
            Limited Seats Only! Batch Starts Soon
          </span>
        </div>

        <h2 className="text-white text-4xl md:text-6xl font-black mb-12 uppercase italic tracking-tighter">
          Course <span className="text-red-600">Countdown</span>
        </h2>

        <div className="flex justify-center flex-wrap gap-4 md:gap-10 px-4">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Seconds" highlight />
        </div>

        <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="flex items-center text-slate-300 bg-slate-900 px-8 py-4 rounded-2xl border border-slate-800 shadow-xl">
            <FaCalendarAlt className="text-red-600 mr-4 text-2xl" />
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Starting From
              </p>
              <span className="font-black text-white uppercase italic">
                Marhc 22, 2026
              </span>
            </div>
          </div>

          <div className="flex items-center text-slate-300 bg-slate-900 px-8 py-4 rounded-2xl border border-slate-800 shadow-xl">
            <FaClock className="text-red-600 mr-4 text-2xl" />
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Class Time
              </p>
              <span className="font-black text-white uppercase italic">
                {format(new Date(eventDate), "EEEE '|' h:mm a")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimeUnit({ value, label, highlight = false }) {
  return (
    <div className="group">
      <div
        className={`
        w-24 h-24 md:w-36 md:h-36 rounded-[2.5rem] flex flex-col items-center justify-center transition-all duration-500 transform group-hover:-translate-y-2
        ${
          highlight
            ? "bg-red-600 shadow-[0_20px_50px_rgba(220,38,38,0.3)] border-b-8 border-red-800"
            : "bg-slate-900 border border-slate-800 shadow-2xl group-hover:border-red-600/50"
        }
      `}
      >
        <p className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter font-mono">
          {value.toString().padStart(2, "0")}
        </p>
      </div>
      <p className="mt-5 text-slate-500 font-black uppercase text-[10px] md:text-xs tracking-[0.3em]">
        {label}
      </p>
    </div>
  );
}
