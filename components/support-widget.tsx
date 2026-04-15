"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  Loader2,
  MessageCircle,
  Paperclip,
  SendHorizonal,
  SmilePlus,
  X,
} from "lucide-react";

const starterReplies = [
  "Tell me about AI automation",
  "What kinds of systems do you build?",
  "I want to discuss a project",
];

const conversationStorageKey = "stoicai-support-conversation";

export function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [visitorToken, setVisitorToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<
    { id: string; author: "support" | "user"; text: string }[]
  >([
    {
      id: "welcome",
      author: "support",
      text: "Welcome to STOICAI. Share what you're trying to automate or improve, and we'll point you in the right direction.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const unreadCount = useMemo(() => (open ? 0 : 1), [open]);
  const showStarters = !conversationId && !messages.some((item) => item.author === "user");

  useEffect(() => {
    const savedConversation = window.localStorage.getItem(conversationStorageKey);

    if (!savedConversation) {
      return;
    }

    try {
      const parsed = JSON.parse(savedConversation) as { conversationId?: string; visitorToken?: string };
      if (parsed.conversationId && parsed.visitorToken) {
        setConversationId(parsed.conversationId);
        setVisitorToken(parsed.visitorToken);
      }
    } catch {
      window.localStorage.removeItem(conversationStorageKey);
    }
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!conversationId || !visitorToken) {
      return;
    }

    const syncConversation = async () => {
      try {
        const response = await fetch(
          `/api/support/conversations/${conversationId}?viewer=visitor&token=${encodeURIComponent(visitorToken)}`,
          { cache: "no-store" },
        );

        const data = (await response.json()) as {
          conversation?: {
            lead: { name: string; email: string; company?: string };
            messages: { id: string; author: "visitor" | "support"; text: string }[];
          };
        };

        if (!response.ok || !data.conversation) {
          return;
        }

        setName(data.conversation.lead.name);
        setEmail(data.conversation.lead.email);
        setCompany(data.conversation.lead.company || "");
        setMessages([
          {
            id: "welcome",
            author: "support",
            text: "Welcome to STOICAI. Share what you're trying to automate or improve, and we'll point you in the right direction.",
          },
          ...data.conversation.messages.map((item) => ({
            id: item.id,
            author: item.author === "visitor" ? "user" : "support",
            text: item.text,
          })),
        ]);
      } catch {
        // Best-effort sync only.
      }
    };

    void syncConversation();
    const interval = window.setInterval(syncConversation, 8000);

    return () => window.clearInterval(interval);
  }, [conversationId, visitorToken]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || submitting) return;

    setOpen(true);
    setShowIntro(false);
    setError("");
    setSubmitting(true);

    try {
      if (!conversationId) {
        const response = await fetch("/api/support/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            company,
            message: trimmed,
            pagePath: window.location.pathname,
            referrer: document.referrer || undefined,
          }),
        });

        const data = (await response.json()) as {
          error?: string;
          conversation?: { id: string; visitorToken: string };
        };

        if (!response.ok || !data.conversation) {
          throw new Error(data.error || "Unable to start the conversation.");
        }

        setConversationId(data.conversation.id);
        setVisitorToken(data.conversation.visitorToken);
        window.localStorage.setItem(
          conversationStorageKey,
          JSON.stringify({
            conversationId: data.conversation.id,
            visitorToken: data.conversation.visitorToken,
          }),
        );
        setMessages((current) => [
          ...current,
          { id: `user-${current.length}`, author: "user", text: trimmed },
          {
            id: `support-${current.length}`,
            author: "support",
            text: "Thanks. Your request is with the STOICAI team now. We will follow up after review, and any team replies will appear in this thread.",
          },
        ]);
      } else {
        const response = await fetch(`/api/support/conversations/${conversationId}/visitor-messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: trimmed, visitorToken }),
        });

        const data = (await response.json()) as { error?: string };

        if (!response.ok) {
          throw new Error(data.error || "Unable to send your message.");
        }

        setMessages((current) => [
          ...current,
          { id: `user-${current.length}`, author: "user", text: trimmed },
        ]);
      }

      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex items-end justify-end sm:bottom-6 sm:right-6">
      <div className="relative flex flex-col items-end gap-3">
        {!open && showIntro ? (
          <div className="relative max-w-[320px] rounded-[20px] border border-white/12 bg-[linear-gradient(165deg,rgba(12,18,34,0.97),rgba(8,13,27,0.94))] px-5 py-4 text-sm leading-7 text-slate-200 shadow-[0_24px_70px_rgba(2,7,20,0.46)] backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-2 pr-6">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.8)]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/75">Support Online</span>
            </div>
            <button
              type="button"
              onClick={() => setShowIntro(false)}
              className="absolute right-3 top-3 rounded-full border border-white/10 p-1 text-slate-400 transition-colors hover:text-white"
              aria-label="Dismiss support message"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <p className="pr-6">
              Need help planning an AI workflow or discussing a use case? Start a conversation and we'll point you in
              the right direction.
            </p>
            <div className="absolute bottom-[-8px] right-8 h-4 w-4 rotate-45 border-b border-r border-white/10 bg-[linear-gradient(165deg,rgba(10,16,30,0.96),rgba(8,13,27,0.92))]" />
          </div>
        ) : null}

        {open ? (
          <div className="w-[min(92vw,360px)] overflow-hidden rounded-2xl border border-white/12 bg-[linear-gradient(180deg,rgba(9,14,28,0.98),rgba(6,10,21,0.98))] shadow-[0_30px_90px_rgba(2,7,20,0.56)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-[linear-gradient(135deg,rgba(10,38,78,0.98),rgba(9,25,54,0.98))] px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-white">Customer Support</p>
                <p className="mt-1 text-xs text-cyan-100/75">{conversationId ? "Conversation active" : "Online now"}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/12 p-2 text-white/80 transition-colors hover:text-white"
                aria-label="Collapse support chat"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="support-scroll max-h-[420px] min-h-[420px] overflow-y-auto bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))] px-4 py-5"
            >
              <div className="space-y-4">
                {messages.map((item) => (
                  <div key={item.id} className={`flex ${item.author === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                        item.author === "user"
                          ? "bg-white text-[#07101f]"
                          : "bg-[linear-gradient(135deg,rgba(13,52,103,0.98),rgba(11,34,72,0.98))] text-white"
                      }`}
                    >
                      {item.text}
                    </div>
                  </div>
                ))}

                {!conversationId ? (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100/70">Start with context</p>
                    <div className="grid gap-3">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="rounded-xl border border-white/10 bg-[#0b1120] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-200/40 focus:outline-none"
                      />
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Work email"
                        className="rounded-xl border border-white/10 bg-[#0b1120] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-200/40 focus:outline-none"
                      />
                      <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Company or team"
                        className="rounded-xl border border-white/10 bg-[#0b1120] px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-200/40 focus:outline-none"
                      />
                    </div>
                  </div>
                ) : null}

                {showStarters ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {starterReplies.map((reply) => (
                      <button
                        key={reply}
                        type="button"
                        onClick={() => sendMessage(reply)}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                ) : null}

                {error ? <p className="text-sm leading-6 text-rose-300">{error}</p> : null}
              </div>
            </div>

            <div className="border-t border-white/10 bg-[#f7f8fb] px-3 py-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      void sendMessage(message);
                    }
                  }}
                  placeholder={conversationId ? "Add to this thread..." : "Describe what you need help with..."}
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                />
                <button type="button" className="text-slate-500 transition-colors hover:text-slate-700" aria-label="Attach file">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button type="button" className="text-slate-500 transition-colors hover:text-slate-700" aria-label="Emoji">
                  <SmilePlus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => void sendMessage(message)}
                  disabled={submitting}
                  className="rounded-full bg-[#0d4f96] p-2 text-white transition-colors hover:bg-[#1162b8] disabled:cursor-not-allowed disabled:bg-slate-400"
                  aria-label="Send message"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-2 text-center text-[11px] text-slate-500">
                Support requests are stored for follow-up and routed to the STOICAI team.
              </p>
            </div>
          </div>
        ) : null}

        {!open ? (
          <div className="relative flex items-center gap-3">
            <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/80 shadow-[0_12px_35px_rgba(2,7,20,0.28)] sm:inline-flex">
              We&apos;re here
            </div>

            <button
              type="button"
              onClick={() => {
                setOpen(true);
                setShowIntro(false);
              }}
              className="relative inline-flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#1158a8,#0a2c5d)] text-white shadow-[0_20px_60px_rgba(8,38,83,0.45)] transition-transform duration-300 hover:-translate-y-1"
              aria-label="Open support chat"
            >
              <span className="absolute inset-0 rounded-full border border-cyan-200/20" />
              <span className="absolute inset-[7px] rounded-full border border-white/10" />
              <MessageCircle className="h-7 w-7" />
              {unreadCount ? (
                <span className="absolute right-0 top-0 inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-white/20 bg-red-500 px-1 text-[10px] font-semibold text-white">
                  {unreadCount}
                </span>
              ) : null}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
