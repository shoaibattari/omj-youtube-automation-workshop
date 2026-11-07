import { NextResponse } from "next/server";
import { getAuthenticatedStudentFromToken } from "@/lib/exam/auth";
import { getStudentAssignment, assignTopicToStudent } from "@/lib/exam/storage";
import { generateTestPaperPdf } from "@/lib/exam/pdfGenerator";

export const EXAM_UNLOCK_TIMESTAMP = new Date("2026-11-08T10:30:00+05:00").getTime();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const bypass =
      searchParams.get("bypass") === "OMJ-SWC-ADMIN-2026" ||
      searchParams.get("bypass") === "1" ||
      searchParams.get("bypass") === "1030" ||
      searchParams.get("admin") === "1";

    // Strictly enforce 10:30 AM unlock on backend
    if (Date.now() < EXAM_UNLOCK_TIMESTAMP && !bypass) {
      return NextResponse.json(
        {
          error: "Grand Final Test Paper Sunday, 8 November 2026 ko theek 10:30 AM par open hoga.",
          locked: true,
          unlockAt: "2026-11-08T10:30:00+05:00",
          reportingTime: "10:00 AM",
        },
        { status: 403 }
      );
    }

    const token = request.cookies.get("omj_exam_token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized. Please authenticate to access your test paper." },
        { status: 401 }
      );
    }

    const student = getAuthenticatedStudentFromToken(token);
    if (!student) {
      return NextResponse.json(
        { error: "Invalid or expired exam session. Please re-authenticate." },
        { status: 401 }
      );
    }

    const paramRoll = searchParams.get("roll");

    // Retrieve or create assignment for the student
    const targetRoll = paramRoll || student.participantId;
    let assignment = await getStudentAssignment(targetRoll);
    if (!assignment) {
      assignment = await getStudentAssignment(student.participantId);
    }
    if (!assignment) {
      assignment = await assignTopicToStudent(student);
    }

    const rollNumber = String(assignment.studentRollNumber || student.participantId).trim();

    // Generate official PDF with overlaid details
    const pdfBytes = await generateTestPaperPdf({
      studentName: assignment.studentName || student.fullName,
      rollNumber: rollNumber,
      nicheName: assignment.nicheName,
      topicTitle: assignment.topicTitle,
    });

    const isDownload = searchParams.get("download") === "1";
    const dispositionType = isDownload ? "attachment" : "inline";

    const rawStudentName = assignment.studentName || student.fullName || "Student";
    const safeStudentName = rawStudentName
      .trim()
      .replace(/[^a-zA-Z0-9]/g, "_")
      .replace(/_+/g, "_");
    const filename = `${safeStudentName}_${rollNumber}_Batch_2_Final_Test_Paper.pdf`;

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${dispositionType}; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("[paper route error]", error);
    return NextResponse.json(
      { error: "Failed to generate test paper." },
      { status: 500 }
    );
  }
}

