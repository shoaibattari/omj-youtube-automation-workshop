"use client";

import { FaWhatsapp } from "react-icons/fa";
import Countdown from "./components/Countdown";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Leadership from "./components/Leadership";
import Navbar from "./components/Navbar";
import Link from "next/link";

export default function Home() {
  const features = [
    "YouTube Automation Full System",
    "AI Tools That Save Hours",
    "Viral Content Strategy",
    "Channel Growth Secrets",
    "Monetization Roadmap",
    "Common Mistakes to Avoid",
  ];

  const audience = [
    "Students",
    "Beginners",
    "Freelancers",
    "Content Creators",
    "Aspiring YouTubers",
  ];

  return (
    <div className="min-h-screen bg-[#070707] text-white overflow-hidden">
      <Navbar />

      <section className="relative px-4 pt-28 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.35),transparent_35%),radial-gradient(circle_at_top_right,rgba(250,204,21,0.22),transparent_30%)]" />
        <div className="absolute top-28 right-10 w-72 h-72 bg-red-600/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-yellow-400/10 blur-3xl rounded-full" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-yellow-300 backdrop-blur">
              🔥 Awam Ki Purzor Farmaish Pe
            </div>

            <h1 className="mt-6 text-5xl md:text-7xl font-black uppercase leading-[0.95] tracking-tight">
              YouTube
              <span className="block text-red-500">Automation</span>
              Workshop 3.0
            </h1>

            <p className="mt-5 text-2xl md:text-3xl font-black text-yellow-300 uppercase">
              Zero to Pro Masterclass
            </p>

            <p className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed">
              Learn YouTube Automation, AI Tools, Content Strategy, Channel
              Growth and Monetization with complete practical guidance.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="https://forms.gle/LxQeXoz6CKPmcbmf6"
                target="_blank"
                className="rounded-2xl bg-red-600 px-8 py-4 text-center font-black uppercase shadow-lg shadow-red-600/30 hover:bg-red-500 transition"
              >
                Register Now — Rs. 200
              </a>

              <a
                href="#details"
                className="rounded-2xl border border-white/15 bg-white/10 px-8 py-4 text-center font-black uppercase backdrop-blur hover:bg-white/20 transition"
              >
                View Details
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-white/50 text-sm font-bold">Date</p>
                <h3 className="text-2xl font-black">28 Jun</h3>
                <p className="text-red-300 font-bold">Sunday</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-white/50 text-sm font-bold">Time</p>
                <h3 className="text-2xl font-black">05:00</h3>
                <p className="text-red-300 font-bold">PM Onwards</p>
              </div>

              <div className="rounded-3xl border border-yellow-300/30 bg-yellow-300/10 p-5 backdrop-blur">
                <p className="text-white/50 text-sm font-bold">Seats</p>
                <h3 className="text-2xl font-black">Limited</h3>
                <p className="text-yellow-300 font-bold">First Come</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-red-600/40 to-yellow-300/20 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur">
              <img
                src="/youtube-automation-workshop.jpeg"
                alt="YouTube Automation Workshop"
                className="rounded-[1.5rem] w-full"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 rounded-3xl bg-white text-slate-950 p-5 shadow-2xl hidden md:block">
              <p className="text-sm font-black text-red-600">TRAINED</p>
              <h3 className="text-4xl font-black">100+</h3>
              <p className="font-bold">Students</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="details"
        className="relative px-4 py-20 bg-white text-slate-950"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="font-black text-red-600 uppercase tracking-widest">
              Complete Practical Guidance
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-black uppercase">
              What You Will Get
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-[2rem] bg-slate-950 text-white p-8">
              <h3 className="text-2xl font-black mb-6">You Will Learn</h3>
              <div className="space-y-4">
                {features.map((item, index) => (
                  <div key={index} className="flex gap-3 font-bold">
                    <span className="text-red-500">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-red-600 text-white p-8">
              <h3 className="text-2xl font-black mb-6">Who Should Attend?</h3>
              <div className="space-y-4">
                {audience.map((item, index) => (
                  <div key={index} className="flex gap-3 font-bold">
                    <span>🚀</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-yellow-300 text-slate-950 p-8">
              <h3 className="text-2xl font-black mb-6">Event Details</h3>

              <div className="space-y-5 font-bold">
                <div>
                  <p className="text-sm uppercase opacity-60">Venue</p>
                  <p className="text-xl font-black">71 Banquet</p>
                  <p>Adjacent to Shadi Qila, Near University of Karachi</p>
                </div>

                <div>
                  <p className="text-sm uppercase opacity-60">Trainer</p>
                  <p className="text-xl font-black">Ms. Saba Vayani</p>
                </div>

                <div>
                  <p className="text-sm uppercase opacity-60">Queries</p>
                  <Link
                    href="https://wa.me/923152477341"
                    target="_blank"
                    className="flex items-center gap-4 rounded-2xl bg-green-500 px-6 py-4 text-lg font-black text-white transition hover:scale-[1.02] hover:bg-green-400"
                  >
                    <FaWhatsapp className="text-3xl" />
                    0315-2477341
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Countdown />

      {/* <section id="registration">
        <CTA />
      </section> */}

      <Leadership />
      <Footer />

      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <a
          href="https://forms.gle/LxQeXoz6CKPmcbmf6"
          target="_blank"
          className="block rounded-2xl bg-red-600 px-6 py-4 text-center font-black uppercase shadow-xl"
        >
          Register Now — Rs. 200
        </a>
      </div>
    </div>
  );
}
