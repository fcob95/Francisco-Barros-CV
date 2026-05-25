"use client";

/**
 * Experience.tsx
 *
 * Section: /experience
 * Vertical editorial timeline. Each item:
 *   [date column] | dot on rail | [content card with shadow]
 * Closing entry is the formal Education block (different dot style).
 */

import { Calendar, Download, MapPin } from "lucide-react";
import type { Education, ExperienceItem, Profile, CompanySlug, TFn, LFn } from "@/design-assets/v1/shapes";
import { CompanyLogo } from "@/design-assets/v1/chrome/CompanyLogo";

export interface ExperienceProps {
  items: ExperienceItem[];
  education: Education;
  profile: Profile;
  locale: "es" | "en";
  t: TFn;
  L: LFn;
}

export function Experience({ items, education, profile, locale, t, L }: ExperienceProps) {
  const cvHref = profile.cvUrl[locale];

  return (
    <section
      id="experience"
      className="relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-20 pb-16"
      aria-labelledby="experience-title"
    >
      <div className="flex items-baseline gap-3 mb-10 md:mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">04 / Experience</span>
        <span className="h-px flex-1 bg-rule" />
        <a
          href={cvHref}
          download
          data-event="document_download"
          data-id="cv"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted hover:text-ink"
        >
          <Download size={11} /> {t("cta.downloadCv")} / {locale.toUpperCase()}
        </a>
      </div>

      <h2
        id="experience-title"
        className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.01em] text-ink leading-[1.02] mb-12 md:mb-16 text-balance"
      >
        {t("section.experience")}.
      </h2>

      <ol className="relative space-y-12 md:space-y-16">
        {/* Vertical rail */}
        <div
          aria-hidden
          className="absolute left-3 md:left-[140px] top-2 bottom-2 w-px bg-rule-strong"
        />

        {items.map((it, i) => (
          <li key={i} className="relative grid md:grid-cols-[140px_1fr] gap-4 md:gap-10 items-start">
            <DateColumn period={formatPeriod(it.period.start, it.period.end, locale)} location={it.location} />
            <ContentCard item={it} index={i} total={items.length} L={L} />
          </li>
        ))}

        <li className="relative grid md:grid-cols-[140px_1fr] gap-4 md:gap-10 items-start">
          <DateColumn period={education.period} location={education.location} subtle />
          <EducationCard education={education} t={t} L={L} />
        </li>
      </ol>
    </section>
  );
}

function DateColumn({ period, location, subtle }: { period: string; location: string; subtle?: boolean }) {
  return (
    <div className="flex items-start gap-3 md:block md:pt-1">
      <span
        aria-hidden
        className={`relative z-10 inline-flex items-center justify-center w-6 h-6 bg-paper border md:absolute md:left-[128px] ${
          subtle ? "border-ink-soft rounded-full" : "border-ink rounded-sm"
        }`}
      >
        {subtle ? (
          <span className="w-1.5 h-1.5 bg-ink-soft rounded-full" />
        ) : (
          <span className="w-2 h-2 bg-terracotta" />
        )}
      </span>
      <div className="md:pr-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">{period}</div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft flex items-center gap-1">
          <MapPin size={10} /> {location}
        </div>
      </div>
    </div>
  );
}

function ContentCard({
  item, index, total, L,
}: { item: ExperienceItem & { logo?: CompanySlug }; index: number; total: number; L: LFn }) {
  return (
    <div
      className="bg-paper-raised border border-rule-strong p-6 md:p-8"
      style={{ boxShadow: "4px 4px 0 0 var(--color-rule-strong)" }}
    >
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <div className="flex items-baseline gap-3 min-w-0">
          {item.logo && (
            <span className="text-ink flex-shrink-0 self-center inline-flex items-center justify-center w-8 h-8 border border-rule-strong rounded-sm bg-paper">
              <CompanyLogo company={item.logo} size={18} variant="icon" />
            </span>
          )}
          <h3 className="font-display text-[26px] md:text-[30px] leading-[1.05] tracking-[-0.01em] text-ink">
            {item.company}
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft flex-shrink-0">
          {String(total - index).padStart(2, "0")}
        </span>
      </div>
      <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-muted mb-4">{L(item.role)}</p>
      <p className="text-[15px] text-ink-muted leading-[1.6] mb-5 text-pretty">{L(item.summary)}</p>
      <ul className="space-y-2">
        {item.highlights.map((h, j) => (
          <li key={j} className="flex items-start gap-3 text-[14px] text-ink">
            <span aria-hidden className="inline-block w-3 h-px bg-ink mt-3 flex-shrink-0" />
            <span className="text-pretty">{L(h)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EducationCard({ education, t, L }: { education: Education; t: TFn; L: LFn }) {
  return (
    <div className="bg-paper-sunken border border-rule p-6">
      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft mb-2">
        {t("section.education")}
      </div>
      <h3 className="font-display text-[24px] leading-[1.1] tracking-[-0.01em] text-ink mb-1">{L(education.degree)}</h3>
      <p className="text-[14px] text-ink-muted">{education.school}</p>
      <ul className="mt-3 space-y-1 text-[13px] text-ink-muted">
        {education.notes.map((n, i) => (
          <li key={i} className="flex items-start gap-2">
            <span aria-hidden className="inline-block w-2 h-px bg-ink-soft mt-2.5" />
            <span>{L(n)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatPeriod(start: string, end: string | "present", locale: "es" | "en") {
  const months =
    locale === "es"
      ? ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
      : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fmt = (s: string) => {
    if (s === "present") return locale === "es" ? "Presente" : "Present";
    const [y, m] = s.split("-");
    return `${months[parseInt(m, 10) - 1]} ${y}`;
  };
  return `${fmt(start)} — ${fmt(end)}`;
}
