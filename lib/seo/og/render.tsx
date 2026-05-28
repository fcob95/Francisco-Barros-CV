import { ImageResponse } from "next/og";

import type { Locale, Profile } from "@/lib/content";
import { pick } from "@/lib/content";
import { loadOgFonts } from "@/lib/seo/og/fonts";

/**
 * OG card renderer (1200 × 630). The JSX is PORTED BY VALUE from
 * `design-assets/v1/extras/OGImage.tsx` (read-only, never imported): same
 * editorial composition — terracotta brand pip + name, massive 3-line headline,
 * isometric pillar mini-stack, bottom strip with tagline/subtitle + URL. All
 * inline styles (Satori-compatible).
 *
 * Deviations from the asset, justified:
 *  - The asset rendered `profile.headline[locale]` in the bottom strip; here the
 *    bottom strip shows a caller-provided `subtitle` (page-specific copy) so the
 *    same card serves home + per-project, with the headline kept as the fixed
 *    3-line hero ("Pricing. / Revenue. / AI.").
 *  - The asset took its own `Profile` shape from design-assets; this uses the
 *    app's content `Profile`. Only `name` is consumed.
 *  - The asset's mono face (JetBrains Mono on labels/kicker/URL) is remapped to
 *    Inter: only Instrument Serif + Inter are loaded for the OG render, so the
 *    uppercase tracked labels render in Inter rather than a true mono.
 *  - Fonts load via `loadOgFonts()` with graceful fallback (see fonts.ts).
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

export interface OgCardInput {
  profile: Profile;
  locale: Locale;
  /** Bottom-strip copy (page tagline or project summary). */
  subtitle: string;
  /** URL printed bottom-right (no protocol). */
  displayUrl: string;
  /** Top-right kicker; defaults to "Portfolio · 2026". */
  kicker?: string;
}

const SHADOW_COLORS = ["#d4621a", "#0c4a6e", "#c89d2c"];
const PILLAR_TITLES = ["Pricing Strategy", "Revenue Analytics", "AI-Augmented"];

/** Builds the JSX tree for the card (extracted so it stays test-readable). */
function OgCard({ profile, subtitle, displayUrl, kicker }: OgCardInput) {
  const name = profile.name.split(" ").slice(0, 2).join(" ");
  return (
    <div
      style={{
        position: "relative",
        width: 1200,
        height: 630,
        background: "#f5f1eb",
        color: "#1c1917",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
        display: "flex",
      }}
    >
      {/* Grid backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          backgroundImage:
            "linear-gradient(to right, #e0d8c8 1px, transparent 1px)",
          backgroundSize: "100px 100%",
        }}
      />

      {/* Top kicker */}
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 56,
          right: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              display: "flex",
              width: 12,
              height: 12,
              background: "#d4621a",
            }}
          />
          <span
            style={{
              fontFamily: "Instrument Serif, serif",
              fontSize: 30,
              color: "#1c1917",
            }}
          >
            {name}
          </span>
        </div>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            letterSpacing: 2,
            color: "#78716c",
            textTransform: "uppercase",
          }}
        >
          {kicker ?? "Portfolio · 2026"}
        </span>
      </div>

      {/* Massive headline */}
      <div
        style={{ position: "absolute", left: 56, top: 140, display: "flex" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Instrument Serif, serif",
            fontSize: 130,
            lineHeight: 0.96,
            letterSpacing: "-0.025em",
            color: "#1c1917",
          }}
        >
          <div style={{ display: "flex" }}>Pricing.</div>
          <div style={{ display: "flex" }}>Revenue.</div>
          <div style={{ display: "flex" }}>
            <span>AI</span>
            <span style={{ color: "#d4621a" }}>.</span>
          </div>
        </div>
      </div>

      {/* Pillar mini stack */}
      <div
        style={{
          position: "absolute",
          right: 56,
          top: 200,
          width: 360,
          height: 280,
          display: "flex",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 280,
              height: 90,
              transform: `translate(${i * 30}px, ${i * 60}px) rotate(${-6 + i * 1.2}deg)`,
              background: "#fbf8f3",
              border: "1.5px solid #1c1917",
              boxShadow: `5px 5px 0 0 ${SHADOW_COLORS[i]}`,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  letterSpacing: 1.4,
                  textTransform: "uppercase",
                  color: "#78716c",
                }}
              >
                {`0${i + 1}`}
              </div>
              <div
                style={{
                  fontFamily: "Instrument Serif, serif",
                  fontSize: 22,
                  color: "#1c1917",
                }}
              >
                {PILLAR_TITLES[i]}
              </div>
            </div>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                background: SHADOW_COLORS[i],
              }}
            />
          </div>
        ))}
      </div>

      {/* Bottom strip */}
      <div
        style={{
          position: "absolute",
          left: 56,
          right: 56,
          bottom: 50,
          borderTop: "1px solid #1c1917",
          paddingTop: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 18,
            color: "#57534e",
            maxWidth: 760,
            display: "flex",
          }}
        >
          {subtitle}
        </span>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            letterSpacing: 1.4,
            color: "#78716c",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          {displayUrl}
        </span>
      </div>
    </div>
  );
}

/**
 * Renders the card to an `ImageResponse`. Loads fonts with fallback; never
 * throws on font failure (Satori default font then applies).
 */
export async function renderOgImage(
  input: OgCardInput,
): Promise<ImageResponse> {
  const fonts = await loadOgFonts();
  return new ImageResponse(<OgCard {...input} />, {
    ...OG_SIZE,
    fonts,
  });
}

/** Convenience: bottom-strip subtitle for the site default card. */
export function defaultOgSubtitle(profile: Profile, locale: Locale): string {
  return pick(locale, profile.headline);
}
