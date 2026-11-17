"use client";

import { useState } from "react";
import { Check, Copy, Download, ShieldCheck } from "lucide-react";

import type { FinalMeta } from "@/lib/types";

type MessageActionsProps = {
  content: string;
  meta?: FinalMeta;
};

function downloadMarkdown(content: string) {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate(),
  ).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(
    now.getMinutes(),
  ).padStart(2, "0")}`;
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `meninas-digitais-resposta-${stamp}.md`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function MessageActions({ content, meta }: MessageActionsProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-brand-line/70 pt-3">
      {meta?.verdict === "aprovado" ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-[#EEF6EB] px-2 py-1 text-[10.5px] font-semibold text-brand-success">
          <ShieldCheck className="h-3 w-3" aria-hidden="true" />
          Verificada nas fontes
        </span>
      ) : null}

      {typeof meta?.elapsed_ms === "number" ? (
        <span className="text-[10.5px] text-brand-muted/80">
          {(meta.elapsed_ms / 1000).toFixed(1).replace(".", ",")} s
        </span>
      ) : null}

      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-medium text-brand-muted transition-colors hover:bg-brand-lilac hover:text-brand-purple"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-brand-success" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {copied ? "Copiado" : "Copiar"}
        </button>
        <button
          type="button"
          onClick={() => downloadMarkdown(content)}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-medium text-brand-muted transition-colors hover:bg-brand-lilac hover:text-brand-purple"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          Baixar .md
        </button>
      </div>
    </div>
  );
}
