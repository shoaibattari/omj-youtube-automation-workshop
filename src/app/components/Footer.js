import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaGlobe,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCode,
  FaTiktok,
} from "react-icons/fa";
import { FaLinkedin, FaThreads } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_35%)]" />
      <div className="absolute -bottom-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-red-600/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-400/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl">
                  <img
                    src="/omj-logo.png"
                    alt="OMJ Logo"
                    className="h-12 w-12 object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-black uppercase leading-tight">
                    The Okhai
                    <span className="block text-red-500">Memon Jamat</span>
                  </h3>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.35em] text-white/40">
                    Social Welfare Committee
                  </p>
                </div>
              </div>

              <p className="mt-8 max-w-md text-sm leading-relaxed text-white/55">
                Empowering the community through practical digital skills,
                AI-powered learning, and professional growth opportunities.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="h-full rounded-[2rem] border border-red-500/30 bg-gradient-to-br from-red-600/20 to-white/5 p-8 backdrop-blur-xl">
              <p className="mb-4 inline-flex rounded-full bg-red-600 px-4 py-2 text-[10px] font-black uppercase tracking-widest">
                For Further Queries
              </p>

              <h4 className="text-3xl font-black leading-tight">
                Mr. Hussain A. Basit Markatiya
              </h4>

              <Link
                href="https://wa.me/923152477341"
                target="_blank"
                className="mt-6 flex items-center gap-4 rounded-2xl bg-green-500 px-6 py-4 text-lg font-black text-white transition hover:scale-[1.02] hover:bg-green-400"
              >
                <FaWhatsapp className="text-3xl" />
                0315-2477341
              </Link>

              <div className="mt-6 space-y-4 text-sm text-white/60">
                <div className="flex gap-3">
                  <FaMapMarkerAlt className="mt-1 text-red-500" />
                  <span>71 Banquet, Near University of Karachi</span>
                </div>

                <div className="flex gap-3">
                  <FaPhoneAlt className="mt-1 text-red-500" />
                  <span>Workshop Support & Registration Helpdesk</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="h-full rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h4 className="mb-6 text-xl font-black uppercase">Leadership</h4>

              <div className="space-y-6">
                <Leader name="Shahid Adam Kath" role="Chairman SWC" />

                <Leader
                  name="M. Arif Tayyab Suriya"
                  role="Hon. Gen. Secretary"
                />

                <Leader name="Shoaib Abdul Sattar Khosa" role="Event Lead" />
              </div>
            </div>
          </div>
        </div>

        <div className="my-6 rounded-[1.5rem] border border-red-500/20 bg-gradient-to-r from-red-600/10 via-black/20 to-red-600/5 p-5 backdrop-blur-xl">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            Designed & Developed By
          </p>

          <Link
            href="https://wa.me/923313416850"
            target="_blank"
            className="flex items-center gap-4"
          >
            <img
              src="/creatomation-logo.png"
              alt="Creatomation Studio"
              className="h-14 w-14 rounded-xl bg-white p-1 object-contain"
            />

            <div>
              <h3 className="text-xl font-black text-white">
                Creatomation Studio
              </h3>

              <p className="text-sm font-bold text-red-400">
                Shoaib Abdul Sattar Khosa
              </p>

              <p className="text-xs text-white/50">
                AI • Automation • Web Development • Digital Solutions
              </p>
            </div>
          </Link>
          <div className="mt-8 flex flex-wrap gap-3">
            <SocialIcon
              href="https://www.facebook.com/creatomationstudio"
              icon={<FaFacebook />}
            />
            <SocialIcon
              href="https://whatsapp.com/channel/0029VbD31FL5Ui2Tb7S1bK1J"
              icon={<FaWhatsapp />}
            />
            <SocialIcon
              href="https://www.instagram.com/creatomationstudio"
              icon={<FaInstagram />}
            />
            <SocialIcon
              href="https://www.tiktok.com/@creatomationstudio"
              icon={<FaTiktok />}
            />
            <SocialIcon
              href="https://www.threads.com/@creatomationstudio"
              icon={<FaThreads />}
            />
            <SocialIcon
              href="https://www.linkedin.com/company/creatomation-studio"
              icon={<FaLinkedin />}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white/70 transition hover:-translate-y-1 hover:border-red-500/40 hover:bg-red-600 hover:text-white"
    >
      {icon}
    </Link>
  );
}

function Leader({ name, role }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <h5 className="font-black text-white">{name}</h5>
      <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-red-400">
        {role}
      </p>
    </div>
  );
}
