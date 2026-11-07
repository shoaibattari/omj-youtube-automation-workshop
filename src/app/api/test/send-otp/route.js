import { NextResponse } from "next/server";
import {
  verifyLookupTicket,
  generateOtpForStudent,
  checkRateLimit,
} from "@/lib/exam/auth";
import { workshopData } from "@/app/data/workshopData";

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const body = await request.json().catch(() => ({}));
    const { lookupTicket } = body;

    if (!lookupTicket) {
      return NextResponse.json(
        { error: "Missing or invalid lookup ticket." },
        { status: 400 }
      );
    }

    const participantId = verifyLookupTicket(lookupTicket);
    if (!participantId) {
      return NextResponse.json(
        { error: "Lookup session expired. Please search again." },
        { status: 401 }
      );
    }

    const rateCheck = checkRateLimit(`otp:${participantId}:${ip}`, 5, 120000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many OTP requests. Please wait 2 minutes." },
        { status: 429 }
      );
    }

    const student = workshopData.find(
      (s) => String(s.participantId).trim() === String(participantId).trim()
    );

    if (!student) {
      return NextResponse.json({ error: "Student not found." }, { status: 404 });
    }

    const { code, expiresAt } = generateOtpForStudent(
      student.participantId,
      student.whatsaapNumber
    );

    // If an external WhatsApp API or SMS gateway is configured:
    const whatsappApiUrl = process.env.WHATSAPP_API_URL;
    const whatsappToken = process.env.WHATSAPP_API_TOKEN;
    if (whatsappApiUrl && whatsappToken) {
      try {
        await fetch(whatsappApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${whatsappToken}`,
          },
          body: JSON.stringify({
            to: student.whatsaapNumber,
            message: `Your OMJ Examination One-Time Verification Code is: ${code}. Valid for 10 minutes.`,
          }),
        });
      } catch (smsErr) {
        console.error("[SMS Gateway Error]", smsErr.message);
      }
    }

    const responsePayload = {
      success: true,
      message: "Verification code generated and dispatched.",
      expiresAt,
    };

    // Include development hint for instant evaluation/testing when no paid gateway is active
    if (
      process.env.NODE_ENV !== "production" ||
      process.env.SHOW_TEST_OTP === "true" ||
      !process.env.WHATSAPP_API_TOKEN
    ) {
      responsePayload.testHint = code;
    }

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error("[send-otp route error]", error);
    return NextResponse.json(
      { error: "Failed to dispatch verification code." },
      { status: 500 }
    );
  }
}

