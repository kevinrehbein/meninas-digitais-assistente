import {
  Ban,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Compass,
  Library,
  ListTree,
  Loader2,
  PackageCheck,
  PenLine,
  Search,
  ShieldCheck,
} from "lucide-react";

import type { AgentStep } from "@/lib/types";

const NODE_META = {
  supervisor: {
    icon: Compass,
    iconClass: "bg-brand-lilac text-brand-purple",
  },
  decompositor: {
    icon: ListTree,
    iconClass: "bg-[#EDEFF9] text-brand-blue",
  },
  pesquisador: {
    icon: Search,
    iconClass: "bg-[#FBEEF0] text-brand-rose",
  },
  pesquisador_tools: {
    icon: Library,
    iconClass: "bg-[#EEF6EB] text-brand-green",
  },
  redator: {
    icon: PenLine,
    iconClass: "bg-[#FDF0E3] text-brand-orange",
  },
  planejador: {
    icon: ClipboardList,
    iconClass: "bg-[#EDEFF9] text-brand-blue",
  },
  verificador: {
    icon: ShieldCheck,
    iconClass: "bg-[#EEF6EB] text-brand-green",
  },
  finalizar: {
    icon: PackageCheck,
    iconClass: "bg-brand-lilac text-brand-purple",
  },
  fora_dominio: {
    icon: Ban,
    iconClass: "bg-[#FBEEF0] text-brand-rose",
  },
} as const;

const FALLBACK_META = {
  icon: Compass,
  iconClass: "bg-brand-lilac text-brand-purple",
};

type AgentTimelineProps = {
  steps: AgentStep[];
  streaming: boolean;
  defaultOpen?: boolean;
};

function StepItem({ step }: { step: AgentStep }) {
  const meta = NODE_META[step.node as keyof typeof NODE_META] ?? FALLBACK_META;
  const Icon = meta.icon;
  const tools = step.data.tools ?? [];
  const plannedSteps = step.data.steps ?? [];
  const isVerdict = step.node === "verificador" && step.data.verdict;

  return (
    <li className="flex gap-2.5">
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${meta.iconClass}`}
      >
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[13px] font-semibold leading-tight text-brand-ink">
            {step.title}
          </span>
          <CheckCircle2
            className="h-3 w-3 shrink-0 text-brand-success"
            aria-label="Etapa concluída"
          />
          {typeof step.data.result_count === "number" ? (
            <span className="rounded-full bg-brand-lilac px-1.5 py-0.5 text-[10px] font-semibold text-brand-purple">
              {step.data.result_count}
            </span>
          ) : null}
          {isVerdict ? (
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                step.data.verdict === "aprovado"
                  ? "bg-[#EEF6EB] text-brand-success"
                  : "bg-[#FDF0E3] text-brand-warning"
              }`}
            >
              {step.data.verdict}
            </span>
          ) : null}
        </div>
        <p className="mt-0.5 text-[11.5px] leading-relaxed text-brand-muted">
          {step.detail}
        </p>

        {tools.length > 0 ? (
          <ul className="mt-1.5 flex flex-wrap gap-1">
            {tools.map((tool, index) => (
              <li
                key={`${tool.name}-${index}`}
                className="max-w-full truncate rounded-md border border-brand-line bg-white px-1.5 py-0.5 text-[10.5px] text-brand-muted"
                title={tool.query ? `${tool.label}: ${tool.query}` : tool.label}
              >
                {tool.label}
                {tool.query ? (
                  <span className="text-brand-ink/70"> · {tool.query}</span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}

        {plannedSteps.length > 0 ? (
          <ol className="mt-1.5 list-decimal space-y-0.5 pl-4 text-[11.5px] leading-relaxed text-brand-muted">
            {plannedSteps.map((planned, index) => (
              <li key={`${planned}-${index}`}>{planned}</li>
            ))}
          </ol>
        ) : null}

      </div>
    </li>
  );
}

export function AgentTimeline({ steps, streaming, defaultOpen = false }: AgentTimelineProps) {
  if (!steps.length) {
    return (
      <div className="mb-3 flex items-center gap-2 rounded-xl border border-brand-line/80 bg-brand-cream/70 px-3 py-2 text-xs text-brand-purple">
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
        Preparando o assistente…
      </div>
    );
  }

  const list = (
    <ol className="space-y-2.5">
      {steps.map((step) => (
        <StepItem key={step.id} step={step} />
      ))}
    </ol>
  );

  const working = streaming ? (
    <div className="mt-3 flex items-center gap-2 border-t border-brand-line/70 pt-2.5 text-[11.5px] font-medium text-brand-purple">
      <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
      <span>Preparando a resposta…</span>
    </div>
  ) : null;

  if (streaming) {
    return (
      <div className="mb-4 rounded-xl border border-brand-line/80 bg-brand-cream/60 px-3 py-3">
        {list}
        {working}
      </div>
    );
  }

  return (
    <details
      className="group mb-4 rounded-xl border border-brand-line/80 bg-brand-cream/60"
      {...(defaultOpen ? { open: true } : {})}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-xl px-3 py-2 text-[11.5px] font-semibold text-brand-muted transition-colors hover:text-brand-purple [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
          Etapas do agente ({steps.length})
        </span>
        <ChevronDown
          className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="border-t border-brand-line/70 px-3 py-3">{list}</div>
    </details>
  );
}
