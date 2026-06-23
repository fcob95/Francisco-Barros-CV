"use client";

/**
 * ProjectCard.tsx — presentational, ported from
 * design-assets/v1/projects-list/ProjectCard.tsx (copied by value).
 *
 * "use client" justification: hover swaps the offset shadow from ink → accent via
 * inline mouse handlers, matching the asset's editorial lift. No data access.
 *
 * Visual differentiation:
 * - kind === "case-study"  → terracotta accent, square-dot badge
 * - kind === "side-project" → ocean accent, diamond-dot badge (rotated square)
 * - featured                → grid-spans 2 columns, taller visual, "Featured" sub-badge
 *
 * DESIGN-DEVIATION: the asset used `<article role="link" tabIndex onClick onKeyDown>`
 * plus an `onOpen(slug)` callback. In production, navigation is owned by the router,
 * so the card is wrapped in the next-intl <Link> to `/projects/[slug]`. The <Link>
 * (an <a>) provides native keyboard activation and link semantics, so the synthetic
 * role/tabIndex/keydown are dropped. The editorial hover shadow is preserved.
 * data-event="project_view" / data-slug stay intact for PostHog wiring in F6.
 */

import { ArrowUpRight, Sparkles } from "lucide-react";

import { Link } from "@/i18n/navigation";
import {
  CompanyLogo,
  isCompanySlug,
} from "@/components/sections/chrome/CompanyLogo";
import { MetricSticker } from "./MetricSticker";
import { ProjectVisual } from "./ProjectVisual";
import type { ProjectCardView, ProjectsListCopy } from "./types";

export interface ProjectCardProps {
  project: ProjectCardView;
  copy: ProjectsListCopy;
}

export function ProjectCard({ project: p, copy }: ProjectCardProps) {
  const isCase = p.kind === "case-study";
  const accent = isCase ? "var(--color-terracotta)" : "var(--color-ocean)";
  const company = p.company && isCompanySlug(p.company) ? p.company : null;

  return (
    <Link
      href={`/projects/${p.slug}`}
      aria-label={`${copy.cardAriaPrefix}${p.title}`}
      data-event="project_view"
      data-slug={p.slug}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `7px 7px 0 0 ${accent}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "4px 4px 0 0 var(--color-ink)";
      }}
      style={{
        boxShadow: "4px 4px 0 0 var(--color-ink)",
      }}
      className={`group relative block bg-paper-raised border border-ink no-underline outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-all duration-300 hover:-translate-x-[3px] hover:-translate-y-[3px] ${
        // Featured cards span 2 columns — but only once the grid HAS ≥2 columns
        // (sm and up). On mobile the grid is a single column, so an unconditional
        // span-2 created a phantom 2nd track and overflowed the viewport.
        p.featured ? "sm:col-span-2" : ""
      }`}
    >
      <article>
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
                style={{
                  background: accent,
                  transform: isCase ? "none" : "rotate(45deg)",
                }}
              />
              {isCase ? copy.caseStudy : copy.sideProject}
            </span>
            {p.featured && (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-terracotta-ink border-l border-rule-strong pl-2 flex-shrink-0">
                <Sparkles size={10} />
                {copy.featured}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2.5 text-ink-muted flex-shrink-0">
            {company && <CompanyLogo company={company} size={14} />}
            {company && (
              <span
                aria-hidden
                className="inline-block w-px h-3 bg-rule-strong"
              />
            )}
            <span className="font-mono text-[11px] text-ink-soft">
              {p.year}
            </span>
          </div>
        </header>

        {/* Body */}
        <div className="p-5 md:p-6">
          <ProjectVisual slug={p.slug} kind={p.kind} featured={p.featured} />
          <MetricSticker metric={p.primaryMetric} accent={accent} />

          <h3 className="font-display text-[22px] md:text-[26px] leading-[1.1] tracking-[-0.01em] text-ink mt-5 mb-2 text-balance">
            {p.title}
          </h3>
          <p className="text-[14px] text-ink-muted leading-[1.55] text-pretty">
            {p.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-1">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex px-1.5 py-0.5 text-[11px] font-mono uppercase tracking-[0.06em] text-ink-soft border border-rule-strong rounded-sm"
              >
                {tag}
              </span>
            ))}
            {p.isWip && (
              <span className="inline-flex px-1.5 py-0.5 text-[11px] font-mono uppercase tracking-[0.06em] text-ochre border border-ochre rounded-sm">
                {copy.wip}
              </span>
            )}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <footer className="flex items-center justify-between px-4 py-2 border-t border-rule bg-paper font-mono text-[11px] uppercase tracking-[0.08em] text-ink">
          <span>{copy.readMore}</span>
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </footer>
      </article>
    </Link>
  );
}
