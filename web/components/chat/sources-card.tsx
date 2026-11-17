import { BookOpen, ExternalLink } from "lucide-react";

import type { Source } from "@/lib/types";

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function SourcesCard({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;

  return (
    <details className="group mt-4 rounded-xl border border-brand-line bg-brand-cream/60">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2.5 text-xs font-semibold text-brand-muted transition-colors hover:text-brand-purple [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
          Fontes consultadas ({sources.length})
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-brand-muted/70">
          ver lista
        </span>
      </summary>
      <ul className="grid gap-1.5 border-t border-brand-line/70 p-2.5 sm:grid-cols-2">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-full items-start gap-2 rounded-lg border border-transparent bg-white px-2.5 py-2 text-xs transition-colors hover:border-brand-line hover:bg-brand-lilac/40"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand-lilac text-brand-purple">
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="line-clamp-2 font-medium leading-snug text-brand-ink">
                  {source.title}
                </span>
                <span className="mt-0.5 block truncate text-[10.5px] text-brand-muted">
                  {hostname(source.url)}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
