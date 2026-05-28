/**
 * usePageMetrics.ts — lightweight scroll-depth + time-on-page instrumentation.
 *
 * Both hooks dispatch only through the typed `track.*` helpers, which no-op
 * without consent, so they are safe to mount unconditionally. They re-arm on
 * `pathname` change so each route gets its own milestones / timer.
 */

"use client";

import { useEffect, useRef } from "react";

import { track } from "@/lib/analytics/events";

const MILESTONES = [25, 50, 75, 100] as const;
type Milestone = (typeof MILESTONES)[number];

/**
 * Fire `scroll_depth` once per 25/50/75/100 milestone reached on the page.
 * Throttled via rAF; listener is passive. Resets when `key` changes (route).
 */
export function useScrollDepth(key: string): void {
  useEffect(() => {
    const reached = new Set<Milestone>();
    let ticking = false;

    const measure = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // Pages shorter than the viewport count as fully seen.
      const percent =
        scrollable <= 0
          ? 100
          : Math.min(100, Math.round((window.scrollY / scrollable) * 100));

      for (const m of MILESTONES) {
        if (percent >= m && !reached.has(m)) {
          reached.add(m);
          track.scrollDepth({ percent: m });
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(measure);
    };

    // Evaluate once in case the route is already short / pre-scrolled.
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [key]);
}

/**
 * Send `time_on_page` (whole seconds) when the page is hidden or unloaded.
 * Counts only foreground time, so a backgrounded tab does not inflate the
 * number. Sends on route change too (cleanup), capturing the elapsed time.
 */
export function useTimeOnPage(key: string): void {
  // Accumulated foreground ms for the current page, plus the start of the
  // current visible segment.
  const accumulatedRef = useRef(0);
  const segmentStartRef = useRef<number | null>(null);

  useEffect(() => {
    accumulatedRef.current = 0;
    segmentStartRef.current =
      document.visibilityState === "visible" ? performance.now() : null;

    // Guards against re-emitting the same total when both visibilitychange and
    // pagehide (or cleanup) fire. Reset when a fresh visible segment starts.
    let sent = false;

    const flushSegment = () => {
      if (segmentStartRef.current !== null) {
        accumulatedRef.current += performance.now() - segmentStartRef.current;
        segmentStartRef.current = null;
      }
    };

    const send = () => {
      flushSegment();
      if (sent) return;
      const seconds = Math.round(accumulatedRef.current / 1000);
      if (seconds > 0) {
        track.timeOnPage({ seconds });
        sent = true;
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        send();
      } else {
        segmentStartRef.current = performance.now();
        sent = false;
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", send);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", send);
      // Route change: emit the time spent on the page we are leaving.
      send();
    };
  }, [key]);
}
