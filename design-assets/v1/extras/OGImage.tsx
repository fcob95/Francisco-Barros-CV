"use client";

/**
 * OGImage.tsx — 1200 × 630.
 *
 * For social cards / link previews. Render via:
 *   - Next.js: <ImageResponse> in `app/og/route.tsx` — paste the JSX from this file's
 *     return value (it's all inline styles, OG-compatible).
 *   - or html-to-image during build.
 *
 * Editorial composition: terracotta brand pip + name (top-left), massive 3-line headline
 * (Pricing. Revenue. AI.), isometric pillar mini-stack (right), bottom strip with tagline + URL.
 *
 * No web fonts requested here — when rendering with @vercel/og, pass Instrument Serif +
 * Inter + JetBrains Mono via the `fonts` option.
 */

import type { Profile } from "@/design-assets/v1/shapes";

export interface OGImageProps {
  profile: Profile;
  locale: "es" | "en";
  /** Override the site URL printed at the bottom. */
  url?: string;
}

export function OGImage({ profile, locale, url = "fcobarroscruz.cl" }: OGImageProps) {
  const headline = profile.headline[locale];
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
          position: "absolute", inset: 0, opacity: 0.5,
          backgroundImage: "linear-gradient(to right, #e0d8c8 1px, transparent 1px)",
          backgroundSize: "100px 100%",
        }}
      />

      {/* Top kicker */}
      <div
        style={{
          position: "absolute", top: 48, left: 56, right: 56,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ display: "inline-block", width: 12, height: 12, background: "#d4621a" }} />
          <span style={{ fontFamily: "Instrument Serif, serif", fontSize: 30, color: "#1c1917" }}>
            {profile.name.split(" ").slice(0, 2).join(" ")}
          </span>
        </div>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace", fontSize: 14, letterSpacing: 2,
            color: "#78716c", textTransform: "uppercase",
          }}
        >
          Portfolio · 2026
        </span>
      </div>

      {/* Massive name */}
      <div style={{ position: "absolute", left: 56, top: 140 }}>
        <div
          style={{
            fontFamily: "Instrument Serif, serif", fontSize: 130, lineHeight: 0.96,
            letterSpacing: "-0.025em", color: "#1c1917",
          }}
        >
          <div>Pricing.</div>
          <div>Revenue.</div>
          <div>
            <span>AI</span>
            <span style={{ color: "#d4621a" }}>.</span>
          </div>
        </div>
      </div>

      {/* Pillar mini stack */}
      <div style={{ position: "absolute", right: 56, top: 200, width: 360, height: 280 }}>
        {[0, 1, 2].map((i) => {
          const shadowColors = ["#d4621a", "#0c4a6e", "#c89d2c"];
          const titles = ["Pricing Strategy", "Revenue Analytics", "AI-Augmented"];
          return (
            <div
              key={i}
              style={{
                position: "absolute", top: 0, left: 0, width: 280, height: 90,
                transform: `translate(${i * 30}px, ${i * 60}px) rotate(${-6 + i * 1.2}deg)`,
                background: "#fbf8f3", border: "1.5px solid #1c1917",
                boxShadow: `5px 5px 0 0 ${shadowColors[i]}`,
                padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: 1.4,
                    textTransform: "uppercase", color: "#78716c",
                  }}
                >
                  0{i + 1}
                </div>
                <div style={{ fontFamily: "Instrument Serif, serif", fontSize: 22, color: "#1c1917" }}>
                  {titles[i]}
                </div>
              </div>
              <div
                style={{ width: 28, height: 28, borderRadius: 14, background: shadowColors[i] }}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom strip */}
      <div
        style={{
          position: "absolute", left: 56, right: 56, bottom: 50,
          borderTop: "1px solid #1c1917", paddingTop: 16,
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
        }}
      >
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: "#57534e" }}>{headline}</span>
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: 1.4,
            color: "#78716c", textTransform: "uppercase",
          }}
        >
          {url}
        </span>
      </div>
    </div>
  );
}
