"use client";
import { useState, useEffect } from "react";
import {
  FaYoutube,
  FaWhatsapp,
  FaBars,
  FaTimes,
  FaIdCard,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import {
  HiOutlineClipboardCheck,
  HiOutlineLocationMarker,
  HiOutlinePencilAlt,
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 ${
        scrolled || isOpen ? "py-2 bg-white shadow-xl" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center relative z-[110]">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-red-600 p-1.5 rounded-lg">
              <FaYoutube className="text-white text-xl" />
            </div>
            <div
              className={`text-sm md:text-xl font-black tracking-tighter ${
                scrolled || isOpen ? "text-green-700" : "text-green-700"
              }`}
            >
              OMJ{" "}
              <span className="text-red-600 uppercase">YouTube Automation</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-6 items-center">
            <NavLink
              href="/registration" // Points to the ID of your form section
              icon={<HiOutlinePencilAlt />}
              label="REGISTRATION"
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
              icon={<CgProfile />}
              label="CREATE DP"
              scrolled={scrolled}
            />
            <Link
              href="/status"
              className="bg-red-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-black transition-all flex items-center gap-2"
            >
              <FaIdCard /> ENTRY PASS
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`lg:hidden p-2 rounded-lg ${
              scrolled || isOpen ? "text-black" : "text-red-500"
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
            <div className="flex flex-col space-y-6">
              <MobileNavLink
                href="https://maps.app.goo.gl/13eDSbC5hvYhka3u6"
                icon={<HiOutlineLocationMarker />}
                label="Event Venue"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/registration"
                icon={<HiOutlineClipboardCheck />}
                label="Register Now"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/status"
                icon={<CgProfile />}
                label="Create Workshop DP"
                onClick={() => setIsOpen(false)}
              />
            </div>

            <div className="mt-auto space-y-4">
              <a
                href="/status"
                className="flex items-center justify-center bg-red-600 text-white p-5 rounded-2xl font-bold text-xl shadow-lg active:scale-95 transition-transform"
                onClick={() => setIsOpen(false)}
              >
                <FaIdCard className="mr-3 text-2xl" /> Download Entry Pass
              </a>
              <p className="text-center text-gray-400 text-sm font-medium">
                © 2026 Okhai Memon Jamat
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
    <a
      href={href}
      className={`flex items-center gap-1.5 font-bold text-sm hover:text-red-400 transition-colors ${
        scrolled ? "text-red-600" : "text-red-600"
      }`}
    >
      <span className="text-lg text-red-600">{icon}</span>
      {label}
    </a>
  );
}

function MobileNavLink({ href, icon, label, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex items-center gap-5 p-4 text-gray-900 border-b border-gray-100 font-bold text-2xl active:bg-red-500 transition-colors"
    >
      <span className="text-red-600 text-3xl">{icon}</span>
      {label}
    </a>
  );
}
