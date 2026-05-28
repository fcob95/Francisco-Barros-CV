"use client";

/**
 * CookieBanner.tsx — presentational cookie-consent card.
 *
 * Ported from design-assets/v1/extras/CookieBanner.tsx (copied by value).
 * Bottom-right discreet card with two choices: "Accept" (caller initialises
 * PostHog) and "Necessary only" (caller does NOT). Also closeable via the X
 * (treated as "necessary"). Caller controls `open` and persists the decision.
 *
 * mounted + wired in F6 — this just gets the presentational ready. It is NOT
 * mounted in the layout, and PostHog/localStorage are NOT wired here (deferred
 * to F6).
 *
 * "use client" justification: interactive consent controls (onDecide/onLearnMore
 * handlers). All copy arrives locale-resolved as serializable props.
 *
 * DESIGN-DEVIATION: the asset took a raw `t` function as a prop. Replaced with a
 * resolved `copy` bundle of plain strings to match the presentational+container
 * convention used across Bloques A/B (only serializable props cross the
 * boundary; copy is resolved upstream in the F6 container).
 */

import { Check, X } from "lucide-react";

export type CookieChoice = "accept" | "necessary";

/** Resolved copy bundle — built upstream from messages (`cookies.*`). */
export interface CookieBannerCopy {
  title: string;
  body: string;
  learnMore: string;
  accept: string;
  necessary: string;
}

export interface CookieBannerProps {
  open: boolean;
  copy: CookieBannerCopy;
  onDecide: (choice: CookieChoice) => void;
  onLearnMore: () => void;
}

export function CookieBanner({
  open,
  copy,
  onDecide,
  onLearnMore,
}: CookieBannerProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={copy.title}
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-[380px] z-40"
    >
      <div
        className="relative bg-paper-raised border border-ink p-5"
        style={{ boxShadow: "6px 6px 0 0 var(--color-ink)" }}
      >
        <div className="flex items-baseline justify-between mb-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft flex items-center gap-1.5">
            <span
              aria-hidden
              className="inline-block w-1.5 h-1.5 bg-terracotta"
            />
            {copy.title}
          </div>
          <button
            type="button"
            onClick={() => onDecide("necessary")}
            aria-label={copy.necessary}
            className="text-ink-soft hover:text-ink -mt-1 -mr-1 p-1"
          >
            <X size={14} />
          </button>
        </div>

        <p className="text-[13px] leading-[1.55] text-ink-muted mb-4 text-pretty">
          {copy.body}{" "}
          <button
            type="button"
            onClick={onLearnMore}
            className="text-terracotta-ink underline-offset-2 hover:underline"
          >
            {copy.learnMore}
          </button>
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => onDecide("accept")}
            className="inline-flex items-center justify-center gap-1.5 flex-1 h-10 px-3 bg-ink text-paper text-[13px] font-medium rounded-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--color-terracotta)] transition-all"
          >
            <Check size={13} />
            {copy.accept}
          </button>
          <button
            type="button"
            onClick={() => onDecide("necessary")}
            className="inline-flex items-center justify-center flex-1 h-10 px-3 border border-rule-strong text-ink text-[13px] hover:border-ink transition-colors rounded-sm"
          >
            {copy.necessary}
          </button>
        </div>
      </div>
    </div>
  );
}
