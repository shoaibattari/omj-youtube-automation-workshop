"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { FaDownload, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";

export default function OpenDp() {
  const dpRef = useRef(null);
  const [participantName, setParticipantName] = useState("");
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
    // if (!userImage) return toast.error("Please upload participant image");

    const toastId = toast.loading("Generating DP...");

    try {
      const dataUrl = await toPng(dpRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: "#0a0a1a",
        canvasWidth: 1000,
        canvasHeight: 1000,
      });

      const link = document.createElement("a");
      link.download = `${participantName}-DP.png`;
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
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black uppercase text-slate-900">
            Create <span className="text-[#ff1493]"> DP</span>
          </h1>
          <p className="mt-2 font-medium text-slate-500">
            Enter participant name, upload photo, and download WhatsApp DP.
          </p>
        </div>

        <div className="mx-auto mb-10 grid max-w-2xl gap-4 rounded-3xl bg-white p-6 shadow-xl">
          <input
            type="text"
            placeholder="Participant Name"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            className="rounded-2xl border-2 border-slate-200 p-4 font-bold outline-none focus:border-[#ff1493]"
          />

          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#0d0d2b] px-6 py-4 font-black text-white transition hover:bg-[#ff1493]">
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

        <div className="flex flex-col items-center gap-6">
          <div
            ref={dpRef}
            className="relative flex flex-col h-[350px] w-[350px] items-center justify-center overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#1a1a3e] via-[#0d0d2b] to-[#0a0a1a] shadow-2xl"
          >
            <div className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-[#ff1493] opacity-30 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-[#ff69b4] opacity-25 blur-3xl" />
            <div className="absolute inset-0 m-auto h-60 w-60 rounded-full bg-[#ff1493] opacity-10 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center px-4 text-center">
              <p className="mb-1 text-xl font-bold uppercase tracking-[0.25em] text-[#ff69b4]">
                The Okhai Memon Jamat
              </p>

              <div className="mb-2 rounded-full bg-gradient-to-r from-[#ff1493] to-[#ff69b4] px-4 py-1 shadow-lg shadow-pink-500/30">
                <p className="text-[11px] font-black uppercase tracking-[0.15em] text-white">
                  I&apos;M ATTENDING
                </p>
              </div>

              <div className="relative rounded-full bg-gradient-to-tr from-[#ff1493] to-[#ff69b4] p-1.5 shadow-xl shadow-pink-500/30">
                <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-[#0d0d2b]">
                  <img
                    src={userImage || "/avatar.png"}
                    alt="participant"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-2 text-center">
                <h2 className="text-lg font-black uppercase tracking-tight text-white">
                  {participantName || "Participant Name"}
                </h2>

                <h3 className="mt-0.5 text-[15px] font-black uppercase leading-tight text-[#ff1493]">
                  HUNAR SE AMDANI TAK
                </h3>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white/90">
                  Turn Your Skills into a Successful Business
                </p>

                <div className="mt-1 flex items-center justify-center gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white/80">
                    5th Aug
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white/80">
                    4:00 PM
                  </span>
                </div>
              </div>
            </div>

            <p className="absolute bottom-3 w-full px-4 text-center text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#ff69b4]">
              OMJ Vocational Centre (Female)
            </p>
          </div>

          <button
            onClick={downloadDp}
            className="flex w-full max-w-[350px] items-center justify-center gap-2 rounded-2xl bg-[#ff1493] py-4 font-black text-white shadow-xl shadow-pink-500/30 transition hover:bg-[#e0117f]"
          >
            <FaDownload />
            Download DP
          </button>
        </div>
      </div>
    </div>
  );
}
