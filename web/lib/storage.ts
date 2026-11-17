import { MAX_STORED_MESSAGES, STORAGE_KEY } from "./constants";
import type { ChatMessage } from "./types";

type StoredChat = {
  version: 1;
  messages: ChatMessage[];
};

export function loadMessages(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Partial<StoredChat>;
    if (parsed.version !== 1 || !Array.isArray(parsed.messages)) return [];

    return parsed.messages
      .filter(
        (message): message is ChatMessage =>
          Boolean(
            message &&
              typeof message.id === "string" &&
              (message.role === "user" || message.role === "assistant") &&
              typeof message.content === "string",
          ),
      )
      .map((message) =>
        message.status === "streaming"
          ? {
              ...message,
              status: "stopped" as const,
              error: "A conversa foi interrompida ao recarregar a página.",
            }
          : message,
      )
      .slice(-MAX_STORED_MESSAGES);
  } catch {
    return [];
  }
}

export function saveMessages(messages: ChatMessage[]): void {
  if (typeof window === "undefined") return;
  try {
    const payload: StoredChat = {
      version: 1,
      messages: messages.slice(-MAX_STORED_MESSAGES),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage cheio ou bloqueado: a conversa continua apenas em memória.
  }
}

export function clearStoredMessages(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignora navegadores com armazenamento bloqueado.
  }
}
