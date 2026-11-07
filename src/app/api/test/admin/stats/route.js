import { NextResponse } from "next/server";
import { verifyAdminAccessKey } from "@/lib/exam/auth";
import { getExamDashboardStats } from "@/lib/exam/storage";

export async function GET(request) {
  try {
    const adminKey =
      request.headers.get("x-admin-key") ||
      new URL(request.url).searchParams.get("adminKey");

    if (!verifyAdminAccessKey(adminKey)) {
      return NextResponse.json({ error: "Unauthorized admin access." }, { status: 401 });
    }

    const stats = await getExamDashboardStats();
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("[admin stats error]", error);
    return NextResponse.json({ error: "Failed to load admin stats." }, { status: 500 });
  }
}

