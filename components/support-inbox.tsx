"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Loader2, LockKeyhole, RefreshCcw, SendHorizonal } from "lucide-react";

type SupportMessage = {
  id: string;
  author: "visitor" | "support";
  text: string;
  createdAt: string;
};

type SupportConversation = {
  id: string;
  lead: {
    name: string;
    email: string;
    company?: string;
  };
  status: "open" | "closed";
  createdAt: string;
  updatedAt: string;
  messages: SupportMessage[];
};

const tokenStorageKey = "stoicai-support-admin-token";

export function SupportInbox() {
  const [token, setToken] = useState("");
  const [draftReply, setDraftReply] = useState("");
  const [conversations, setConversations] = useState<SupportConversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [replying, setReplying] = useState(false);
  const [error, setError] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const savedToken = window.sessionStorage.getItem(tokenStorageKey);
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    void loadConversations();
    const interval = window.setInterval(() => {
      void loadConversations(true);
    }, 10000);

    return () => window.clearInterval(interval);
  }, [token]);

  const selectedConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === selectedId) || conversations[0] || null,
    [conversations, selectedId],
  );

  useEffect(() => {
    if (selectedConversation && selectedConversation.id !== selectedId) {
      setSelectedId(selectedConversation.id);
    }
  }, [selectedConversation, selectedId]);

  const loadConversations = async (silent = false) => {
    if (!silent) {
      setLoading(true);
      setError("");
    }

    try {
      const response = await fetch("/api/support/conversations", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      const data = (await response.json()) as { conversations?: SupportConversation[]; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to load conversations.");
      }

      setConversations(data.conversations || []);
      window.sessionStorage.setItem(tokenStorageKey, token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load conversations.");
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  const sendReply = async () => {
    if (!selectedConversation || !draftReply.trim()) return;

    setReplying(true);
    setError("");

    try {
      const response = await fetch(`/api/support/conversations/${selectedConversation.id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ text: draftReply }),
      });

      const data = (await response.json()) as { conversation?: SupportConversation; error?: string };

      if (!response.ok || !data.conversation) {
        throw new Error(data.error || "Unable to send reply.");
      }

      setConversations((current) =>
        current.map((conversation) => (conversation.id === data.conversation?.id ? data.conversation : conversation)),
      );
      setDraftReply("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send reply.");
    } finally {
      setReplying(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div className="surface-panel rounded-2xl p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-full border border-cyan-200/20 bg-cyan-300/10 p-2 text-cyan-100">
            <LockKeyhole className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Support inbox access</p>
            <p className="text-xs text-slate-400">Use your admin token to load conversations.</p>
          </div>
        </div>

        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Admin token</label>
        <input
          value={token}
          onChange={(event) => setToken(event.target.value)}
          placeholder="Paste support token"
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-200/40 focus:outline-none"
        />

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={loadConversations}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#07101f] transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            Load
          </button>
        </div>

        {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}

        <div className="mt-6 space-y-3">
          {conversations.map((conversation) => {
            const latestMessage = conversation.messages[conversation.messages.length - 1];
            const active = conversation.id === selectedConversation?.id;

            return (
              <button
                key={conversation.id}
                type="button"
                onClick={() => setSelectedId(conversation.id)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                  active
                    ? "border-cyan-200/30 bg-cyan-300/10"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{conversation.lead.name}</p>
                    <p className="mt-1 text-xs text-slate-400">{conversation.lead.email}</p>
                  </div>
                  <span className="text-[11px] text-slate-500">{format(new Date(conversation.updatedAt), "MMM d")}</span>
                </div>
                <p className="mt-3 line-clamp-2 text-xs leading-6 text-slate-400">{latestMessage?.text}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="surface-panel rounded-2xl p-5">
        {selectedConversation ? (
          <>
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-lg font-semibold text-white">{selectedConversation.lead.name}</p>
                <p className="mt-1 text-sm text-slate-300">{selectedConversation.lead.email}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedConversation.lead.company || "Company not provided"}
                </p>
              </div>
              <div className="text-right text-sm text-slate-400">
                <p>Opened {format(new Date(selectedConversation.createdAt), "MMM d, yyyy h:mm a")}</p>
                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(selectedConversation.lead.email);
                    setCopiedEmail(true);
                    window.setTimeout(() => setCopiedEmail(false), 1600);
                  }}
                  className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200/80 transition-colors hover:text-cyan-100"
                >
                  {copiedEmail ? "Email copied" : "Copy email"}
                </button>
              </div>
            </div>

            <div className="support-scroll max-h-[480px] space-y-4 overflow-y-auto pr-2">
              {selectedConversation.messages.map((message) => (
                <div key={message.id} className={`flex ${message.author === "visitor" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                      message.author === "visitor"
                        ? "bg-white text-[#07101f]"
                        : "bg-[linear-gradient(135deg,rgba(13,52,103,0.98),rgba(11,34,72,0.98))] text-white"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`mt-2 text-[11px] ${message.author === "visitor" ? "text-slate-500" : "text-cyan-100/70"}`}>
                      {format(new Date(message.createdAt), "MMM d, h:mm a")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-white/10 pt-5">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Reply</label>
              <div className="flex gap-3">
                <textarea
                  value={draftReply}
                  onChange={(event) => setDraftReply(event.target.value)}
                  placeholder="Write a reply for the STOICAI support thread"
                  className="support-scroll min-h-[120px] flex-1 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-200/40 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={sendReply}
                  disabled={replying || !draftReply.trim()}
                  className="inline-flex h-fit items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#07101f] transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {replying ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
            <p className="text-sm text-slate-400">No support conversations loaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
