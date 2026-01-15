"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { FaClock, FaCalendarAlt, FaHourglassHalf } from "react-icons/fa";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Target Date: January 18, 2026, at 3:30 PM (15:30)
  const eventDate = "2026-01-18T15:30:00";

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
    <section className="py-16 bg-slate-900 text-center relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="inline-flex items-center bg-red-600/10 border border-red-600/20 px-4 py-2 rounded-full mb-8">
          <FaHourglassHalf className="text-red-500 mr-2 animate-pulse" />
          <span className="text-red-500 font-bold tracking-widest text-sm">
            HURRY! SEATS ARE FILLING FAST
          </span>
        </div>

        <h2 className="text-white text-3xl md:text-4xl font-black mb-10 uppercase italic">
          Event Starts In
        </h2>

        <div className="flex justify-center flex-wrap gap-4 md:gap-8 px-4">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Seconds" highlight />
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="flex items-center text-gray-400 bg-white/5 px-6 py-3 rounded-xl border border-white/10">
            <FaCalendarAlt className="text-red-600 mr-3 text-xl" />
            <span className="font-bold text-white">JANUARY 18, 2026</span>
          </div>
          <div className="flex items-center text-gray-400 bg-white/5 px-6 py-3 rounded-xl border border-white/10">
            <FaClock className="text-red-600 mr-3 text-xl" />
            <span className="font-bold text-white">
              {format(new Date(eventDate), "EEEE '|' h:mm a")}
            </span>
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
        w-20 h-20 md:w-28 md:h-28 rounded-2xl flex flex-col items-center justify-center transition-all duration-300
        ${
          highlight
            ? "bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)] border-b-4 border-red-800"
            : "bg-white/10 border border-white/10 group-hover:bg-white/20"
        }
      `}
      >
        <p className="text-3xl md:text-5xl font-black text-white leading-none">
          {value.toString().padStart(2, "0")}
        </p>
      </div>
      <p className="mt-3 text-gray-400 font-bold uppercase text-xs md:text-sm tracking-widest">
        {label}
      </p>
    </div>
  );
}
