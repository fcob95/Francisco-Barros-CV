/**
 * Privacy.tsx — presentational `/privacy` page.
 *
 * Ported from design-assets/v1/extras/Privacy.tsx (copied by value). Long-form
 * prose, ~720px container, three paragraphs (PostHog analytics, cookies, contact
 * form data handling). Print-friendly by virtue of being plain prose.
 *
 * Server Component: the asset was "use client" by default but uses no client
 * hooks. All prose arrives locale-resolved from the Server container as
 * serializable props (moved into messages `privacy.*` — nothing hardcoded here).
 *
 * DESIGN-DEVIATION: the asset's `onBack` callback (a `<button>`) is replaced with
 * a next-intl `<Link href="/">` so it works without client JS and stays a Server
 * Component, consistent with how the chrome links navigate.
 */

import { ArrowLeft } from "lucide-react";

import { Link } from "@/i18n/navigation";

/** Resolved copy bundle — built in the Server container from messages. */
export interface PrivacyCopy {
  kicker: string;
  title: string;
  /** PostHog analytics paragraph. */
  analytics: string;
  /** Cookies paragraph. */
  cookies: string;
  /** Contact-form data handling paragraph. */
  contactForm: string;
  back: string;
}

export function Privacy({ copy }: { copy: PrivacyCopy }) {
  return (
    <article className="relative max-w-[720px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
      <div className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft mb-3">
        {copy.kicker}
      </div>
      <h1 className="font-display text-4xl md:text-5xl tracking-[-0.02em] mb-6">
        {copy.title}
      </h1>
      <div className="space-y-5 text-[16px] leading-[1.7] text-ink-muted">
        <p>{copy.analytics}</p>
        <p>{copy.cookies}</p>
        <p>{copy.contactForm}</p>
      </div>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 text-[14px] text-ink-muted hover:text-ink"
      >
        <ArrowLeft size={14} />
        {copy.back}
      </Link>
    </article>
  );
}
