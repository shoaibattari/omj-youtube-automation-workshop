import Link from "next/link";
import {
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaGlobe,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-20 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-red-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Organization Info */}
        <div className="mb-12">
          <div className="bg-white p-2 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-xl shadow-red-900/20">
            <img src="/omj-logo.png" alt="OMJ Logo" className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-2 italic">
            THE OKHAI <span className="text-red-600">MEMON</span> JAMAT
          </h3>
          <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.5em]">
            Social Welfare Committee
          </p>
        </div>

        {/* Contact Card from Poster */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 max-w-lg mx-auto mb-16 shadow-2xl group hover:border-red-600/30 transition-all duration-500">
          <p className="text-red-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
            For Further Queries
          </p>
          <h4 className="text-2xl font-black mb-1 tracking-tighter uppercase italic">
            Mr. Moiz Hanif Mamdani
          </h4>
          <Link
            href="https://wa.me/+923212752209"
            target="_blank"
            className="text-white hover:text-red-500 font-mono text-xl font-black transition-colors flex items-center justify-center gap-3 mt-4"
          >
            <FaWhatsapp className="text-green-500 text-2xl" /> 0321-2752209
          </Link>
        </div>

        {/* Leadership Reference */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-16 opacity-50 text-[10px] font-black uppercase tracking-[0.2em]">
          <p>
            Shahid Adam Kath{" "}
            <span className="text-red-600 block sm:inline sm:ml-2">
              Chairman SWC
            </span>
          </p>
          <p>
            M. Arif Tayyab Suriya{" "}
            <span className="text-red-600 block sm:inline sm:ml-2">
              Hon. Gen. Secretary
            </span>
          </p>
        </div>

        {/* Bottom Credits Section */}
        <div className="text-slate-600 text-[10px] space-y-4 pt-10 border-t border-white/5 font-bold uppercase tracking-widest">
          <div className="flex justify-center gap-6 mb-6">
            <Link href="#" className="hover:text-red-600 transition-colors">
              <FaFacebook size={20} />
            </Link>
            <Link href="#" className="hover:text-red-600 transition-colors">
              <FaInstagram size={20} />
            </Link>
            <Link href="#" className="hover:text-red-600 transition-colors">
              <FaGlobe size={20} />
            </Link>
          </div>
          <p>© 2026 YouTube Automation Fundamentals. All rights reserved.</p>
          <div className="bg-slate-900/50 inline-block px-6 py-2 rounded-full border border-slate-800/50">
            App Created by{" "}
            <Link
              href="https://wa.me/+923313416850"
              target="_blank"
              className="text-red-600 hover:text-white transition-all font-black"
            >
              Shoaib Abdul Sattar Khosa
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
