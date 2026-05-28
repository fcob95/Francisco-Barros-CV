"use client";

/**
 * AnalyticsProvider — the single client boundary that owns analytics.
 *
 * Responsibilities (all consent-gated through the typed `track.*` helpers):
 * 1. Consent: read the persisted choice; render the blocking CookieBanner when
 *    there is none; init PostHog only on "accept". "necessary" → no init.
 * 2. Opt-out: expose `reopenBanner()` via context so the Footer "Cookies"
 *    trigger can re-prompt; choosing "necessary" again resets PostHog.
 * 3. Event wiring: a single delegated click listener intercepts clicks on
 *    `[data-event]` elements (rendered by Server Components too — e.g. project
 *    detail links) and dispatches to `track.*` by reading data-* attributes.
 *    `contact_submit` is intentionally NOT handled here — it fires on a
 *    successful submit inside the Contact client form.
 * 4. Page metrics: scroll-depth + time-on-page hooks (no-op without consent).
 *
 * "use client" justification: localStorage consent, PostHog init, the document
 * click listener and the scroll/visibility hooks all require the browser.
 *
 * Copy for the banner arrives locale-resolved as a serializable `cookies` prop
 * from the Server layout (presentational+container convention).
 */

import { useCallback, useEffect, useMemo, useState } from "react";

import { useRouter, usePathname } from "@/i18n/navigation";
import {
  CookieBanner,
  type CookieBannerCopy,
  type CookieChoice,
} from "@/components/sections/cookie-banner/CookieBanner";
import { track } from "@/lib/analytics/events";
import { initPostHog, resetPostHog } from "@/lib/analytics/posthog";
import {
  ConsentContext,
  readConsent,
  writeConsent,
  type ConsentContextValue,
} from "./consent";
import { useScrollDepth, useTimeOnPage } from "./usePageMetrics";

interface AnalyticsProviderProps {
  children: React.ReactNode;
  cookies: CookieBannerCopy;
}

export function AnalyticsProvider({
  children,
  cookies,
}: AnalyticsProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  // `null` until we have read localStorage on the client → keeps SSR/first
  // paint banner-free and avoids a hydration mismatch.
  const [bannerOpen, setBannerOpen] = useState(false);

  // On mount: decide whether to init or prompt, based on the stored choice.
  useEffect(() => {
    const choice = readConsent();
    if (choice === "accept") {
      initPostHog();
    } else if (choice === null) {
      setBannerOpen(true);
    }
    // "necessary" → do nothing (no init, no banner).
  }, []);

  const handleDecide = useCallback((choice: CookieChoice) => {
    writeConsent(choice);
    if (choice === "accept") {
      initPostHog();
    } else {
      // Re-deciding "necessary" after a prior "accept" must stop tracking.
      resetPostHog();
    }
    setBannerOpen(false);
  }, []);

  const handleLearnMore = useCallback(() => {
    router.push("/privacy");
  }, [router]);

  const reopenBanner = useCallback(() => setBannerOpen(true), []);

  const consentValue = useMemo<ConsentContextValue>(
    () => ({ reopenBanner }),
    [reopenBanner],
  );

  // --- Delegated event wiring for [data-event] elements ---------------------
  useDelegatedEvents();

  // --- Page metrics (re-armed per route) ------------------------------------
  useScrollDepth(pathname);
  useTimeOnPage(pathname);

  return (
    <ConsentContext.Provider value={consentValue}>
      {children}
      <CookieBanner
        open={bannerOpen}
        copy={cookies}
        onDecide={handleDecide}
        onLearnMore={handleLearnMore}
      />
    </ConsentContext.Provider>
  );
}

/**
 * One document-level click listener that maps `[data-event]` markup to the
 * typed helpers. This covers links rendered by Server Components without
 * turning them into client components. `contact_submit` is excluded (it is a
 * form event fired on success, not a click).
 */
function useDelegatedEvents(): void {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const el = target.closest<HTMLElement>("[data-event]");
      if (!el) return;

      const name = el.dataset.event;
      switch (name) {
        case "document_download": {
          track.documentDownload({ id: el.dataset.id ?? "cv" });
          break;
        }
        case "project_view": {
          const slug = el.dataset.slug;
          if (slug) track.projectView({ slug });
          break;
        }
        case "project_link_click": {
          const target = el.dataset.target;
          if (target === "repo" || target === "demo") {
            track.projectLinkClick({ slug: el.dataset.slug, target });
          }
          break;
        }
        case "locale_switch": {
          const locale = el.dataset.locale;
          if (locale === "es" || locale === "en") {
            track.localeSwitch({ locale });
          }
          break;
        }
        // contact_submit handled in the Contact form (on success).
        default:
          break;
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
