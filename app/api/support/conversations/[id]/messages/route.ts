import { NextResponse } from "next/server";
import { addSupportReply } from "@/lib/support-store";
import { notifyVisitorOfReply } from "@/lib/support-notify";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function isAuthorized(request: Request) {
  const adminToken = process.env.SUPPORT_ADMIN_TOKEN;

  if (!adminToken) {
    return process.env.NODE_ENV !== "production";
  }

  return request.headers.get("authorization") === `Bearer ${adminToken}`;
}

export async function POST(request: Request, context: RouteContext) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as { text?: string };
  const text = body.text?.trim() || "";

  if (text.length < 2) {
    return NextResponse.json({ error: "Reply cannot be empty." }, { status: 400 });
  }

  try {
    const conversation = await addSupportReply(id, text);
    await notifyVisitorOfReply(conversation, text);
    return NextResponse.json({ conversation });
  } catch {
    return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
  }
}
