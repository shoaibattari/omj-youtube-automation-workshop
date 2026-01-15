import Link from "next/link";
import { FaYoutube, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 border-t border-white/10">
      <div className="container mx-auto px-4 text-center">
        {/* Organization Info */}
        <div className="mb-8">
          <h3 className="text-xl font-black text-green-600 tracking-widest uppercase mb-2">
            The Okhai Memon Jamat
          </h3>
          <p className="text-slate-400 font-bold text-sm uppercase">
            Social Welfare Committee
          </p>
        </div>

        {/* Query Info from Flyer */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-md mx-auto mb-10">
          <p className="text-red-500 font-bold text-xs uppercase tracking-widest mb-1">
            For Queries Contact
          </p>
          <p className="text-lg font-bold">Mr. Moiz Hanif Mamdani</p>
          <Link
            href="https://wa.me/+923212752209"
            className="text-red-400 font-bold"
          >
            0321-2752209
          </Link>
        </div>

        <div className="text-slate-500 text-sm space-y-2 pt-8 border-t border-white/5">
          <p>© 2026 YouTube Automation Workshop. All rights reserved.</p>
          <p>
            App Created by{" "}
            <Link
              href="https://wa.me/+923313416850"
              className="text-red-500 hover:text-red-600 font-medium transition-colors"
            >
              Shoaib Abdul Sattar Khosa
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
