import { BookOpenCheck, ShieldCheck, Sparkles } from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";
import { TapestryBand } from "@/components/brand/tapestry";

import { ExampleGrid } from "./example-prompts";

type EmptyStateProps = {
  onSelect: (question: string) => void;
  disabled?: boolean;
};

export function EmptyState({ onSelect, disabled = false }: EmptyStateProps) {
  return (
    <section className="mx-auto flex min-h-full w-full max-w-3xl flex-col items-center justify-center px-4 py-6 text-center sm:px-6 sm:py-14">
      <div className="relative">
        <div
          className="absolute -inset-3 rounded-full bg-[conic-gradient(from_150deg,#C96372,#7B3688,#35418E,#F8E12D,#54963D,#CE6B00,#C96372)] opacity-25 blur-[2px]"
          aria-hidden="true"
        />
        <BrandMark
          size={82}
          className="relative !h-16 !w-16 ring-4 ring-white sm:!h-[82px] sm:!w-[82px]"
          priority
        />
      </div>
      <TapestryBand rows={1} className="mt-3 h-1.5 w-24 rounded-full sm:mt-4" />

      <h1 className="mt-2.5 font-display text-[2rem] leading-[1.05] tracking-[0.015em] text-brand-ink sm:mt-3 sm:text-5xl">
        Assistente
        <span className="block text-brand-purple">Meninas Digitais</span>
      </h1>

      <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-brand-muted sm:mt-4 sm:text-sm">
        Pergunte sobre os artigos do <strong className="font-semibold text-brand-ink">Women in
        Information Technology</strong>. O sistema multiagentes pesquisa a base, organiza evidências e
        verifica a fidelidade da resposta antes de responder.
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] font-medium text-brand-muted sm:mt-5 sm:gap-y-2">
        <span className="inline-flex items-center gap-1.5">
          <BookOpenCheck className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
          Respostas com fontes
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
          Verificação de fidelidade
        </span>
      </div>

      <div className="mt-6 w-full sm:mt-8">
        <p className="mb-2.5 text-left text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand-muted/80 sm:mb-3">
          Comece por um exemplo
        </p>
        <ExampleGrid onSelect={onSelect} disabled={disabled} />
      </div>
    </section>
  );
}
