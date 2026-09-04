"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { FaDownload, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";

export default function MotherConventionDp() {
  const dpRef = useRef(null);
  const [participantName, setParticipantName] = useState("");
  const [designation, setDesignation] = useState("");
  const [userImage, setUserImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setUserImage(reader.result);
    reader.readAsDataURL(file);
  };

  const downloadDp = async () => {
    if (!participantName.trim())
      return toast.error("Please enter participant name");

    const toastId = toast.loading("Generating DP...");

    try {
      const dataUrl = await toPng(dpRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: "#ffffff",
        canvasWidth: 1000,
        canvasHeight: 1000,
      });

      const link = document.createElement("a");
      link.download = `${participantName}-MotherConvention-DP.png`;
      link.href = dataUrl;
      link.click();

      toast.update(toastId, {
        render: "DP Downloaded!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch {
      toast.update(toastId, {
        render: "Download failed",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-12 pt-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black uppercase text-slate-900">
            Create <span className="text-[#2B9E6E]">DP</span>
          </h1>
          <p className="mt-2 font-medium text-slate-500">
            Enter your name, designation (optional), upload photo &amp; download
            your Mother Convention DP.
          </p>
        </div>

        {/* Input Form */}
        <div className="mx-auto mb-10 grid max-w-2xl gap-4 rounded-3xl bg-white p-6 shadow-xl">
          <input
            type="text"
            placeholder="Participant Name"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            className="rounded-2xl border-2 border-slate-200 p-4 font-bold outline-none focus:border-[#2B9E6E] transition-colors"
          />

          {/* <input
            type="text"
            placeholder="Designation (Optional)"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="rounded-2xl border-2 border-slate-200 p-4 font-bold outline-none focus:border-[#2B9E6E] transition-colors"
          /> */}

          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#2B9E6E] px-6 py-4 font-black text-white transition hover:bg-[#1A7A52]">
            <FaUpload />
            {userImage ? "Update Image" : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* DP Preview & Download */}
        <div className="flex flex-col items-center gap-6">
          {/* DP Card — Light Theme like the poster */}
          <div
            ref={dpRef}
            className="relative flex flex-col h-[350px] w-[350px] items-center overflow-hidden shadow-2xl"
            style={{
              background:
                "linear-gradient(180deg, #ffffff 0%, #f5faf7 40%, #eef7f1 70%, #f0f9f4 100%)",
              borderRadius: "24px",
            }}
          >
            {/* ===== Green ribbon swoops (decorative) ===== */}
            {/* Top-left swooping ribbon */}
            <div
              className="absolute -top-20 -left-20 h-[180px] w-[180px] rounded-full opacity-[0.15]"
              style={{
                border: "40px solid #2B9E6E",
              }}
            />
            {/* Bottom-right swooping ribbon */}
            <div
              className="absolute -bottom-24 -right-24 h-[200px] w-[200px] rounded-full opacity-[0.12]"
              style={{
                border: "45px solid #2B9E6E",
              }}
            />
            {/* Small accent circle top-right */}
            <div
              className="absolute top-16 -right-6 h-[60px] w-[60px] rounded-full opacity-[0.1]"
              style={{
                border: "12px solid #4DB88A",
              }}
            />
            {/* Small leaf-like accent bottom-left */}
            <div
              className="absolute bottom-20 -left-4 h-[50px] w-[50px] rounded-full opacity-[0.08]"
              style={{
                border: "10px solid #4DB88A",
              }}
            />

            {/* ===== TOP HEADER: Urdu text + OMJ logo ===== */}
            <div className="relative z-10 w-full flex items-start justify-between px-4 pt-2">
              <img
                src="/omj-logo.png"
                alt="OMJ Logo"
                className="h-[38px] w-[52px] invisible object-contain"
              />
              {/* Left side: Urdu org name + Presents */}
              <div className="flex flex-col items-center">
                <p
                  className="text-[16px] font-extrabold text-[#2B9E6E] leading-snug"
                  style={{ direction: "rtl" }}
                >
                  THE OKHAI MEMON JAMAT                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#2B9E6E]/90">
                  Presents
                </p>
              </div>

              {/* Right side: OMJ Logo */}
              <img
                src="/omj-logo.png"
                alt="OMJ Logo"
                className="h-[38px] w-[52px] object-contain"
              />
            </div>

            {/* ===== MAIN CONTENT ===== */}
            <div className="relative z-10 flex flex-col items-center px-4 text-center w-full">
              {/* Mother Convention Logo */}
              <img
                src="/mother-convention-logo.png"
                alt="4th Mother's Convention 26"
                className="h-[65px] w-auto object-contain"
              />

              {/* I'M ATTENDING Badge */}
              <div
                className="mt-1 rounded-full px-5 py-1"
                style={{
                  background:
                    "linear-gradient(135deg, #2B9E6E 0%, #3DB87E 100%)",
                  boxShadow: "0 4px 15px rgba(43, 158, 110, 0.3)",
                }}
              >
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
                  I&apos;M ATTENDING
                </p>
              </div>

              {/* Profile Photo */}
              <div
                className="mt-2 relative rounded-full p-[3px]"
                style={{
                  background:
                    "linear-gradient(135deg, #2B9E6E 0%, #7DCFAA 50%, #2B9E6E 100%)",
                  boxShadow: "0 4px 20px rgba(43, 158, 110, 0.25)",
                }}
              >
                <div className="h-[95px] w-[95px] overflow-hidden rounded-full border-[3px] border-white bg-white flex items-center justify-center">
                  <img
                    src={userImage || "/omj-logo.png"}
                    alt="participant"
                    className={
                      userImage
                        ? "h-full w-full object-cover"
                        : "h-[75px] w-[75px] object-contain"
                    }
                  />
                </div>
              </div>

              {/* Name */}
              <h2 className="text-[19px] font-black uppercase tracking-wide text-[#1a3a2a] leading-tight">
                {participantName || "Participant Name"}
              </h2>

              {/* Designation (optional) */}
              {designation && (
                <p className="text-[12px] font-bold uppercase tracking-widest text-[#2B9E6E]">
                  {designation}
                </p>
              )}

              {/* Urdu Tagline */}
              <p
                className="text-[12px] font-bold text-[#2B9E6E]/80"
                style={{ direction: "rtl" }}
              >
                ماں کی آغوش سے علم کی دنیا تک
              </p>

              {/* FOMO Hook Badges */}
              <div className="mt-1.5 flex items-center gap-2.5">
                <span
                  className="rounded-full px-4 py-1 text-[11px] font-black uppercase tracking-wider text-white"
                  style={{
                    background: "linear-gradient(135deg, #d63031, #e74c3c)",
                    boxShadow: "0 3px 12px rgba(231, 76, 60, 0.35)",
                  }}
                >
                  🔥 Don&apos;t Miss It
                </span>
                <span
                  className="rounded-full px-4 py-1 text-[11px] font-black uppercase tracking-wider text-white"
                  style={{
                    background: "linear-gradient(135deg, #2B9E6E, #4DB88A)",
                    boxShadow: "0 3px 12px rgba(43, 158, 110, 0.35)",
                  }}
                >
                  ⚡ Limited Seats
                </span>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={downloadDp}
            className="flex w-full max-w-[350px] items-center justify-center gap-2 rounded-2xl py-4 font-black text-white shadow-xl transition hover:opacity-90 cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, #2B9E6E 0%, #1A7A52 100%)",
              boxShadow: "0 8px 25px rgba(43, 158, 110, 0.35)",
            }}
          >
            <FaDownload />
            Download DP
          </button>
        </div>
      </div>
    </div>
  );
}