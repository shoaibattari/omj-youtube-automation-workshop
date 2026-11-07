import { NextResponse } from "next/server";
import { verifyAdminAccessKey } from "@/lib/exam/auth";
import { resetExamAssignments } from "@/lib/exam/storage";

function checkAuth(request) {
  const adminKey =
    request.headers.get("x-admin-key") ||
    new URL(request.url).searchParams.get("adminKey");
  return verifyAdminAccessKey(adminKey);
}

export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const result = await resetExamAssignments();
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

