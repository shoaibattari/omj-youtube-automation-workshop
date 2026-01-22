"use client";
import { useState, useEffect } from "react";
import {
  FaYoutube,
  FaBars,
  FaTimes,
  FaIdCard,
  FaGraduationCap,
} from "react-icons/fa";
import {
  HiOutlineLocationMarker,
  HiOutlinePencilAlt,
  HiOutlineSearchCircle,
} from "react-icons/hi";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  return (
    <nav
      className={`fixed w-full z-100 transition-all duration-300 ${
        scrolled || isOpen ? "py-2 bg-white shadow-xl" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center relative z-110">
          {/* Logo - Updated with Poster Theme */}
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="bg-red-600 p-1.5 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
              <FaYoutube className="text-white text-xl" />
            </div>
            <div
              className={`text-sm md:text-xl font-black tracking-tighter transition-colors ${
                scrolled || isOpen
                  ? "text-slate-900"
                  : "text-white drop-shadow-md"
              }`}
            >
              OMJ{" "}
              <span className="text-red-600 uppercase">YouTube Automation</span>
            </div>
          </Link>

          {/* Desktop Nav - Content Updated per Poster */}
          <div className="hidden lg:flex space-x-8 items-center">
            <NavLink
              href="/registration"
              icon={<HiOutlinePencilAlt />}
              label="ADMISSION"
              scrolled={scrolled}
            />
            <NavLink
              href="https://maps.app.goo.gl/13eDSbC5hvYhka3u6"
              icon={<HiOutlineLocationMarker />}
              label="VENUE"
              scrolled={scrolled}
            />
            <NavLink
              href="/status"
              icon={<HiOutlineSearchCircle />}
              label="CHECK STATUS"
              scrolled={scrolled}
            />
            <Link
              href="/status"
              className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-black hover:bg-slate-900 transition-all flex items-center gap-2 shadow-lg hover:shadow-red-200 uppercase text-xs tracking-widest"
            >
              <FaIdCard /> Student Portal
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled || isOpen ? "text-slate-900" : "text-white"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>

        {/* Mobile Full-Screen Overlay */}
        <div
          className={`lg:hidden fixed inset-0 bg-white transition-all duration-500 ease-in-out ${
            isOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col h-full pt-28 pb-10 px-8">
            <div className="flex flex-col space-y-4">
              <MobileNavLink
                href="/registration"
                icon={<HiOutlinePencilAlt />}
                label="Course Admission"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/status"
                icon={<HiOutlineSearchCircle />}
                label="Application Status"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="https://maps.app.goo.gl/13eDSbC5hvYhka3u6"
                icon={<HiOutlineLocationMarker />}
                label="Campus Location"
                onClick={() => setIsOpen(false)}
              />
            </div>

            <div className="mt-auto space-y-4">
              <Link
                href="/status"
                className="flex items-center justify-center bg-red-600 text-white p-5 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-transform uppercase italic tracking-tighter"
                onClick={() => setIsOpen(false)}
              >
                <FaIdCard className="mr-3 text-2xl" /> Access Student ID
              </Link>
              <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                Okhai Memon Jamat • 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, icon, label, scrolled }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-1.5 font-black text-[11px] tracking-widest transition-all hover:text-red-500 uppercase ${
        scrolled ? "text-slate-700" : "text-red-600 drop-shadow-md"
      }`}
    >
      <span className="text-lg text-red-600">{icon}</span>
      {label}
    </Link>
  );
}

function MobileNavLink({ href, icon, label, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-5 p-5 text-slate-900 border-b border-slate-50 font-black text-xl active:bg-red-50 transition-colors uppercase italic tracking-tighter"
    >
      <span className="text-red-600 text-2xl">{icon}</span>
      {label}
    </Link>
  );
}
