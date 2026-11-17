"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Square } from "lucide-react";
import Link from "next/link";

import { MAX_QUESTION_CHARS } from "@/lib/constants";

type ComposerProps = {
  onSend: (question: string) => void;
  onStop: () => void;
  isStreaming: boolean;
};

export function Composer({ onSend, onStop, isStreaming }: ComposerProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const element = textareaRef.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 160)}px`;
  }, [value]);

  const submit = () => {
    const question = value.trim();
    if (!question || isStreaming) return;
    onSend(question);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const closeToLimit = value.length > MAX_QUESTION_CHARS * 0.8;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-2xl border border-brand-line bg-white p-2 shadow-[0_14px_40px_-28px_rgba(26,26,30,0.55)] transition-all focus-within:border-brand-purple/40 focus-within:ring-4 focus-within:ring-brand-purple/10">
        <label htmlFor="chat-question" className="sr-only">
          Sua pergunta sobre os artigos do WIT
        </label>
        <textarea
          ref={textareaRef}
          id="chat-question"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault();
              submit();
            }
          }}
          rows={1}
          maxLength={MAX_QUESTION_CHARS}
          placeholder="Pergunte sobre o WIT…"
          className="block max-h-40 min-h-[44px] w-full resize-none border-0 bg-transparent px-2.5 py-2 text-[16px] leading-relaxed text-brand-ink outline-none placeholder:text-brand-muted/70 sm:text-[14.5px]"
        />

        <div className="flex items-end justify-between gap-3 px-1 pb-0.5 pt-1">
          <div className="min-w-0 px-1.5 pb-1.5">
            <p className="text-[10.5px] leading-snug text-brand-muted">
              O assistente pode cometer erros. Confira as fontes.{" "}
              <Link href="/sobre" className="font-medium text-brand-blue underline">
                Saiba mais
              </Link>
            </p>
            {closeToLimit ? (
              <p
                className={`mt-1 text-[10.5px] font-medium ${
                  value.length >= MAX_QUESTION_CHARS
                    ? "text-brand-danger"
                    : "text-brand-warning"
                }`}
              >
                {value.length}/{MAX_QUESTION_CHARS} caracteres
              </p>
            ) : null}
          </div>

          {isStreaming ? (
            <button
              type="button"
              onClick={onStop}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-rose text-white shadow-sm transition-transform hover:scale-[1.03] active:scale-95"
              aria-label="Interromper geração"
              title="Interromper geração"
            >
              <Square className="h-4 w-4 fill-current" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="submit"
              onClick={submit}
              disabled={!value.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-purple text-white shadow-[0_8px_18px_-10px_rgba(123,54,136,0.8)] transition-all hover:bg-[#672b73] disabled:cursor-not-allowed disabled:bg-brand-line disabled:text-brand-muted disabled:shadow-none"
              aria-label="Enviar pergunta"
              title="Enviar pergunta"
            >
              <ArrowUp className="h-4.5 w-4.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
