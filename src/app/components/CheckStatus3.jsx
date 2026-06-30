"use client";

import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import {
  FaSearch,
  FaDownload,
  FaUpload,
  FaYoutube,
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
        backgroundColor: "#0f172a",
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
                href="https://forms.gle/LxQeXoz6CKPmcbmf6"
                target="_blank"
                className="rounded-2xl bg-green-600 px-4 py-2 text-center text-white uppercase shadow-lg shadow-red-600/30 hover:bg-red-500 transition"
              >
                Register Now — Rs. 200
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
                      OMJ-YT3-WS-{person.participantId}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {participant && (
          <div className="space-y-12">
            <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border-l-8 border-red-600">
              <div>
                <h2 className="text-xl font-black uppercase italic tracking-tight text-slate-800">
                  Welcome, {participant.fullName.split(" ")[0]}!
                </h2>

                <p className="text-slate-500 text-sm italic font-medium">
                  Step 1: Upload your photo to personalize your Pass & DP.
                </p>
              </div>

              <label className="bg-slate-900 text-white px-8 py-4 rounded-2xl cursor-pointer hover:bg-red-600 transition-all font-bold flex items-center gap-2 shadow-lg">
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
                  className="w-87.5 h-125 bg-slate-900 rounded-[2.5rem] relative overflow-hidden text-white shadow-2xl"
                >
                  <div className="absolute top-0 left-0 w-full h-12 bg-red-600 -skew-y-6 origin-top-left"></div>

                  <div className="relative z-10 pt-12 text-center px-6">
                    <p className="text-xl text-green-500 font-bold uppercase tracking-[0.2em] mb-4">
                      THE OKHAI MEMON JAMAT
                    </p>

                    <FaYoutube className="text-white text-3xl mx-auto mb-1" />

                    <h2 className="text-2xl font-black leading-tight uppercase">
                      OMJ YOUTUBE
                      <br />
                      AUTOMATION
                    </h2>

                    <p className="text-[20px] tracking-[0.3em] font-bold text-red-400 uppercase">
                      WORKSHOP 3.0
                    </p>

                    <div className="mt-1 w-24 h-24 mx-auto rounded-full border-4 border-white overflow-hidden bg-slate-800 shadow-xl">
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

                      <p className="text-red-500 font-bold text-xl tracking-widest">
                        OMJ-YT3-WS-{participant.participantId}
                      </p>

                      <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">
                        Event Entry Pass
                      </h3>
                    </div>
                  </div>
                  {participant?.youtube && (
                    <div className="mt-1 flex justify-center">
                      <span className="bg-white/10 backdrop-blur-md border border-white/20 text-yellow-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                        ⭐ Youtube Automation Batch-1
                      </span>
                    </div>
                  )}
                  {participant?.digitalMarketing && (
                    <div className="mt-1 flex justify-center">
                      <span className="bg-white/10 backdrop-blur-md border border-white/20 text-yellow-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                        ⭐ Digital Marketing Batch-2
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 w-full bg-white py-4 px-8 flex justify-between items-center text-slate-900">
                    <p className="text-[18px] text-green-600 font-black uppercase">
                      OMJ Social Welfare Committee
                    </p>

                    <div className="w-6 h-6 bg-red-600 rounded"></div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    downloadImage(cardRef, `${participant.fullName}-Pass.png`)
                  }
                  className="w-full max-w-87.5 bg-slate-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-600 shadow-xl transition-all"
                >
                  <FaDownload /> DOWNLOAD ENTRY PASS
                </button>
              </div>

              <div className="flex flex-col items-center gap-6">
                <div
                  ref={dpRef}
                  className="w-87.5 h-87.5 bg-slate-900 relative overflow-hidden flex items-center justify-center rounded-[3rem] shadow-2xl"
                >
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-600 rounded-full blur-3xl opacity-40"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600 rounded-full blur-3xl opacity-40"></div>

                  <div className="relative z-10 flex flex-col items-center">
                    <p className="text-[18px] text-green-500 font-extrabold uppercase tracking-[0.3em] mb-4">
                      THE OKHAI MEMON JAMAT
                    </p>

                    <div className="relative p-1 bg-linear-to-tr from-red-600 to-white rounded-full">
                      <div className="w-36 h-36 rounded-full border-[6px] border-slate-900 overflow-hidden">
                        <img
                          src={userImage || "/avatar.png"}
                          crossOrigin="anonymous"
                          className="w-full h-full object-cover"
                          alt="dp"
                        />
                      </div>

                      <FaYoutube className="absolute bottom-1 right-1 text-red-600 bg-white rounded-full p-1 text-3xl shadow-xl" />
                    </div>

                    <div className="mt-4 text-center">
                      <h4 className="text-2xl font-black text-white uppercase">
                        {participant.fullName}
                      </h4>

                      <p className="text-[16px] font-bold text-red-500 tracking-[0.1em] uppercase">
                        YouTube Automation WORKSHOP 3.0
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 w-full text-center px-4">
                    <p className="text-[14px] text-green-500 font-extrabold uppercase tracking-[0.2em]">
                      OMJ Social Welfare Committee
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    downloadImage(dpRef, `${participant.fullName}-DP.png`, true)
                  }
                  className="w-full max-w-87.5 bg-white border-2 border-slate-900 text-slate-900 font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 shadow-xl transition-all"
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
