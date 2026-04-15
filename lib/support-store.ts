import path from "path";
import { randomUUID } from "crypto";

export type SupportAuthor = "visitor" | "support";

export type SupportLead = {
  name: string;
  email: string;
  company?: string;
};

export type SupportMessage = {
  id: string;
  author: SupportAuthor;
  text: string;
  createdAt: string;
};

export type SupportConversation = {
  id: string;
  visitorToken: string;
  lead: SupportLead;
  source: "support-widget";
  status: "open" | "closed";
  createdAt: string;
  updatedAt: string;
  metadata: {
    pagePath?: string;
    referrer?: string;
    userAgent?: string;
  };
  messages: SupportMessage[];
};

type StoreAdapter = {
  read: () => Promise<SupportConversation[]>;
  write: (conversations: SupportConversation[]) => Promise<void>;
};

let storeAdapterPromise: Promise<StoreAdapter> | null = null;
let memoryStore: SupportConversation[] = [];

function getStorePath() {
  return (
    process.env.SUPPORT_STORE_PATH ||
    path.join(/* turbopackIgnore: true */ process.cwd(), ".data", "support-conversations.json")
  );
}

async function buildFileStoreAdapter(): Promise<StoreAdapter> {
  const { mkdir, readFile, writeFile } = await import("fs/promises");
  const storePath = getStorePath();

  const ensureStore = async () => {
    await mkdir(path.dirname(storePath), { recursive: true });

    try {
      await readFile(storePath, "utf8");
    } catch {
      await writeFile(storePath, "[]", "utf8");
    }
  };

  return {
    read: async () => {
      await ensureStore();
      const raw = await readFile(storePath, "utf8");
      const parsed = JSON.parse(raw) as SupportConversation[];
      return Array.isArray(parsed) ? parsed : [];
    },
    write: async (conversations) => {
      await ensureStore();
      await writeFile(storePath, JSON.stringify(conversations, null, 2), "utf8");
    },
  };
}

function buildMemoryStoreAdapter(): StoreAdapter {
  return {
    read: async () => memoryStore,
    write: async (conversations) => {
      memoryStore = conversations;
    },
  };
}

async function getStoreAdapter() {
  if (!storeAdapterPromise) {
    storeAdapterPromise = buildFileStoreAdapter().catch(() => buildMemoryStoreAdapter());
  }

  return storeAdapterPromise;
}

async function readStore() {
  const adapter = await getStoreAdapter();
  return adapter.read();
}

async function writeStore(conversations: SupportConversation[]) {
  const adapter = await getStoreAdapter();
  await adapter.write(conversations);
}

function createMessage(author: SupportAuthor, text: string): SupportMessage {
  return {
    id: randomUUID(),
    author,
    text,
    createdAt: new Date().toISOString(),
  };
}

export async function listConversations() {
  const conversations = await readStore();
  return conversations.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
}

export async function getConversationById(conversationId: string) {
  const conversations = await readStore();
  return conversations.find((item) => item.id === conversationId) || null;
}

export async function getConversationForVisitor(conversationId: string, visitorToken: string) {
  const conversation = await getConversationById(conversationId);

  if (!conversation || conversation.visitorToken !== visitorToken) {
    return null;
  }

  return conversation;
}

export async function createConversation(input: {
  lead: SupportLead;
  message: string;
  metadata?: SupportConversation["metadata"];
}) {
  const now = new Date().toISOString();
  const conversation: SupportConversation = {
    id: randomUUID(),
    visitorToken: randomUUID(),
    lead: input.lead,
    source: "support-widget",
    status: "open",
    createdAt: now,
    updatedAt: now,
    metadata: input.metadata || {},
    messages: [createMessage("visitor", input.message)],
  };

  const conversations = await readStore();
  conversations.push(conversation);
  await writeStore(conversations);
  return conversation;
}

async function appendMessage(conversationId: string, author: SupportAuthor, text: string) {
  const conversations = await readStore();
  const conversation = conversations.find((item) => item.id === conversationId);

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  conversation.messages.push(createMessage(author, text));
  conversation.updatedAt = new Date().toISOString();
  await writeStore(conversations);

  return conversation;
}

export async function addVisitorMessage(conversationId: string, text: string) {
  return appendMessage(conversationId, "visitor", text);
}

export async function addSupportReply(conversationId: string, text: string) {
  return appendMessage(conversationId, "support", text);
}
