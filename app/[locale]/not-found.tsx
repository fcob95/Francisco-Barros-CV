import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";

import { Link } from "@/i18n/navigation";

/**
 * Localized editorial 404. Rendered when `notFound()` is triggered inside the
 * `[locale]` segment (the locale layout still wraps it, so i18n + theming are
 * available).
 *
 * Ported from design-assets/v1/extras/NotFound.tsx (copied by value): kicker +
 * layered serif "404" + title + lead + two CTAs.
 *
 * Stays a Server Component: `useTranslations` resolves on the server here, and
 * the asset's `onNavigate` callbacks are replaced with next-intl `<Link>`s.
 *
 * DESIGN-DEVIATION: the asset took an `onNavigate(href)` callback (Client
 * Component). Replaced with next-intl `<Link>` so the page works without client
 * JS and the "view projects" CTA reuses the existing `cta.viewProjects` key.
 *
 * The "Error · 404" kicker is kept verbatim (consistent with the editorial
 * number strips in Bloques A/B — not localized pending the design decision).
 */
export default function LocaleNotFound() {
  const t = useTranslations("notFound");
  const tCta = useTranslations("cta");

  return (
    <section
      className="relative max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 py-24 md:py-40 min-h-[60vh] flex items-center"
      aria-labelledby="nf-title"
    >
      <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
        <div className="lg:col-span-7">
          <div className="font-mono text-xs uppercase tracking-[0.12em] text-terracotta-ink mb-3">
            Error · 404
          </div>
          <h1
            id="nf-title"
            className="font-display tracking-[-0.025em] text-ink leading-[0.92]"
            style={{ fontSize: "clamp(64px, 12vw, 160px)" }}
          >
            {t("title")}.
          </h1>
          <p className="mt-4 text-[16px] md:text-[18px] text-ink-muted max-w-[520px] text-pretty leading-relaxed">
            {t("lead")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 h-11 px-5 bg-ink text-paper hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-terracotta)] transition-all rounded-sm"
            >
              <ArrowLeft size={14} />
              {t("back")}
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 h-11 px-5 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors rounded-sm"
            >
              {tCta("viewProjects")}
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 hidden lg:flex justify-end">
          <div
            className="relative font-display"
            style={{
              fontSize: 280,
              lineHeight: 0.85,
              color: "var(--color-rule-strong)",
            }}
            aria-hidden
          >
            <span className="block">404</span>
            <span
              className="absolute left-0 top-0 text-terracotta"
              style={{ transform: "translate(8px, 8px)", opacity: 0.1 }}
            >
              404
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
