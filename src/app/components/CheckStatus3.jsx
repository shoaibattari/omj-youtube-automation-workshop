"use client";

import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import {
  FaSearch,
  FaDownload,
  FaUpload,
  FaLaptop,
  FaUserCheck,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { workshopData } from "../data/workshopData";

export default function StatusPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [searchStatus, setSearchStatus] = useState(null);

  const cardRef = useRef(null);
  const dpRef = useRef(null);

  const normalizePhone = (phone) => {
    if (!phone) return "";

    let cleaned = phone.toString().replace(/\D/g, "");

    if (cleaned.startsWith("92")) {
      cleaned = cleaned.slice(2);
    }

    if (cleaned.startsWith("0")) {
      cleaned = cleaned.slice(1);
    }

    return cleaned;
  };

  const handleSearch = () => {
    if (!query.trim()) {
      return toast.error("Please enter WhatsApp Number");
    }

    setLoading(true);
    setParticipant(null);
    setResults([]);
    setSearchStatus(null);

    try {
      const searchText = query.trim().toLowerCase();
      const normalizedSearch = normalizePhone(searchText);

      const matchedData = workshopData.filter((person) => {
        const personPhone = normalizePhone(person.whatsaapNumber);
        const participantId = person.participantId?.toLowerCase() || "";

        // Last 3 digits of Participant ID
        const last3Digits = participantId.slice(-3);

        return (
          personPhone === normalizedSearch || last3Digits === searchText // Exact phone number match // e.g. 255
        );
      });

      if (matchedData.length === 0) {
        setSearchStatus("notfound");
        toast.error("User Not Found!");
        return;
      }

      const paidData = matchedData.filter(
        (person) => person.status?.toLowerCase() === "paid"
      );

      const pendingData = matchedData.filter(
        (person) => person.status?.toLowerCase() === "pending"
      );

      const rejectedData = matchedData.filter(
        (person) => person.status?.toLowerCase() === "rejected"
      );

      if (paidData.length > 0) {
        setSearchStatus("paid");
        setResults(paidData);

        if (paidData.length === 1) {
          setParticipant(paidData[0]);
          toast.success("Paid Registration Found!");
        } else {
          toast.info(`${paidData.length} paid registrations found.`);
        }

        return;
      }

      if (pendingData.length > 0) {
        setSearchStatus("pending");
        toast.warning("Your registration is found but payment is pending.");
        return;
      }

      if (rejectedData.length > 0) {
        setSearchStatus("rejected");
        toast.error(
          "Registration rejected. Participants under 13 years of age are not allowed to attend the workshop."
        );
        return;
      }
    } catch (err) {
      toast.error("Error searching data");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setUserImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const downloadImage = async (ref, fileName, isSquare = false) => {
    if (!ref.current) return;

    const loadingToast = toast.loading("Generating high-quality image...");

    try {
      const options = {
        pixelRatio: 2,
        cacheBust: false,
        backgroundColor: "#0a0a1a",
        ...(isSquare && { canvasWidth: 1000, canvasHeight: 1000 }),
      };

      setTimeout(async () => {
        try {
          const dataUrl = await toPng(ref.current, options);

          const link = document.createElement("a");
          link.download = fileName;
          link.href = dataUrl;
          link.click();

          toast.update(loadingToast, {
            render: "Downloaded!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
        } catch (error) {
          toast.update(loadingToast, {
            render: "Download failed.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      }, 300);
    } catch (err) {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-4">
            CHECK <span className="text-red-600">STATUS</span>
          </h1>

          <div className="flex gap-2 p-2 bg-white rounded-3xl shadow-xl border border-slate-200">
            <input
              type="text"
              placeholder="Enter WhatsApp Number"
              className="flex-1 p-4 bg-transparent outline-none font-bold"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />

            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-red-600 text-white px-8 rounded-2xl font-black hover:bg-slate-900 transition-all"
            >
              {loading ? "..." : <FaSearch />}
            </button>
          </div>

          {searchStatus === "pending" && (
            <div className="bg-yellow-50 border-2 border-yellow-400 text-yellow-800 p-6 rounded-2xl mt-6 text-center shadow-md">
              <h3 className="font-black text-2xl">⏳ PAYMENT PENDING</h3>
              <p className="font-medium mt-2">
                Your registration is found, but your payment is still pending.
              </p>
              <p className="text-sm mt-1">
                Please complete your payment to receive your Entry Pass.
              </p>
            </div>
          )}

          {searchStatus === "notfound" && (
            <div className="bg-red-50 border-2 border-red-400 text-red-800 p-6 rounded-2xl mt-6 text-center shadow-md">
              <h3 className="font-black text-2xl">❌ USER NOT FOUND</h3>
              <p className="font-medium my-2">
                No registration found against this number, name, or ID.
              </p>

              <a
                href="https://forms.gle/BYpufBDAt7hQ58kg6"
                target="_blank"
                className="rounded-2xl bg-green-600 px-4 py-2 text-center text-white uppercase shadow-lg shadow-red-600/30 hover:bg-red-500 transition"
              >
                Register Now
              </a>
            </div>
          )}

          {searchStatus === "rejected" && (
            <div className="max-w-2xl mx-auto mt-8 rounded-3xl border-l-8 border-red-600 bg-red-50 p-8 shadow-lg">
              <h2 className="text-2xl font-black text-red-700 uppercase">
                Registration Rejected
              </h2>

              <p className="mt-3 text-slate-700 font-medium">
                We appreciate your interest.
                <br />
                Unfortunately, your registration has been rejected because the
                participant is <strong>under 13 years of age</strong>.
                <br />
                As per workshop policy, participants below 13 years are not
                permitted to attend.
              </p>
            </div>
          )}
        </div>

        {results.length > 1 && !participant && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white p-8 rounded-4xl shadow-xl border-t-8 border-red-600">
              <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase italic">
                Multiple Names Found!
              </h2>

              <p className="text-slate-500 mb-6 font-medium">
                Please select your name to continue:
              </p>

              <div className="grid gap-4">
                {results.map((person, idx) => (
                  <button
                    key={idx}
                    onClick={() => setParticipant(person)}
                    className="flex items-center justify-between p-5 bg-slate-50 hover:bg-red-50 border-2 border-slate-100 hover:border-red-200 rounded-2xl transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-3 rounded-full shadow-sm text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <FaUserCheck />
                      </div>

                      <span className="text-xl font-bold text-slate-700">
                        {person.fullName}
                      </span>
                    </div>

                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      OMJ-HSA-{person.participantId}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {participant && (
          <div className="space-y-12">
            <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border-l-8 border-[#ff1493]">
              <div>
                <h2 className="text-xl font-black uppercase italic tracking-tight text-slate-800">
                  Welcome, {participant.fullName.split(" ")[0]}!
                </h2>

                <p className="text-slate-500 text-sm italic font-medium">
                  Step 1: Upload your photo to personalize your Pass & DP.
                </p>
              </div>

              <label className="bg-[#0d0d2b] text-white px-8 py-4 rounded-2xl cursor-pointer hover:bg-[#ff1493] transition-all font-bold flex items-center gap-2 shadow-lg">
                <FaUpload /> {userImage ? "Update Photo" : "Upload Photo"}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="flex flex-col items-center gap-6">
                <div
                  ref={cardRef}
                  className="w-87.5 h-125 bg-gradient-to-b from-[#1a1a3e] via-[#0d0d2b] to-[#0a0a1a] rounded-[2.5rem] relative overflow-hidden text-white shadow-2xl"
                >
                  <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-r from-[#ff1493] to-[#ff69b4] -skew-y-6 origin-top-left"></div>

                  <div className="absolute top-20 right-0 w-32 h-32 bg-[#ff1493] rounded-full blur-3xl opacity-25"></div>
                  <div className="absolute bottom-24 left-0 w-32 h-32 bg-[#ff69b4] rounded-full blur-3xl opacity-15"></div>

                  <div className="relative z-10 pt-12 text-center px-6">
                    <p className="text-xl text-[#ff69b4] font-bold uppercase tracking-[0.2em] mb-2">
                      THE OKHAI MEMON JAMAT
                    </p>

                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/50 mb-1">
                      PRESENTS
                    </p>

                    <h2 className="text-3xl font-black leading-tight uppercase text-white">
                      HUNAR SE
                      <br />
                      AMDANI TAK
                    </h2>

                    <p className="text-[11px] tracking-[0.15em] font-bold uppercase mt-1 text-white/90">
                      Turn Your Skills into a Successful Business
                    </p>

                    <div className="mt-2 w-24 h-24 mx-auto rounded-full border-4 border-[#ff1493] overflow-hidden bg-[#0d0d2b] shadow-xl shadow-pink-500/30">
                      <img
                        src={userImage || "/avatar.png"}
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover"
                        alt="dp"
                      />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-2xl mt-1 font-black uppercase tracking-tighter leading-none">
                        {participant.fullName}
                      </h3>

                      <p className="text-[#ff1493] font-bold text-xl tracking-widest">
                        OMJ-HSA-{participant.participantId}
                      </p>

                      <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">
                        Event Entry Pass
                      </h3>
                    </div>
                  </div>
                  <div className="mt-1 flex justify-center">
                    <span className="bg-[#ff1493]/15 border border-[#ff1493]/30 text-[#ff69b4] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-pink-500/20">
                      ⭐ Special Workshop for Women
                    </span>
                  </div>

                  <div className="absolute bottom-0 w-full bg-gradient-to-r from-[#ff1493] to-[#ff69b4] py-4 px-6 flex justify-between items-center text-white">
                    <p className="text-[18px] font-black uppercase">
                      OMJ Vocational Centre (Female)
                    </p>

                    <div className="w-6 h-6 bg-[#0a0a1a] rounded"></div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    downloadImage(cardRef, `${participant.fullName}-Pass.png`)
                  }
                  className="w-full max-w-87.5 bg-[#ff1493] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#e0117f] shadow-xl shadow-pink-500/30 transition-all"
                >
                  <FaDownload /> DOWNLOAD ENTRY PASS
                </button>
              </div>

              <div className="flex flex-col items-center gap-6">
                <div
                  ref={dpRef}
                  className="w-87.5 h-87.5 bg-gradient-to-br from-[#1a1a3e] via-[#0d0d2b] to-[#0a0a1a] relative overflow-hidden flex flex-col items-center justify-center rounded-[3rem] shadow-2xl"
                >
                  <div className="absolute -top-10 -left-10 w-44 h-44 bg-[#ff1493] rounded-full blur-3xl opacity-30"></div>
                  <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-[#ff69b4] rounded-full blur-3xl opacity-25"></div>
                  <div className="absolute inset-0 m-auto w-60 h-60 bg-[#ff1493] rounded-full blur-3xl opacity-10"></div>

                  <div className="relative z-10 flex flex-col items-center px-4">
                    <p className="text-xl text-[#ff69b4] font-bold uppercase tracking-[0.25em] mb-1">
                      THE OKHAI MEMON JAMAT
                    </p>

                    <div className="bg-gradient-to-r from-[#ff1493] to-[#ff69b4] px-4 py-1 rounded-full mb-2 shadow-lg shadow-pink-500/30">
                      <p className="text-white text-[11px] font-black uppercase tracking-[0.15em]">
                        I&apos;M ATTENDING
                      </p>
                    </div>

                    <div className="relative p-1.5 bg-gradient-to-tr from-[#ff1493] to-[#ff69b4] rounded-full shadow-xl shadow-pink-500/30">
                      <div className="w-28 h-28 rounded-full border-4 border-[#0d0d2b] overflow-hidden">
                        <img
                          src={userImage || "/avatar.png"}
                          crossOrigin="anonymous"
                          className="w-full h-full object-cover"
                          alt="dp"
                        />
                      </div>
                    </div>

                    <div className="mt-2 text-center">
                      <h4 className="text-lg font-black text-white uppercase tracking-tight">
                        {participant.fullName}
                      </h4>

                      <h3 className="text-[15px] font-black text-[#ff1493] uppercase leading-tight mt-0.5">
                        HUNAR SE AMDANI TAK
                      </h3>

                      <p className="text-[10px] font-bold text-white/90 uppercase tracking-[0.15em] mt-1">
                        Turn Your Skills into a Successful Business
                      </p>

                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="bg-white/10 text-white/80 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
                          5th Aug
                        </span>
                        <span className="bg-white/10 text-white/80 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
                          4:00 PM
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-3 w-full text-center px-4">
                    <p className="text-[10px] text-[#ff69b4] font-extrabold uppercase tracking-[0.2em]">
                      OMJ Vocational Centre (Female)
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    downloadImage(dpRef, `${participant.fullName}-DP.png`, true)
                  }
                  className="w-full max-w-87.5 bg-white border-2 border-[#ff1493] text-[#ff1493] font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-pink-50 shadow-xl transition-all"
                >
                  <FaDownload /> DOWNLOAD WHATSAPP DP
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}