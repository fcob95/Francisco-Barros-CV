"use client";

/**
 * CookieBanner.tsx
 *
 * Bottom-right discreet card. Two choices:
 *   - "Aceptar"      → callback("accept")   → caller initialises PostHog
 *   - "Solo necesario" → callback("necessary") → caller does NOT initialise tracking
 *
 * Caller persists the decision (e.g., localStorage["fb-cookies"]) and controls visibility.
 */

import { Check, X } from "lucide-react";
import type { TFn } from "@/design-assets/v1/shapes";

export type CookieChoice = "accept" | "necessary";

export interface CookieBannerProps {
  open: boolean;
  t: TFn;
  onDecide: (choice: CookieChoice) => void;
  onLearnMore: () => void;
}

export function CookieBanner({ open, t, onDecide, onLearnMore }: CookieBannerProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-[380px] z-40"
    >
      <div
        className="relative bg-paper-raised border border-ink p-5"
        style={{ boxShadow: "6px 6px 0 0 var(--color-ink)" }}
      >
        <div className="flex items-baseline justify-between mb-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft flex items-center gap-1.5">
            <span aria-hidden className="inline-block w-1.5 h-1.5 bg-terracotta" />
            {t("cookies.title")}
          </div>
          <button
            type="button"
            onClick={() => onDecide("necessary")}
            aria-label="Close"
            className="text-ink-soft hover:text-ink -mt-1 -mr-1 p-1"
          >
            <X size={14} />
          </button>
        </div>

        <p className="text-[13px] leading-[1.55] text-ink-muted mb-4 text-pretty">
          {t("cookies.body")}{" "}
          <button
            type="button"
            onClick={onLearnMore}
            className="text-terracotta-ink underline-offset-2 hover:underline"
          >
            {t("cookies.learnMore")}
          </button>
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => onDecide("accept")}
            className="inline-flex items-center justify-center gap-1.5 flex-1 h-10 px-3 bg-ink text-paper text-[13px] font-medium rounded-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--color-terracotta)] transition-all"
          >
            <Check size={13} />
            {t("cookies.accept")}
          </button>
          <button
            type="button"
            onClick={() => onDecide("necessary")}
            className="inline-flex items-center justify-center flex-1 h-10 px-3 border border-rule-strong text-ink text-[13px] hover:border-ink transition-colors rounded-sm"
          >
            {t("cookies.necessary")}
          </button>
        </div>
      </div>
    </div>
  );
}
