import type { SupportConversation } from "@/lib/support-store";

const defaultSupportEmail = "m.econyale@gmail.com";

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function notifySupportTeam(conversation: SupportConversation) {
  const webhookUrl = process.env.SUPPORT_WEBHOOK_URL;
  const resendApiKey = process.env.RESEND_API_KEY;
  const supportEmail = process.env.SUPPORT_NOTIFY_EMAIL || defaultSupportEmail;
  const fromEmail = process.env.SUPPORT_FROM_EMAIL || "STOICAI Support <onboarding@resend.dev>";

  const firstMessage = conversation.messages.find((message) => message.author === "visitor")?.text || "";

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "support_conversation_created",
          conversationId: conversation.id,
          createdAt: conversation.createdAt,
          lead: conversation.lead,
          message: firstMessage,
          metadata: conversation.metadata,
        }),
      });
    } catch {
      // Best-effort notification only.
    }
  }

  if (resendApiKey && supportEmail) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [supportEmail],
          subject: `New support conversation from ${conversation.lead.name}`,
          html: `
            <h2>New STOICAI support conversation</h2>
            <p><strong>Name:</strong> ${escapeHtml(conversation.lead.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(conversation.lead.email)}</p>
            <p><strong>Company:</strong> ${escapeHtml(conversation.lead.company || "Not provided")}</p>
            <p><strong>Page:</strong> ${escapeHtml(conversation.metadata.pagePath || "Unknown")}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(firstMessage).replace(/\n/g, "<br />")}</p>
          `,
        }),
      });
    } catch {
      // Best-effort notification only.
    }
  }
}

export async function notifyVisitorOfReply(conversation: SupportConversation, replyText: string) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.SUPPORT_FROM_EMAIL || "STOICAI Support <onboarding@resend.dev>";

  if (!resendApiKey) {
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [conversation.lead.email],
        subject: "Reply from the STOICAI team",
        html: `
          <h2>You have a new STOICAI reply</h2>
          <p>${escapeHtml(replyText).replace(/\n/g, "<br />")}</p>
          <p>You can continue the same thread from the site support widget.</p>
        `,
      }),
    });
  } catch {
    // Best-effort notification only.
  }
}
