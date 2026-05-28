/**
 * consent.test.ts — persisted-choice storage for the cookie banner.
 *
 * readConsent is the gate that decides whether the banner shows on load, so its
 * handling of unknown/empty values matters: anything that is not exactly
 * "accept" / "necessary" must read back as `null` (= no decision → prompt),
 * never as a silent accept. Uses jsdom's localStorage (vitest env is jsdom).
 */

import { beforeEach, describe, expect, it } from "vitest";

import { CONSENT_KEY, readConsent, writeConsent } from "./consent";

beforeEach(() => {
  window.localStorage.clear();
});

describe("writeConsent / readConsent round-trip", () => {
  it("persists and reads back 'accept'", () => {
    writeConsent("accept");
    expect(window.localStorage.getItem(CONSENT_KEY)).toBe("accept");
    expect(readConsent()).toBe("accept");
  });

  it("persists and reads back 'necessary'", () => {
    writeConsent("necessary");
    expect(window.localStorage.getItem(CONSENT_KEY)).toBe("necessary");
    expect(readConsent()).toBe("necessary");
  });

  it("overwrites a prior choice", () => {
    writeConsent("accept");
    writeConsent("necessary");
    expect(readConsent()).toBe("necessary");
  });
});

describe("readConsent with no / invalid stored value", () => {
  it("returns null when nothing is stored", () => {
    expect(readConsent()).toBeNull();
  });

  it("returns null for an empty string", () => {
    window.localStorage.setItem(CONSENT_KEY, "");
    expect(readConsent()).toBeNull();
  });

  it("returns null for an unrecognised value (no silent accept)", () => {
    window.localStorage.setItem(CONSENT_KEY, "yes");
    expect(readConsent()).toBeNull();
  });

  it("is case-sensitive: 'Accept' is not a valid choice", () => {
    window.localStorage.setItem(CONSENT_KEY, "Accept");
    expect(readConsent()).toBeNull();
  });
});
