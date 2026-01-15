import React from "react";
import {
  MdPlayCircleFilled,
  MdLocationOn,
  MdWatchLater,
  MdCalendarToday,
  MdCheckCircle,
  MdPhone,
} from "react-icons/md";
import { FaYoutube, FaUserTie, FaRocket, FaLightbulb } from "react-icons/fa";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* HERO SECTION */}
      <div className="relative bg-slate-50 py-16 lg:py-24 border-b overflow-hidden">
        <div className="container mx-auto px-2 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <span className="text-green-600 font-bold">OMJ</span> <br />
            <h1 className="text-5xl lg:text-7xl font-black leading-none mb-6">
              YOUTUBE <br />
              <span className="text-red-600">AUTOMATION</span> <br />
              <span className="bg-black text-white px-2">WORKSHOP</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Start your journey into faceless content creation and master the
              tools used by pros to build passive income.
            </p>
            <div className="flex gap-4">
              <Link
                href={"/registration"}
                className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-base hover:shadow-2xl transition shadow-red-200"
              >
                Register NOW!
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-red-100 rounded-full blur-3xl opacity-30"></div>
            <div className="relative bg-white p-4 rounded-3xl shadow-2xl border">
              {/* Visual Placeholder for Video or Flyer Image */}
              <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center">
                <MdPlayCircleFilled
                  size={80}
                  className="text-red-600 cursor-pointer hover:scale-110 transition"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK INFO BOXES */}
      <section className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="grid md:grid-cols-3 gap-0 rounded-2xl shadow-xl overflow-hidden border">
          <div className="bg-white p-8 flex items-center gap-4 border-r">
            <MdCalendarToday size={40} className="text-red-600" />
            <div>
              <p className="text-xs uppercase font-bold text-gray-400">Date</p>
              <p className="font-bold">18 Jan, 2026</p>
            </div>
          </div>
          <div className="bg-white p-8 flex items-center gap-4 border-r">
            <MdWatchLater size={40} className="text-red-600" />
            <div>
              <p className="text-xs uppercase font-bold text-gray-400">Time</p>
              <p className="font-bold">Sunday 3:30 PM</p>
            </div>
          </div>
          <div className="bg-white p-8 flex items-center gap-4">
            <MdLocationOn size={40} className="text-red-600" />
            <div>
              <p className="text-xs uppercase font-bold text-gray-400">Venue</p>
              <p className="font-bold leading-tight">
                Husein Ebrahim Sports Complex & Community Center F.B.Area
                Huseinabad, Karachi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TOPICS SECTION */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            What&apos;s Inside the Workshop?
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Faceless Channels",
              icon: <FaUserTie />,
              desc: "Create content without showing your face.",
            },
            {
              title: "Zero View Solution",
              icon: <FaRocket />,
              desc: "How to get your first 1,000 subscribers fast.",
            },
            {
              title: "Pro AI Tools",
              icon: <FaLightbulb />,
              desc: "Master the tools that automate your workflow.",
            },
            {
              title: "Secret Strategies",
              icon: <MdCheckCircle />,
              desc: "Exclusive kick-start methods for 2026.",
            },
            {
              title: "Common Mistakes",
              icon: <MdCheckCircle />,
              desc: "What to avoid to prevent channel strikes.",
            },
            {
              title: "Monetization",
              icon: <MdCheckCircle />,
              desc: "How to earn beyond just AdSense.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 border rounded-2xl hover:border-red-600 transition group"
            >
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition">
                {item.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
    </div>
  );
};

export default LandingPage;
