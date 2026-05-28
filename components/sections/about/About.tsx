/**
 * About.tsx — presentational `/about` section.
 *
 * Ported from design-assets/v1/about/About.tsx (copied by value). Two-column
 * lead (portrait slab + bio) over a 2×2 skills grid (4 clusters).
 *
 * Server Component: unlike the asset (which was "use client" only to receive an
 * `onContact` callback), this component renders the contact CTA as a locale-aware
 * <Link href="/contact"> directly, so it needs no client hooks. All copy arrives
 * locale-resolved from the Server container as serializable props (no `t`/`L`/`pick`
 * called here, no content access).
 *
 * data-event attributes on the CV download are preserved verbatim; PostHog wiring
 * is deferred to F6.
 *
 * Print: globals.css @media print stacks the skills grid to one column.
 */

import Image from "next/image";
import { Calendar, Download, MapPin } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { Profile } from "@/lib/content";

/** Resolved copy bundle — built in the Server container from messages/content. */
export interface AboutCopy {
  /** Numbered-header right subtitle: "Quién soy" / "Who I am". */
  whoIAm: string;
  /** Lead pull-quote (about.lead). */
  lead: string;
  /** Factual context line under the lead (about.context). */
  context: string;
  /** Mono headline strip — already locale-resolved from profile.headline. */
  headline: string;
  /** Long bio paragraph — already locale-resolved from profile.bio. */
  bio: string;
  /** Quick-fact: years-of-experience line (about.yearsExperience). */
  yearsExperience: string;
  /** Skills section label (section.skills). */
  skillsLabel: string;
  downloadCv: string;
  contact: string;
}

/** Skills already locale-resolved to a single title string per cluster. */
export interface SkillClusterView {
  title: string;
  items: string[];
}

export interface AboutProps {
  profile: Profile;
  skills: SkillClusterView[];
  /** Locale resolved upstream; only used for the CV href + `/EN` mono badge. */
  locale: "es" | "en";
  /** Avatar alt, already locale-resolved. */
  avatarAlt: string;
  copy: AboutCopy;
}

export function About({
  profile,
  skills,
  locale,
  avatarAlt,
  copy,
}: AboutProps) {
  const cvHref = profile.cvUrl[locale];

  return (
    <section
      id="about"
      className="relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-20 pb-16"
      aria-labelledby="about-lead"
    >
      <div className="flex items-baseline gap-3 mb-10 md:mb-16">
        {/* Editorial number strip kept verbatim (consistent with Bloque A: "01 / Home", "03 / Projects"). */}
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
          02 / About
        </span>
        <span className="h-px flex-1 bg-rule" />
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
          {copy.whoIAm}
        </span>
      </div>

      <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-20">
        {/* Portrait slab */}
        <div className="md:col-span-4">
          <Portrait profile={profile} avatarAlt={avatarAlt} />
          <dl className="mt-6 space-y-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
            <div className="flex items-center gap-2">
              <MapPin size={12} /> <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={12} />
              <span>{copy.yearsExperience}</span>
            </div>
          </dl>
        </div>

        {/* Bio */}
        <div className="md:col-span-8 flex flex-col">
          {/* Lead pull-quote. min-h prevents text-overflow bug when serif wraps to 3 lines. */}
          <p
            id="about-lead"
            className="font-display text-[28px] md:text-[40px] leading-[1.2] tracking-[-0.01em] text-ink"
            style={{ marginBottom: "40px", minHeight: "6em" }}
          >
            {copy.lead}
          </p>
          {/* Factual context line — grounds the quote in real domains. */}
          <p
            className="text-[15px] md:text-[16px] text-ink-muted leading-relaxed text-pretty max-w-[640px]"
            style={{ marginBottom: "32px" }}
          >
            {copy.context}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-3">
            {copy.headline}
          </p>
          <p className="text-[16px] md:text-[17px] leading-[1.65] text-ink-muted text-pretty">
            {copy.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={cvHref}
              download
              data-event="document_download"
              data-id="cv"
              className="inline-flex items-center gap-2 h-11 px-5 bg-ink text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-terracotta)] transition-all rounded-sm"
            >
              <Download size={14} />
              {copy.downloadCv}
              <span className="font-mono text-[10px] opacity-70">
                / {locale.toUpperCase()}
              </span>
            </a>
            {/* DESIGN-DEVIATION: asset's onClick button replaced by a locale-aware
                <Link href="/contact"> so the section stays a Server Component
                (no client callback). Visual treatment preserved. */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 h-11 px-5 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors rounded-sm"
            >
              {copy.contact}
            </Link>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-6">
          {copy.skillsLabel}
        </h2>
        <div className="about-skills-grid grid sm:grid-cols-2 gap-px bg-rule border border-rule">
          {skills.map((s, i) => (
            <div
              key={i}
              className="bg-paper p-6 group hover:bg-paper-raised transition-colors"
            >
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-display text-[22px] tracking-[-0.01em] text-ink">
                  {s.title}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {s.items.map((it, j) => (
                  <li
                    key={j}
                    className="inline-flex px-2 py-0.5 text-[12px] bg-paper-sunken border border-rule-strong text-ink rounded-sm"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Portrait slab — editorial composition with ink offset frame.
 *
 * DESIGN-DEVIATION: the asset's primary path used a raw <img> (with an eslint
 * disable) and an SVG initials fallback as a placeholder. We have Francisco's
 * real photo at `profile.avatar.src` (/images/avatar.jpeg, 400×400), so the
 * primary path is now next/image. The SVG initials fallback is retained only as
 * a graceful degradation when `src` is empty.
 */
function Portrait({
  profile,
  avatarAlt,
}: {
  profile: Profile;
  avatarAlt: string;
}) {
  return (
    <div
      className="relative w-full max-w-[320px]"
      style={{ aspectRatio: "4 / 5" }}
    >
      {/* Ink offset frame (dialed back from terracotta for structural restraint). */}
      <div
        aria-hidden
        className="absolute inset-0 bg-ink"
        style={{ transform: "translate(10px, 10px)" }}
      />
      <div className="relative w-full h-full bg-paper-raised border border-ink overflow-hidden flex items-end">
        {profile.avatar.src ? (
          <Image
            src={profile.avatar.src}
            alt={avatarAlt}
            width={profile.avatar.width}
            height={profile.avatar.height}
            className="absolute inset-0 w-full h-full object-cover"
            priority
          />
        ) : (
          <PortraitFallback initials={initials(profile.name)} />
        )}
        <div className="relative w-full p-3 bg-ink text-paper font-mono text-[10px] uppercase tracking-[0.12em] flex items-center justify-between">
          <span>{profile.name}</span>
          <span>Stgo · CL</span>
        </div>
      </div>
    </div>
  );
}

function PortraitFallback({ initials }: { initials: string }) {
  return (
    <svg
      viewBox="0 0 400 500"
      className="absolute inset-0 w-full h-full"
      aria-hidden
    >
      <rect width={400} height={500} fill="var(--color-paper-sunken)" />
      <circle
        cx={200}
        cy={200}
        r={110}
        fill="var(--color-paper-raised)"
        stroke="var(--color-ink)"
        strokeWidth={1.5}
      />
      <path d="M70 500 Q200 320 330 500 Z" fill="var(--color-ink)" />
      <text
        x={200}
        y={215}
        textAnchor="middle"
        fontFamily="Instrument Serif, serif"
        fontSize={96}
        fill="var(--color-ink)"
      >
        {initials}
      </text>
    </svg>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
