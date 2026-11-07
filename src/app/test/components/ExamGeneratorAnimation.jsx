"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaCheckCircle,
  FaServer,
  FaLightbulb,
  FaPenNib,
  FaFilePdf,
  FaAward,
  FaShieldAlt,
  FaMagic,
} from "react-icons/fa";

const STEPS = [
  { id: 1, label: "Student Identity Verified", icon: FaShieldAlt },
  { id: 2, label: "Connecting to Examination System", icon: FaServer },
  { id: 3, label: "Selecting Your Niche", icon: FaLightbulb },
  { id: 4, label: "Assigning Your Topic", icon: FaPenNib },
  { id: 5, label: "Personalizing Your Test Paper", icon: FaMagic },
  { id: 6, label: "Preparing Your PDF", icon: FaFilePdf },
  { id: 7, label: "Your Test Paper Is Ready!", icon: FaAward },
];

export default function ExamGeneratorAnimation({ onGenerationComplete, onError }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(15);
  const [assignmentData, setAssignmentData] = useState(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, prefersReducedMotion ? 50 : ms));

    const executeWorkflow = async () => {
      try {
        // Step 1: Identity Verified
        setCurrentStep(1);
        setProgress(15);
        await delay(350);

        // Step 2: Connecting to Examination System
        setCurrentStep(2);
        setProgress(30);

        // Call assignment API concurrently
        const assignPromise = fetch("/api/test/assign", { method: "POST" })
          .then(async (res) => {
            const data = await res.json();
            if (!res.ok) {
              throw new Error(data.error || "Failed to assign assessment topic.");
            }
            return data.assignment;
          });

        await delay(350);

        // Step 3: Selecting Your Niche
        setCurrentStep(3);
        setProgress(48);
        await delay(400);

        // Step 4: Assigning Your Topic
        setCurrentStep(4);
        setProgress(65);
        const assignment = await assignPromise;
        setAssignmentData(assignment);
        await delay(400);

        // Step 5: Personalizing Your Test Paper
        setCurrentStep(5);
        setProgress(80);
        await delay(400);

        // Step 6: Preparing Your PDF
        setCurrentStep(6);
        setProgress(92);

        // Pre-fetch the PDF to ensure it's generated & cached
        try {
          await fetch("/api/test/paper");
        } catch {
          // ignore pre-fetch error, actual download route will handle
        }
        await delay(350);

        // Step 7: Completed!
        setCurrentStep(7);
        setProgress(100);
        await delay(300);

        onGenerationComplete(assignment);
      } catch (err) {
        console.error("[Generator workflow error]", err);
        onError(err.message || "Assessment preparation encountered an error.");
      }
    };

    executeWorkflow();
  }, [onGenerationComplete, onError]);

  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
        {/* Subtle decorative glowing background */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Pulse icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-red-600 to-amber-500 p-0.5 shadow-xl shadow-red-500/20 mb-6">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-amber-400 text-3xl">
            {currentStep === 7 ? (
              <FaCheckCircle className="text-emerald-400 animate-bounce" />
            ) : (
              <FaMagic className="animate-pulse" />
            )}
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
          Your Final Assessment Is Being Prepared
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Fundamentals of YouTube Automation — Batch 2
        </p>

        {/* Progress Bar */}
        <div className="mt-8 mb-6">
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
            <span className="uppercase tracking-widest text-amber-400">
              Exam Engine Active
            </span>
            <span className="font-mono text-white">{progress}%</span>
          </div>

          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-400 rounded-full transition-all duration-300 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Animated Sequence List */}
        <div className="space-y-2.5 text-left max-w-md mx-auto my-6">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isDone = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                  isCurrent
                    ? "bg-slate-800/90 border-amber-500/60 shadow-lg text-white font-bold"
                    : isDone
                    ? "bg-slate-950/60 border-slate-800/80 text-slate-300 font-medium"
                    : "bg-slate-950/30 border-slate-900 text-slate-600"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                    isDone
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : isCurrent
                      ? "bg-amber-500 text-slate-950 animate-pulse"
                      : "bg-slate-900 text-slate-600"
                  }`}
                >
                  {isDone ? <FaCheckCircle /> : <Icon />}
                </div>

                <span className="text-xs md:text-sm flex-1">{step.label}</span>

                {isCurrent && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </div>
            );
          })}
        </div>

        {assignmentData && (
          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-slate-400 mt-4">
            <span className="text-amber-400 font-bold">Niche:</span>{" "}
            {assignmentData.nicheName}
          </div>
        )}
      </div>
    </div>
  );
}
