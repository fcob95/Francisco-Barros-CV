"use client";

/**
 * Hero.tsx — presentational home section.
 *
 * Ported from design-assets/v1/hero/Hero.tsx (copied by value). Defines the
 * editorial-3D voice of the site: numbered header strip, massive display name,
 * tagline + CTAs, and an isometric 3-pillar stack.
 *
 * "use client" justification: framer-motion entry animation, useReducedMotion,
 * and the hover/focus pillar-lift state all require client hooks. All data and
 * copy arrive from the Server container as serializable props (no `t`/`L`/`pick`
 * called here, no content access).
 *
 * data-event attributes are preserved verbatim; PostHog wiring is deferred to F6.
 * Reduced-motion: no entry animation, no hover lift — static layout.
 */

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  MapPin,
  TrendingUp,
  Database,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import {
  CompanyLogo,
  isCompanySlug,
} from "@/components/sections/chrome/CompanyLogo";
import type { Profile } from "@/lib/content";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface Pillar {
  key: "pricing" | "revenue" | "ai";
  n: string;
  icon: LucideIcon;
  title: string;
  short: string;
  kicker: string;
  bullets: string[];
  accent: string; // CSS var
}

/** Resolved copy bundle — built in the Server container from messages/content. */
export interface HeroCopy {
  kicker: string;
  available: string;
  experienceAt: string;
  pillarsLabel: string;
  scroll: string;
  viewProjects: string;
  downloadCv: string;
  contact: string;
  /** Tagline + stats lines, already locale-resolved. */
  tagline: string;
  stats: string;
  pillars: Array<{
    key: Pillar["key"];
    title: string;
    short: string;
    kicker: string;
    bullets: string[];
  }>;
}

export interface HeroProps {
  profile: Profile;
  locale: "es" | "en";
  copy: HeroCopy;
}

// ─────────────────────────────────────────────────────────────────────────────
// Framer variants — extracted per spec §5
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease: [0.32, 0.72, 0, 1] },
  },
};

// Icon + accent are presentation-only, keyed by pillar so they are not passed
// across the server/client boundary (LucideIcon is not serializable).
const PILLAR_META: Record<
  Pillar["key"],
  { n: string; icon: LucideIcon; accent: string }
> = {
  pricing: { n: "01", icon: TrendingUp, accent: "var(--color-terracotta)" },
  revenue: { n: "02", icon: Database, accent: "var(--color-ocean)" },
  ai: { n: "03", icon: Sparkles, accent: "var(--color-ochre)" },
};

/** Pillar count drives the isometric fan's vertical re-anchor math. */
const PILLAR_COUNT = 3;

/** Vertical step (px) between stacked isometric cards. */
const PILLAR_STEP_Y = 28;

// DESIGN-DEVIATION: the asset's box was 380×320 with the fan anchored at y=-56
// (overhanging the top). After re-anchoring the fan DOWN to y∈[0, …], the
// lowest card (index 0, y=56) plus its content height and rotation tilt reaches
// past 320px, so the box is taller (360px) to avoid clipping the lowest card.
const HERO_BOX_W = 380;
const HERO_BOX_H = 360;

// ─────────────────────────────────────────────────────────────────────────────

export function Hero({ profile, locale, copy }: HeroProps) {
  const [hovered, setHovered] = useState<Pillar["key"] | null>(null);
  const reduce = useReducedMotion();

  const cvHref = profile.cvUrl[locale];

  // Split the display name into its three editorial lines (brand statement).
  const [line1, line2, line3] = splitName(profile.name);

  const pillars: Pillar[] = copy.pillars.map((p) => ({
    ...PILLAR_META[p.key],
    key: p.key,
    title: p.title,
    short: p.short,
    kicker: p.kicker,
    bullets: p.bullets,
  }));

  const trustCompanies = profile.trustCompanies.filter(isCompanySlug);

  return (
    <section
      id="home"
      className="relative overflow-hidden"
      aria-labelledby="hero-name"
    >
      {/* Decorative vertical grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-rule) 1px, transparent 1px)",
          backgroundSize: "120px 100%",
          maskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 70%, transparent)",
        }}
      />

      <div className="relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-16 pb-20 md:pb-32">
        {/* Numbered editorial header */}
        <div className="flex items-baseline gap-3 mb-10 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
            01 / Home
          </span>
          <span className="h-px flex-1 bg-rule" />
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
            {copy.kicker}
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ─── Left: name + tagline + CTAs ────────────────────────────── */}
          <div className="lg:col-span-7">
            <motion.div
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              animate="visible"
              className="inline-flex items-center gap-2 mb-5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft"
            >
              <MapPin size={12} />
              <span>{profile.location}</span>
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-success animate-pulse"
                style={{ animationDuration: "2.4s" }}
              />
              <span>{copy.available}</span>
            </motion.div>

            <motion.h1
              id="hero-name"
              variants={fadeUp}
              initial={reduce ? false : "hidden"}
              animate="visible"
              className="font-display tracking-[-0.025em] text-ink leading-[0.92] text-balance"
              style={{ fontSize: "clamp(48px, 7.6vw, 102px)" }}
            >
              <span className="block">{line1}</span>
              <span className="block relative">
                {line2}
                {/* Layered 3D shadow word — subtle ink. */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 text-ink -z-10"
                  style={{ transform: "translate(7px, 7px)", opacity: 0.08 }}
                >
                  {line2}
                </span>
              </span>
              <span className="block">
                {line3}
                <span className="text-terracotta ml-1">.</span>
              </span>
            </motion.h1>

            <p className="mt-6 md:mt-8 text-[15px] md:text-[17px] text-ink-muted max-w-[560px] text-pretty leading-relaxed">
              {copy.tagline}
            </p>

            {/* Stats line — concrete data, complements the tagline above. */}
            <p className="mt-3 text-[13px] md:text-[14px] text-ink max-w-[560px] text-pretty leading-relaxed font-medium">
              {copy.stats}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 h-12 px-5 bg-ink text-paper font-medium hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-terracotta)] transition-all rounded-sm"
              >
                {copy.viewProjects}
                <ArrowUpRight size={16} />
              </Link>

              <a
                href={cvHref}
                download
                data-event="document_download"
                data-id="cv"
                className="inline-flex items-center gap-2 h-12 px-5 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors rounded-sm"
              >
                <Download size={15} />
                {copy.downloadCv}
                <span className="font-mono text-[10px] opacity-60">
                  / {locale.toUpperCase()}
                </span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-12 px-3 text-ink-muted hover:text-ink underline-offset-4 hover:underline"
              >
                {copy.contact}
              </Link>
            </div>

            {/* Trust signals — "Experience at" + monochrome company logos */}
            {trustCompanies.length > 0 && (
              <div className="mt-10 flex items-center gap-5 flex-wrap">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  {copy.experienceAt}
                </span>
                <div className="flex items-center gap-6 text-ink-muted">
                  {trustCompanies.map((c) => (
                    <CompanyLogo key={c} company={c} size={16} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── Right: pillar stack ────────────────────────────────────── */}
          <div className="lg:col-span-5">
            {/*
              DESIGN-DEVIATION: the asset only had the desktop isometric stack
              (fixed 380×320, no mobile handling) which overflowed the px-5
              section padding on phones and was clipped by overflow-hidden, plus
              the hover-lift/dim interaction is meaningless on touch. We render
              two layouts off one data source: the original isometric fan at lg+
              and a static, touch-friendly vertical card list below lg. The prior
              scale-[0.8] / w-[304px] h-[256px] mobile shrink wrapper is removed —
              the vertical list flows naturally with no horizontal overflow.
            */}

            {/* Desktop (lg+): isometric fan, re-anchored to sit inside its box. */}
            <div
              className="relative mx-auto hidden lg:block"
              style={{ width: HERO_BOX_W, height: HERO_BOX_H }}
            >
              <div
                aria-hidden
                className="absolute inset-0 border border-rule"
                style={{ transform: "translate(-12px, 12px)" }}
              />
              <div
                aria-hidden
                className="absolute -top-3 -left-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft"
              >
                {copy.pillarsLabel}
              </div>

              {pillars.map((p, i) => (
                <PillarCard
                  key={p.key}
                  p={p}
                  index={i}
                  hovered={hovered}
                  setHovered={setHovered}
                  reduce={!!reduce}
                />
              ))}
            </div>

            {/*
              Mobile (< lg): static vertical stack of full-width cards — no
              absolute positioning, no isometric transforms, no hover-lift/dim
              (touch has no hover). Same content + editorial styling per card.
            */}
            <div className="flex flex-col gap-4 lg:hidden">
              <span
                aria-hidden
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft"
              >
                {copy.pillarsLabel}
              </span>
              {pillars.map((p) => (
                <div
                  key={p.key}
                  className="w-full bg-paper-raised border border-ink shadow-[4px_4px_0_0_var(--color-ink)]"
                >
                  <PillarCardContent p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          <ArrowDown
            size={12}
            className={reduce ? "" : "animate-bounce"}
            style={{ animationDuration: "1.6s" }}
          />
          <span>{copy.scroll}</span>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

interface PillarCardProps {
  p: Pillar;
  index: number;
  hovered: Pillar["key"] | null;
  setHovered: (k: Pillar["key"] | null) => void;
  reduce: boolean;
}

function PillarCard({
  p,
  index,
  hovered,
  setHovered,
  reduce,
}: PillarCardProps) {
  const isHover = hovered === p.key;
  const isOther = hovered != null && !isHover;
  const baseX = index * 38;
  // DESIGN-DEVIATION: the asset anchored the fan at baseY = index * -28, so the
  // topmost card (index 2) sat at y = -56 — ABOVE the box — overlapping the
  // "Pilares" label and the numbered header on desktop. We shift the whole fan
  // DOWN by the full upward span ((PILLAR_COUNT - 1) * PILLAR_STEP_Y = 56px) so
  // the topmost card's top edge lands at y = 0 (inside the box). Same 38px
  // horizontal step, same 28px vertical step, same rotation — only the anchor moves.
  const baseY = (PILLAR_COUNT - 1 - index) * PILLAR_STEP_Y;
  const baseRotate = -6 + index * 1.2;

  const transform = [
    `translate(${baseX}px, ${baseY}px) rotate(${baseRotate}deg)`,
    isHover && !reduce ? "translateY(-12px) scale(1.04)" : "",
    isOther && !reduce ? "scale(0.96)" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={p.title}
      onMouseEnter={() => setHovered(p.key)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(p.key)}
      onBlur={() => setHovered(null)}
      style={{
        transform,
        transition: reduce
          ? "none"
          : "transform 380ms cubic-bezier(.32,.72,0,1), box-shadow 280ms ease, opacity 280ms ease",
        zIndex: 10 + index + (isHover ? 20 : 0),
        opacity: isOther ? 0.55 : 1,
        boxShadow: isHover
          ? `10px 10px 0 0 ${p.accent}, 0 18px 40px -12px rgba(28,25,23,.22)`
          : "5px 5px 0 0 var(--color-ink), 0 4px 12px -6px rgba(28,25,23,.16)",
      }}
      className="absolute top-0 left-0 w-[300px] bg-paper-raised border border-ink outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper cursor-pointer"
    >
      <PillarCardContent p={p} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Inner card markup shared by both the desktop isometric fan (PillarCard) and
 * the mobile vertical list. Pure presentation, no positioning/interaction.
 */
function PillarCardContent({ p }: { p: Pillar }) {
  const Icon = p.icon;
  return (
    <>
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-ink bg-paper-sunken">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink">
          {p.n} · {p.kicker}
        </span>
        <span
          className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white"
          style={{ background: p.accent }}
        >
          <Icon size={13} strokeWidth={2} />
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-display text-[26px] leading-[1.05] tracking-[-0.01em] text-ink mb-3 text-balance">
          {p.title}
        </h3>
        <ul className="space-y-1.5">
          {p.bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-[13px] text-ink-muted"
            >
              <span className="inline-block w-3 h-px bg-ink-muted mt-2.5 flex-shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer hint */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-rule font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
        <span>{p.short}</span>
        <span aria-hidden>↗</span>
      </div>
    </>
  );
}

/**
 * Splits the full display name into three editorial lines. For
 * "Francisco Barros Cruz" → ["Francisco", "Barros", "Cruz"] (the asset's exact
 * layout: middle line carries the layered shadow, last line the terracotta dot).
 * Falls back gracefully for names with fewer/more parts.
 */
function splitName(name: string): [string, string, string] {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 3) {
    const last = parts[parts.length - 1];
    const middle = parts[parts.length - 2];
    const first = parts.slice(0, parts.length - 2).join(" ");
    return [first, middle, last];
  }
  if (parts.length === 2) return [parts[0], parts[1], ""];
  return [name, "", ""];
}
