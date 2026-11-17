"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";
import { TapestryBand } from "@/components/brand/tapestry";

const links = [
  { href: "/", label: "Assistente", shortLabel: "Chat" },
  { href: "/sobre", label: "Sobre o projeto", shortLabel: "Sobre" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-brand-line/80 bg-brand-cream/90 backdrop-blur-md">
      <TapestryBand rows={1} className="h-1.5" />
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 rounded-xl py-1 pr-2 sm:gap-3"
          aria-label="Assistente Meninas Digitais — página inicial"
        >
          <BrandMark size={36} priority />
          <span className="min-w-0">
            <span className="block truncate text-[14px] font-semibold leading-tight tracking-[-0.01em] text-brand-ink sm:text-[15px]">
              Meninas Digitais
            </span>
            <span className="hidden truncate text-[11px] font-medium uppercase tracking-[0.16em] text-brand-muted sm:block">
              Assistente acadêmico
            </span>
          </span>
        </Link>

        <nav
          className="flex shrink-0 items-center gap-0.5 sm:gap-2"
          aria-label="Navegação principal"
        >
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm ${
                  active
                    ? "bg-brand-lilac text-brand-purple"
                    : "text-brand-muted hover:bg-white hover:text-brand-ink"
                }`}
              >
                <span className="sm:hidden">{link.shortLabel}</span>
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}
          <a
            href="https://meninas.sbc.org.br/"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-brand-muted transition-colors hover:bg-white hover:text-brand-ink sm:inline-flex"
          >
            PMD
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
