import { NextResponse } from "next/server";
import { getAuthenticatedStudentFromToken } from "@/lib/exam/auth";
import { getStudentAssignment, assignTopicToStudent } from "@/lib/exam/storage";
import { generateTestPaperPdf } from "@/lib/exam/pdfGenerator";

export async function GET(request) {
  try {
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

    // Retrieve or create assignment
    let assignment = await getStudentAssignment(student.participantId);
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

    const { searchParams } = new URL(request.url);
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

