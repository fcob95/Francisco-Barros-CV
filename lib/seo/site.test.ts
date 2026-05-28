import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type * as SiteModule from "@/lib/seo/site";

/**
 * `lib/seo/site.ts` reads `NEXT_PUBLIC_SITE_URL` at module load to compute
 * `SITE_URL`. To pin the base deterministically we stub the env BEFORE a fresh
 * dynamic import (after `vi.resetModules`). The base is set with a trailing
 * slash on purpose to prove `SITE_URL` strips it.
 */
const TEST_BASE = "https://example.test";

async function loadSite(base = `${TEST_BASE}/`): Promise<typeof SiteModule> {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", base);
  vi.resetModules();
  return import("@/lib/seo/site");
}

describe("SITE_URL", () => {
  beforeEach(() => {
    vi.resetModules();
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses NEXT_PUBLIC_SITE_URL and strips a trailing slash", async () => {
    const { SITE_URL } = await loadSite(`${TEST_BASE}/`);
    expect(SITE_URL).toBe(TEST_BASE);
  });
});

describe("pathname", () => {
  let pathname: typeof SiteModule.pathname;

  beforeEach(async () => {
    ({ pathname } = await loadSite());
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns ES (default) paths with no prefix", () => {
    expect(pathname("/", "es")).toBe("/");
    expect(pathname("/projects/x", "es")).toBe("/projects/x");
    expect(pathname("/about", "es")).toBe("/about");
  });

  it("prefixes EN paths with /en", () => {
    expect(pathname("/", "en")).toBe("/en");
    expect(pathname("/projects/x", "en")).toBe("/en/projects/x");
    expect(pathname("/about", "en")).toBe("/en/about");
  });

  it("keeps the root as '/' (no '/en/' double-segment for EN root)", () => {
    expect(pathname("/", "es")).toBe("/");
    expect(pathname("/", "en")).toBe("/en");
  });

  it("never produces a double locale prefix", () => {
    expect(pathname("/projects/x", "en")).not.toMatch(/\/en\/en(\/|$)/);
    expect(pathname("/", "en")).not.toMatch(/\/en\/en(\/|$)/);
  });

  it("strips trailing slashes on deep routes", () => {
    expect(pathname("/projects/x/", "es")).toBe("/projects/x");
    expect(pathname("/projects/x/", "en")).toBe("/en/projects/x");
  });

  it("normalizes a missing leading slash", () => {
    expect(pathname("projects/x", "es")).toBe("/projects/x");
    expect(pathname("projects/x", "en")).toBe("/en/projects/x");
  });

  it("normalizes an empty path to the root", () => {
    expect(pathname("", "es")).toBe("/");
    expect(pathname("", "en")).toBe("/en");
  });
});

describe("absoluteUrl", () => {
  let absoluteUrl: typeof SiteModule.absoluteUrl;

  beforeEach(async () => {
    ({ absoluteUrl } = await loadSite());
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("prepends the site base for the ES root", () => {
    expect(absoluteUrl("/", "es")).toBe(`${TEST_BASE}/`);
  });

  it("prepends the site base for EN paths", () => {
    expect(absoluteUrl("/projects/x", "en")).toBe(`${TEST_BASE}/en/projects/x`);
  });

  it("produces absolute URLs", () => {
    expect(absoluteUrl("/about", "es")).toMatch(/^https:\/\//);
    expect(absoluteUrl("/about", "en")).toMatch(/^https:\/\//);
  });

  it("never doubles the slash between base and path", () => {
    // The only allowed '//' is the one in the protocol.
    const stripScheme = (url: string) => url.replace(/^https?:\/\//, "");
    expect(stripScheme(absoluteUrl("/", "es"))).not.toContain("//");
    expect(stripScheme(absoluteUrl("/projects/x", "en"))).not.toContain("//");
  });
});

describe("languageAlternates", () => {
  let languageAlternates: typeof SiteModule.languageAlternates;

  beforeEach(async () => {
    ({ languageAlternates } = await loadSite());
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns es, en and x-default entries", () => {
    const map = languageAlternates("/projects/x");
    expect(Object.keys(map).sort()).toEqual(["en", "es", "x-default"]);
  });

  it("points x-default at the ES (default-locale) URL", () => {
    const map = languageAlternates("/projects/x");
    expect(map["x-default"]).toBe(map.es);
    expect(map["x-default"]).toBe(`${TEST_BASE}/projects/x`);
  });

  it("prefixes per locale correctly", () => {
    const map = languageAlternates("/projects/x");
    expect(map.es).toBe(`${TEST_BASE}/projects/x`);
    expect(map.en).toBe(`${TEST_BASE}/en/projects/x`);
  });

  it("handles the root path per locale", () => {
    const map = languageAlternates("/");
    expect(map.es).toBe(`${TEST_BASE}/`);
    expect(map.en).toBe(`${TEST_BASE}/en`);
    expect(map["x-default"]).toBe(`${TEST_BASE}/`);
  });

  it("returns absolute URLs for every entry", () => {
    const map = languageAlternates("/about");
    for (const url of Object.values(map)) {
      expect(url).toMatch(/^https:\/\//);
    }
  });
});
