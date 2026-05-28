/**
 * Experience.tsx — presentational `/experience` section.
 *
 * Ported from design-assets/v1/experience/Experience.tsx (copied by value).
 * Vertical editorial timeline: [date column] | dot on rail | [content card].
 * The closing entry is the formal Education block (different dot style).
 *
 * Server Component: the asset was "use client" by default but uses no client
 * hooks — it is pure presentation, so it renders on the server. All copy arrives
 * locale-resolved from the Server container as serializable props (no `t`/`L`/`pick`
 * called here, no content access). `formatPeriod` is a pure, locale-aware helper.
 *
 * data-event attributes on the CV download are preserved verbatim; PostHog wiring
 * is deferred to F6.
 *
 * Print: globals.css @media print keeps each timeline entry page-break-safe.
 */

import { Download, MapPin } from "lucide-react";

import {
  CompanyLogo,
  isCompanySlug,
} from "@/components/sections/chrome/CompanyLogo";

/** Experience item already locale-resolved to single strings. */
export interface ExperienceItemView {
  company: string;
  role: string;
  /** ISO `YYYY-MM` or the literal "present". */
  period: { start: string; end: string };
  location: string;
  summary: string;
  highlights: string[];
}

/** Education block already locale-resolved to single strings. */
export interface EducationView {
  degree: string;
  school: string;
  period: string;
  location: string;
  notes: string[];
}

/** Resolved copy bundle — built in the Server container from messages/content. */
export interface ExperienceCopy {
  /** Section title (section.experience). */
  title: string;
  /** Education sub-block label (section.education). */
  educationLabel: string;
  downloadCv: string;
  /** Locale-aware "present" rendering, resolved upstream. */
  present: string;
}

export interface ExperienceProps {
  items: ExperienceItemView[];
  education: EducationView;
  /** CV download href, already locale-resolved. */
  cvHref: string;
  /** Locale resolved upstream; used for period formatting + the `/EN` badge. */
  locale: "es" | "en";
  copy: ExperienceCopy;
}

export function Experience({
  items,
  education,
  cvHref,
  locale,
  copy,
}: ExperienceProps) {
  return (
    <section
      id="experience"
      className="relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-20 pb-16"
      aria-labelledby="experience-title"
    >
      <div className="flex items-baseline gap-3 mb-10 md:mb-12">
        {/* Editorial number strip kept verbatim (consistent with Bloque A). */}
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
          04 / Experience
        </span>
        <span className="h-px flex-1 bg-rule" />
        <a
          href={cvHref}
          download
          data-event="document_download"
          data-id="cv"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted hover:text-ink"
        >
          <Download size={11} /> {copy.downloadCv} / {locale.toUpperCase()}
        </a>
      </div>

      <h2
        id="experience-title"
        className="font-display text-4xl md:text-5xl lg:text-6xl tracking-[-0.01em] text-ink leading-[1.02] mb-12 md:mb-16 text-balance"
      >
        {copy.title}.
      </h2>

      <ol className="experience-timeline relative space-y-12 md:space-y-16">
        {/* Vertical rail */}
        <div
          aria-hidden
          className="absolute left-3 md:left-[140px] top-2 bottom-2 w-px bg-rule-strong"
        />

        {items.map((it, i) => (
          <li
            key={i}
            className="experience-entry relative grid md:grid-cols-[140px_1fr] gap-4 md:gap-10 items-start"
          >
            <DateColumn
              period={formatPeriod(
                it.period.start,
                it.period.end,
                locale,
                copy.present,
              )}
              location={it.location}
            />
            <ContentCard item={it} index={i} total={items.length} />
          </li>
        ))}

        <li className="experience-entry relative grid md:grid-cols-[140px_1fr] gap-4 md:gap-10 items-start">
          <DateColumn
            period={education.period}
            location={education.location}
            subtle
          />
          <EducationCard education={education} label={copy.educationLabel} />
        </li>
      </ol>
    </section>
  );
}

function DateColumn({
  period,
  location,
  subtle,
}: {
  period: string;
  location: string;
  subtle?: boolean;
}) {
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
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">
          {period}
        </div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft flex items-center gap-1">
          <MapPin size={10} /> {location}
        </div>
      </div>
    </div>
  );
}

function ContentCard({
  item,
  index,
  total,
}: {
  item: ExperienceItemView;
  index: number;
  total: number;
}) {
  // DESIGN-DEVIATION: the asset received a `logo: CompanySlug` field per item.
  // Our content's ExperienceItem has no slug (its `company` is a display name,
  // and `logo` is an optional Image the seed omits). We derive the slug from the
  // display name here — presentation-only re-attachment of the placeholder mark,
  // no content shape change. Unknown names simply render without an icon.
  const logo = companySlugFor(item.company);
  return (
    <div
      className="bg-paper-raised border border-rule-strong p-6 md:p-8"
      style={{ boxShadow: "4px 4px 0 0 var(--color-rule-strong)" }}
    >
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <div className="flex items-baseline gap-3 min-w-0">
          {logo && (
            <span className="text-ink flex-shrink-0 self-center inline-flex items-center justify-center w-8 h-8 border border-rule-strong rounded-sm bg-paper">
              <CompanyLogo company={logo} size={18} variant="icon" />
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
      <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-muted mb-4">
        {item.role}
      </p>
      <p className="text-[15px] text-ink-muted leading-[1.6] mb-5 text-pretty">
        {item.summary}
      </p>
      <ul className="space-y-2">
        {item.highlights.map((h, j) => (
          <li key={j} className="flex items-start gap-3 text-[14px] text-ink">
            <span
              aria-hidden
              className="inline-block w-3 h-px bg-ink mt-3 flex-shrink-0"
            />
            <span className="text-pretty">{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EducationCard({
  education,
  label,
}: {
  education: EducationView;
  label: string;
}) {
  return (
    <div className="bg-paper-sunken border border-rule p-6">
      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft mb-2">
        {label}
      </div>
      <h3 className="font-display text-[24px] leading-[1.1] tracking-[-0.01em] text-ink mb-1">
        {education.degree}
      </h3>
      <p className="text-[14px] text-ink-muted">{education.school}</p>
      <ul className="mt-3 space-y-1 text-[13px] text-ink-muted">
        {education.notes.map((n, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              aria-hidden
              className="inline-block w-2 h-px bg-ink-soft mt-2.5"
            />
            <span>{n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Pure, locale-aware period formatter. Takes ISO `YYYY-MM` and produces
 * "Ene 2025 — Feb 2026" / "Jan 2025 — Feb 2026". The literal "present" resolves
 * to the locale-aware `present` label passed in (no hardcoded string here).
 */
function formatPeriod(
  start: string,
  end: string,
  locale: "es" | "en",
  present: string,
) {
  const months =
    locale === "es"
      ? [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ]
      : [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
  const fmt = (s: string) => {
    if (s === "present") return present;
    const [y, m] = s.split("-");
    return `${months[parseInt(m, 10) - 1]} ${y}`;
  };
  return `${fmt(start)} — ${fmt(end)}`;
}

/**
 * Maps a company display name to a known CompanyLogo slug. Presentation-only:
 * lets the timeline reuse the same monochrome marks as the hero trust row.
 */
function companySlugFor(company: string) {
  const normalized = company.toLowerCase();
  if (normalized.includes("movistar") || normalized.includes("telef")) {
    return "movistar" as const;
  }
  if (normalized.includes("cocha")) return "cocha" as const;
  if (normalized.includes("skinautica")) return "skinautica" as const;
  return isCompanySlug(normalized) ? normalized : null;
}
