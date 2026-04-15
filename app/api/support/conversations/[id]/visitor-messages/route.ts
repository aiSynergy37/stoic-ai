import { NextResponse } from "next/server";
import { addVisitorMessage, getConversationForVisitor } from "@/lib/support-store";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = (await request.json()) as { text?: string; visitorToken?: string };
  const text = body.text?.trim() || "";
  const visitorToken = body.visitorToken?.trim() || "";

  if (text.length < 2) {
    return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
  }

  if (!visitorToken) {
    return NextResponse.json({ error: "Missing visitor token." }, { status: 401 });
  }

  const conversation = await getConversationForVisitor(id, visitorToken);

  if (!conversation) {
    return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
  }

  try {
    const updatedConversation = await addVisitorMessage(id, text);
    return NextResponse.json({ conversation: updatedConversation });
  } catch {
    return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
  }
}
