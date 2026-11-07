import fs from "fs";
import path from "path";
import { INITIAL_EXAM_SETS, INITIAL_EXAM_TOPICS } from "./initialTopicBank.js";
import { PRE_ASSIGNED_STUDENTS } from "../../app/data/exam-storage/preAssignedStudents.js";
import { workshopData } from "../../app/data/workshopData.js";
import { normalizePakistaniPhone } from "./auth.js";

// Storage directory determination
function getStorageDir() {
  if (process.env.EXAM_DATA_DIR) {
    return path.resolve(process.env.EXAM_DATA_DIR);
  }
  // If in production serverless without write access to src, use /tmp
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    const tmpDir = path.join("/tmp", "omj-exam-storage");
    try {
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }
      return tmpDir;
    } catch {
      // fallback
    }
  }
  const localDir = path.join(process.cwd(), "src", "app", "data", "exam-storage");
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    return localDir;
  } catch {
    return path.join("/tmp", "omj-exam-storage");
  }
}

// In-memory global store to ensure consistency across hot-reloads and concurrent requests
const GLOBAL_STORE_KEY = Symbol.for("omj.exam.store");
if (!global[GLOBAL_STORE_KEY]) {
  global[GLOBAL_STORE_KEY] = {
    sets: null,
    topics: null,
    assignments: null,
    lockPromise: Promise.resolve(),
  };
}
const memStore = global[GLOBAL_STORE_KEY];

// Mutex locking mechanism to prevent race conditions during concurrent assignments
async function withLock(fn) {
  let release;
  const nextLock = new Promise((resolve) => {
    release = resolve;
  });
  const currentLock = memStore.lockPromise;
  memStore.lockPromise = nextLock;

  try {
    await currentLock;
    return await fn();
  } finally {
    release();
  }
}

// Helper to safely read JSON from disk with fallback
function readJsonFile(fileName, defaultValue) {
  try {
    const dir = getStorageDir();
    const filePath = path.join(dir, fileName);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn(`[storage] Notice: could not read ${fileName}, using fallback:`, err.message);
  }
  return defaultValue;
}

// Helper to safely write JSON to disk
function writeJsonFile(fileName, data) {
  try {
    const dir = getStorageDir();
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn(`[storage] Notice: could not write ${fileName} to disk:`, err.message);
  }
}

// Initialize Sets
export async function getExamSets() {
  if (!memStore.sets) {
    const fromDisk = readJsonFile("sets.json", null);
    if (fromDisk && Array.isArray(fromDisk) && fromDisk.length > 0) {
      memStore.sets = fromDisk;
    } else {
      memStore.sets = [...INITIAL_EXAM_SETS];
      writeJsonFile("sets.json", memStore.sets);
    }
  }
  return [...memStore.sets];
}

// Initialize Topics
export async function getExamTopics() {
  if (!memStore.topics) {
    const fromDisk = readJsonFile("topics.json", null);
    if (fromDisk && Array.isArray(fromDisk) && fromDisk.length > 0) {
      memStore.topics = fromDisk;
    } else {
      memStore.topics = [...INITIAL_EXAM_TOPICS];
      writeJsonFile("topics.json", memStore.topics);
    }
  }
  return [...memStore.topics];
}

// Initialize Assignments
export async function getAssignments() {
  if (!memStore.assignments) {
    const fromDisk = readJsonFile("assignments.json", null);
    if (fromDisk && Array.isArray(fromDisk) && fromDisk.length > 0) {
      memStore.assignments = fromDisk;
    } else {
      // In production / Vercel serverless without writable disk, use pre-assigned batch dataset
      memStore.assignments = Array.isArray(PRE_ASSIGNED_STUDENTS) ? [...PRE_ASSIGNED_STUDENTS] : [];
      writeJsonFile("assignments.json", memStore.assignments);
    }
  }
  return [...memStore.assignments];
}

// Get an existing assignment for a student
export async function getStudentAssignment(identifier) {
  if (!identifier) return null;

  let roll = "";
  let phone = "";

  if (typeof identifier === "object") {
    roll = String(identifier.participantId || identifier.rollNumber || "").trim();
    phone = String(identifier.whatsaapNumber || identifier.phone || "").trim();
  } else {
    roll = String(identifier).trim();
    phone = String(identifier).trim();
  }

  const cleanPhone = normalizePakistaniPhone(phone);
  const assignments = await getAssignments();

  // 1. Search in current/disk assignments
  const found = assignments.find((a) => {
    const aRoll = String(a.studentRollNumber || a.studentId || "").trim();
    const aPhone = normalizePakistaniPhone(a.studentPhone || "");
    if (roll && aRoll.toLowerCase() === roll.toLowerCase()) return true;
    if (cleanPhone && aPhone && aPhone === cleanPhone) return true;
    return false;
  });
  if (found) return found;

  // 2. Fallback to pre-assigned dataset
  if (Array.isArray(PRE_ASSIGNED_STUDENTS)) {
    const pre = PRE_ASSIGNED_STUDENTS.find((a) => {
      const aRoll = String(a.studentRollNumber || a.studentId || "").trim();
      const aPhone = normalizePakistaniPhone(a.studentPhone || "");
      if (roll && aRoll.toLowerCase() === roll.toLowerCase()) return true;
      if (cleanPhone && aPhone && aPhone === cleanPhone) return true;
      return false;
    });
    if (pre) return pre;
  }
  return null;
}

/**
 * Assign a niche and topic to a student.
 * Guaranteed idempotent and thread-safe via mutex locking.
 * If student already generated/assigned once, ALWAYS returns that existing assignment.
 */
export async function assignTopicToStudent(student) {
  if (!student) {
    throw new Error("Invalid student data for topic assignment.");
  }

  const roll = String(student.participantId || student.rollNumber || "").trim();
  const phone = String(student.whatsaapNumber || student.phone || "").trim();
  const cleanPhone = normalizePakistaniPhone(phone);

  return await withLock(async () => {
    // 1. Double-check if already assigned in active assignments - NEVER RE-ASSIGN!
    const currentAssignments = await getAssignments();
    const existing = currentAssignments.find((a) => {
      const aRoll = String(a.studentRollNumber || a.studentId || "").trim();
      const aPhone = normalizePakistaniPhone(a.studentPhone || "");
      if (roll && aRoll.toLowerCase() === roll.toLowerCase()) return true;
      if (cleanPhone && aPhone && aPhone === cleanPhone) return true;
      return false;
    });

    if (existing) {
      // LAST/EXISTING ASSIGNMENT FOUND - RETURN DIRECTLY!
      return existing;
    }

    // 2. Check if student has a pre-assigned topic in the bundled dataset
    if (Array.isArray(PRE_ASSIGNED_STUDENTS)) {
      const pre = PRE_ASSIGNED_STUDENTS.find((a) => {
        const aRoll = String(a.studentRollNumber || a.studentId || "").trim();
        const aPhone = normalizePakistaniPhone(a.studentPhone || "");
        if (roll && aRoll.toLowerCase() === roll.toLowerCase()) return true;
        if (cleanPhone && aPhone && aPhone === cleanPhone) return true;
        return false;
      });

      if (pre) {
        const alreadyInMem = memStore.assignments.some(
          (m) => String(m.studentRollNumber || m.studentId).trim() === roll
        );
        if (!alreadyInMem) {
          memStore.assignments.push(pre);
          writeJsonFile("assignments.json", memStore.assignments);
        }
        return pre;
      }
    }

    // 3. Load sets and topics
    const sets = await getExamSets();
    const topics = await getExamTopics();

    // Active sets
    const activeSets = sets.filter((s) => s.isActive);
    if (activeSets.length === 0) {
      throw new Error("No active exam sets configured. Please contact the administrator.");
    }
    const activeSetIds = new Set(activeSets.map((s) => s.id));

    // Active topics under active sets
    const activeTopics = topics.filter((t) => t.isActive && activeSetIds.has(t.setId));
    if (activeTopics.length === 0) {
      throw new Error("No active topics available in active sets. Please contact the administrator.");
    }

    // 3. Count topic assignment frequency
    const usageCounts = {};
    activeTopics.forEach((t) => {
      usageCounts[t.id] = 0;
    });

    currentAssignments.forEach((a) => {
      if (usageCounts[a.topicId] !== undefined) {
        usageCounts[a.topicId] += 1;
      }
    });

    // 4. Find the minimum assignment count
    const minCount = Math.min(...activeTopics.map((t) => usageCounts[t.id]));

    // 5. Filter eligible topics that have minCount
    const eligibleTopics = activeTopics.filter((t) => usageCounts[t.id] === minCount);

    // 6. Randomly pick one topic from eligible pool
    const selectedTopic = eligibleTopics[Math.floor(Math.random() * eligibleTopics.length)];
    const parentSet = sets.find((s) => s.id === selectedTopic.setId) || {
      id: selectedTopic.setId,
      code: "A",
      nicheName: "General YouTube Automation",
    };

    // 7. Create permanent assignment record with immutable snapshot
    const assignmentRecord = {
      id: `asgn_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      studentId: roll,
      studentRollNumber: roll,
      studentName: student.fullName,
      studentMode: student.mode || "Hybrid",
      setId: parentSet.id,
      setCode: parentSet.code,
      nicheName: parentSet.nicheName,
      topicId: selectedTopic.id,
      topicTitle: selectedTopic.title,
      assignedAt: new Date().toISOString(),
    };

    memStore.assignments.push(assignmentRecord);
    writeJsonFile("assignments.json", memStore.assignments);

    return assignmentRecord;
  });
}

// Admin function: Add a new exam set (e.g. Set F, G, H...)
export async function addExamSet({ code, nicheName, isActive = true }) {
  if (!code || !nicheName) {
    throw new Error("Set Code and Niche Name are required.");
  }
  return await withLock(async () => {
    const sets = await getExamSets();
    const cleanCode = String(code).trim().toUpperCase();
    const existing = sets.find((s) => s.code.toUpperCase() === cleanCode);
    if (existing) {
      throw new Error(`Exam Set with code ${cleanCode} already exists.`);
    }

    const newSet = {
      id: `set-${cleanCode.toLowerCase()}`,
      code: cleanCode,
      nicheName: String(nicheName).trim(),
      isActive: Boolean(isActive),
      createdAt: new Date().toISOString(),
    };

    memStore.sets.push(newSet);
    writeJsonFile("sets.json", memStore.sets);
    return newSet;
  });
}

// Admin function: Toggle or update set
export async function toggleExamSet(setId, isActive) {
  return await withLock(async () => {
    const sets = await getExamSets();
    const target = sets.find((s) => s.id === setId);
    if (!target) throw new Error("Set not found.");
    target.isActive = Boolean(isActive);
    writeJsonFile("sets.json", memStore.sets);
    return target;
  });
}

// Admin function: Add a single topic to a set
export async function addExamTopic({ setId, title, isActive = true }) {
  if (!setId || !title) throw new Error("Set ID and Topic Title are required.");
  return await withLock(async () => {
    const sets = await getExamSets();
    const parent = sets.find((s) => s.id === setId);
    if (!parent) throw new Error("Parent set does not exist.");

    const topics = await getExamTopics();
    const newTopic = {
      id: `topic-${parent.code.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      setId: parent.id,
      title: String(title).trim(),
      isActive: Boolean(isActive),
      createdAt: new Date().toISOString(),
    };

    memStore.topics.push(newTopic);
    writeJsonFile("topics.json", memStore.topics);
    return newTopic;
  });
}

// Admin function: Bulk import topics for a set
export async function bulkImportTopics({ setId, topicsList }) {
  if (!setId || !Array.isArray(topicsList) || topicsList.length === 0) {
    throw new Error("Valid Set ID and array of topic titles are required.");
  }
  return await withLock(async () => {
    const sets = await getExamSets();
    const parent = sets.find((s) => s.id === setId);
    if (!parent) throw new Error("Parent set does not exist.");

    const topics = await getExamTopics();
    const created = [];

    topicsList.forEach((rawTitle, i) => {
      const cleanTitle = String(rawTitle).trim();
      if (cleanTitle) {
        const item = {
          id: `topic-${parent.code.toLowerCase()}-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 5)}`,
          setId: parent.id,
          title: cleanTitle,
          isActive: true,
          createdAt: new Date().toISOString(),
        };
        topics.push(item);
        created.push(item);
      }
    });

    memStore.topics = topics;
    writeJsonFile("topics.json", memStore.topics);
    return created;
  });
}

// Admin function: Toggle topic status
export async function toggleExamTopic(topicId, isActive) {
  return await withLock(async () => {
    const topics = await getExamTopics();
    const target = topics.find((t) => t.id === topicId);
    if (!target) throw new Error("Topic not found.");
    target.isActive = Boolean(isActive);
    writeJsonFile("topics.json", memStore.topics);
    return target;
  });
}

// Admin function: Update topic title
export async function updateExamTopic(topicId, { title, isActive }) {
  return await withLock(async () => {
    const topics = await getExamTopics();
    const target = topics.find((t) => t.id === topicId);
    if (!target) throw new Error("Topic not found.");
    if (title !== undefined) target.title = String(title).trim();
    if (isActive !== undefined) target.isActive = Boolean(isActive);
    writeJsonFile("topics.json", memStore.topics);
    return target;
  });
}

// Admin statistics
export async function getExamDashboardStats() {
  const sets = await getExamSets();
  const topics = await getExamTopics();
  const assignments = await getAssignments();

  // Total eligible students from workshopData (status PAID)
  const paidStudents = workshopData.filter(
    (s) => String(s.status).toLowerCase() === "paid"
  );
  const totalStudents = paidStudents.length;

  const activeSets = sets.filter((s) => s.isActive);
  const activeSetIds = new Set(activeSets.map((s) => s.id));
  const activeTopics = topics.filter((t) => t.isActive && activeSetIds.has(t.setId));

  // Count assigned topics
  const assignedTopicIds = new Set(assignments.map((a) => a.topicId));
  const assignedTopicsCount = assignedTopicIds.size;
  const remainingUniqueTopics = Math.max(0, activeTopics.length - assignedTopicsCount);

  // Group topics by set for quick overview
  const setsOverview = sets.map((s) => {
    const setTopics = topics.filter((t) => t.setId === s.id);
    const setAssignments = assignments.filter((a) => a.setId === s.id);
    return {
      id: s.id,
      code: s.code,
      nicheName: s.nicheName,
      isActive: s.isActive,
      totalTopics: setTopics.length,
      activeTopics: setTopics.filter((t) => t.isActive).length,
      totalAssigned: setAssignments.length,
    };
  });

  return {
    totalStudents,
    rawTotalStudentsInDb: workshopData.length,
    totalSets: sets.length,
    activeSetsCount: activeSets.length,
    totalTopics: topics.length,
    activeTopicsCount: activeTopics.length,
    assignedStudentsCount: assignments.length,
    assignedUniqueTopicsCount: assignedTopicsCount,
    remainingUniqueTopics,
    setsOverview,
    recentAssignments: assignments.slice(-20).reverse(),
  };
}
