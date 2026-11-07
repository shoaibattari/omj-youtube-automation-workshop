import { NextResponse } from "next/server";
import { verifyAdminAccessKey } from "@/lib/exam/auth";
import {
  getExamTopics,
  addExamTopic,
  bulkImportTopics,
  updateExamTopic,
} from "@/lib/exam/storage";

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
  const { searchParams } = new URL(request.url);
  const setId = searchParams.get("setId");

  let topics = await getExamTopics();
  if (setId) {
    topics = topics.filter((t) => t.setId === setId);
  }
  return NextResponse.json({ success: true, topics });
}

export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const { setId, title, bulkTopics, isActive } = body;

    if (bulkTopics && Array.isArray(bulkTopics)) {
      const created = await bulkImportTopics({ setId, topicsList: bulkTopics });
      return NextResponse.json({ success: true, count: created.length, topics: created });
    }

    const created = await addExamTopic({ setId, title, isActive });
    return NextResponse.json({ success: true, topic: created });
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
    const { topicId, title, isActive } = body;
    const updated = await updateExamTopic(topicId, { title, isActive });
    return NextResponse.json({ success: true, topic: updated });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

