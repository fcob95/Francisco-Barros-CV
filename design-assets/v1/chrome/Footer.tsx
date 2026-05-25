"use client";

/**
 * Footer.tsx
 *
 * Closing chrome: closing manifesto + CV download + email · socials · privacy/cookies.
 */

import { Download, Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import type { Profile, TFn } from "@/design-assets/v1/shapes";

export interface FooterProps {
  profile: Profile;
  locale: "es" | "en";
  t: TFn;
  onNavigate: (href: string) => void;
  onOpenCookies: () => void;
}

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  github: Github,
  email: Mail,
};

export function Footer({ profile, locale, t, onNavigate, onOpenCookies }: FooterProps) {
  const cvHref = profile.cvUrl[locale];

  return (
    <footer className="border-t border-rule bg-paper mt-24">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-12">
          <div className="md:col-span-7">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-3">— Fin</div>
            <p className="font-display text-3xl md:text-4xl tracking-[-0.01em] text-ink leading-[1.1] text-balance">
              {locale === "es"
                ? "Si hay un problema de pricing, datos o adopción de IA que vale la pena resolver, escríbeme."
                : "If there is a pricing, data or AI-adoption problem worth solving, write to me."}
            </p>
          </div>
          <div className="md:col-span-5 flex md:justify-end">
            <div className="flex flex-col gap-3">
              <a
                href={cvHref}
                download
                data-event="document_download"
                data-id="cv"
                className="inline-flex items-center gap-2 text-sm border border-ink text-ink px-4 h-11 hover:bg-ink hover:text-paper transition-colors rounded-sm self-start md:self-end"
              >
                <Download size={14} />
                {t("cta.downloadCv")}
                <span className="font-mono text-[10px] opacity-60">/ {locale.toUpperCase()}</span>
              </a>
              <button
                type="button"
                onClick={() => onNavigate("/contact")}
                className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink self-start md:self-end"
              >
                <Mail size={14} />
                {profile.email}
              </button>
            </div>
          </div>
        </div>

        <div className="h-px bg-rule mb-8" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              FB · Santiago — 2026
            </span>
            <div className="flex items-center gap-1">
              {profile.socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.platform];
                if (!Icon) return null;
                return (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="inline-flex items-center justify-center w-8 h-8 text-ink-muted hover:text-terracotta-ink transition-colors"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 text-[12px] text-ink-muted">
            <span className="text-balance">{t("footer.built")}</span>
            <button
              type="button"
              onClick={() => onNavigate("/privacy")}
              className="underline-offset-4 hover:underline hover:text-ink"
            >
              {t("footer.privacy")}
            </button>
            <button
              type="button"
              onClick={onOpenCookies}
              className="underline-offset-4 hover:underline hover:text-ink"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
