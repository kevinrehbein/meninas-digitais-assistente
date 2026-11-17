import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";
import { TapestryBand } from "@/components/brand/tapestry";

const links = [
  { href: "https://meninas.sbc.org.br/", label: "Programa Meninas Digitais" },
  { href: "https://meninas.sbc.org.br/sobre-o-wit/", label: "Sobre o WIT" },
  { href: "https://sol.sbc.org.br/index.php/wit/issue/archive", label: "Anais do WIT" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-brand-line/80 bg-white/60">
      <TapestryBand rows={1} className="h-1.5" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <BrandMark size={34} />
            <div>
              <p className="text-sm font-semibold text-brand-ink">Assistente Meninas Digitais</p>
              <p className="text-[10.5px] uppercase tracking-[0.14em] text-brand-muted">
                Projeto acadêmico
              </p>
            </div>
          </div>
          <p className="mt-3 text-[11.5px] leading-relaxed text-brand-muted">
            Assistente de pesquisa sobre os artigos do WIT. Não é um canal oficial do
            Programa Meninas Digitais ou da SBC.
          </p>
        </div>

        <nav className="grid gap-1.5" aria-label="Links institucionais">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-brand-muted transition-colors hover:text-brand-purple"
            >
              {link.label}
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          ))}
          <Link
            href="/sobre"
            className="mt-1 text-[12px] font-medium text-brand-blue hover:underline"
          >
            Sobre este projeto
          </Link>
        </nav>

        <div className="max-w-xs text-[10.5px] leading-relaxed text-brand-muted/80">
          <p>
            Identidade visual baseada no Manual de Identidade Visual do Programa Meninas
            Digitais, versão 2.0.
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5">
            <Code2 className="h-3 w-3" aria-hidden="true" />
            Next.js · FastAPI · LangGraph
          </p>
        </div>
      </div>
    </footer>
  );
}
