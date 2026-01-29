"use client"; // Required for interactivity

import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";

export default function VideoModal({ isOpen, onClose, videoSrc }) {
  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative rounded-lg max-w-4xl w-full max-h-[80vh] bg-black">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white cursor-pointer transition-colors"
          aria-label="Close modal"
        >
          <FaTimes className="h-4 w-4 text-red-500" />
        </button>

        {/* Video content */}
        <div className="p-4 pt-12 flex flex-col items-center">
          <video
            src={videoSrc}
            controls
            muted
            autoPlay
            className="w-full h-auto max-h-[70vh] rounded-md"
          />
          <div className="p-4 flex justify-center gap-4 mt-4">
            <Link
              href="/registration"
              target="_blank"
              className="px-6 py-2 bg-red-500 rounded-md hover:bg-red-900/40 text-white transition-colors"
            >
              Register Now!
            </Link>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white rounded-md hover:bg-white/40 text-red-500 transition-colors"
            >
              Read Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
