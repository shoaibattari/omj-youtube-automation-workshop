import { NextResponse } from "next/server";
import { getAuthenticatedStudentFromToken } from "@/lib/exam/auth";
import { assignTopicToStudent } from "@/lib/exam/storage";

export async function POST(request) {
  try {
    const token = request.cookies.get("omj_exam_token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized. Please look up and confirm your identity first." },
        { status: 401 }
      );
    }

    const student = getAuthenticatedStudentFromToken(token);
    if (!student) {
      return NextResponse.json(
        { error: "Invalid or expired exam session. Please verify again." },
        { status: 401 }
      );
    }

    // Atomically assign topic (or return existing if already assigned)
    const assignment = await assignTopicToStudent(student);

    return NextResponse.json({
      success: true,
      assignment: {
        id: assignment.id,
        rollNumber: assignment.studentRollNumber,
        studentName: assignment.studentName,
        courseMode: assignment.studentMode,
        setCode: assignment.setCode,
        nicheName: assignment.nicheName,
        topicTitle: assignment.topicTitle,
        assignedAt: assignment.assignedAt,
      },
    });
  } catch (error) {
    console.error("[assign route error]", error);
    return NextResponse.json(
      { error: error.message || "Failed to assign assessment topic." },
      { status: 500 }
    );
  }
}

