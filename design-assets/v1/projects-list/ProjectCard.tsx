"use client";

/**
 * ProjectCard.tsx
 *
 * Single card on /projects grid.
 *
 * Visual differentiation:
 * - kind === "case-study"  → terracotta accent, square-dot badge
 * - kind === "side-project" → ocean accent, diamond-dot badge (rotated square)
 * - featured                → grid-spans 2 columns, taller visual block, "Featured" sub-badge
 *
 * Visual block is a per-slug abstract SVG composition (ProjectVisual.tsx) — no stock photos.
 * Hover: card lifts -3/-3px with offset shadow swapping from ink → accent.
 * Keyboard: Enter/Space activates onOpen.
 */

import { ArrowUpRight, Sparkles } from "lucide-react";
import type { ProjectCard as ProjectCardData, TFn, LFn } from "@/design-assets/v1/shapes";
import { CompanyLogo } from "@/design-assets/v1/chrome/CompanyLogo";
import { MetricSticker } from "./MetricSticker";
import { ProjectVisual } from "./ProjectVisual";

export interface ProjectCardProps {
  project: ProjectCardData;
  t: TFn;
  L: LFn;
  onOpen: (slug: string) => void;
}

export function ProjectCard({ project: p, t, L, onOpen }: ProjectCardProps) {
  const isCase = p.kind === "case-study";
  const accent = isCase ? "var(--color-terracotta)" : "var(--color-ocean)";

  const handleKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(p.slug);
    }
  };

  return (
    <article
      tabIndex={0}
      role="link"
      aria-label={L(p.title)}
      onClick={() => onOpen(p.slug)}
      onKeyDown={handleKey}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `7px 7px 0 0 ${accent}`; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "4px 4px 0 0 var(--color-ink)"; }}
      data-event="project_view"
      data-slug={p.slug}
      style={{
        boxShadow: "4px 4px 0 0 var(--color-ink)",
        gridColumn: p.featured ? "span 2" : "span 1",
      }}
      className="group relative bg-paper-raised border border-ink cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-all duration-300 hover:-translate-x-[3px] hover:-translate-y-[3px]"
    >
      {/* Top strip — kind + featured + company + year */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-ink bg-paper-sunken">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] flex-shrink-0"
            style={{ color: accent }}
          >
            <span
              aria-hidden
              className="inline-block w-1.5 h-1.5"
              style={{ background: accent, transform: isCase ? "none" : "rotate(45deg)" }}
            />
            {isCase ? t("badge.caseStudy") : t("badge.sideProject")}
          </span>
          {p.featured && (
            <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-terracotta-ink border-l border-rule-strong pl-2 flex-shrink-0">
              <Sparkles size={10} />
              {t("badge.featured")}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2.5 text-ink-muted flex-shrink-0">
          {p.company && <CompanyLogo company={p.company} size={14} />}
          {p.company && <span aria-hidden className="inline-block w-px h-3 bg-rule-strong" />}
          <span className="font-mono text-[11px] text-ink-soft">{p.year}</span>
        </div>
      </header>

      {/* Body */}
      <div className="p-5 md:p-6">
        <ProjectVisual slug={p.slug} kind={p.kind} featured={p.featured} />
        {p.primaryMetric && <MetricSticker metric={p.primaryMetric} accent={accent} L={L} />}

        <h3 className="font-display text-[22px] md:text-[26px] leading-[1.1] tracking-[-0.01em] text-ink mt-5 mb-2 text-balance">
          {L(p.title)}
        </h3>
        <p className="text-[14px] text-ink-muted leading-[1.55] text-pretty">{L(p.summary)}</p>

        <div className="mt-4 flex flex-wrap gap-1">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex px-1.5 py-0.5 text-[11px] font-mono uppercase tracking-[0.06em] text-ink-soft border border-rule-strong rounded-sm"
            >
              {tag}
            </span>
          ))}
          {p.status === "WIP" && (
            <span className="inline-flex px-1.5 py-0.5 text-[11px] font-mono uppercase tracking-[0.06em] text-ochre border border-ochre rounded-sm">
              {t("badge.wip")}
            </span>
          )}
        </div>
      </div>

      {/* Bottom CTA strip */}
      <footer className="flex items-center justify-between px-4 py-2 border-t border-rule bg-paper font-mono text-[11px] uppercase tracking-[0.08em] text-ink">
        <span>{t("cta.readMore")}</span>
        <ArrowUpRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </footer>
    </article>
  );
}

/** Skeleton variant for loading state (PRD §6: skeletons for projects list). */
export function ProjectCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div
      style={{ gridColumn: featured ? "span 2" : "span 1" }}
      className="border border-rule bg-paper-raised h-[420px] animate-pulse"
      aria-hidden
    />
  );
}
