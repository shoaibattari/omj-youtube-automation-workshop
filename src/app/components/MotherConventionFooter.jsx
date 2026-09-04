"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function MotherConventionFooter() {
  return (
    <footer className="w-full py-6 text-center">
      <div className="mx-auto max-w-md flex flex-col items-center gap-3">
        <div
          className="inline-flex items-center gap-2 rounded-full px-6 py-2"
          style={{
            background: "linear-gradient(135deg, #f0faf4, #e8f5ee)",
            border: "1px solid rgba(43, 158, 110, 0.15)",
          }}
        >
          <span className="text-[13px] text-slate-400">App Created by</span>
          <span className="text-[14px] font-black text-[#2B9E6E] uppercase tracking-wide">
            Shoaib Memon
          </span>
        </div>
        <p className="text-[13px] font-bold text-slate-500">
          Shoaib Abdul Sattar Khosa
        </p>
        <a
          href="https://wa.me/9203313416850"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-bold text-white transition hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, #25d366, #128c7e)",
            boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)",
          }}
        >
          <FaWhatsapp className="text-[16px]" />
          0331-3416850
        </a>
      </div>
    </footer>
  );
}
