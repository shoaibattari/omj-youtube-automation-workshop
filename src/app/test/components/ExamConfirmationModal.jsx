"use client";

import { useState } from "react";
import {
  FaUserShield,
  FaCheckCircle,
  FaKey,
  FaWhatsapp,
  FaArrowLeft,
  FaLock,
  FaInfoCircle,
} from "react-icons/fa";

export default function ExamConfirmationModal({
  studentSummary,
  lookupTicket,
  onConfirmSuccess,
  onCancel,
}) {
  const [method, setMethod] = useState("credential"); // "credential" | "otp"
  const [credentialInput, setCredentialInput] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpHint, setOtpHint] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSendOtp = async () => {
    setSendingOtp(true);
    setError(null);
    try {
      const res = await fetch("/api/test/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lookupTicket }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to dispatch verification code.");
      }
      setOtpSent(true);
      if (data.testHint) {
        setOtpHint(data.testHint);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        lookupTicket,
        method,
        ...(method === "otp"
          ? { code: otpCode.trim() }
          : { credential: credentialInput.trim() }),
      };

      const res = await fetch("/api/test/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Identity confirmation failed.");
      }

      onConfirmSuccess(data.student);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Back button */}
      <button
        onClick={onCancel}
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-4 cursor-pointer font-semibold"
      >
        <FaArrowLeft /> Back to Search
      </button>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl shrink-0">
            <FaUserShield />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
              Confirm Student Identity
            </h2>
            <p className="text-xs text-slate-400">
              Personalized assessment protection. Complete identity confirmation to unlock your paper.
            </p>
          </div>
        </div>

        {/* Privacy-Minimized Student Recognition Card */}
        <div className="my-6 bg-slate-950 border border-slate-800/80 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Student Record Located
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Verified Enrolled
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-xs text-slate-500 block">Student Name</span>
              <span className="text-white font-bold">{studentSummary.displayName}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Official Roll Number</span>
              <span className="text-amber-300 font-mono font-bold">
                {studentSummary.rollNumber}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Course Mode</span>
              <span className="text-slate-300 font-medium">
                {studentSummary.mode}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Registered WhatsApp</span>
              <span className="text-slate-300 font-mono">
                {studentSummary.maskedPhone}
              </span>
            </div>
          </div>
        </div>

        {/* Verification Method Switcher */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => {
              setMethod("credential");
              setError(null);
            }}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              method === "credential"
                ? "bg-amber-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FaKey /> Registered Detail
          </button>
          <button
            type="button"
            onClick={() => {
              setMethod("otp");
              setError(null);
              if (!otpSent) handleSendOtp();
            }}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              method === "otp"
                ? "bg-amber-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FaWhatsapp /> One-Time Code (OTP)
          </button>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="bg-red-950/80 border border-red-500/60 text-red-200 text-xs p-3.5 rounded-xl mb-4">
            <p className="font-bold">Confirmation Error</p>
            <p className="mt-0.5">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleConfirm} className="space-y-4">
          {method === "credential" ? (
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Confirm Registered Contact or ID
              </label>
              <p className="text-xs text-slate-400 mb-2">
                Enter your complete registered WhatsApp number (e.g.{" "}
                <span className="text-amber-300 font-mono">03XXXXXXXXX</span>), registered Father&apos;s Name, or Roll Number.
              </p>
              <input
                type="text"
                autoComplete="off"
                placeholder="Enter Registered WhatsApp or Father's Name"
                value={credentialInput}
                onChange={(e) => setCredentialInput(e.target.value)}
                className="w-full bg-slate-950 border-2 border-slate-700 focus:border-amber-400 text-white rounded-xl px-4 py-3 text-base font-semibold outline-none transition-all"
                disabled={submitting}
              />
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  6-Digit OTP Code
                </label>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={sendingOtp || submitting}
                  className="text-xs text-amber-400 hover:text-amber-300 underline cursor-pointer disabled:opacity-50"
                >
                  {sendingOtp ? "Sending..." : "Resend Code"}
                </button>
              </div>
              <p className="text-xs text-slate-400 mb-2">
                Sent to your registered contact ({studentSummary.maskedPhone}). Valid for 10 minutes.
              </p>
              <input
                type="text"
                maxLength={6}
                autoComplete="one-time-code"
                placeholder="Enter 6-digit code (e.g. 123456)"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full bg-slate-950 border-2 border-slate-700 focus:border-amber-400 text-white rounded-xl px-4 py-3 text-center text-2xl font-mono font-bold tracking-widest outline-none transition-all"
                disabled={submitting}
              />

              {otpHint && (
                <div className="mt-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FaInfoCircle /> Test Verification Code:
                  </span>
                  <span className="font-mono font-bold tracking-widest bg-slate-950 px-2 py-0.5 rounded border border-amber-500/40">
                    {otpHint}
                  </span>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={
              submitting ||
              (method === "credential" && !credentialInput.trim()) ||
              (method === "otp" && otpCode.trim().length < 6)
            }
            className="w-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black py-3.5 px-6 rounded-xl uppercase tracking-wider shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {submitting ? (
              <>
                <span className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying Identity...</span>
              </>
            ) : (
              <>
                <FaCheckCircle />
                <span>Confirm & Proceed to Assessment</span>
              </>
            )}
          </button>
        </form>

        <p className="text-center text-[11px] text-slate-500 mt-4 flex items-center justify-center gap-1.5">
          <FaLock className="text-amber-500/70" />
          Tamper-Proof Session Cookie Protection
        </p>
      </div>
    </div>
  );
}

