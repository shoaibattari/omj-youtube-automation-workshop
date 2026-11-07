import { NextResponse } from "next/server";
import {
  findStudentInDatabase,
  checkRateLimit,
  createExamSessionToken,
} from "@/lib/exam/auth";
import { getStudentAssignment } from "@/lib/exam/storage";

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const rateCheck = checkRateLimit(`lookup:${ip}`, 30, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many lookup attempts. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { identifier } = body;

    if (!identifier || typeof identifier !== "string" || !identifier.trim()) {
      return NextResponse.json(
        { error: "Please enter your Roll Number or Registered WhatsApp Number." },
        { status: 400 }
      );
    }

    const student = findStudentInDatabase(identifier.trim());

    if (!student) {
      return NextResponse.json(
        { error: "Student not found. Please check your Roll Number or WhatsApp Number." },
        { status: 404 }
      );
    }

    // Check payment eligibility
    const status = String(student.status || "").toUpperCase();
    if (status !== "PAID") {
      return NextResponse.json(
        {
          error:
            "Your registration was found, but payment is marked as pending. Only enrolled and paid students are eligible for the final practical assessment.",
        },
        { status: 403 }
      );
    }

    const rollNumber = String(student.participantId || "").trim();
    const phone = String(student.whatsaapNumber || "").trim();
    const existingAssignment =
      (await getStudentAssignment(rollNumber)) ||
      (await getStudentAssignment(phone));

    // Direct frictionless authentication - no OTP required!
    const sessionToken = createExamSessionToken(student);

    const studentData = {
      fullName: student.fullName,
      participantId: rollNumber,
      rollNumber: rollNumber,
      mode: student.mode || "Hybrid",
      course: "Fundamentals of YouTube Automation — Batch 2",
    };

    const response = NextResponse.json({
      success: true,
      student: studentData,
      hasExistingAssignment: Boolean(existingAssignment),
      assignment: existingAssignment
        ? {
            id: existingAssignment.id,
            rollNumber: existingAssignment.studentRollNumber || rollNumber,
            studentName: existingAssignment.studentName || student.fullName,
            courseMode: existingAssignment.studentMode || student.mode || "Hybrid",
            setCode: existingAssignment.setCode,
            nicheName: existingAssignment.nicheName,
            topicTitle: existingAssignment.topicTitle,
            assignedAt: existingAssignment.assignedAt,
          }
        : null,
    });

    // Set secure HttpOnly session cookie
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
    console.error("[lookup route error]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during student lookup." },
      { status: 500 }
    );
  }
}
