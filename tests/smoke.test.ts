import { describe, it, expect } from "vitest";

// Smoke test del entorno: confirma que el runner (Vitest) está cableado.
// Tests reales por componente/feature llegan con cada fase.
describe("environment smoke test", () => {
  it("runs the test runner", () => {
    expect(1 + 1).toBe(2);
  });
});
