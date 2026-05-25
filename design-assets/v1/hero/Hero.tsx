"use client";

/**
 * Hero.tsx
 *
 * Section: / (home)
 * The piece that sets the editorial-3D voice of the whole site.
 *
 * Composition:
 * - Numbered editorial header strip (01 / Home)
 * - Left column: location pulse · massive display name · tagline · CTAs
 * - Right column: isometric 3-pillar stack (Pricing Strategy · Revenue Analytics · AI-Augmented)
 *   - 3 absolute-positioned cards with translate+rotate, hard offset shadows
 *   - Hover on a card raises it and dims the others (focus-equivalent for keyboard)
 *
 * Reduced-motion: no entry animation, no hover lift — just static layout.
 */

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowDown, ArrowUpRight, Download, MapPin,
  TrendingUp, Database, Sparkles, type LucideIcon,
} from "lucide-react";

import type { Profile, LocalizedString, TFn, LFn } from "@/design-assets/v1/shapes";
import { CompanyLogo } from "@/design-assets/v1/chrome/CompanyLogo";

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
  accent: string; // CSS var or hex
}

export interface HeroProps {
  profile: Profile;
  locale: "es" | "en";
  /** i18n helpers (presentation marker only — implementation lives elsewhere). */
  t: TFn;
  L: LFn;
  /** Navigation callback. Use Next router (or equivalent) on the consumer side. */
  onNavigate: (href: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Framer variants — extracted per spec §5
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.56, ease: [0.32, 0.72, 0, 1] } },
};

const pillarSpring = { type: "spring", stiffness: 260, damping: 26 } as const;

// ─────────────────────────────────────────────────────────────────────────────

export function Hero({ profile, locale, t, L, onNavigate }: HeroProps) {
  const [hovered, setHovered] = useState<Pillar["key"] | null>(null);
  const reduce = useReducedMotion();

  const cvHref = profile.cvUrl[locale];

  const pillars: Pillar[] = [
    {
      key: "pricing", n: "01", icon: TrendingUp,
      title: t("hero.pillar1"), short: t("hero.pillar1Short"),
      kicker: locale === "es" ? "Estrategia" : "Strategy",
      bullets: [
        locale === "es" ? "Modelos de elasticidad" : "Elasticity models",
        locale === "es" ? "Mix comercial" : "Commercial mix",
        locale === "es" ? "Pricing dinámico (NDC)" : "Dynamic pricing (NDC)",
      ],
      accent: "var(--color-terracotta)",
    },
    {
      key: "revenue", n: "02", icon: Database,
      title: t("hero.pillar2"), short: t("hero.pillar2Short"),
      kicker: locale === "es" ? "Datos" : "Data",
      bullets: [
        locale === "es" ? "Dashboards ejecutivos" : "Executive dashboards",
        locale === "es" ? "Forecasting & demanda" : "Forecasting & demand",
        locale === "es" ? "Rentabilidad por canal" : "Channel profitability",
      ],
      accent: "var(--color-ocean)",
    },
    {
      key: "ai", n: "03", icon: Sparkles,
      title: t("hero.pillar3"), short: t("hero.pillar3Short"),
      kicker: locale === "es" ? "IA aplicada" : "Applied AI",
      bullets: [
        "Claude · ChatGPT · Gemini",
        locale === "es" ? "Agentes y orquestación" : "Agents & orchestration",
        locale === "es" ? "Workflows analíticos" : "Analytical workflows",
      ],
      accent: "var(--color-ochre)",
    },
  ];

  return (
    <section id="home" className="relative overflow-hidden" aria-labelledby="hero-name">
      {/* Decorative vertical grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: "linear-gradient(to right, var(--color-rule) 1px, transparent 1px)",
          backgroundSize: "120px 100%",
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 70%, transparent)",
        }}
      />

      <div className="relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 pt-12 md:pt-16 pb-20 md:pb-32">
        {/* Numbered editorial header */}
        <div className="flex items-baseline gap-3 mb-10 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">01 / Home</span>
          <span className="h-px flex-1 bg-rule" />
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">{t("hero.kicker")}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ─── Left: name + tagline + CTAs ────────────────────────────── */}
          <div className="lg:col-span-7">
            <motion.div
              variants={fadeUp} initial={reduce ? false : "hidden"} animate="visible"
              className="inline-flex items-center gap-2 mb-5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft"
            >
              <MapPin size={12} />
              <span>{profile.location}</span>
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-success animate-pulse"
                style={{ animationDuration: "2.4s" }}
              />
              <span>{locale === "es" ? "Disponible para proyectos" : "Open for projects"}</span>
            </motion.div>

            <motion.h1
              id="hero-name"
              variants={fadeUp} initial={reduce ? false : "hidden"} animate="visible"
              className="font-display tracking-[-0.025em] text-ink leading-[0.92] text-balance"
              style={{ fontSize: "clamp(48px, 7.6vw, 102px)" }}
            >
              <span className="block">Francisco</span>
              <span className="block relative">
                Barros
                {/* Layered 3D shadow word — subtle ink (dialed back from terracotta) */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 text-ink -z-10"
                  style={{ transform: "translate(7px, 7px)", opacity: 0.08 }}
                >
                  Barros
                </span>
              </span>
              <span className="block">
                Cruz<span className="text-terracotta ml-1">.</span>
              </span>
            </motion.h1>

            <p className="mt-6 md:mt-8 text-[15px] md:text-[17px] text-ink-muted max-w-[560px] text-pretty leading-relaxed">
              {L(profile.tagline)}
            </p>

            {/* Stats line — concrete data, complements the human-voice tagline above. */}
            <p className="mt-3 text-[13px] md:text-[14px] text-ink max-w-[560px] text-pretty leading-relaxed font-medium">
              {L(profile.stats)}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate("/projects")}
                className="group inline-flex items-center gap-2 h-12 px-5 bg-ink text-paper font-medium hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-terracotta)] transition-all rounded-sm"
              >
                {t("cta.viewProjects")}
                <ArrowUpRight size={16} />
              </button>

              <a
                href={cvHref}
                download
                data-event="document_download"
                data-id="cv"
                className="inline-flex items-center gap-2 h-12 px-5 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors rounded-sm"
              >
                <Download size={15} />
                {t("cta.downloadCv")}
                <span className="font-mono text-[10px] opacity-60">/ {locale.toUpperCase()}</span>
              </a>

              <button
                type="button"
                onClick={() => onNavigate("/contact")}
                className="inline-flex items-center gap-2 h-12 px-3 text-ink-muted hover:text-ink underline-offset-4 hover:underline"
              >
                {t("cta.contact")}
              </button>
            </div>

            {/* Trust signals — "Experience at" + monocromo company logos */}
            {profile.trustCompanies?.length > 0 && (
              <div className="mt-10 flex items-center gap-5 flex-wrap">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  {locale === "es" ? "Experiencia en" : "Experience at"}
                </span>
                <div className="flex items-center gap-6 text-ink-muted">
                  {profile.trustCompanies.map((c) => (
                    <CompanyLogo key={c} company={c} size={16} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── Right: isometric pillar stack ──────────────────────────── */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto lg:mx-0" style={{ width: 380, height: 320 }}>
              <div
                aria-hidden
                className="absolute inset-0 border border-rule"
                style={{ transform: "translate(-12px, 12px)" }}
              />
              <div
                aria-hidden
                className="absolute -top-3 -left-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft"
              >
                {locale === "es" ? "Pilares ↘" : "Pillars ↘"}
              </div>

              {pillars.map((p, i) => (
                <PillarCard
                  key={p.key} p={p} index={i}
                  hovered={hovered} setHovered={setHovered}
                  reduce={!!reduce}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
          <ArrowDown size={12} className={reduce ? "" : "animate-bounce"} style={{ animationDuration: "1.6s" }} />
          <span>{t("hero.scroll")}</span>
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

function PillarCard({ p, index, hovered, setHovered, reduce }: PillarCardProps) {
  const isHover = hovered === p.key;
  const isOther = hovered != null && !isHover;
  const baseX = index * 38;
  const baseY = index * -28;
  const baseRotate = -6 + index * 1.2;
  const Icon = p.icon;

  const transform = [
    `translate(${baseX}px, ${baseY}px) rotate(${baseRotate}deg)`,
    isHover && !reduce ? "translateY(-12px) scale(1.04)" : "",
    isOther && !reduce ? "scale(0.96)" : "",
  ].filter(Boolean).join(" ");

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
      className="absolute top-0 left-0 w-[260px] md:w-[300px] bg-paper-raised border border-ink outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper cursor-pointer"
    >
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
            <li key={i} className="flex items-start gap-2 text-[13px] text-ink-muted">
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
    </div>
  );
}
