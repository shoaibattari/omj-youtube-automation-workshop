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
    "AI Tools ka smart use",
    "Social Media se apni reach barhayein",
    "Personal Brand banayein",
    "Online Selling ke zariye products aur services ko market karein",
  ];

  const audience = [
    "Students",
    "Beginners",
    "Freelancers",
    "Content Creators",
    "Aspiring Entrepreneurs",
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-hidden">
      <Navbar />

      <section className="relative px-4 pt-28 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,20,147,0.25),transparent_35%),radial-gradient(circle_at_top_right,rgba(255,105,180,0.18),transparent_30%)]" />
        <div className="absolute top-28 right-10 w-72 h-72 bg-[#ff1493]/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#ff69b4]/10 blur-3xl rounded-full" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ff1493]/30 bg-[#ff1493]/10 px-4 py-2 text-sm font-bold text-[#ff69b4] backdrop-blur">
              ✨ The Okhai Memon Jamat Presents
            </div>

            <h1 className="mt-6 text-5xl md:text-7xl font-black uppercase leading-[0.95] tracking-tight">
              HUNAR SE AMDANI TAK
            </h1>

            <p className="mt-5 text-2xl md:text-3xl font-black text-[#ff69b4] uppercase">
              Turn Your Skills into a Successful Business
            </p>

            <p className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed">
              Har Skill Mein Chhupa Hai Ek Successful Business! Agar aap ne koi skill seekh li hai lekin ab tak us se earning shuru nahi ki... to shayad sirf ek sahi strategy ki kami hai.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://forms.gle/BYpufBDAt7hQ58kg6"
                target="_blank"
                className="rounded-2xl bg-[#ff1493] px-8 py-4 text-center font-black uppercase shadow-lg shadow-pink-500/30 hover:bg-[#e0117f] transition"
              >
                Register Now (Free)
              </a>
              <a
                href="https://chat.whatsapp.com/CWpCTfeX921DTM1SSwPjsr?s=cl&p=a&mlu=0"
                target="_blank"
                className="rounded-2xl border border-white/15 bg-green-700 px-8 py-4 text-center font-black uppercase backdrop-blur hover:bg-green-900 transition flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="text-xl" /> Join WhatsApp
              </a>
              <Link
                href="/status"
                className="rounded-2xl border border-white/15 bg-blue-700 px-8 py-4 text-center font-black uppercase backdrop-blur hover:bg-blue-900 transition"
              >
                View Status
              </Link>
              <a
                href="/create-dp"
                className="rounded-2xl border border-white/15 bg-orange-700 px-8 py-4 text-center font-black uppercase backdrop-blur hover:bg-orange-900 transition"
              >
                Create DP
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-white/50 text-sm font-bold">Date</p>
                <h3 className="text-2xl font-black">5 August</h3>
                <p className="text-[#ff69b4] font-bold">Wednesday</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-white/50 text-sm font-bold">Time</p>
                <h3 className="text-2xl font-black">04:00</h3>
                <p className="text-[#ff69b4] font-bold">PM Onwards</p>
              </div>

              <div className="rounded-3xl border border-[#ff1493]/30 bg-[#ff1493]/10 p-5 backdrop-blur">
                <p className="text-white/50 text-sm font-bold">Seats</p>
                <h3 className="text-2xl font-black">Limited</h3>
                <p className="text-[#ff69b4] font-bold">First Come</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#ff1493]/40 to-[#ff69b4]/20 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur">
              <img
                src="/youtube-automation-workshop.jfif"
                alt="Hunar Se Aamdani Tak Workshop"
                className="rounded-[1.5rem] w-full"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 rounded-3xl bg-white text-slate-950 p-5 shadow-2xl hidden md:block">
              <p className="text-sm font-black text-[#ff1493]">SPECIAL WORKSHOP</p>
              <h3 className="text-2xl font-black">For Women</h3>
              <p className="font-bold">OMJ Vocational Centre</p>
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
            <p className="font-black text-[#ff1493] uppercase tracking-widest">
              Turn Your Skills into a Successful Business
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-black uppercase">
              What You Will Learn
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-[2rem] bg-[#0a0a1a] text-white p-8">
              <h3 className="text-2xl font-black mb-6">You Will Learn</h3>
              <div className="space-y-4">
                {features.map((item, index) => (
                  <div key={index} className="flex gap-3 font-bold">
                    <span className="text-[#ff1493]">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-[#ff1493] text-white p-8">
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

            <div className="rounded-[2rem] bg-pink-100 text-slate-950 p-8 border-2 border-[#ff1493]/20">
              <h3 className="text-2xl font-black mb-6 text-[#ff1493]">Event Details</h3>

              <div className="space-y-5 font-bold">
                <div>
                  <p className="text-sm uppercase opacity-60">Venue</p>
                  <p className="text-xl font-black">Husien Ebrahim Sports Complex & Community Centre</p>
                  <p>Hussainabad</p>
                </div>

                <div>
                  <p className="text-sm uppercase opacity-60">Trainer</p>
                  <p className="text-xl font-black">Ms. Saba Vayani</p>
                  <p className="text-sm font-normal">AI & YouTube Automation, Social Media Marketing Expert & Motivational Coach</p>
                </div>

                <div>
                  <p className="text-sm uppercase opacity-60">Organizer</p>
                  <p className="text-lg font-black">Mst. Kulsoom Abdul Sattar Jakhura</p>
                  <p className="text-sm">Chairperson, OMJ Vocational Centre (Female)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Countdown />

      <Leadership />
      <Footer />

      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden flex gap-2">
        <a
          href="https://forms.gle/BYpufBDAt7hQ58kg6"
          target="_blank"
          className="flex-1 rounded-2xl bg-[#ff1493] px-4 py-4 text-center font-black uppercase shadow-xl text-sm text-white"
        >
          Register Free
        </a>
        <a
          href="https://chat.whatsapp.com/CWpCTfeX921DTM1SSwPjsr?s=cl&p=a&mlu=0"
          target="_blank"
          className="rounded-2xl bg-green-600 px-4 py-4 text-center font-black uppercase shadow-xl flex items-center justify-center text-white"
        >
          <FaWhatsapp className="text-xl" />
        </a>
      </div>
    </div>
  );
}