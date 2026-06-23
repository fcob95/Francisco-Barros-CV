/**
 * Services.tsx — presentational `/services` section.
 *
 * Ported from design-assets/v1/services/Services.tsx (copied by value). The
 * SEO-primary surface (applied AI for business): each service renders INDEXABLE
 * copy (keyword-bearing <h3> + paragraph + what's-included list), not bullets in
 * an image. Anchor ids (`#<slug>`) match the Service JSON-LD @id fragments and
 * the sitemap, so deep links and structured data line up.
 *
 * Server Component: unlike the asset (which was "use client" only to receive an
 * `onContact` callback), this component renders the contact CTA as a locale-aware
 * <Link href="/contact"> directly, so it needs no client hooks. All copy arrives
 * locale-resolved from the Server container as serializable props (no `t`/`L`/`pick`
 * called here, no content access). The `icon` string is mapped to its lucide
 * component below.
 */

import {
  Database,
  FileBarChart,
  Plug,
  Sparkles,
  Workflow,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { Service } from "@/lib/content";

const ICONS: Record<Service["icon"], LucideIcon> = {
  Workflow,
  Plug,
  Database,
  FileBarChart,
  Sparkles,
};

/** One service already locale-resolved to single strings for rendering. */
export interface ServiceView {
  slug: string;
  title: string;
  description: string;
  includes: string[];
  icon: Service["icon"];
}

/** Resolved copy bundle — built in the Server container from messages. */
export interface ServicesCopy {
  /** Numbered-header left label: "06 / Servicios" / "06 / Services". */
  sectionLabel: string;
  /** Numbered-header right suffix: "servicios" / "services" (used as `{n} · …`). */
  countSuffix: string;
  /** Section title (services.heading). */
  heading: string;
  /** Lead paragraph under the title (services.intro). */
  intro: string;
  /** CTA pull-question (services.ctaQuestion). */
  ctaQuestion: string;
  /** CTA button label — reuses cta.contact. */
  contact: string;
}

export interface ServicesProps {
  services: ServiceView[];
  copy: ServicesCopy;
}

export function Services({ services, copy }: ServicesProps) {
  return (
    <section
      id="services"
      className="relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-20 pb-16"
      aria-labelledby="services-title"
    >
      <div className="flex items-baseline gap-3 mb-10 md:mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
          {copy.sectionLabel}
        </span>
        <span className="h-px flex-1 bg-rule" />
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
          {services.length} · {copy.countSuffix}
        </span>
      </div>

      {/* Single H1 per page lives in the page wrapper; here we use H2 for the
          section title and H3 per service. */}
      <header className="mb-12 md:mb-16 max-w-[820px]">
        <h2
          id="services-title"
          className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.01em] text-ink leading-[1.02] text-balance"
        >
          {copy.heading}
        </h2>
        <p className="mt-4 text-[16px] md:text-[18px] text-ink-muted text-pretty leading-relaxed">
          {copy.intro}
        </p>
      </header>

      <div className="space-y-px bg-rule border border-rule">
        {services.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <article key={s.slug} id={s.slug} className="bg-paper p-6 md:p-10 scroll-mt-24">
              <div className="grid md:grid-cols-12 gap-6 md:gap-10">
                <div className="md:col-span-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 border border-ink rounded-sm text-ink">
                      <Icon size={18} />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* Keyword-bearing heading. */}
                  <h3 className="font-display text-[26px] md:text-[30px] leading-[1.08] tracking-[-0.01em] text-ink">
                    {s.title}
                  </h3>
                </div>

                <div className="md:col-span-8">
                  <p className="text-[16px] md:text-[17px] leading-[1.65] text-ink-muted text-pretty mb-5">
                    {s.description}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {s.includes.map((it, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[14px] text-ink">
                        <span aria-hidden className="inline-block w-3 h-px bg-terracotta mt-2.5 flex-shrink-0" />
                        <span className="text-pretty">{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* CTA — reachable from every service surface (internal-linking + conversion). */}
      <div
        className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 md:p-8 border border-ink bg-paper-raised"
        style={{ boxShadow: "6px 6px 0 0 var(--color-ink)" }}
      >
        <p className="font-display text-2xl md:text-3xl tracking-[-0.01em] text-ink text-balance max-w-[560px]">
          {copy.ctaQuestion}
        </p>
        {/* DESIGN-DEVIATION: asset's onContact button replaced by a locale-aware
            <Link href="/contact"> so the section stays a Server Component
            (no client callback). Sticker-shadow visual treatment preserved. */}
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 h-12 px-6 bg-ink text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-terracotta)] transition-all rounded-sm flex-shrink-0"
        >
          {copy.contact}
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
