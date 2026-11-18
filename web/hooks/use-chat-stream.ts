"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { MAX_QUESTION_CHARS, MAX_STORED_MESSAGES } from "@/lib/constants";
import { readEventStream } from "@/lib/sse";
import { clearStoredMessages, loadMessages, saveMessages } from "@/lib/storage";
import type { AgentStep, ChatMessage, StreamEvent } from "@/lib/types";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? ""
).replace(/\/+$/, "");

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function isAbortError(error: unknown): boolean {
  return (
    (error instanceof DOMException && error.name === "AbortError") ||
    (error instanceof Error && error.name === "AbortError")
  );
}

export function useChatStream() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setMessages(loadMessages());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveMessages(messages);
  }, [messages, hydrated]);

  const patchAssistant = useCallback(
    (id: string, patch: Partial<ChatMessage>) => {
      setMessages((previous) =>
        previous.map((message) => (message.id === id ? { ...message, ...patch } : message)),
      );
    },
    [],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    clearStoredMessages();
    setMessages([]);
  }, []);

  const send = useCallback(
    async (rawQuestion: string, options?: { retryOf?: string }) => {
      const question = rawQuestion.trim();
      if (!question || isStreaming) return;
      if (question.length > MAX_QUESTION_CHARS) return;

      const assistantId = newId();
      const userMessage: ChatMessage = {
        id: newId(),
        role: "user",
        content: question,
        status: "done",
        createdAt: Date.now(),
      };
      const assistantMessage: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        status: "streaming",
        createdAt: Date.now(),
        steps: [],
        question,
      };

      setMessages((previous) => {
        const base = options?.retryOf
          ? previous.filter((message) => message.id !== options.retryOf)
          : previous;
        const last = base[base.length - 1];
        const alreadyAsked = last?.role === "user" && last.content === question;
        const next = alreadyAsked ? [...base] : [...base, userMessage];
        next.push(assistantMessage);
        return next.slice(-MAX_STORED_MESSAGES);
      });

      setIsStreaming(true);
      const controller = new AbortController();
      abortRef.current = controller;
      let finished = false;

      const handleEvent = (event: StreamEvent) => {
        if (event.event === "status") {
          const step: AgentStep = {
            id: newId(),
            node: event.data.node,
            state: event.data.state,
            title: event.data.title,
            detail: event.data.detail,
            data: event.data.data ?? {},
            at: Date.now(),
          };
          setMessages((previous) =>
            previous.map((message) =>
              message.id === assistantId
                ? { ...message, steps: [...(message.steps ?? []), step] }
                : message,
            ),
          );
        }

        if (event.event === "final") {
          finished = true;
          patchAssistant(assistantId, {
            content: event.data.answer_markdown,
            warning: event.data.warning ?? null,
            sources: event.data.sources ?? [],
            responseType: event.data.response_type ?? "text",
            plan: event.data.plan ?? null,
            meta: event.data.meta,
            status: "done",
            error: undefined,
          });
        }

        if (event.event === "error") {
          finished = true;
          patchAssistant(assistantId, {
            status: "error",
            error: event.data.message,
          });
        }
      };

      try {
        const response = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          body: JSON.stringify({ question }),
          signal: controller.signal,
        });

        if (!response.ok) {
          let detail = "Não foi possível iniciar a resposta.";
          try {
            const body = (await response.json()) as { detail?: unknown };
            if (typeof body.detail === "string") detail = body.detail;
          } catch {
            // Mantém a mensagem padrão.
          }
          throw new Error(detail);
        }

        await readEventStream(response, handleEvent);

        if (!finished) {
          patchAssistant(assistantId, {
            status: "error",
            error:
              "A conexão terminou antes da resposta final. Tente novamente em instantes.",
          });
        }
      } catch (error) {
        if (isAbortError(error)) {
          patchAssistant(assistantId, {
            status: "stopped",
            error: "Geração interrompida.",
          });
        } else {
          patchAssistant(assistantId, {
            status: "error",
            error:
              error instanceof Error
                ? error.message
                : "Ocorreu um erro ao processar sua pergunta.",
          });
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [isStreaming, patchAssistant],
  );

  return { messages, send, stop, clear, isStreaming, hydrated };
}
