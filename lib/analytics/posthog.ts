/**
 * posthog.ts — PostHog client init governed by consent + the central capture.
 *
 * Consent is BLOCKING: `initPostHog()` is only called after the visitor picks
 * "accept" in the cookie banner (or on load if a prior "accept" is persisted).
 * Until then `capture()` no-ops, so nothing is ever sent without consent.
 *
 * Privacy posture (ADR-007 + lib/analytics/CLAUDE.md):
 * - We want geo (country/city) but NOT the raw IP. posthog-js cannot drop $ip
 *   client-side; that is enforced by the PostHog PROJECT setting
 *   "Discard client IP data" — see TODO_MANUALES.md §3. This file does what it
 *   can client-side; the IP discard is a manual project toggle.
 * - No autocapture (no implicit clicks/inputs harvested) — we only send the
 *   typed events from `events.ts`.
 * - No session recording.
 * - Do Not Track is respected (PostHog skips capture when the browser sets it).
 * - Inputs are masked in the (disabled) recorder as defence-in-depth.
 * - Persistence keyed by consent ("memory" before opt-in is moot since we only
 *   init after accept, but we keep cookieless localStorage to avoid 3rd-party
 *   tracking cookies).
 *
 * This module is client-only (posthog-js touches `window`). It is imported by
 * the AnalyticsProvider, which carries "use client".
 */

import posthog from "posthog-js";

import type { AnalyticsEventMap, AnalyticsEventName } from "./events";

let initialised = false;

/** True once PostHog has been booted with consent. */
export function isInitialised(): boolean {
  return initialised;
}

/**
 * Boot PostHog. Idempotent and no-op when the env keys are missing (e.g. local
 * dev without a PostHog project) or when called server-side. Only ever invoked
 * after explicit "accept".
 */
export function initPostHog(): void {
  if (initialised) return;
  if (typeof window === "undefined") return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!key || !host) {
    // No project configured — stay off rather than crash. Wiring still works;
    // capture() keeps no-op'ing because `initialised` stays false.
    return;
  }

  posthog.init(key, {
    api_host: host,
    // Only our typed events; never harvest arbitrary clicks/inputs.
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: true,
    // No recordings at all; mask inputs/text as defence-in-depth.
    disable_session_recording: true,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: "*",
    },
    // Cookieless storage → no third-party tracking cookies.
    persistence: "localStorage",
    // Honour the browser's Do Not Track signal.
    respect_dnt: true,
  });

  initialised = true;
}

/** Stop tracking and clear PostHog's local state (used on opt-out / revoke). */
export function resetPostHog(): void {
  if (!initialised) return;
  posthog.opt_out_capturing();
  posthog.reset();
  initialised = false;
}

/**
 * Central capture. The ONLY place `posthog.capture` is called. No-ops until
 * PostHog is initialised (consent not given → silence). `track.*` helpers in
 * `events.ts` are the public surface; components never call this directly with
 * a loose string.
 */
export function capture<E extends AnalyticsEventName>(
  event: E,
  payload: AnalyticsEventMap[E],
): void {
  if (!initialised) return;
  posthog.capture(event, payload);
}
