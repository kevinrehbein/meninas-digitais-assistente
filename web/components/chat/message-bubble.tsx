"use client";

import { AlertCircle, AlertTriangle, MessageCircleQuestion, RotateCcw } from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";
import type { ChatMessage } from "@/lib/types";

import { AgentTimeline } from "./agent-timeline";
import { Markdown } from "./markdown";
import { MessageActions } from "./message-actions";
import { ProjectPlanCard } from "./project-plan-card";
import { SourcesCard } from "./sources-card";

type MessageBubbleProps = {
  message: ChatMessage;
  onRetry: (message: ChatMessage) => void;
  retryDisabled?: boolean;
};

function timeLabel(timestamp: number): string {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function AnswerSkeleton() {
  return (
    <div className="mt-2 space-y-2" aria-hidden="true">
      <div className="skeleton-line h-2.5 w-11/12 rounded-full" />
      <div className="skeleton-line h-2.5 w-4/5 rounded-full" />
      <div className="skeleton-line h-2.5 w-2/3 rounded-full" />
    </div>
  );
}

function RetryButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-semibold text-brand-rose shadow-sm ring-1 ring-brand-rose/30 transition-colors hover:bg-brand-rose hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
      Tentar novamente
    </button>
  );
}

export function MessageBubble({
  message,
  onRetry,
  retryDisabled = false,
}: MessageBubbleProps) {
  if (message.role === "user") {
    return (
      <div className="animate-fade-up flex justify-end">
        <div className="max-w-[88%] rounded-3xl rounded-br-md bg-brand-purple px-4 py-2.5 text-[14.5px] leading-relaxed text-white shadow-[0_8px_24px_-14px_rgba(123,54,136,0.65)] sm:max-w-[78%]">
          {message.content}
        </div>
      </div>
    );
  }

  const streaming = message.status === "streaming";
  const steps = message.steps ?? [];
  const canRetry = Boolean(message.question) && !retryDisabled;

  return (
    <div className="animate-fade-up flex gap-2.5 sm:gap-3">
      <BrandMark size={34} className="mt-1 hidden sm:inline-flex" />
      <div className="min-w-0 flex-1">
        <div className="rounded-2xl rounded-tl-md border border-brand-line bg-white p-3.5 shadow-[0_10px_30px_-24px_rgba(26,26,30,0.5)] sm:p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-purple">
              Assistente
            </span>
            <span className="h-1 w-1 rounded-full bg-brand-line" aria-hidden="true" />
            <span className="text-[10.5px] text-brand-muted">{timeLabel(message.createdAt)}</span>
          </div>

          {steps.length > 0 || streaming ? (
            <AgentTimeline
              steps={steps}
              streaming={streaming}
              defaultOpen={message.status === "error" || message.status === "stopped"}
            />
          ) : null}

          {streaming ? <AnswerSkeleton /> : null}

          {!streaming && message.content ? (
            message.responseType === "plan" && message.plan ? (
              <ProjectPlanCard plan={message.plan} />
            ) : (
              <Markdown>{message.content}</Markdown>
            )
          ) : null}

          {message.warning ? (
            <div className="mt-3 flex gap-2 rounded-xl border border-[#F0D3B4] bg-[#FFF8EE] p-3 text-[12px] leading-relaxed text-brand-warning">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <p>{message.warning}</p>
            </div>
          ) : null}

          {message.status === "error" ? (
            <div className="mt-3 rounded-xl border border-brand-rose/30 bg-[#FBEEF0] p-3">
              <p className="flex gap-2 text-[12px] leading-relaxed text-[#7d2d3b]">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {message.error ?? "Não foi possível concluir a resposta."}
              </p>
              {canRetry ? (
                <RetryButton onClick={() => onRetry(message)} disabled={retryDisabled} />
              ) : null}
            </div>
          ) : null}

          {message.status === "stopped" ? (
            <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-dashed border-brand-line bg-brand-cream/70 p-3">
              <p className="flex items-center gap-2 text-[12px] text-brand-muted">
                <MessageCircleQuestion className="h-3.5 w-3.5" aria-hidden="true" />
                {message.error ?? "Geração interrompida."}
              </p>
              {canRetry ? (
                <RetryButton onClick={() => onRetry(message)} disabled={retryDisabled} />
              ) : null}
            </div>
          ) : null}

          {message.status === "done" && message.content ? (
            <>
              <SourcesCard sources={message.sources ?? []} />
              <MessageActions content={message.content} meta={message.meta} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
