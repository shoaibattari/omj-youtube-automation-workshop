"use client";

import { useState, useEffect } from "react";
import {
  FaClock,
  FaCalendarAlt,
  FaFire,
  FaMapMarkerAlt,
  FaTicketAlt,
} from "react-icons/fa";

export default function Countdown() {
  const event = {
    title: "YouTube Automation Workshop 3.0",
    date: "2026-07-05",
    time: "14:00:00",
    displayDate: "05 July 2026",
    displayDay: "Sunday",
    displayTime: "02:00 PM",
    timeNote: "Onwards",
    venue: "71 Banquet",
    venueDetail: "Near University of Karachi",
    fee: "Rs. 200",
  };

  const eventDate = `${event.date}T${event.time}`;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [eventStarted, setEventStarted] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const target = new Date(eventDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setEventStarted(true);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setEventStarted(false);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  return (
    <section className="relative overflow-hidden bg-[#070707] py-24 text-center text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.25),transparent_35%)]"></div>
      <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-red-600/20 blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-400/10 blur-[100px]"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-8 inline-flex items-center rounded-full border border-red-500/30 bg-red-600/15 px-6 py-2 text-yellow-300 shadow-lg shadow-red-900/20">
          <FaFire className="mr-2 animate-bounce text-red-500" />
          <span className="text-[10px] font-black uppercase tracking-widest md:text-xs">
            Don’t Miss Out — Very Few Seats Available
          </span>
        </div>

        <h2 className="mb-4 text-4xl font-black uppercase tracking-tight md:text-6xl">
          Event Starts In
        </h2>

        <p className="mx-auto mb-3 max-w-2xl text-xl font-black text-red-500 md:text-2xl">
          {event.title}
        </p>

        <p className="mx-auto mb-12 max-w-2xl text-base font-medium text-white/60 md:text-lg">
          {event.displayDay}, {event.displayDate} at {event.displayTime}{" "}
          {event.timeNote}
        </p>

        {eventStarted ? (
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-red-500/30 bg-white/10 p-8 backdrop-blur">
            <h3 className="text-3xl font-black text-yellow-300">
              Event Started
            </h3>
            <p className="mt-3 text-white/70">
              Please contact the organizer for latest seat availability.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 px-4 md:gap-8">
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <TimeUnit value={timeLeft.seconds} label="Seconds" highlight />
          </div>
        )}

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-4">
          <InfoCard
            icon={<FaCalendarAlt />}
            label="Event Date"
            value={event.displayDate}
            detail={event.displayDay}
          />

          <InfoCard
            icon={<FaClock />}
            label="Event Time"
            value={event.displayTime}
            detail={event.timeNote}
          />

          <InfoCard
            icon={<FaMapMarkerAlt />}
            label="Venue"
            value={event.venue}
            detail={event.venueDetail}
          />

          <InfoCard
            icon={<FaTicketAlt />}
            label="Registration Fee"
            value={event.fee}
            detail="Only"
          />
        </div>
      </div>
    </section>
  );
}

function TimeUnit({ value, label, highlight = false }) {
  return (
    <div className="group">
      <div
        className={`flex h-24 w-24 transform flex-col items-center justify-center rounded-[2rem] transition-all duration-500 group-hover:-translate-y-2 md:h-36 md:w-36 ${
          highlight
            ? "border-b-8 border-red-900 bg-red-600 shadow-[0_20px_60px_rgba(220,38,38,0.35)]"
            : "border border-white/10 bg-white/10 shadow-2xl backdrop-blur group-hover:border-red-500/50"
        }`}
      >
        <p className="font-mono text-4xl font-black leading-none tracking-tighter text-white md:text-6xl">
          {String(value ?? 0).padStart(2, "0")}
        </p>
      </div>

      <p className="mt-5 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 md:text-xs">
        {label}
      </p>
    </div>
  );
}

function InfoCard({ icon, label, value, detail }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 text-left shadow-2xl backdrop-blur transition hover:border-red-500/40 hover:bg-white/15">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-xl text-white">
        {icon}
      </div>

      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">
        {label}
      </p>

      <h3 className="mt-2 text-2xl font-black text-white">{value}</h3>

      <p className="mt-1 font-bold text-yellow-300">{detail}</p>
    </div>
  );
}
