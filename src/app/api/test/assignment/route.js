import { NextResponse } from "next/server";
import { getAuthenticatedStudentFromToken } from "@/lib/exam/auth";
import { getStudentAssignment } from "@/lib/exam/storage";

export async function GET(request) {
  try {
    const token = request.cookies.get("omj_exam_token")?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const student = getAuthenticatedStudentFromToken(token);
    if (!student) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const assignment = await getStudentAssignment(student.participantId);

    return NextResponse.json({
      authenticated: true,
      student: {
        fullName: student.fullName,
        participantId: student.participantId,
        rollNumber: student.participantId,
        mode: student.mode || "Hybrid",
        course: "Fundamentals of YouTube Automation — Batch 2",
      },
      assignment: assignment
        ? {
            id: assignment.id,
            rollNumber: assignment.studentRollNumber,
            studentName: assignment.studentName,
            courseMode: assignment.studentMode,
            setCode: assignment.setCode,
            nicheName: assignment.nicheName,
            topicTitle: assignment.topicTitle,
            assignedAt: assignment.assignedAt,
          }
        : null,
    });
  } catch (error) {
    console.error("[assignment status route error]", error);
    return NextResponse.json(
      { error: "Failed to fetch assignment status." },
      { status: 500 }
    );
  }
}

