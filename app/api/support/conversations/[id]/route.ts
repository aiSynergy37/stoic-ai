import { NextResponse } from "next/server";
import { getConversationById, getConversationForVisitor } from "@/lib/support-store";

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

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const url = new URL(request.url);
  const visitorToken = url.searchParams.get("token");
  const viewer = url.searchParams.get("viewer");

  if (viewer === "visitor") {
    if (!visitorToken) {
      return NextResponse.json({ error: "Missing visitor token." }, { status: 401 });
    }

    const conversation = await getConversationForVisitor(id, visitorToken);

    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
    }

    return NextResponse.json({ conversation });
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conversation = await getConversationById(id);

  if (!conversation) {
    return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
  }

  return NextResponse.json({ conversation });
}
