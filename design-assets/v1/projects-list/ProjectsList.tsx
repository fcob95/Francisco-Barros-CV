"use client";

/**
 * ProjectsList.tsx
 *
 * Section: /projects — filterable editorial grid.
 *
 * Filter strip (above grid):
 *   [▽ Filtrar por] [Todos] [Case study] [Side project] | [TAG-1] [TAG-2] ...
 *
 * Filter logic:
 *   - "all"          → all projects
 *   - "case-study"   → filter by kind
 *   - "side-project" → filter by kind
 *   - any tag        → filter by tag membership
 *
 * Featured cards span 2 columns. Layout: 1 / 2 / 3 cols (sm / md / lg).
 * Empty state shows when filter returns 0 (PRD §6: empty states).
 */

import { useMemo, useState } from "react";
import { Filter } from "lucide-react";
import type { ProjectCard as ProjectCardData, TFn, LFn } from "@/design-assets/v1/shapes";
import { ProjectCard, ProjectCardSkeleton } from "./ProjectCard";

export interface ProjectsListProps {
  projects: ProjectCardData[];
  locale: "es" | "en";
  t: TFn;
  L: LFn;
  onOpen: (slug: string) => void;
  /** Optional: render skeletons while data is loading. */
  loading?: boolean;
}

type FilterValue = "all" | "case-study" | "side-project" | string;

export function ProjectsList({ projects, locale, t, L, onOpen, loading }: ProjectsListProps) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const tags = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.tags.forEach((tg) => s.add(tg)));
    return Array.from(s).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    if (filter === "case-study" || filter === "side-project") {
      return projects.filter((p) => p.kind === filter);
    }
    return projects.filter((p) => p.tags.includes(filter));
  }, [filter, projects]);

  return (
    <section
      id="projects"
      className="relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-20 pb-16"
      aria-labelledby="projects-title"
    >
      {/* Numbered header */}
      <div className="flex items-baseline gap-3 mb-10 md:mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">03 / Projects</span>
        <span className="h-px flex-1 bg-rule" />
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
          {projects.length} · {locale === "es" ? "total" : "total"}
        </span>
      </div>

      <header className="mb-10">
        <h2
          id="projects-title"
          className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.01em] text-ink leading-[1.02] text-balance"
        >
          {locale === "es" ? "Trabajo seleccionado." : "Selected work."}
        </h2>
        <p className="mt-3 text-[15px] md:text-[17px] text-ink-muted max-w-[680px] text-pretty">
          {locale === "es"
            ? "Cuatro case studies de implementaciones con impacto medible, y dos side projects donde experimento con stack propio."
            : "Four case studies of implementations with measurable impact, plus two side projects where I experiment with my own stack."}
        </p>
      </header>

      {/* Filter strip */}
      <div
        className="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b border-rule"
        role="group"
        aria-label={t("section.filterBy")}
      >
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft mr-2">
          <Filter size={11} />
          {t("section.filterBy")}
        </span>
        <FilterChip label={t("section.all")} active={filter === "all"} onClick={() => setFilter("all")} />
        <FilterChip
          label={t("badge.caseStudy")}
          active={filter === "case-study"}
          onClick={() => setFilter("case-study")}
          dot="var(--color-terracotta)"
        />
        <FilterChip
          label={t("badge.sideProject")}
          active={filter === "side-project"}
          onClick={() => setFilter("side-project")}
          dot="var(--color-ocean)"
          dotRotate
        />
        <span aria-hidden className="inline-block w-px h-4 bg-rule mx-1" />
        {tags.slice(0, 6).map((tg) => (
          <FilterChip key={tg} label={tg} active={filter === tg} onClick={() => setFilter(tg)} mono />
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <ProjectCardSkeleton featured />
          <ProjectCardSkeleton featured />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState message={t("section.nothing")} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-auto">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} t={t} L={L} onOpen={onOpen} />
          ))}
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  dot?: string;
  dotRotate?: boolean;
  mono?: boolean;
}

function FilterChip({ label, active, onClick, dot, dotRotate, mono }: FilterChipProps) {
  const base = "inline-flex items-center gap-1.5 px-2.5 h-7 border text-[12px] rounded-sm transition-colors";
  const monoCls = mono ? "font-mono uppercase tracking-[0.06em] text-[11px]" : "";
  const tone = active
    ? "bg-ink text-paper border-ink"
    : "bg-transparent text-ink-muted border-rule-strong hover:text-ink hover:border-ink";
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={`${base} ${monoCls} ${tone}`}>
      {dot && (
        <span
          aria-hidden
          className="inline-block w-1.5 h-1.5"
          style={{ background: dot, transform: dotRotate ? "rotate(45deg)" : "none" }}
        />
      )}
      {label}
    </button>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-16 text-center text-ink-muted border border-dashed border-rule-strong rounded-sm">
      {message}
    </div>
  );
}
