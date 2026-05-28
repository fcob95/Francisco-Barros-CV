import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Font loading for `next/og` (Satori) renders.
 *
 * `next/og` needs raw font binaries at render time; it does NOT read CSS or
 * `next/font`. Strategy, ordered by preference (CDN-first in practice):
 *
 *  1. If a binary exists at `public/fonts/<file>`, read it (offline override).
 *     NOTE: `public/fonts/` is NOT committed today, so this step normally
 *     misses and we fall through to the CDN. Drop the .ttf files there to make
 *     renders self-hosted/offline-safe (no code change needed).
 *  2. Otherwise fetch the face once from the Google Fonts static CDN — this is
 *     the effective runtime path until the local binaries are added.
 *  3. If both fail, return `[]` so `ImageResponse` falls back to its built-in
 *     default font. The route must NEVER crash the build or a request over
 *     typography — an on-brand-ish card with a fallback face is acceptable.
 *
 * The display headline uses Instrument Serif; labels/URL use a mono/sans face.
 * We load Instrument Serif + Inter; if absent, Satori's default sans renders
 * everything (composition and color stay intact).
 */

/**
 * Font descriptor accepted by `ImageResponse` (`next/og` / Satori). `next/og`
 * does not export this type, so we declare the minimal shape we use. `data` is
 * a font binary (Node `Buffer` from `readFile` or `ArrayBuffer` from `fetch`).
 */
export interface OgFont {
  name: string;
  data: Buffer | ArrayBuffer;
  style: "normal";
  weight: 400 | 500 | 600;
}
type OgFonts = OgFont[];

interface FontSpec {
  name: string;
  /** File under public/fonts/ (preferred source). */
  file: string;
  /** Google Fonts static CDN URL (fallback source). */
  cdn: string;
  weight: 400 | 500 | 600;
}

const FONTS: FontSpec[] = [
  {
    name: "Instrument Serif",
    file: "InstrumentSerif-Regular.ttf",
    cdn: "https://fonts.gstatic.com/s/instrumentserif/v4/jizBRFtNs2ka5fXjeivQ4LroWlx-2zIZj1bIkNo.ttf",
    weight: 400,
  },
  {
    name: "Inter",
    file: "Inter-Regular.ttf",
    cdn: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
    weight: 400,
  },
];

async function loadOne(spec: FontSpec): Promise<OgFonts[number] | null> {
  // 1) local bundle
  try {
    const data = await readFile(
      join(process.cwd(), "public", "fonts", spec.file),
    );
    return { name: spec.name, data, style: "normal", weight: spec.weight };
  } catch {
    // fall through to CDN
  }
  // 2) CDN
  try {
    const res = await fetch(spec.cdn);
    if (res.ok) {
      const data = await res.arrayBuffer();
      return { name: spec.name, data, style: "normal", weight: spec.weight };
    }
  } catch {
    // fall through to default
  }
  // 3) give up on this face — caller proceeds with whatever loaded
  return null;
}

/**
 * Returns the fonts available for the OG render. May be empty (Satori default
 * font is then used). Never throws.
 */
export async function loadOgFonts(): Promise<OgFonts> {
  const loaded = await Promise.all(FONTS.map(loadOne));
  return loaded.filter((f): f is OgFonts[number] => f !== null);
}
