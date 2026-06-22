"use client";
import React, { useState } from "react";

// Clean and simple array of objects with IDs and exact roll numbers
const students = [
  { id: 1, name: "SHUMAMA MUHAMMAD HUSSAIN", roll: "0074" },
  { id: 2, name: "Sawera Haseeb", roll: "0004" },
  { id: 3, name: "Huzaifa A Ghani", roll: "0044" },
  { id: 4, name: "FAIZA SARFRAZ", roll: "0065" },
  { id: 5, name: "Ismail shahzad vayani", roll: "0017" },
  { id: 6, name: "Hafiz Muhammad Anas Ali", roll: "0069" },
  { id: 7, name: "Rashid Ali s/o Munawar Ali", roll: "0056" },
  { id: 8, name: "Binteashraf Jakhura", roll: "0009" },
  { id: 9, name: "NAVEED KARAR", roll: "0060" },
  { id: 10, name: "Abdul Basit S/O Abdul Aziz Jakhura", roll: "0029" },
  { id: 11, name: "Yousuf memon", roll: "0080" },
  { id: 12, name: "Saria D/O Sohail", roll: "0045" },
  { id: 13, name: "ABDUL SAMAD PANJWANI", roll: "0011" },
  {
    id: 14,
    name: "Abdul Rauf Toberiya S/O Abdul Razzak Toberiya",
    roll: "0052",
  },
  { id: 15, name: "QURATULAIN ZEESHAN KATH", roll: "0085" },
  { id: 16, name: "Wali Muhammad Abdul Aziz Jakhura", roll: "0054" },
  { id: 17, name: "MARIA M KHALID MAMDANI", roll: "0078" },
  { id: 18, name: "Babar Ali S/O Shoukat Ali", roll: "0102" },
  { id: 19, name: "Faheem Anmed s/o Akhlaq Ahmed Khan", roll: "0048" },
  { id: 20, name: "Ali Muhammad S/O Ghulam Hussain", roll: "0037" },
  { id: 21, name: "Sajjal Abdul Wahid", roll: "0055" },
  { id: 22, name: "Muzammil Abid", roll: "0063" },
  { id: 23, name: "Anshal ashraf jakhura", roll: "93" },
  { id: 24, name: "Iqra W/O Kamran Pasta", roll: "0032" },
  {
    id: 25,
    name: "Muhammad Hamza Khokhar S/O Muhammad Jameel Yousuf",
    roll: "0108",
  },
  { id: 26, name: "Sadia muzzamil jiwani", roll: "0002" },
  { id: 27, name: "Muhammad Faisal Sodagar", roll: "0016" },
  { id: 28, name: "Mehmood Vayani", roll: "0057" },
  { id: 29, name: "ABDULLAH WASEEM", roll: "0067" },
  { id: 30, name: "Muhammad Farhan khan", roll: "0098" },
  { id: 31, name: "Nimra lodhi", roll: "0021" },
  { id: 32, name: "Ahsan Raza Khan S/O Mohsin Raza Khan", roll: "0022" },
  { id: 33, name: "MUHAMMAD TAHIR", roll: "0071" },
  { id: 34, name: "SHAHZAD VAYANI", roll: "0026" },
  { id: 35, name: "Sumaira Faysal Barai", roll: "0014" },
  { id: 36, name: "Anayah Abdul karim", roll: "0019" },
  { id: 37, name: "M. BILAL BARAI", roll: "0062" },
  { id: 38, name: "Muhammad Yousuf Gaba", roll: "0105" },
  { id: 39, name: "Shama Zahid Kath", roll: "0103" },
  { id: 40, name: "Shibra Farooq Qasim", roll: "0005" },
  { id: 41, name: "Haleema Shahzad", roll: "0112" },
  { id: 42, name: "Atiya Faisal jakhura", roll: "0031" },
  { id: 43, name: "MUNIZA SHAFI", roll: "0097" },
  { id: 44, name: "Muhammad Yousuf S/O Muhammad Younus", roll: "0086" },
  { id: 45, name: "Mifrah UL Qulb Faisal", roll: "0034" },
  { id: 46, name: "Nida Yasin", roll: "0020" },
  { id: 47, name: "AAMIR SANGANI", roll: "015" },
  { id: 48, name: "Muhammad Akram", roll: "0041" },
  {
    id: 49,
    name: "LUBNA KHALID VAYANI W/O RAMEEZ ISMAIL GANATRA",
    roll: "0042",
  },
  { id: 50, name: "ABBAS AHMED", roll: "0089" },
  { id: 51, name: "Ferozpasta", roll: "Ferozpasta" },
  { id: 52, name: "AreebaMansoor", roll: "0096" },
  { id: 53, name: "Muhammad Altaf", roll: "0030" },
  { id: 54, name: "Faizan Ahmed", roll: "0024" },
];

export default function AdmitCardPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  // Yeh function starting zeros (e.g., "0044" -> "44") hata deta hai takay search mein asani ho
  const normalize = (val) => {
    return String(val).replace(/^0+/, "").toLowerCase();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setError(false);
    setResult(null);

    if (!input.trim()) return;

    // Dono roll numbers ke starting zeros hata kar match karte hain
    const found = students.find((s) => normalize(s.roll) === normalize(input));

    if (found) {
      setResult({
        ...found,
        image: `/YOUTUBEADMITCARD/${found.id}.jpg`,
      });
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Admit Card Portal
          </h1>
          <p className="text-gray-600 mt-2">Enter roll number to download</p>
        </div>

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. 44 or 0044"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Find
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center font-medium animate-pulse">
            No record found. Please check the roll number.
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 animate-in fade-in zoom-in duration-300">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {result.name}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Roll Number: {result.roll}
            </p>

            <img
              src={result.image}
              alt="Admit Card"
              className="w-full h-auto rounded-lg mb-6 border border-gray-200 object-cover"
            />

            <a
              href={result.image}
              download={`${result.name}_Admit_Card.jpg`}
              className="block w-full text-center bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
            >
              Download Admit Card
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
