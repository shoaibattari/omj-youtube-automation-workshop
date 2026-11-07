"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExamLookupForm from "./components/ExamLookupForm";
import ExamGeneratorAnimation from "./components/ExamGeneratorAnimation";
import ExamPaperPreview from "./components/ExamPaperPreview";
import ExamAdminDashboard from "./components/ExamAdminDashboard";
import { FaCog } from "react-icons/fa";

export default function ExamTestPage() {
  // Views: "lookup" | "generating" | "ready"
  const [viewState, setViewState] = useState("lookup");

  // State data
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [authenticatedStudent, setAuthenticatedStudent] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  // Check if there is an active authenticated session on mount
  const checkExistingSession = useCallback(async () => {
    try {
      const res = await fetch("/api/test/assignment");
      const data = await res.json();
      if (data.authenticated && data.student) {
        setAuthenticatedStudent(data.student);
        if (data.assignment) {
          setAssignment(data.assignment);
          setViewState("ready");
        }
      }
    } catch {
      // Ignore initial session check error
    }
  }, []);

  useEffect(() => {
    checkExistingSession();
  }, [checkExistingSession]);

  // Handle student lookup - instant direct authentication (No OTP required)
  const handleLookup = async (identifier) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/test/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Student not found.");
      }

      setAuthenticatedStudent(data.student);
      setViewState("generating");
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle completion of generator animation
  const handleGenerationComplete = (newAssignment) => {
    setAssignment(newAssignment);
    setViewState("ready");
  };

  // Handle reset / verify another student
  const handleReset = async () => {
    try {
      await fetch("/api/test/logout", { method: "POST" });
    } catch {
      // ignore
    }
    setViewState("lookup");
    setAuthenticatedStudent(null);
    setAssignment(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-16 px-4 md:px-8 relative overflow-hidden flex flex-col justify-center">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-[400px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full">
          {viewState === "lookup" && (
            <ExamLookupForm
              onLookupSuccess={handleLookup}
              loading={loading}
              errorMessage={errorMessage}
              onClearError={() => setErrorMessage(null)}
            />
          )}

          {viewState === "generating" && (
            <ExamGeneratorAnimation
              onGenerationComplete={handleGenerationComplete}
              onError={(err) => {
                setErrorMessage(err);
                setViewState("lookup");
              }}
            />
          )}

          {viewState === "ready" && assignment && (
            <ExamPaperPreview
              student={authenticatedStudent}
              assignment={assignment}
              onReset={handleReset}
            />
          )}
        </div>

        {/* Administration portal trigger */}
        <div className="mt-12 text-center relative z-10">
          <button
            onClick={() => setShowAdmin(true)}
            className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-slate-400 font-semibold px-3 py-1.5 rounded-lg border border-slate-900 hover:border-slate-800 transition-colors cursor-pointer"
          >
            <FaCog className="text-[10px]" />
            <span>Admin Examination Portal</span>
          </button>
        </div>
      </main>

      {/* Admin Dashboard Modal */}
      {showAdmin && <ExamAdminDashboard onClose={() => setShowAdmin(false)} />}

      <Footer />
    </div>
  );
}
