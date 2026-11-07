import { NextResponse } from "next/server";
import { verifyAdminAccessKey } from "@/lib/exam/auth";
import { getAssignments } from "@/lib/exam/storage";

function escapeCsvField(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET(request) {
  try {
    const adminKey =
      request.headers.get("x-admin-key") ||
      new URL(request.url).searchParams.get("adminKey");

    if (!verifyAdminAccessKey(adminKey)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const assignments = await getAssignments();

    const headers = [
      "Roll Number",
      "Student Name",
      "Mode",
      "Set Code",
      "Niche",
      "Assigned Topic",
      "Assigned Date (UTC)",
    ];

    const rows = assignments.map((a) => [
      escapeCsvField(a.studentRollNumber),
      escapeCsvField(a.studentName),
      escapeCsvField(a.studentMode),
      escapeCsvField(a.setCode),
      escapeCsvField(a.nicheName),
      escapeCsvField(a.topicTitle),
      escapeCsvField(a.assignedAt),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="OMJ_Batch2_Exam_Assignments_${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error("[admin export error]", error);
    return NextResponse.json({ error: "Failed to export assignments." }, { status: 500 });
  }
}

