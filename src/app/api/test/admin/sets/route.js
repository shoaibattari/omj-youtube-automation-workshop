import { NextResponse } from "next/server";
import { verifyAdminAccessKey } from "@/lib/exam/auth";
import { getExamSets, addExamSet, toggleExamSet } from "@/lib/exam/storage";

function checkAuth(request) {
  const adminKey =
    request.headers.get("x-admin-key") ||
    new URL(request.url).searchParams.get("adminKey");
  return verifyAdminAccessKey(adminKey);
}

export async function GET(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const sets = await getExamSets();
  return NextResponse.json({ success: true, sets });
}

export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const { code, nicheName, isActive } = body;
    const newSet = await addExamSet({ code, nicheName, isActive });
    return NextResponse.json({ success: true, set: newSet });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PATCH(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const { setId, isActive } = body;
    const updated = await toggleExamSet(setId, isActive);
    return NextResponse.json({ success: true, set: updated });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

