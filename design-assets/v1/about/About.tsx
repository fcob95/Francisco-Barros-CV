"use client";

/**
 * About.tsx
 *
 * Section: /about
 * Two-column lead: portrait slab + bio. Below: skills grid (4 clusters).
 * Print-friendly (see globals.css @media print).
 */

import { Calendar, Download, MapPin } from "lucide-react";
import type { Profile, SkillCluster, TFn, LFn } from "@/design-assets/v1/shapes";

export interface AboutProps {
  profile: Profile;
  skills: SkillCluster[];
  locale: "es" | "en";
  t: TFn;
  L: LFn;
  onContact: () => void;
}

export function About({ profile, skills, locale, t, L, onContact }: AboutProps) {
  const cvHref = profile.cvUrl[locale];

  return (
    <section
      id="about"
      className="relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-20 pb-16"
      aria-labelledby="about-lead"
    >
      <div className="flex items-baseline gap-3 mb-10 md:mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">02 / About</span>
        <span className="h-px flex-1 bg-rule" />
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
          {locale === "es" ? "Quién soy" : "Who I am"}
        </span>
      </div>

      <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-20">
        {/* Portrait slab */}
        <div className="md:col-span-4">
          <Portrait profile={profile} locale={locale} L={L} />
          <dl className="mt-6 space-y-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
            <div className="flex items-center gap-2">
              <MapPin size={12} /> <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={12} />
              <span>{locale === "es" ? "4+ años de experiencia" : "4+ years of experience"}</span>
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
            {t("about.lead")}
          </p>
          {/* Factual context line — grounds the quote in real domains. */}
          <p
            className="text-[15px] md:text-[16px] text-ink-muted leading-relaxed text-pretty max-w-[640px]"
            style={{ marginBottom: "32px" }}
          >
            {locale === "es"
              ? "Mi trabajo cruza pricing, datos y workflows de IA aplicada en retail, telecom y travel."
              : "My work sits at the crossroads of pricing, data and applied-AI workflows across retail, telecom and travel."}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-3">
            {L(profile.headline)}
          </p>
          <p className="text-[16px] md:text-[17px] leading-[1.65] text-ink-muted text-pretty">
            {L(profile.bio)}
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
              {t("cta.downloadCv")}
              <span className="font-mono text-[10px] opacity-70">/ {locale.toUpperCase()}</span>
            </a>
            <button
              type="button"
              onClick={onContact}
              className="inline-flex items-center gap-2 h-11 px-5 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors rounded-sm"
            >
              {t("cta.contact")}
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-6">
          {t("section.skills")}
        </h2>
        <div className="grid sm:grid-cols-2 gap-px bg-rule border border-rule">
          {skills.map((s, i) => (
            <div key={i} className="bg-paper p-6 group hover:bg-paper-raised transition-colors">
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-display text-[22px] tracking-[-0.01em] text-ink">{L(s.title)}</h3>
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
 * Portrait slab — editorial composition with terracotta offset frame.
 * When `profile.avatar.src` is provided, replace the SVG fallback with <Image>.
 */
function Portrait({ profile, locale, L }: { profile: Profile; locale: "es" | "en"; L: LFn }) {
  return (
    <div className="relative w-full max-w-[320px]" style={{ aspectRatio: "4 / 5" }}>
      {/* Ink offset frame (dialed back from terracotta for structural restraint). */}
      <div
        aria-hidden
        className="absolute inset-0 bg-ink"
        style={{ transform: "translate(10px, 10px)" }}
      />
      <div className="relative w-full h-full bg-paper-raised border border-ink overflow-hidden flex items-end">
        {profile.avatar.src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={profile.avatar.src}
            alt={L(profile.avatar.alt)}
            width={profile.avatar.width}
            height={profile.avatar.height}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <PortraitFallback initials={initials(profile.name)} />
        )}
        <div className="relative w-full p-3 bg-ink text-paper font-mono text-[10px] uppercase tracking-[0.12em] flex items-center justify-between">
          <span>{profile.name}</span>
          <span>{locale === "es" ? "Stgo · CL" : "Stgo · CL"}</span>
        </div>
      </div>
    </div>
  );
}

function PortraitFallback({ initials }: { initials: string }) {
  return (
    <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full" aria-hidden>
      <rect width={400} height={500} fill="var(--color-paper-sunken)" />
      <circle cx={200} cy={200} r={110} fill="var(--color-paper-raised)" stroke="var(--color-ink)" strokeWidth={1.5} />
      <path d="M70 500 Q200 320 330 500 Z" fill="var(--color-ink)" />
      <text
        x={200} y={215} textAnchor="middle"
        fontFamily="Instrument Serif, serif" fontSize={96} fill="var(--color-ink)"
      >
        {initials}
      </text>
    </svg>
  );
}

function initials(name: string) {
  return name.split(" ").map((s) => s[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}
