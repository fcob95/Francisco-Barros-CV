"use client";

/**
 * ProjectDetail.tsx
 *
 * Section: /projects/[slug]
 *
 * Composition:
 *   - Back link
 *   - Kicker strip (CASE STUDY / SIDE PROJECT badge + year + role)
 *   - Title (display) + summary + tags
 *   - Hero image / abstract composition (16:7 aspect)
 *   - Two-column body:
 *       aside (sticky)  → role · year · stack · repo/demo links
 *       main            → numbered Problem (01), Solution (02), Impact (03), Metrics (04)
 *   - Footer nav (back + contact CTA)
 */

import { ArrowLeft, ArrowUpRight, Code, Github } from "lucide-react";
import type { ProjectDetail as ProjectDetailData, TFn, LFn } from "@/design-assets/v1/shapes";

export interface ProjectDetailProps {
  project: ProjectDetailData;
  t: TFn;
  L: LFn;
  onBack: () => void;
  onContact: () => void;
}

export function ProjectDetail({ project: p, t, L, onBack, onContact }: ProjectDetailProps) {
  const isCase = p.kind === "case-study";
  const accent = isCase ? "var(--color-terracotta)" : "var(--color-ocean)";

  return (
    <article
      id="project-detail"
      className="relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-8 md:pt-12 pb-16"
      aria-labelledby="project-title"
    >
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink mb-10"
      >
        <ArrowLeft size={14} />
        {t("cta.backToProjects")}
      </button>

      {/* Kicker */}
      <div className="flex items-baseline gap-3 mb-6">
        <span className="font-mono text-xs uppercase tracking-[0.12em]" style={{ color: accent }}>
          {isCase ? t("badge.caseStudy") : t("badge.sideProject")}
        </span>
        <span className="h-px flex-1 bg-rule" />
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
          {p.year} · {L(p.role)}
        </span>
      </div>

      <header className="mb-12 md:mb-16">
        <h1
          id="project-title"
          className="font-display text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] text-ink leading-[1.02] text-balance"
        >
          {L(p.title)}
        </h1>
        <p className="mt-4 text-[17px] md:text-[19px] text-ink-muted max-w-[760px] text-pretty leading-relaxed">
          {L(p.summary)}
        </p>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex px-2 py-0.5 text-[12px] font-mono uppercase tracking-[0.06em] text-ink-soft border border-rule-strong rounded-sm"
            >
              {tag}
            </span>
          ))}
          {p.status === "WIP" && (
            <span className="inline-flex px-2 py-0.5 text-[12px] font-mono uppercase tracking-[0.06em] text-ochre border border-ochre rounded-sm">
              {t("badge.wip")}
            </span>
          )}
        </div>
      </header>

      {/* Hero composition — replace with real <Image> when assets are available. */}
      <div
        className="relative w-full mb-12 md:mb-16 border border-ink bg-paper-raised overflow-hidden"
        style={{ aspectRatio: "16 / 7" }}
      >
        <DetailHeroFallback year={p.year} slug={p.slug} accent={accent} />
      </div>

      {/* Two-column body */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-24 space-y-6">
            <MetaBlock label={t("section.role")} value={L(p.role)} />
            <MetaBlock label={t("section.year")} value={String(p.year)} />
            <MetaBlock label={t("section.stack")} value={p.stack.join(" · ")} />

            {(p.links.repo || p.links.demo) && (
              <div className="pt-4 border-t border-rule space-y-2">
                {p.links.repo && (
                  <ExternalLink
                    href={p.links.repo}
                    icon={Github}
                    label={t("cta.viewRepo")}
                    target="repo"
                  />
                )}
                {p.links.demo && (
                  <ExternalLink
                    href={p.links.demo}
                    icon={Code}
                    label={t("cta.viewDemo")}
                    target="demo"
                  />
                )}
              </div>
            )}
          </div>
        </aside>

        <div className="lg:col-span-9 space-y-12">
          <Block num="01" label={t("section.problem")} body={L(p.problem)} />
          <Block num="02" label={t("section.solution")} body={L(p.solution)} />
          <Block num="03" label={t("section.impact")} body={L(p.impact)} accent={accent} />

          {p.metrics.length > 0 && (
            <section aria-labelledby="metrics-title">
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">04</span>
                <h2 id="metrics-title" className="font-display text-2xl md:text-3xl tracking-[-0.01em]">
                  {t("section.metrics")}
                </h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-px bg-rule border border-rule">
                {p.metrics.map((m, i) => (
                  <div key={i} className="bg-paper-raised p-6">
                    <div
                      className="font-display text-[40px] md:text-[48px] leading-none tracking-[-0.02em] text-ink"
                      style={i === 0 ? { color: accent } : undefined}
                    >
                      {m.value}
                    </div>
                    <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                      {L(m.label)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <nav className="flex items-center justify-between pt-8 border-t border-rule">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-ink-muted hover:text-ink"
        >
          <ArrowLeft size={14} />
          <span>{t("cta.backToProjects")}</span>
        </button>
        <button
          type="button"
          onClick={onContact}
          className="inline-flex items-center gap-2 h-11 px-5 bg-ink text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-terracotta)] transition-all rounded-sm"
        >
          {t("cta.contact")}
          <ArrowUpRight size={14} />
        </button>
      </nav>
    </article>
  );
}

function MetaBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft mb-1">{label}</div>
      <div className="text-[14px] text-ink">{value}</div>
    </div>
  );
}

function Block({ num, label, body, accent }: { num: string; label: string; body: string; accent?: string }) {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">{num}</span>
        <h2
          className="font-display text-2xl md:text-3xl tracking-[-0.01em]"
          style={accent ? { color: accent } : undefined}
        >
          {label}
        </h2>
      </div>
      <p className="text-[16px] md:text-[17px] leading-[1.65] text-ink-muted text-pretty max-w-[680px]">{body}</p>
    </section>
  );
}

function ExternalLink({
  href, icon: Icon, label, target,
}: {
  href: string; icon: React.ComponentType<{ size?: number }>; label: string; target: "repo" | "demo";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-event="project_link_click"
      data-target={target}
      className="flex items-center justify-between text-[13px] text-ink hover:text-terracotta-ink"
    >
      <span className="inline-flex items-center gap-2">
        <Icon size={14} />
        {label}
      </span>
      <ArrowUpRight size={14} />
    </a>
  );
}

/** Editorial fallback when no real hero image is available. */
function DetailHeroFallback({ year, slug, accent }: { year: number; slug: string; accent: string }) {
  return (
    <svg viewBox="0 0 1600 700" className="w-full h-full" aria-hidden>
      <rect width={1600} height={700} fill="var(--color-paper-sunken)" />
      <g transform="translate(200 100)">
        <rect width={600} height={400} fill="var(--color-paper-raised)" stroke="var(--color-ink)" strokeWidth={2} />
        <rect x={30} y={30} width={600} height={400} fill="none" stroke={accent} strokeWidth={2} opacity={0.6} />
      </g>
      <g transform="translate(900 80)">
        <circle cx={250} cy={250} r={220} fill="none" stroke="var(--color-ink)" strokeWidth={1} />
        <circle cx={250} cy={250} r={160} fill="none" stroke="var(--color-ink)" strokeWidth={1} />
        <circle cx={250} cy={250} r={100} fill={accent} opacity={0.85} />
        <text
          x={250} y={258} textAnchor="middle"
          fontFamily="Instrument Serif, serif" fontSize={64} fill="var(--color-paper)"
        >
          {year}
        </text>
      </g>
      <text
        x={60} y={660}
        fontFamily="JetBrains Mono, monospace" fontSize={18} fill="var(--color-ink-muted)" letterSpacing={2}
      >
        CASE STUDY · {slug.toUpperCase()}
      </text>
    </svg>
  );
}
