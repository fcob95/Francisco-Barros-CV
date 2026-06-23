"use client";

/**
 * Services.tsx
 *
 * Section /servicios — the SEO-primary surface (applied AI for business).
 *
 * Each service renders INDEXABLE copy (heading + paragraph + what's-included
 * list), not bullets-in-an-image. Headings use the target keyword naturally.
 * Anchor ids (`#<slug>`) match the Service JSON-LD @id fragments and the
 * sitemap, so deep links and structured data line up.
 *
 * Pair with <ServicesJsonLd services={SERVICES} /> on the same page.
 */

import { Database, FileBarChart, Plug, Sparkles, Workflow, ArrowUpRight, type LucideIcon } from "lucide-react";
import type { Service } from "./services.data";
import type { TFn, LFn } from "@/design-assets/v1/shapes";

const ICONS: Record<Service["icon"], LucideIcon> = {
  Workflow,
  Plug,
  Database,
  FileBarChart,
  Sparkles,
};

export interface ServicesProps {
  services: Service[];
  locale: "es" | "en";
  t: TFn;
  L: LFn;
  onContact: () => void;
}

export function Services({ services, locale, t, L, onContact }: ServicesProps) {
  return (
    <section
      id="services"
      className="relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-20 pb-16"
      aria-labelledby="services-title"
    >
      <div className="flex items-baseline gap-3 mb-10 md:mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">06 / Servicios</span>
        <span className="h-px flex-1 bg-rule" />
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
          {services.length} · {locale === "es" ? "servicios" : "services"}
        </span>
      </div>

      {/* Single H1 per page lives in the page wrapper; here we use H2 for the section
          title and H3 per service — adjust to H1 if this is the /servicios route root. */}
      <header className="mb-12 md:mb-16 max-w-[820px]">
        <h2
          id="services-title"
          className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.01em] text-ink leading-[1.02] text-balance"
        >
          {locale === "es" ? "IA aplicada a tu negocio." : "Applied AI for your business."}
        </h2>
        <p className="mt-4 text-[16px] md:text-[18px] text-ink-muted text-pretty leading-relaxed">
          {locale === "es"
            ? "Automatización con IA, integración de IA, sistemas RAG y reportería automatizada — con el criterio de pricing y revenue analytics como diferenciador."
            : "AI automation, AI integration, RAG systems and automated reporting — with a pricing and revenue-analytics lens as the differentiator."}
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
                    {L(s.title)}
                  </h3>
                </div>

                <div className="md:col-span-8">
                  <p className="text-[16px] md:text-[17px] leading-[1.65] text-ink-muted text-pretty mb-5">
                    {L(s.description)}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {s.includes.map((it, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[14px] text-ink">
                        <span aria-hidden className="inline-block w-3 h-px bg-terracotta mt-2.5 flex-shrink-0" />
                        <span className="text-pretty">{L(it)}</span>
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
      <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 md:p-8 border border-ink bg-paper-raised" style={{ boxShadow: "6px 6px 0 0 var(--color-ink)" }}>
        <p className="font-display text-2xl md:text-3xl tracking-[-0.01em] text-ink text-balance max-w-[560px]">
          {locale === "es"
            ? "¿Cuál de estos resolvería tu próximo cuello de botella?"
            : "Which of these would unblock your next bottleneck?"}
        </p>
        <button
          type="button"
          onClick={onContact}
          className="inline-flex items-center gap-2 h-12 px-6 bg-ink text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-terracotta)] transition-all rounded-sm flex-shrink-0"
        >
          {t("cta.contact")}
          <ArrowUpRight size={15} />
        </button>
      </div>
    </section>
  );
}
