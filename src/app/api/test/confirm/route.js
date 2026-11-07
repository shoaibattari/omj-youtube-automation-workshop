import { NextResponse } from "next/server";
import {
  verifyLookupTicket,
  verifyOtpForStudent,
  verifyPrivateCredential,
  createExamSessionToken,
  checkRateLimit,
} from "@/lib/exam/auth";
import { workshopData } from "@/app/data/workshopData";

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const body = await request.json().catch(() => ({}));
    const { lookupTicket, method, code, credential } = body;

    if (!lookupTicket) {
      return NextResponse.json(
        { error: "Verification session ticket missing." },
        { status: 400 }
      );
    }

    const participantId = verifyLookupTicket(lookupTicket);
    if (!participantId) {
      return NextResponse.json(
        { error: "Lookup ticket expired. Please search again." },
        { status: 401 }
      );
    }

    const rateCheck = checkRateLimit(`confirm:${participantId}:${ip}`, 10, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many failed confirmation attempts. Please wait 1 minute." },
        { status: 429 }
      );
    }

    const student = workshopData.find(
      (s) => String(s.participantId).trim() === String(participantId).trim()
    );

    if (!student) {
      return NextResponse.json({ error: "Student not found." }, { status: 404 });
    }

    let isVerified = false;
    let failureReason = "Identity confirmation failed.";

    if (method === "otp") {
      if (!code) {
        return NextResponse.json(
          { error: "Please enter the 6-digit verification code." },
          { status: 400 }
        );
      }
      const otpRes = verifyOtpForStudent(participantId, code);
      if (otpRes.valid) {
        isVerified = true;
      } else {
        failureReason = otpRes.message || "Invalid or expired code.";
      }
    } else if (method === "credential") {
      if (!credential) {
        return NextResponse.json(
          { error: "Please provide the confirmation credential." },
          { status: 400 }
        );
      }
      if (verifyPrivateCredential(student, credential)) {
        isVerified = true;
      } else {
        failureReason =
          "The provided confirmation details did not match registered records.";
      }
    } else {
      return NextResponse.json(
        { error: "Invalid verification method." },
        { status: 400 }
      );
    }

    if (!isVerified) {
      return NextResponse.json({ error: failureReason }, { status: 401 });
    }

    // Identity verified! Issue authenticated session token
    const sessionToken = createExamSessionToken(student);

    const response = NextResponse.json({
      success: true,
      message: "Identity confirmed successfully.",
      student: {
        fullName: student.fullName,
        participantId: student.participantId,
        rollNumber: student.participantId,
        mode: student.mode || "Hybrid",
        course: "Fundamentals of YouTube Automation — Batch 2",
      },
    });

    // Set secure HttpOnly cookie
    response.cookies.set({
      name: "omj_exam_token",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error("[confirm route error]", error);
    return NextResponse.json(
      { error: "Identity confirmation error." },
      { status: 500 }
    );
  }
}

