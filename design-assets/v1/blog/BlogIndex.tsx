"use client";

/**
 * blog/BlogIndex.tsx — /blog scaffold (list view).
 *
 * Presentational list of posts. Posts come from your content layer (MDX in
 * blog/posts/, a CMS, etc.) parsed into PostMeta[]. Drafts are filtered out for
 * production. NO invented content — this renders whatever real posts exist, and
 * an empty state when there are none.
 */

import { ArrowUpRight } from "lucide-react";
import type { LFn, TFn, LocalizedString } from "@/design-assets/v1/shapes";

export interface PostMeta {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  date: string;       // ISO
  tags: string[];
  draft?: boolean;
}

export interface BlogIndexProps {
  posts: PostMeta[];
  locale: "es" | "en";
  t: TFn;
  L: LFn;
  onOpen: (slug: string) => void;
}

export function BlogIndex({ posts, locale, t, L, onOpen }: BlogIndexProps) {
  const live = posts.filter((p) => !p.draft).sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section
      className="relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-20 pb-16"
      aria-labelledby="blog-title"
    >
      <div className="flex items-baseline gap-3 mb-10 md:mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">07 / Blog</span>
        <span className="h-px flex-1 bg-rule" />
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
          {live.length} {locale === "es" ? "notas" : "notes"}
        </span>
      </div>

      <header className="mb-12 max-w-[760px]">
        <h1
          id="blog-title"
          className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.01em] text-ink leading-[1.02] text-balance"
        >
          {locale === "es" ? "Notas sobre IA aplicada y datos." : "Notes on applied AI & data."}
        </h1>
        <p className="mt-4 text-[16px] md:text-[18px] text-ink-muted text-pretty leading-relaxed">
          {locale === "es"
            ? "Aprendizajes de proyectos reales de automatización con IA, sistemas RAG, reportería y pricing analytics."
            : "Lessons from real projects in AI automation, RAG systems, reporting and pricing analytics."}
        </p>
      </header>

      {live.length === 0 ? (
        <div className="py-16 text-center text-ink-muted border border-dashed border-rule-strong rounded-sm">
          {locale === "es" ? "Aún no hay notas publicadas. Pronto." : "No notes published yet. Soon."}
        </div>
      ) : (
        <ol className="space-y-px bg-rule border border-rule">
          {live.map((p) => (
            <li key={p.slug}>
              <button
                type="button"
                onClick={() => onOpen(p.slug)}
                data-event="project_view"
                className="group w-full text-left bg-paper hover:bg-paper-raised transition-colors p-6 md:p-8 flex items-start justify-between gap-6"
              >
                <div className="min-w-0">
                  <time
                    dateTime={p.date}
                    className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft"
                  >
                    {new Date(p.date).toLocaleDateString(locale === "es" ? "es-CL" : "en-US", {
                      year: "numeric", month: "short", day: "2-digit",
                    })}
                  </time>
                  <h2 className="font-display text-[24px] md:text-[28px] leading-[1.1] tracking-[-0.01em] text-ink mt-1 mb-2 text-balance">
                    {L(p.title)}
                  </h2>
                  <p className="text-[14px] text-ink-muted leading-[1.55] text-pretty max-w-[640px]">
                    {L(p.description)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex px-1.5 py-0.5 text-[11px] font-mono uppercase tracking-[0.06em] text-ink-soft border border-rule-strong rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-ink-soft flex-shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
