"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { FaDownload, FaUpload, FaYoutube } from "react-icons/fa";
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
    if (!userImage) return toast.error("Please upload participant image");

    const toastId = toast.loading("Generating DP...");

    try {
      const dataUrl = await toPng(dpRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: "#0f172a",
        canvasWidth: 1000,
        canvasHeight: 1000,
      });

      const link = document.createElement("a");
      link.download = `${participantName}-Marketing-DP.png`;
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
            Create <span className="text-red-600"> DP</span>
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
            className="rounded-2xl border-2 border-slate-200 p-4 font-bold outline-none focus:border-red-500"
          />

          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 font-black text-white transition hover:bg-red-600">
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
            className="relative flex h-[350px] w-[350px] items-center justify-center overflow-hidden rounded-[3rem] bg-slate-900 shadow-2xl"
          >
            <div className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-red-600 opacity-40 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-red-600 opacity-40 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center px-5 text-center">
              <p className="mb-4 text-[18px] font-extrabold uppercase tracking-[0.25em] text-green-500">
                The Okhai Memon Jamat
              </p>

              <div className="relative rounded-full bg-gradient-to-tr from-red-600 to-white p-1">
                <div className="h-36 w-36 overflow-hidden rounded-full border-[6px] border-slate-900 bg-slate-800">
                  <img
                    src={userImage || "/avatar.png"}
                    alt="participant"
                    className="h-full w-full object-cover"
                  />
                </div>

                <FaYoutube className="absolute bottom-1 right-1 rounded-full bg-white p-1 text-3xl text-red-600 shadow-xl" />
              </div>

              <h2 className="mt-4 text-2xl font-black uppercase leading-tight text-white">
                {participantName || "Participant Name"}
              </h2>

              <p className="mt-1 text-[15px] font-bold uppercase tracking-[0.12em] text-red-500">
                YouTube Automation Workshop
              </p>
            </div>

            <p className="absolute bottom-4 w-full px-4 text-center text-[13px] font-extrabold uppercase tracking-[0.18em] text-green-500">
              OMJ Social Welfare Committee
            </p>
          </div>

          <button
            onClick={downloadDp}
            className="flex w-full max-w-[350px] items-center justify-center gap-2 rounded-2xl bg-red-600 py-4 font-black text-white shadow-xl transition hover:bg-slate-900"
          >
            <FaDownload />
            Download DP
          </button>
        </div>
      </div>
    </div>
  );
}
