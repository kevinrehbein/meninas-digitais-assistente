"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Loader2, MessageSquare, Plus } from "lucide-react";

import { useChatStream } from "@/hooks/use-chat-stream";
import type { ChatMessage } from "@/lib/types";

import { BrandMark } from "@/components/brand/brand-mark";

import { ChatSidebar } from "./chat-sidebar";
import { Composer } from "./composer";
import { EmptyState } from "./empty-state";
import { MessageBubble } from "./message-bubble";

export function ChatShell() {
  const { messages, send, stop, clear, isStreaming, hydrated } = useChatStream();
  const [pinned, setPinned] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pinned) return;
    bottomRef.current?.scrollIntoView({
      behavior: isStreaming ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, pinned, isStreaming]);

  const handleScroll = () => {
    const element = scrollRef.current;
    if (!element) return;
    const distance = element.scrollHeight - element.scrollTop - element.clientHeight;
    setPinned(distance < 120);
  };

  const ask = (question: string) => {
    setPinned(true);
    void send(question);
  };

  const retry = (message: ChatMessage) => {
    if (!message.question) return;
    setPinned(true);
    void send(message.question, { retryOf: message.id });
  };

  const newConversation = () => {
    clear();
    setPinned(true);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  const scrollToBottom = () => {
    setPinned(true);
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  if (!hydrated) {
    return (
      <div className="flex h-[calc(100svh-4.375rem)] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-brand-muted">
          <BrandMark size={38} />
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-brand-purple" aria-hidden="true" />
            Carregando conversa…
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-[calc(100svh-4.375rem)] w-full max-w-6xl">
      <ChatSidebar
        onSelect={ask}
        onClear={newConversation}
        isStreaming={isStreaming}
        hasMessages={messages.length > 0}
      />

      <section className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-brand-line/80 px-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <MessageSquare
              className="h-4 w-4 shrink-0 text-brand-purple"
              aria-hidden="true"
            />
            <span className="text-[12.5px] font-semibold text-brand-ink">Conversa</span>
            <span className="hidden truncate text-[10.5px] text-brand-muted sm:inline">
              · cada pergunta é independente
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isStreaming ? (
              <span className="hidden items-center gap-1.5 text-[10.5px] font-medium text-brand-purple sm:inline-flex">
                <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
                processando
              </span>
            ) : null}
            <button
              type="button"
              onClick={newConversation}
              disabled={!messages.length && !isStreaming}
              className="inline-flex items-center gap-1 rounded-lg border border-brand-line bg-white px-2.5 py-1.5 text-[11px] font-semibold text-brand-muted transition-colors hover:border-brand-purple/30 hover:text-brand-purple disabled:cursor-not-allowed disabled:opacity-45 lg:hidden"
            >
              <Plus className="h-3 w-3" aria-hidden="true" />
              Nova
            </button>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {isStreaming
            ? "O assistente está processando a pergunta."
            : "Conversa pronta para uma nova pergunta."}
        </p>

        <div className="relative min-h-0 flex-1">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="scrollbar-thin h-full overflow-y-auto"
          >
            {messages.length === 0 ? (
              <EmptyState onSelect={ask} disabled={isStreaming} />
            ) : (
              <div className="mx-auto w-full max-w-3xl space-y-5 px-3 py-5 sm:px-6 sm:py-6">
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    onRetry={retry}
                    retryDisabled={isStreaming}
                  />
                ))}
                <div ref={bottomRef} className="h-1" aria-hidden="true" />
              </div>
            )}
          </div>

          {!pinned && messages.length > 0 ? (
            <button
              type="button"
              onClick={scrollToBottom}
              className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-brand-line bg-white text-brand-purple shadow-lg transition-transform hover:scale-105"
              aria-label="Ir para o fim da conversa"
            >
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <div className="shrink-0 border-t border-brand-line/80 bg-brand-cream/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur sm:px-6 sm:py-4">
          <Composer onSend={ask} onStop={stop} isStreaming={isStreaming} />
        </div>
      </section>
    </div>
  );
}
