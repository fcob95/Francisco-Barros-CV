"use client";

/**
 * Footer.tsx — presentational chrome.
 *
 * Ported from design-assets/v1/chrome/Footer.tsx (copied by value). Closing
 * manifesto + CV download + email · socials · privacy/cookies.
 *
 * "use client" justification: the email shortcut and the Privacy/Cookies
 * triggers are interactive (next-intl Link / button handlers). Data (profile)
 * and all copy (t) arrive from the Server container as serializable props.
 *
 * The CV download keeps its data-event attribute verbatim; the delegated
 * listener in the AnalyticsProvider wires it. The "Cookies" trigger reopens the
 * consent banner via the analytics consent context (opt-out path).
 */

import {
  Download,
  Github,
  Linkedin,
  Mail,
  type LucideIcon,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { useConsent } from "@/components/analytics/consent";
import type { Profile } from "@/lib/content";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  github: Github,
  email: Mail,
};

export interface FooterProps {
  profile: Profile;
  locale: "es" | "en";
  /** Resolved copy from the container (i18n). */
  copy: {
    kicker: string;
    manifesto: string;
    downloadCv: string;
    built: string;
    privacy: string;
    cookies: string;
  };
  /** Static meta line, e.g. "FB · Santiago — 2026". Composed in the container. */
  metaLine: string;
}

export function Footer({ profile, locale, copy, metaLine }: FooterProps) {
  const cvHref = profile.cvUrl[locale];

  // The asset's `onOpenCookies` re-triggers the CookieBanner. Wired to the
  // analytics consent context (opt-out). `useConsent()` returns null when the
  // footer renders outside the AnalyticsProvider, so the trigger degrades to a
  // no-op instead of throwing.
  const consent = useConsent();
  const onOpenCookies = () => consent?.reopenBanner();

  return (
    <footer className="border-t border-rule bg-paper mt-24">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-12">
          <div className="md:col-span-7">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-3">
              {copy.kicker}
            </div>
            <p className="font-display text-3xl md:text-4xl tracking-[-0.01em] text-ink leading-[1.1] text-balance">
              {copy.manifesto}
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
                {copy.downloadCv}
                <span className="font-mono text-[10px] opacity-60">
                  / {locale.toUpperCase()}
                </span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink self-start md:self-end"
              >
                <Mail size={14} />
                {profile.email}
              </Link>
            </div>
          </div>
        </div>

        <div className="h-px bg-rule mb-8" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              {metaLine}
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
            <span className="text-balance">{copy.built}</span>
            <Link
              href="/privacy"
              className="underline-offset-4 hover:underline hover:text-ink"
            >
              {copy.privacy}
            </Link>
            <button
              type="button"
              onClick={onOpenCookies}
              className="underline-offset-4 hover:underline hover:text-ink"
            >
              {copy.cookies}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
