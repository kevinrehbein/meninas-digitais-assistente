import { Compass, Library, Plus, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

import { ExampleList } from "./example-prompts";

type ChatSidebarProps = {
  onSelect: (question: string) => void;
  onClear: () => void;
  isStreaming: boolean;
  hasMessages: boolean;
};

const STEPS = [
  {
    icon: Compass,
    title: "Classifica a intenção",
    text: "Identifica se a pergunta pede um fato, uma síntese ou um plano de projeto.",
    color: "bg-brand-lilac text-brand-purple",
  },
  {
    icon: Library,
    title: "Pesquisa a base",
    text: "Consulta os artigos do WIT com busca vetorial e expansão pelo grafo de entidades.",
    color: "bg-[#EEF6EB] text-brand-green",
  },
  {
    icon: Sparkles,
    title: "Redige com evidências",
    text: "Organiza a resposta citando apenas o que foi encontrado nos artigos.",
    color: "bg-[#FDF0E3] text-brand-orange",
  },
  {
    icon: ShieldCheck,
    title: "Verifica a fidelidade",
    text: "Um verificador compara o texto com as evidências antes de entregar.",
    color: "bg-[#EEF6EB] text-brand-success",
  },
];

export function ChatSidebar({
  onSelect,
  onClear,
  isStreaming,
  hasMessages,
}: ChatSidebarProps) {
  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r border-brand-line/80 px-4 py-6 lg:flex">
      <section>
        <h2 className="px-2.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand-muted/80">
          Exemplos
        </h2>
        <div className="mt-2.5">
          <ExampleList onSelect={onSelect} disabled={isStreaming} />
        </div>
      </section>

      <section className="mt-7">
        <h2 className="px-2.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-brand-muted/80">
          Como funciona
        </h2>
        <ol className="mt-3 space-y-3 px-1">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="flex gap-2.5">
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${step.color}`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11.5px] font-semibold leading-tight text-brand-ink">
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-[10.5px] leading-relaxed text-brand-muted">
                    {step.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={onClear}
          disabled={!hasMessages && !isStreaming}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-brand-line bg-white px-3 py-2 text-[12px] font-semibold text-brand-muted transition-colors hover:border-brand-purple/30 hover:text-brand-purple disabled:cursor-not-allowed disabled:opacity-45"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Nova conversa
        </button>
        <p className="mt-3 px-2 text-center text-[10px] leading-relaxed text-brand-muted/80">
          Cada pergunta é independente, sem memória entre mensagens.{" "}
          <Link href="/sobre" className="font-medium text-brand-blue underline">
            Entenda o projeto
          </Link>
          .
        </p>
      </div>
    </aside>
  );
}
