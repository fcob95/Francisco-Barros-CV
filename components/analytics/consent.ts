/**
 * consent.ts — consent storage + the React context shared between the
 * AnalyticsProvider (owns the banner state) and any UI that needs to reopen it
 * (the Footer "Cookies" trigger).
 */

"use client";

import { createContext, useContext } from "react";

export type ConsentChoice = "accept" | "necessary";

/** localStorage key the cookie asset standardised on (see extras/README). */
export const CONSENT_KEY = "fb-cookies";

/** Read the persisted choice. `null` = no decision yet → banner must show. */
export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(CONSENT_KEY);
  return raw === "accept" || raw === "necessary" ? raw : null;
}

/** Persist the choice. */
export function writeConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, choice);
}

export interface ConsentContextValue {
  /** Reopen the cookie banner so the visitor can change their mind (opt-out). */
  reopenBanner: () => void;
}

export const ConsentContext = createContext<ConsentContextValue | null>(null);

/**
 * Access the consent controls. Returns `null` outside the provider so callers
 * (e.g. the Footer, which also renders in contexts without analytics) can
 * degrade gracefully instead of throwing.
 */
export function useConsent(): ConsentContextValue | null {
  return useContext(ConsentContext);
}
