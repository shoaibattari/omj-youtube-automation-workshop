"use client";
import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import {
  FaSearch,
  FaDownload,
  FaUpload,
  FaYoutube,
  FaWhatsapp,
  FaIdCard,
  FaUserCircle,
  FaUserCheck,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function StatusPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]); // List of multiple people
  const [participant, setParticipant] = useState(null); // The selected person
  const [loading, setLoading] = useState(false);
  const [userImage, setUserImage] = useState(null);

  const cardRef = useRef(null);
  const dpRef = useRef(null);

  // 1. Updated Search Logic for Multiple Results
  const handleSearch = async () => {
    if (!query) return toast.error("Please enter Phone or CNIC");
    setLoading(true);
    setParticipant(null); // Reset selection
    try {
      const res = await fetch(
        `https://ems-production-aff7.up.railway.app/participant/find?query=${query}`
      );
      const result = await res.json();
      if (result.status) {
        // Assume backend now returns an array in result.data
        const data = Array.isArray(result.data) ? result.data : [result.data];
        setResults(data);

        if (data.length === 1) {
          setParticipant(data[0]);
          toast.success("Registration Found!");
        } else {
          toast.info(`${data.length} registrations found on this number.`);
        }
      } else {
        setResults([]);
        setParticipant(null);
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Error fetching data from server");
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
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* SEARCH SECTION */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-4">
            CHECK <span className="text-red-600">STATUS</span>
          </h1>
          <div className="flex gap-2 p-2 bg-white rounded-3xl shadow-xl border border-slate-200">
            <input
              type="text"
              placeholder="Enter Phone or CNIC"
              className="flex-1 p-4 bg-transparent outline-none font-bold"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-red-600 text-white px-8 rounded-2xl font-black hover:bg-slate-900 transition-all"
            >
              {loading ? "..." : <FaSearch />}
            </button>
          </div>
        </div>

        {/* --- MULTIPLE RECORDS SELECTION --- */}
        {results.length > 1 && !participant && (
          <div className="max-w-2xl mx-auto mb-12 animate-in fade-in zoom-in duration-300">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border-t-8 border-red-600">
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
                      {person.city}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- MAIN GENERATOR CONTENT --- */}
        {participant && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-500">
            {/* PHOTO UPLOAD STEP */}
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
              {/* VERTICAL PASS */}
              <div className="flex flex-col items-center gap-6">
                <div
                  ref={cardRef}
                  className="w-[350px] h-[500px] bg-slate-900 rounded-[2.5rem] relative overflow-hidden text-white shadow-2xl"
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
                    <p className="text-[16px] tracking-[0.3em] font-bold text-red-400 uppercase">
                      Workshop 2026
                    </p>
                    <div className="mt-6 w-32 h-32 mx-auto rounded-full border-4 border-white overflow-hidden bg-slate-800 shadow-xl">
                      <img
                        src={userImage || "/avatar.png"}
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover"
                        alt="dp"
                      />
                    </div>
                    <div className="mt-3 space-y-1">
                      <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">
                        {participant.fullName}
                      </h3>
                      <p className="text-red-500 font-bold text-lg tracking-widest">
                        {participant.participantId || "PARTICIPANT"}
                      </p>
                    </div>
                  </div>
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
                  className="w-full max-w-[350px] bg-slate-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-600 shadow-xl transition-all"
                >
                  <FaDownload /> DOWNLOAD ENTRY PASS
                </button>
              </div>

              {/* SQUARE DP */}
              <div className="flex flex-col items-center gap-6">
                <div
                  ref={dpRef}
                  className="w-[350px] h-[350px] bg-slate-900 relative overflow-hidden flex items-center justify-center rounded-[3rem] shadow-2xl"
                >
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-600 rounded-full blur-3xl opacity-40"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600 rounded-full blur-3xl opacity-40"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <p className="text-[18px] text-green-500 font-extrabold uppercase tracking-[0.3em] mb-4">
                      THE OKHAI MEMON JAMAT
                    </p>
                    <div className="relative p-1 bg-gradient-to-tr from-red-600 to-white rounded-full">
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
                      <h4 className="text-xl font-black text-white uppercase">
                        {participant.fullName}
                      </h4>
                      <p className="text-[12px] font-bold text-red-500 tracking-[0.3em] uppercase">
                        YouTube Automation 2026
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-6 w-full text-center px-4">
                    <p className="text-[12px] text-green-500 font-extrabold uppercase tracking-[0.4em]">
                      OMJ Social Welfare Committee
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    downloadImage(dpRef, `${participant.fullName}-DP.png`, true)
                  }
                  className="w-full max-w-[350px] bg-white border-2 border-slate-900 text-slate-900 font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 shadow-xl transition-all"
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
