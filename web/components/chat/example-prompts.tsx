import { ArrowRight, ClipboardList, Map, Search } from "lucide-react";

import { EXAMPLES, EXAMPLE_STYLES, type Example } from "@/lib/examples";

const ICONS = [Search, Map, ClipboardList] as const;

type ExampleCardProps = {
  example: Example;
  index: number;
  onSelect: (question: string) => void;
  disabled?: boolean;
};

export function ExampleCard({ example, index, onSelect, disabled = false }: ExampleCardProps) {
  const Icon = ICONS[index % ICONS.length];
  const styles = EXAMPLE_STYLES[example.accent];

  return (
    <button
      type="button"
      onClick={() => onSelect(example.question)}
      disabled={disabled}
      className={`group flex h-full flex-col items-start gap-2.5 rounded-2xl border border-brand-line bg-white p-4 text-left shadow-[0_10px_28px_-26px_rgba(26,26,30,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-24px_rgba(26,26,30,0.45)] disabled:cursor-not-allowed disabled:opacity-60 ${styles.border}`}
    >
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${styles.icon}`}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="text-[13px] font-semibold leading-tight text-brand-ink">
        {example.label}
      </span>
      <span className="line-clamp-3 text-[11.5px] leading-relaxed text-brand-muted">
        {example.question}
      </span>
      <span className="mt-auto inline-flex items-center gap-1 pt-1 text-[10.5px] font-semibold text-brand-purple opacity-0 transition-opacity group-hover:opacity-100">
        Perguntar
        <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </span>
    </button>
  );
}

export function ExampleGrid({
  onSelect,
  disabled,
}: {
  onSelect: (question: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-3">
      {EXAMPLES.map((example, index) => (
        <ExampleCard
          key={example.question}
          example={example}
          index={index}
          onSelect={onSelect}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

export function ExampleList({
  onSelect,
  disabled,
}: {
  onSelect: (question: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      {EXAMPLES.map((example) => {
        const styles = EXAMPLE_STYLES[example.accent];
        return (
          <button
            key={example.question}
            type="button"
            onClick={() => onSelect(example.question)}
            disabled={disabled}
            className={`group flex w-full items-start gap-2 rounded-xl border border-transparent px-2.5 py-2 text-left transition-colors hover:border-brand-line hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 ${styles.border}`}
          >
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${styles.dot}`} />
            <span className="min-w-0">
              <span className="block text-[12px] font-semibold leading-tight text-brand-ink">
                {example.label}
              </span>
              <span className="mt-0.5 line-clamp-2 block text-[10.5px] leading-relaxed text-brand-muted">
                {example.question}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
