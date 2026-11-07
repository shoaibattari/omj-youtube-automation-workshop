import crypto from "crypto";
import { workshopData } from "../../app/data/workshopData.js";

const SECRET = process.env.EXAM_SESSION_SECRET || "OMJ-SWC-YOUTUBE-BATCH-2-FINAL-ASSESSMENT-2026-KEY";
const ADMIN_KEY = process.env.EXAM_ADMIN_KEY || "OMJ-SWC-ADMIN-2026";

// Rate limiting in-memory storage
const rateLimitMap = new Map();

export function checkRateLimit(key, maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const record = rateLimitMap.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > record.resetAt) {
    record.count = 1;
    record.resetAt = now + windowMs;
    rateLimitMap.set(key, record);
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetInSeconds: Math.ceil((record.resetAt - now) / 1000) };
  }

  record.count += 1;
  rateLimitMap.set(key, record);
  return { allowed: true, remaining: maxRequests - record.count };
}

/**
 * Normalizes Pakistani phone numbers to 11-digit local format: 03XXXXXXXXX
 */
export function normalizePakistaniPhone(input) {
  if (!input) return "";
  let digits = String(input).replace(/\D/g, "");

  // If starts with 92 and has 12 digits: 923XXXXXXXXX -> 03XXXXXXXXX
  if (digits.startsWith("92") && digits.length === 12) {
    digits = "0" + digits.slice(2);
  }
  // If starts with 3 and has 10 digits: 3XXXXXXXXX -> 03XXXXXXXXX
  else if (digits.startsWith("3") && digits.length === 10) {
    digits = "0" + digits;
  }
  return digits;
}

/**
 * Masks a name for privacy (e.g. "Muhammad Ahmed" -> "Muhammad A****")
 */
export function maskName(fullName) {
  if (!fullName) return "";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    const first = parts[0];
    if (first.length <= 2) return first;
    return first.slice(0, 2) + "*".repeat(Math.min(5, first.length - 2));
  }
  return parts[0] + " " + parts.slice(1).map((p) => p[0] + "*".repeat(Math.max(2, p.length - 1))).join(" ");
}

/**
 * Masks a phone number (e.g. "03222750479" -> "0322 •••• 479")
 */
export function maskPhone(phone) {
  const norm = normalizePakistaniPhone(phone);
  if (norm.length >= 10) {
    return `${norm.slice(0, 4)} •••• ${norm.slice(-3)}`;
  }
  return "••••••••••";
}

/**
 * Masks an email (e.g. "student@gmail.com" -> "s•••••t@gmail.com")
 */
export function maskEmail(email) {
  if (!email || !email.includes("@")) return "•••••••@••••.com";
  const [local, domain] = email.split("@");
  if (local.length <= 2) {
    return `${local[0]}*@${domain}`;
  }
  return `${local[0]}${"•".repeat(Math.min(6, local.length - 2))}${local.slice(-1)}@${domain}`;
}

/**
 * Searches the canonical student dataset by Roll Number or Registered WhatsApp
 */
export function findStudentInDatabase(searchTerm) {
  if (!searchTerm) return null;
  const raw = String(searchTerm).trim();
  const normalizedPhone = normalizePakistaniPhone(raw);
  const cleanRoll = raw.replace(/^0+/, "");

  return (
    workshopData.find((student) => {
      const studentRoll = String(student.participantId || "").trim();
      const studentNormPhone = normalizePakistaniPhone(student.whatsaapNumber);

      // Match 1: Official Roll Number / participantId
      if (studentRoll.toLowerCase() === raw.toLowerCase() || studentRoll.toLowerCase() === cleanRoll.toLowerCase()) {
        return true;
      }

      // Match 2: Normalized Registered WhatsApp
      if (normalizedPhone && studentNormPhone && studentNormPhone === normalizedPhone) {
        return true;
      }

      return false;
    }) || null
  );
}

// In-memory OTP storage: participantId -> { code, expiresAt, attempts }
const otpStore = new Map();

/**
 * Generates and stores a 6-digit OTP for identity confirmation
 */
export function generateOtpForStudent(participantId, destinationPhone) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpStore.set(String(participantId), {
    code,
    expiresAt,
    attempts: 0,
    phone: destinationPhone,
  });

  // Log securely for examination administration
  console.log(`[EXAM OTP] Verification OTP generated for roll ${participantId}: ${code}`);

  return { code, expiresAt };
}

/**
 * Validates the student OTP
 */
export function verifyOtpForStudent(participantId, inputCode) {
  const record = otpStore.get(String(participantId));
  if (!record) {
    return { valid: false, message: "No OTP was requested or it has expired." };
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(String(participantId));
    return { valid: false, message: "OTP has expired. Please request a new code." };
  }

  record.attempts += 1;
  if (record.attempts > 5) {
    otpStore.delete(String(participantId));
    return { valid: false, message: "Too many invalid attempts. Please request a new OTP." };
  }

  if (record.code === String(inputCode).trim()) {
    otpStore.delete(String(participantId));
    return { valid: true };
  }

  return { valid: false, message: "Incorrect OTP code. Please try again." };
}

/**
 * Verifies private student credential:
 * - Registered WhatsApp number
 * - Official Roll Number
 * - Registered Father's Name
 * - Last 4 digits of CNIC
 */
export function verifyPrivateCredential(student, credentialInput) {
  if (!student || !credentialInput) return false;
  const input = String(credentialInput).trim().toLowerCase();

  // 1. Check normalized WhatsApp
  const normInputPhone = normalizePakistaniPhone(input);
  const studentNormPhone = normalizePakistaniPhone(student.whatsaapNumber);
  if (normInputPhone && studentNormPhone && normInputPhone === studentNormPhone) {
    return true;
  }

  // 2. Check Roll Number
  const studentRoll = String(student.participantId || "").trim().toLowerCase();
  if (studentRoll === input || studentRoll.replace(/^0+/, "") === input.replace(/^0+/, "")) {
    return true;
  }

  // 3. Check Father's Name
  if (student.fatherName && student.fatherName.trim().toLowerCase() === input) {
    return true;
  }

  // 4. Check CNIC (full or last 4 digits)
  if (student.cnic) {
    const cleanCnic = student.cnic.replace(/\D/g, "");
    const cleanInput = input.replace(/\D/g, "");
    if (cleanInput && (cleanCnic === cleanInput || cleanCnic.endsWith(cleanInput))) {
      return true;
    }
  }

  return false;
}

// HMAC Signing Helper
function signPayload(payload) {
  const data = JSON.stringify(payload);
  const b64Data = Buffer.from(data).toString("base64url");
  const signature = crypto.createHmac("sha256", SECRET).update(b64Data).digest("base64url");
  return `${b64Data}.${signature}`;
}

function verifySignedPayload(token) {
  if (!token || !token.includes(".")) return null;
  const [b64Data, signature] = token.split(".");
  const expectedSig = crypto.createHmac("sha256", SECRET).update(b64Data).digest("base64url");

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
    return null;
  }

  try {
    const json = Buffer.from(b64Data, "base64url").toString("utf-8");
    const payload = JSON.parse(json);
    if (payload.exp && Date.now() > payload.exp) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

/**
 * Creates a short-lived lookup ticket (15 mins) for the confirmation step
 */
export function createLookupTicket(participantId) {
  return signPayload({
    participantId: String(participantId),
    purpose: "exam_lookup_confirmation",
    exp: Date.now() + 15 * 60 * 1000,
  });
}

export function verifyLookupTicket(ticket) {
  const payload = verifySignedPayload(ticket);
  if (payload && payload.purpose === "exam_lookup_confirmation") {
    return payload.participantId;
  }
  return null;
}

/**
 * Issues an authenticated exam session token (24 hours)
 */
export function createExamSessionToken(student) {
  return signPayload({
    participantId: String(student.participantId),
    rollNumber: String(student.participantId),
    fullName: student.fullName,
    purpose: "exam_session",
    exp: Date.now() + 24 * 60 * 60 * 1000,
  });
}

/**
 * Verifies an exam session token and retrieves the canonical student record
 */
export function getAuthenticatedStudentFromToken(token) {
  const payload = verifySignedPayload(token);
  if (!payload || payload.purpose !== "exam_session") {
    return null;
  }

  const student = workshopData.find(
    (s) => String(s.participantId).trim() === String(payload.participantId).trim()
  );

  return student || null;
}

/**
 * Verifies admin passcode
 */
export function verifyAdminAccessKey(key) {
  if (!key) return false;
  return String(key).trim() === ADMIN_KEY;
}
