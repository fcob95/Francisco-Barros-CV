/**
 * ProjectDetail.tsx — presentational, ported from
 * design-assets/v1/project-detail/ProjectDetail.tsx (copied by value).
 *
 * Section `/projects/[slug]`. Full case-study / side-project page.
 *
 * This component has NO client interactivity: no hooks, no local state. The
 * asset's `onBack`/`onContact` callbacks are replaced by next-intl <Link>s
 * (navigation owned by the router), and `<Link>` works fine in a Server
 * Component, so this presentational stays a Server Component — no "use client".
 *
 * DESIGN-DEVIATION: the asset's footer "back"/"contact" `<button onClick>` and the
 * top `onBack` button are replaced by next-intl <Link> to `/projects` and
 * `/contact`. Imperative callbacks do not fit the routing model; the editorial
 * styling is preserved verbatim.
 *
 * data-event="project_link_click" / data-target / data-slug stay intact on external
 * links for PostHog wiring in F6 (the delegated listener in AnalyticsProvider reads
 * el.dataset.slug for attribution). The hero composition is the asset's editorial SVG
 * fallback (real <Image> deferred until art exists).
 */

import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Code,
  Download,
  Github,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { ProjectDetailCopy, ProjectDetailView } from "./types";

export interface ProjectDetailProps {
  project: ProjectDetailView;
  copy: ProjectDetailCopy;
}

export function ProjectDetail({ project: p, copy }: ProjectDetailProps) {
  const isCase = p.kind === "case-study";
  const accent = isCase ? "var(--color-terracotta)" : "var(--color-ocean)";

  return (
    <article
      id="project-detail"
      className="relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-8 md:pt-12 pb-16"
      aria-labelledby="project-title"
    >
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink mb-10 outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
      >
        <ArrowLeft size={14} />
        {copy.backToProjects}
      </Link>

      {/* Kicker */}
      <div className="flex items-baseline gap-3 mb-6">
        <span
          className="font-mono text-xs uppercase tracking-[0.12em]"
          style={{ color: accent }}
        >
          {isCase ? copy.caseStudy : copy.sideProject}
        </span>
        <span className="h-px flex-1 bg-rule" />
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
          {p.year} · {p.role}
        </span>
      </div>

      <header className="mb-12 md:mb-16">
        <h1
          id="project-title"
          className="font-display text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] text-ink leading-[1.02] text-balance"
        >
          {p.title}
        </h1>
        <p className="mt-4 text-[17px] md:text-[19px] text-ink-muted max-w-[760px] text-pretty leading-relaxed">
          {p.summary}
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
          {p.isWip && (
            <span className="inline-flex px-2 py-0.5 text-[12px] font-mono uppercase tracking-[0.06em] text-ochre border border-ochre rounded-sm">
              {copy.wip}
            </span>
          )}
        </div>
      </header>

      {/* Hero composition — editorial SVG fallback; replace with <Image> when art exists. */}
      <div
        className="relative w-full mb-12 md:mb-16 border border-ink bg-paper-raised overflow-hidden"
        style={{ aspectRatio: "16 / 7" }}
      >
        <DetailHeroFallback
          year={p.year}
          slug={p.slug}
          kind={p.kind}
          accent={accent}
        />
      </div>

      {/* Two-column body */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-24 space-y-6">
            <MetaBlock label={copy.role} value={p.role} />
            <MetaBlock label={copy.year} value={String(p.year)} />
            <MetaBlock label={copy.stack} value={p.stack.join(" · ")} />

            {(p.links.repo || p.links.demo) && (
              <div className="pt-4 border-t border-rule space-y-2">
                {p.links.repo && (
                  <ExternalLink
                    href={p.links.repo}
                    icon={Github}
                    label={copy.viewRepo}
                    target="repo"
                    slug={p.slug}
                  />
                )}
                {p.links.demo && (
                  <ExternalLink
                    href={p.links.demo}
                    icon={Code}
                    label={copy.viewDemo}
                    target="demo"
                    slug={p.slug}
                  />
                )}
              </div>
            )}
          </div>
        </aside>

        <div className="lg:col-span-9 space-y-12">
          <Block num="01" label={copy.problem} body={p.problem} />
          <Block num="02" label={copy.solution} body={p.solution} />
          <Block num="03" label={copy.impact} body={p.impact} accent={accent} />

          {p.metrics.length > 0 && (
            <section aria-labelledby="metrics-title">
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                  04
                </span>
                <h2
                  id="metrics-title"
                  className="font-display text-2xl md:text-3xl tracking-[-0.01em]"
                >
                  {copy.metrics}
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
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {p.downloads.length > 0 && (
            <section aria-labelledby="downloads-title">
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                  05
                </span>
                <h2
                  id="downloads-title"
                  className="font-display text-2xl md:text-3xl tracking-[-0.01em]"
                >
                  {copy.downloads}
                </h2>
              </div>
              <ul className="space-y-3">
                {p.downloads.map((d) => (
                  <li key={d.file}>
                    <a
                      href={d.file}
                      download
                      data-event="document_download"
                      data-id={d.file}
                      className="group flex items-start gap-4 p-4 bg-paper-raised border border-rule hover:border-rule-strong transition-colors rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                    >
                      <span
                        aria-hidden
                        className="mt-0.5 text-ink-muted group-hover:text-terracotta-ink"
                      >
                        <Download size={18} />
                      </span>
                      <span className="flex-1">
                        <span className="block text-[15px] font-medium text-ink">
                          {d.label}
                        </span>
                        <span className="mt-1 block text-[13px] leading-relaxed text-ink-muted">
                          {d.summary}
                        </span>
                      </span>
                      <ArrowDown
                        size={16}
                        aria-hidden
                        className="mt-1 flex-shrink-0 text-ink-soft group-hover:text-ink"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      <nav className="flex items-center justify-between pt-8 border-t border-rule">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-ink-muted hover:text-ink outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
        >
          <ArrowLeft size={14} />
          <span>{copy.backToProjects}</span>
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 h-11 px-5 bg-ink text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-terracotta)] transition-all rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          {copy.contact}
          <ArrowUpRight size={14} />
        </Link>
      </nav>
    </article>
  );
}

function MetaBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft mb-1">
        {label}
      </div>
      <div className="text-[14px] text-ink">{value}</div>
    </div>
  );
}

function Block({
  num,
  label,
  body,
  accent,
}: {
  num: string;
  label: string;
  body: string;
  accent?: string;
}) {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
          {num}
        </span>
        <h2
          className="font-display text-2xl md:text-3xl tracking-[-0.01em]"
          style={accent ? { color: accent } : undefined}
        >
          {label}
        </h2>
      </div>
      <p className="text-[16px] md:text-[17px] leading-[1.65] text-ink-muted text-pretty max-w-[680px]">
        {body}
      </p>
    </section>
  );
}

function ExternalLink({
  href,
  icon: Icon,
  label,
  target,
  slug,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  target: "repo" | "demo";
  slug: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-event="project_link_click"
      data-target={target}
      data-slug={slug}
      className="flex items-center justify-between text-[13px] text-ink hover:text-terracotta-ink outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
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
function DetailHeroFallback({
  year,
  slug,
  kind,
  accent,
}: {
  year: number;
  slug: string;
  kind: "case-study" | "side-project";
  accent: string;
}) {
  return (
    <svg viewBox="0 0 1600 700" className="w-full h-full" aria-hidden>
      <rect width={1600} height={700} fill="var(--color-paper-sunken)" />
      <g transform="translate(200 100)">
        <rect
          width={600}
          height={400}
          fill="var(--color-paper-raised)"
          stroke="var(--color-ink)"
          strokeWidth={2}
        />
        <rect
          x={30}
          y={30}
          width={600}
          height={400}
          fill="none"
          stroke={accent}
          strokeWidth={2}
          opacity={0.6}
        />
      </g>
      <g transform="translate(900 80)">
        <circle
          cx={250}
          cy={250}
          r={220}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth={1}
        />
        <circle
          cx={250}
          cy={250}
          r={160}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth={1}
        />
        <circle cx={250} cy={250} r={100} fill={accent} opacity={0.85} />
        <text
          x={250}
          y={258}
          textAnchor="middle"
          fontFamily="Instrument Serif, serif"
          fontSize={64}
          fill="var(--color-paper)"
        >
          {year}
        </text>
      </g>
      <text
        x={60}
        y={660}
        fontFamily="JetBrains Mono, monospace"
        fontSize={18}
        fill="var(--color-ink-muted)"
        letterSpacing={2}
      >
        {kind === "case-study" ? "CASE STUDY" : "SIDE PROJECT"} ·{" "}
        {slug.toUpperCase()}
      </text>
    </svg>
  );
}
