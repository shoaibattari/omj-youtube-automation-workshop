"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FaLock,
  FaPlus,
  FaFileExport,
  FaToggleOn,
  FaToggleOff,
  FaSync,
  FaCheck,
  FaTimes,
  FaList,
  FaLayerGroup,
  FaBookOpen,
} from "react-icons/fa";

export default function ExamAdminDashboard({ onClose }) {
  const [adminKey, setAdminKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  // Tab: "overview" | "sets" | "topics" | "assignments"
  const [activeTab, setActiveTab] = useState("overview");

  // New Set Form
  const [newSetCode, setNewSetCode] = useState("");
  const [newSetNiche, setNewSetNiche] = useState("");

  // New Topic Form
  const [selectedSetId, setSelectedSetId] = useState("");
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [bulkTopicsText, setBulkTopicsText] = useState("");
  const [isBulkMode, setIsBulkMode] = useState(false);

  // Topics list for management
  const [topicsList, setTopicsList] = useState([]);
  const [filterSetId, setFilterSetId] = useState("");

  const loadStats = useCallback(async (keyToUse) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/test/admin/stats?adminKey=${encodeURIComponent(keyToUse)}`, {
        headers: { "x-admin-key": keyToUse },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Authentication failed.");
      setStats(data.stats);
      setAuthenticated(true);
      if (data.stats.setsOverview.length > 0 && !selectedSetId) {
        setSelectedSetId(data.stats.setsOverview[0].id);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedSetId]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!adminKey.trim()) return;
    loadStats(adminKey.trim());
  };

  const handleCreateSet = async (e) => {
    e.preventDefault();
    if (!newSetCode || !newSetNiche) return;
    try {
      const res = await fetch("/api/test/admin/sets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          code: newSetCode.trim().toUpperCase(),
          nicheName: newSetNiche.trim(),
          isActive: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create set.");
      setNewSetCode("");
      setNewSetNiche("");
      loadStats(adminKey);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleSet = async (setId, currentStatus) => {
    try {
      const res = await fetch("/api/test/admin/sets", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ setId, isActive: !currentStatus }),
      });
      if (!res.ok) throw new Error("Failed to toggle set.");
      loadStats(adminKey);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddTopic = async (e) => {
    e.preventDefault();
    if (!selectedSetId) return;

    try {
      let bodyPayload;
      if (isBulkMode) {
        const rawLines = bulkTopicsText
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean);
        if (rawLines.length === 0) return;
        bodyPayload = { setId: selectedSetId, bulkTopics: rawLines };
      } else {
        if (!newTopicTitle.trim()) return;
        bodyPayload = { setId: selectedSetId, title: newTopicTitle.trim(), isActive: true };
      }

      const res = await fetch("/api/test/admin/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify(bodyPayload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add topic(s).");

      setNewTopicTitle("");
      setBulkTopicsText("");
      loadStats(adminKey);
      if (activeTab === "topics") loadTopicsForSet(filterSetId);
    } catch (err) {
      alert(err.message);
    }
  };

  const loadTopicsForSet = useCallback(async (setId) => {
    try {
      const url = setId
        ? `/api/test/admin/topics?setId=${encodeURIComponent(setId)}`
        : "/api/test/admin/topics";
      const res = await fetch(url, { headers: { "x-admin-key": adminKey } });
      const data = await res.json();
      if (res.ok) setTopicsList(data.topics || []);
    } catch (err) {
      console.error(err);
    }
  }, [adminKey]);

  useEffect(() => {
    if (authenticated && activeTab === "topics") {
      loadTopicsForSet(filterSetId);
    }
  }, [authenticated, activeTab, filterSetId, loadTopicsForSet]);

  const handleToggleTopic = async (topicId, currentStatus) => {
    try {
      const res = await fetch("/api/test/admin/topics", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ topicId, isActive: !currentStatus }),
      });
      if (!res.ok) throw new Error("Failed to toggle topic.");
      loadTopicsForSet(filterSetId);
      loadStats(adminKey);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-5xl rounded-3xl p-6 md:p-8 shadow-2xl my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FaLock />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                Exam Administration & Topic Bank
              </h2>
              <p className="text-xs text-slate-400">
                OMJ SWC YouTube Automation Batch 2 Final Assessment Control
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl border border-slate-800 hover:bg-slate-800 cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* Auth Screen */}
        {!authenticated ? (
          <form onSubmit={handleLogin} className="py-12 max-w-md mx-auto text-center w-full">
            <p className="text-sm text-slate-300 mb-6 font-medium">
              Enter Administrator Key to manage dynamic sets, topics, and view assignment logs.
            </p>
            <input
              type="password"
              placeholder="Enter Admin Passcode"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="w-full bg-slate-950 border-2 border-slate-700 focus:border-amber-400 text-white rounded-xl px-4 py-3 text-center text-lg font-mono mb-4 outline-none"
            />
            {error && <p className="text-xs text-red-400 mb-4">{error}</p>}
            <button
              type="submit"
              disabled={loading || !adminKey.trim()}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl uppercase tracking-wider cursor-pointer disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Unlock Dashboard"}
            </button>
          </form>
        ) : (
          <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-6">
            {/* Top Navigation Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-2 rounded-2xl border border-slate-800">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === "overview"
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <FaLayerGroup /> Stats Overview
                </button>
                <button
                  onClick={() => setActiveTab("sets")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === "sets"
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <FaBookOpen /> Sets & Niches
                </button>
                <button
                  onClick={() => setActiveTab("topics")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === "topics"
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <FaList /> Manage Topics
                </button>
                <button
                  onClick={() => setActiveTab("assignments")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === "assignments"
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <FaCheck /> Student Assignments
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`/api/test/admin/export?adminKey=${encodeURIComponent(adminKey)}`}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <FaFileExport /> Export CSV
                </a>
                <button
                  onClick={() => loadStats(adminKey)}
                  className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer"
                  title="Refresh"
                >
                  <FaSync className={loading ? "animate-spin" : ""} />
                </button>
              </div>
            </div>

            {/* TAB: OVERVIEW */}
            {activeTab === "overview" && stats && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 uppercase font-bold block">
                      Total Eligible Students
                    </span>
                    <span className="text-2xl font-black text-white mt-1 block">
                      {stats.totalStudents}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      PAID enrollment records
                    </span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 uppercase font-bold block">
                      Papers Generated
                    </span>
                    <span className="text-2xl font-black text-emerald-400 mt-1 block">
                      {stats.assignedStudentsCount}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Locked student assignments
                    </span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 uppercase font-bold block">
                      Total Topics
                    </span>
                    <span className="text-2xl font-black text-amber-300 mt-1 block">
                      {stats.totalTopics}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Across {stats.totalSets} Sets
                    </span>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 uppercase font-bold block">
                      Remaining Unique Topics
                    </span>
                    <span className="text-2xl font-black text-cyan-400 mt-1 block">
                      {stats.remainingUniqueTopics}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Unused in current cycle
                    </span>
                  </div>
                </div>

                {/* Sets Overview Grid */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                    Active Sets Breakdown
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {stats.setsOverview.map((s) => (
                      <div
                        key={s.id}
                        className={`p-3.5 rounded-xl border ${
                          s.isActive
                            ? "bg-slate-900 border-slate-800"
                            : "bg-slate-900/40 border-slate-800/50 opacity-60"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-black text-amber-400">
                            SET {s.code}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              s.isActive
                                ? "bg-emerald-500/20 text-emerald-300"
                                : "bg-red-500/20 text-red-300"
                            }`}
                          >
                            {s.isActive ? "ACTIVE" : "INACTIVE"}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-slate-200 truncate">
                          {s.nicheName}
                        </p>
                        <div className="mt-2 flex justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-1.5">
                          <span>Topics: {s.activeTopics}/{s.totalTopics}</span>
                          <span>Assigned: {s.totalAssigned}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SETS MANAGEMENT */}
            {activeTab === "sets" && stats && (
              <div className="space-y-6">
                {/* Add New Set */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                    <FaPlus className="text-amber-400" /> Add New Exam Set (e.g. Set F, G, H...)
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Newly added sets automatically enter the fair assignment pool for subsequent students.
                  </p>
                  <form onSubmit={handleCreateSet} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input
                      type="text"
                      placeholder="Set Code (e.g. F)"
                      maxLength={3}
                      value={newSetCode}
                      onChange={(e) => setNewSetCode(e.target.value.toUpperCase())}
                      className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm font-bold outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Niche Name (e.g. Health & Fitness)"
                      value={newSetNiche}
                      onChange={(e) => setNewSetNiche(e.target.value)}
                      className="md:col-span-2 bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm font-semibold outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!newSetCode || !newSetNiche}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2 rounded-xl text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
                    >
                      Create Set
                    </button>
                  </form>
                </div>

                {/* Existing Sets List */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                    Configured Exam Sets
                  </h3>
                  <div className="space-y-2">
                    {stats.setsOverview.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 font-black text-amber-400 flex items-center justify-center text-sm">
                            {s.code}
                          </span>
                          <div>
                            <span className="font-bold text-white text-sm">{s.nicheName}</span>
                            <span className="text-xs text-slate-400 block">
                              {s.totalTopics} topics ({s.totalAssigned} assigned)
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleToggleSet(s.id, s.isActive)}
                          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                            s.isActive
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : "bg-red-500/10 text-red-400 border-red-500/30"
                          }`}
                        >
                          {s.isActive ? <FaToggleOn className="text-base" /> : <FaToggleOff className="text-base" />}
                          {s.isActive ? "Active" : "Disabled"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: TOPICS MANAGEMENT */}
            {activeTab === "topics" && stats && (
              <div className="space-y-6">
                {/* Add Topic Form */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <FaPlus className="text-amber-400" /> Add Topics to Topic Bank
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsBulkMode(!isBulkMode)}
                      className="text-xs text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                    >
                      {isBulkMode ? "Switch to Single Topic" : "Switch to Bulk Import (Multi-line)"}
                    </button>
                  </div>

                  <form onSubmit={handleAddTopic} className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Target Exam Set</label>
                      <select
                        value={selectedSetId}
                        onChange={(e) => setSelectedSetId(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm font-bold outline-none"
                      >
                        {stats.setsOverview.map((s) => (
                          <option key={s.id} value={s.id}>
                            Set {s.code}: {s.nicheName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {isBulkMode ? (
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">
                          Paste Topics (One topic title per line)
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Topic Title 1&#10;Topic Title 2&#10;Topic Title 3..."
                          value={bulkTopicsText}
                          onChange={(e) => setBulkTopicsText(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 text-sm font-mono outline-none"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Topic Title</label>
                        <input
                          type="text"
                          placeholder="e.g. 5 Free AI Tools Every Student Should Know"
                          value={newTopicTitle}
                          onChange={(e) => setNewTopicTitle(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-sm font-semibold outline-none"
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={!selectedSetId || (isBulkMode ? !bulkTopicsText.trim() : !newTopicTitle.trim())}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
                    >
                      {isBulkMode ? "Bulk Import Topics" : "Add Topic"}
                    </button>
                  </form>
                </div>

                {/* Filter and Topic List */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Topics in Bank ({topicsList.length})
                    </h3>
                    <select
                      value={filterSetId}
                      onChange={(e) => setFilterSetId(e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs font-bold outline-none"
                    >
                      <option value="">All Sets</option>
                      {stats.setsOverview.map((s) => (
                        <option key={s.id} value={s.id}>
                          Set {s.code}: {s.nicheName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {topicsList.map((t, idx) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 font-mono w-6 text-right">
                            {idx + 1}.
                          </span>
                          <span className="font-semibold text-slate-200">{t.title}</span>
                        </div>
                        <button
                          onClick={() => handleToggleTopic(t.id, t.isActive)}
                          className={`px-2 py-1 rounded text-[10px] font-bold border cursor-pointer ${
                            t.isActive
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : "bg-red-500/10 text-red-400 border-red-500/30"
                          }`}
                        >
                          {t.isActive ? "Active" : "Disabled"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ASSIGNMENTS LOG */}
            {activeTab === "assignments" && stats && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Recent Locked Student Papers ({stats.assignedStudentsCount} total)
                  </h3>
                  <a
                    href={`/api/test/admin/export?adminKey=${encodeURIComponent(adminKey)}`}
                    className="text-xs text-amber-400 hover:text-amber-300 underline font-bold"
                  >
                    Download Full CSV
                  </a>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
                        <th className="py-2 px-3">Roll #</th>
                        <th className="py-2 px-3">Student Name</th>
                        <th className="py-2 px-3">Mode</th>
                        <th className="py-2 px-3">Set</th>
                        <th className="py-2 px-3">Assigned Topic</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900">
                      {stats.recentAssignments.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-6 text-center text-slate-500">
                            No assignments generated yet.
                          </td>
                        </tr>
                      ) : (
                        stats.recentAssignments.map((a) => (
                          <tr key={a.id} className="text-slate-300">
                            <td className="py-2.5 px-3 font-mono font-bold text-amber-400">
                              {a.studentRollNumber}
                            </td>
                            <td className="py-2.5 px-3 font-bold text-white">
                              {a.studentName}
                            </td>
                            <td className="py-2.5 px-3 text-slate-400">{a.studentMode}</td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300 font-bold">
                                Set {a.setCode}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-medium text-slate-200">
                              {a.topicTitle}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
