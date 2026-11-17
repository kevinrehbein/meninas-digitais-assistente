import { CheckCircle2, ListChecks, Sparkles, Target, Users } from "lucide-react";

import type { ProjectPlan } from "@/lib/types";

import { Markdown } from "./markdown";

/** Remove marcadores de lista que o modelo às vezes inclui no início do item. */
function stripBullet(value: string): string {
  return value
    .replace(/^\s*(?:[-*•–—]|\d+[.)])\s+/, "")
    .trim();
}

function PlanSection({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: typeof CheckCircle2;
  items: string[];
}) {
  if (!items.length) return null;
  return (
    <section className="rounded-xl border border-brand-line bg-white p-3.5">
      <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-purple">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {title}
      </h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="flex gap-1.5 text-[12.5px] leading-relaxed text-brand-muted"
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-purple/60" />
            <div className="min-w-0">
              <Markdown>{stripBullet(item)}</Markdown>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProjectPlanCard({ plan }: { plan: ProjectPlan }) {
  return (
    <article className="my-1 overflow-hidden rounded-2xl border border-brand-purple/20 bg-white">
      <header className="border-b border-brand-line bg-gradient-to-br from-brand-lilac via-white to-[#FFF9E5] px-4 py-4 sm:px-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-purple px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          Plano de projeto
        </span>
        <h2 className="mt-2.5 text-xl font-semibold leading-tight tracking-[-0.01em] text-brand-ink">
          {plan.title}
        </h2>
        <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-brand-muted">
          <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-blue" aria-hidden="true" />
          <span>
            <span className="font-semibold text-brand-ink">Público-alvo: </span>
            {plan.target_audience}
          </span>
        </p>
      </header>

      <div className="space-y-4 px-4 py-4 sm:px-5">
        <section>
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-brand-purple">
            Justificativa
          </h3>
          <Markdown className="mt-1.5">{plan.justification}</Markdown>
        </section>

        <section>
          <h3 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-purple">
            <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
            Metodologia
          </h3>
          <ol className="mt-2 space-y-2.5">
            {plan.methodology.map((step, index) => (
              <li
                key={`${step.etapa}-${index}`}
                className="relative rounded-xl border border-brand-line bg-brand-cream/50 p-3 pl-11"
              >
                <span className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-purple text-[11px] font-semibold text-white">
                  {index + 1}
                </span>
                <h4 className="text-sm font-semibold text-brand-ink">{step.etapa}</h4>
                <Markdown className="mt-1 text-[13px]">{step.descricao}</Markdown>
                {step.fonte ? (
                  <div className="mt-1.5 text-[11px] font-medium text-brand-blue">
                    <Markdown className="[&_p]:my-0">{step.fonte}</Markdown>
                  </div>
                ) : (
                  <p className="mt-1.5 text-[10.5px] italic text-brand-muted/80">
                    Proposta do planejador
                  </p>
                )}
              </li>
            ))}
          </ol>
        </section>

        <div className="grid gap-3 sm:grid-cols-2">
          <PlanSection title="Desafios" icon={Target} items={plan.challenges} />
          <PlanSection title="Indicadores de sucesso" icon={CheckCircle2} items={plan.indicators} />
          <PlanSection
            title="Resultados esperados"
            icon={Sparkles}
            items={plan.expected_results}
          />
        </div>

        {plan.references.length ? (
          <section className="rounded-xl border border-brand-line bg-brand-lilac/40 p-3.5">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-brand-purple">
              Referências citadas
            </h3>
            <ul className="mt-2 space-y-1.5">
              {plan.references.map((reference, index) => (
                <li key={`${reference}-${index}`} className="text-[12.5px]">
                  <Markdown className="[&_p]:my-0">{reference}</Markdown>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}
