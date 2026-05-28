/**
 * posthog.test.ts — consent gate for the analytics layer (privacy-critical).
 *
 * Asserts the single invariant that makes consent enforceable: `capture()` is a
 * no-op until `initPostHog()` has actually booted PostHog, so nothing reaches
 * posthog-js without consent. posthog-js is mocked so we observe whether its
 * `capture`/`init` are ever called. The `initialised` singleton lives in module
 * scope, so every case re-imports the module fresh (vi.resetModules) to avoid
 * leakage across tests.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock posthog-js: default export with the methods the module touches. The
// factory returns spies we re-read per test via the dynamic import below.
vi.mock("posthog-js", () => ({
  default: {
    init: vi.fn(),
    capture: vi.fn(),
    opt_out_capturing: vi.fn(),
    reset: vi.fn(),
  },
}));

/** Fresh module graph + handles to the mocked posthog and the SUT. */
async function load() {
  vi.resetModules();
  const posthog = (await import("posthog-js")).default;
  const mod = await import("./posthog");
  return { posthog, ...mod };
}

const KEY = "phc_test";
const HOST = "https://eu.posthog.com";

beforeEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("capture consent gate", () => {
  it("no-ops and never touches posthog-js before init", async () => {
    const { posthog, capture, isInitialised } = await load();

    expect(isInitialised()).toBe(false);
    capture("project_view", { slug: "ndc-cocha-travel" });

    expect(posthog.capture).not.toHaveBeenCalled();
  });

  it("forwards to posthog.capture once initialised", async () => {
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", KEY);
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_HOST", HOST);

    const { posthog, capture, initPostHog, isInitialised } = await load();

    initPostHog();
    expect(isInitialised()).toBe(true);
    expect(posthog.init).toHaveBeenCalledTimes(1);

    capture("project_view", { slug: "finanzas-flow" });
    expect(posthog.capture).toHaveBeenCalledTimes(1);
    expect(posthog.capture).toHaveBeenCalledWith("project_view", {
      slug: "finanzas-flow",
    });
  });
});

describe("initPostHog", () => {
  it("stays off (no init) when env keys are absent", async () => {
    // No stubbed env → key/host undefined.
    const { posthog, initPostHog, isInitialised, capture } = await load();

    initPostHog();

    expect(posthog.init).not.toHaveBeenCalled();
    expect(isInitialised()).toBe(false);

    // And capture remains gated because init never flipped the flag.
    capture("project_view", { slug: "real-estate-chile" });
    expect(posthog.capture).not.toHaveBeenCalled();
  });

  it("is idempotent: a second call does not re-init", async () => {
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", KEY);
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_HOST", HOST);

    const { posthog, initPostHog } = await load();

    initPostHog();
    initPostHog();

    expect(posthog.init).toHaveBeenCalledTimes(1);
  });

  it("passes the privacy-hardening options to posthog.init", async () => {
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", KEY);
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_HOST", HOST);

    const { posthog, initPostHog } = await load();
    initPostHog();

    expect(posthog.init).toHaveBeenCalledWith(
      KEY,
      expect.objectContaining({
        api_host: HOST,
        autocapture: false,
        disable_session_recording: true,
        respect_dnt: true,
        persistence: "localStorage",
      }),
    );
  });
});

describe("resetPostHog (opt-out)", () => {
  it("opts out, resets, and re-gates capture", async () => {
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", KEY);
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_HOST", HOST);

    const { posthog, initPostHog, resetPostHog, isInitialised, capture } =
      await load();

    initPostHog();
    expect(isInitialised()).toBe(true);

    resetPostHog();
    expect(posthog.opt_out_capturing).toHaveBeenCalledTimes(1);
    expect(posthog.reset).toHaveBeenCalledTimes(1);
    expect(isInitialised()).toBe(false);

    // After reset, capture is gated again.
    capture("project_view", { slug: "trustonic-movistar" });
    expect(posthog.capture).not.toHaveBeenCalled();
  });

  it("no-ops when never initialised", async () => {
    const { posthog, resetPostHog } = await load();

    resetPostHog();

    expect(posthog.opt_out_capturing).not.toHaveBeenCalled();
    expect(posthog.reset).not.toHaveBeenCalled();
  });
});
