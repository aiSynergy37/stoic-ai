import { NextResponse } from "next/server";
import { createConversation, listConversations } from "@/lib/support-store";
import { notifySupportTeam } from "@/lib/support-notify";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isAuthorized(request: Request) {
  const adminToken = process.env.SUPPORT_ADMIN_TOKEN;

  if (!adminToken) {
    return process.env.NODE_ENV !== "production";
  }

  return request.headers.get("authorization") === `Bearer ${adminToken}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conversations = await listConversations();
  return NextResponse.json({ conversations });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    company?: string;
    message?: string;
    pagePath?: string;
    referrer?: string;
  };

  const name = body.name?.trim() || "";
  const email = body.email?.trim() || "";
  const company = body.company?.trim() || "";
  const message = body.message?.trim() || "";

  if (name.length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid work email." }, { status: 400 });
  }

  if (message.length < 10) {
    return NextResponse.json({ error: "Please share a little more context so the team can respond properly." }, { status: 400 });
  }

  const conversation = await createConversation({
    lead: { name, email, company: company || undefined },
    message,
    metadata: {
      pagePath: body.pagePath?.trim() || undefined,
      referrer: body.referrer?.trim() || request.headers.get("referer") || undefined,
      userAgent: request.headers.get("user-agent") || undefined,
    },
  });

  await notifySupportTeam(conversation);

  return NextResponse.json({
    conversation: {
      id: conversation.id,
      visitorToken: conversation.visitorToken,
      lead: conversation.lead,
      createdAt: conversation.createdAt,
      messages: conversation.messages,
    },
  });
}
