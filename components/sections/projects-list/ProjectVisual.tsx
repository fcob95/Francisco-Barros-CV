/**
 * ProjectVisual.tsx — presentational, ported from
 * design-assets/v1/projects-list/ProjectVisual.tsx (copied by value; the asset
 * is read-only and never imported).
 *
 * Per-slug abstract SVG composition. NO stock photos, NO emoji. Each known slug
 * gets a custom geometric composition tied to its subject; unknown slugs fall
 * back to a generic "stack" composition.
 *
 * Pure presentational: given (slug, kind, featured) it renders an SVG. No hooks,
 * no data access — safe to render inside a Client Component.
 */

interface ProjectVisualProps {
  slug: string;
  kind: "case-study" | "side-project";
  featured?: boolean;
}

export function ProjectVisual({ slug, kind, featured }: ProjectVisualProps) {
  const defaultAccent =
    kind === "case-study" ? "var(--color-terracotta)" : "var(--color-ocean)";
  const c = compositions[slug] ?? {
    type: "frame" as const,
    accent: defaultAccent,
  };
  const accent = c.accent;
  const h = featured ? 200 : 140;

  return (
    <div
      className="relative w-full bg-paper-sunken border border-rule overflow-hidden"
      style={{ height: h }}
      aria-hidden
    >
      <svg
        viewBox="0 0 400 200"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width={400} height={200} fill="var(--color-paper-sunken)" />
        {c.type === "shield" && <ShieldComposition accent={accent} />}
        {c.type === "flight" && <FlightComposition accent={accent} />}
        {c.type === "nodes" && <NodesComposition accent={accent} />}
        {c.type === "stack" && <StackComposition accent={accent} />}
        {c.type === "bars" && <BarsComposition accent={accent} />}
        {c.type === "map" && <MapComposition accent={accent} />}
        {c.type === "agents" && <AgentsComposition accent={accent} />}
        {c.type === "frame" && <FrameComposition accent={accent} />}
        {c.type === "docs" && <DocsComposition accent={accent} />}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Per-slug composition map
// ─────────────────────────────────────────────────────────────────────────────

type CompositionType =
  | "shield"
  | "flight"
  | "nodes"
  | "stack"
  | "bars"
  | "map"
  | "agents"
  | "frame"
  | "docs";

const compositions: Record<string, { type: CompositionType; accent: string }> =
  {
    "trustonic-movistar": { type: "shield", accent: "var(--color-terracotta)" },
    "ndc-cocha-travel": { type: "flight", accent: "var(--color-terracotta)" },
    "marketplace-integration-skinautica": {
      type: "nodes",
      accent: "var(--color-terracotta)",
    },
    "ai-reporting-skinautica": {
      type: "stack",
      accent: "var(--color-terracotta)",
    },
    "finanzas-flow": { type: "bars", accent: "var(--color-ocean)" },
    "real-estate-chile": { type: "map", accent: "var(--color-ocean)" },
    "ai-orchestrated-portfolio": {
      type: "agents",
      accent: "var(--color-ocean)",
    },
    "ai-learning-guides": { type: "docs", accent: "var(--color-ocean)" },
  };

// ─────────────────────────────────────────────────────────────────────────────
// Compositions
// ─────────────────────────────────────────────────────────────────────────────

/** Orchestrator: a core node wired to satellite agents. */
function AgentsComposition({ accent }: { accent: string }) {
  const satellites: Array<[number, number]> = [
    [95, 55],
    [115, 150],
    [200, 38],
    [285, 55],
    [305, 150],
  ];
  return (
    <>
      {satellites.map(([x, y], i) => (
        <line
          key={`e${i}`}
          x1={200}
          y1={100}
          x2={x}
          y2={y}
          stroke="var(--color-ink)"
          strokeWidth={0.8}
          opacity={0.45}
        />
      ))}
      {satellites.map(([x, y], i) => (
        <circle
          key={`n${i}`}
          cx={x}
          cy={y}
          r={13}
          fill="var(--color-paper-raised)"
          stroke="var(--color-ink)"
          strokeWidth={1}
        />
      ))}
      <circle cx={200} cy={100} r={26} fill={accent} opacity={0.12} />
      <circle
        cx={200}
        cy={100}
        r={26}
        fill="var(--color-paper-raised)"
        fillOpacity={0}
        stroke={accent}
        strokeWidth={2}
      />
      <text
        x={200}
        y={104}
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize={9}
        fill="var(--color-ink)"
        fontWeight={600}
      >
        CORE
      </text>
      <text
        x={200}
        y={190}
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize={9}
        fill="var(--color-ink-muted)"
        letterSpacing={1.4}
      >
        ORCHESTRATOR · 5 AGENTS
      </text>
    </>
  );
}

/** Neutral fallback for slugs without a bespoke composition — no metric text. */
function FrameComposition({ accent }: { accent: string }) {
  return (
    <>
      <rect
        x={118}
        y={50}
        width={164}
        height={100}
        fill="var(--color-paper-raised)"
        stroke="var(--color-ink)"
        strokeWidth={1.5}
      />
      <rect
        x={130}
        y={62}
        width={164}
        height={100}
        fill="none"
        stroke={accent}
        strokeWidth={1.5}
        opacity={0.6}
      />
    </>
  );
}

/** Downloadable study material: a stack of document pages + a download badge. */
function DocsComposition({ accent }: { accent: string }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={120 + i * 18}
          y={40 + i * 14}
          width={150}
          height={120}
          fill="var(--color-paper-raised)"
          stroke={i === 2 ? accent : "var(--color-ink)"}
          strokeWidth={i === 2 ? 1.5 : 0.8}
          opacity={i === 2 ? 1 : 0.55}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={`t${i}`}
          x1={170}
          y1={84 + i * 16}
          x2={i === 3 ? 228 : 256}
          y2={84 + i * 16}
          stroke="var(--color-ink-muted)"
          strokeWidth={2}
          opacity={0.55}
        />
      ))}
      <g transform="translate(298 150)">
        <circle r={16} fill={accent} opacity={0.15} />
        <path
          d="M0 -7 L0 6 M-5 1 L0 6 L5 1"
          fill="none"
          stroke={accent}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </>
  );
}

function ShieldComposition({ accent }: { accent: string }) {
  return (
    <>
      <path
        d="M200 30 L300 70 L300 120 Q300 160 200 180 Q100 160 100 120 L100 70 Z"
        fill="var(--color-paper-raised)"
        stroke="var(--color-ink)"
        strokeWidth={1.5}
      />
      <path
        d="M200 40 L290 75 L290 120 Q290 152 200 170 Q110 152 110 120 L110 75 Z"
        fill={accent}
        opacity={0.15}
      />
      <text
        x={200}
        y={118}
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize={22}
        fill="var(--color-ink)"
        fontWeight={600}
      >
        €2M
      </text>
      <text
        x={200}
        y={138}
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize={9}
        fill="var(--color-ink-muted)"
        letterSpacing={1.2}
      >
        PROTECTED
      </text>
    </>
  );
}

function FlightComposition({ accent }: { accent: string }) {
  return (
    <>
      <path
        d="M30 160 Q 200 30, 370 110"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <circle cx={30} cy={160} r={4} fill="var(--color-ink)" />
      <circle cx={370} cy={110} r={4} fill={accent} />
      <g transform="translate(200 75) rotate(-12)">
        <path
          d="M-14 0 L14 0 L8 -4 L-8 -4 Z M-14 0 L14 0 L8 4 L-8 4 Z"
          fill="var(--color-ink)"
        />
        <rect x={-16} y={-1} width={32} height={2} fill="var(--color-ink)" />
      </g>
      <text
        x={200}
        y={185}
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize={10}
        fill="var(--color-ink-muted)"
        letterSpacing={1.4}
      >
        NDC · DYN. PRICING
      </text>
    </>
  );
}

function NodesComposition({ accent }: { accent: string }) {
  const nodes: Array<[number, number, string]> = [
    [80, 60, "BSALE"],
    [200, 40, "SHOPIFY"],
    [320, 80, "ANYMKT"],
    [120, 150, "WALMART"],
    [280, 150, "BI"],
  ];
  const edges: Array<[number, number, number, number]> = [
    [80, 60, 200, 40],
    [200, 40, 320, 80],
    [80, 60, 120, 150],
    [320, 80, 280, 150],
    [200, 40, 280, 150],
    [120, 150, 280, 150],
  ];
  return (
    <>
      {edges.map(([x1, y1, x2, y2], i) => (
        <line
          key={`l${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="var(--color-ink)"
          strokeWidth={0.6}
          opacity={0.5}
        />
      ))}
      {nodes.map(([x, y, lbl], i) => (
        <g key={`n${i}`}>
          <circle
            cx={x}
            cy={y}
            r={22}
            fill="var(--color-paper-raised)"
            stroke={i === 0 ? accent : "var(--color-ink)"}
            strokeWidth={i === 0 ? 2 : 1}
          />
          <text
            x={x}
            y={y + 2}
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontSize={8}
            fill="var(--color-ink)"
            fontWeight={600}
          >
            {lbl}
          </text>
        </g>
      ))}
    </>
  );
}

function StackComposition({ accent }: { accent: string }) {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={60 + i * 22}
          y={30 + i * 16}
          width={220}
          height={100}
          fill="var(--color-paper-raised)"
          stroke={i === 3 ? accent : "var(--color-ink)"}
          strokeWidth={i === 3 ? 1.5 : 0.8}
          opacity={i === 3 ? 1 : 0.6}
        />
      ))}
      <text
        x={282}
        y={153}
        fontFamily="JetBrains Mono, monospace"
        fontSize={9}
        fill="var(--color-ink-muted)"
        letterSpacing={1.2}
      >
        ◐ Claude
      </text>
      <text
        x={282}
        y={168}
        fontFamily="JetBrains Mono, monospace"
        fontSize={22}
        fill="var(--color-ink)"
        fontWeight={600}
      >
        -60%
      </text>
    </>
  );
}

function BarsComposition({ accent }: { accent: string }) {
  const banks = ["BICE", "SAN", "FAL"];
  const bars = [100, 140, 80, 160, 120, 180, 90, 140, 110];
  return (
    <>
      {banks.map((label, i) => (
        <g key={label} transform={`translate(${40 + i * 50} 50)`}>
          <rect
            width={32}
            height={24}
            fill="var(--color-paper-raised)"
            stroke="var(--color-ink)"
            strokeWidth={1}
          />
          <text
            x={16}
            y={16}
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontSize={8}
            fill="var(--color-ink)"
          >
            {label}
          </text>
        </g>
      ))}
      {bars.map((bh, i) => (
        <rect
          key={i}
          x={30 + i * 38}
          y={200 - bh * 0.35}
          width={24}
          height={bh * 0.35}
          fill={i % 3 === 0 ? accent : "var(--color-ink)"}
          opacity={i % 3 === 0 ? 0.95 : 0.7}
        />
      ))}
    </>
  );
}

function MapComposition({ accent }: { accent: string }) {
  const pins: Array<[number, number, number]> = [
    [80, 60, 9],
    [150, 90, 7],
    [220, 50, 8],
    [280, 130, 10],
    [330, 80, 6],
    [120, 150, 5],
    [200, 170, 9],
    [290, 40, 8],
  ];
  return (
    <>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line
          key={`gx${i}`}
          x1={i * 70}
          y1={0}
          x2={i * 70}
          y2={200}
          stroke="var(--color-rule)"
          strokeWidth={0.5}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={`gy${i}`}
          x1={0}
          y1={i * 50}
          x2={400}
          y2={i * 50}
          stroke="var(--color-rule)"
          strokeWidth={0.5}
        />
      ))}
      {pins.map(([x, y, r], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill={r >= 9 ? accent : "var(--color-ink)"}
          opacity={r >= 9 ? 0.85 : 0.55}
        />
      ))}
      <text
        x={380}
        y={192}
        textAnchor="end"
        fontFamily="JetBrains Mono, monospace"
        fontSize={9}
        fill="var(--color-ink-muted)"
        letterSpacing={1}
      >
        SCL · CAP RATE
      </text>
    </>
  );
}
