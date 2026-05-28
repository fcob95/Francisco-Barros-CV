/**
 * events.ts — typed analytics event catalog.
 *
 * Single source of truth for every event the site emits, mirroring
 * DESIGN_BRIEF.md §6. Each event has a snake_case name and a typed payload.
 * Components NEVER call `posthog.capture` with a loose string — they call a
 * `track.*` helper from here, which forwards to the central `capture` in
 * `./posthog`. That central capture no-ops when PostHog was not initialised
 * (i.e. the visitor has not consented), so consent gating is enforced in one
 * place and is impossible to bypass from a component.
 *
 * No PII in any payload: no name, email, message body or raw IP. Geo (country/
 * city) is derived server-side by PostHog from the request; the raw $ip is
 * discarded by a PostHog PROJECT setting (ADR-007) — see TODO_MANUALES.md.
 */

import { capture } from "./posthog";

/** Locales the site ships (kept in sync with i18n routing). */
export type EventLocale = "es" | "en";

/**
 * Event name → payload shape. The keys are the literal event names sent to
 * PostHog; the values are the typed properties for each.
 */
export interface AnalyticsEventMap {
  /** CV PDF download. `id` identifies which document (currently always "cv"). */
  document_download: { id: string };
  /** A project card was opened (navigated to its detail). */
  project_view: { slug: string };
  /** External link on a project detail (repo or live demo). */
  project_link_click: { slug?: string; target: "repo" | "demo" };
  /** Visitor switched the UI locale. */
  locale_switch: { locale: EventLocale };
  /** Contact form submitted successfully (no field contents — PII-free). */
  contact_submit: Record<string, never>;
  /** Scroll-depth milestone reached on the current page (25/50/75/100). */
  scroll_depth: { percent: 25 | 50 | 75 | 100 };
  /** Time the visitor spent on the page, sent on leave. */
  time_on_page: { seconds: number };
}

export type AnalyticsEventName = keyof AnalyticsEventMap;

/**
 * Typed capture helpers — one per event. Every component, listener and hook
 * dispatches through these; raw `posthog.capture` is never exposed.
 */
export const track = {
  documentDownload: (payload: AnalyticsEventMap["document_download"]) =>
    capture("document_download", payload),

  projectView: (payload: AnalyticsEventMap["project_view"]) =>
    capture("project_view", payload),

  projectLinkClick: (payload: AnalyticsEventMap["project_link_click"]) =>
    capture("project_link_click", payload),

  localeSwitch: (payload: AnalyticsEventMap["locale_switch"]) =>
    capture("locale_switch", payload),

  contactSubmit: () => capture("contact_submit", {}),

  scrollDepth: (payload: AnalyticsEventMap["scroll_depth"]) =>
    capture("scroll_depth", payload),

  timeOnPage: (payload: AnalyticsEventMap["time_on_page"]) =>
    capture("time_on_page", payload),
} as const;
