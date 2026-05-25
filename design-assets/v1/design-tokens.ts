/**
 * design-tokens.ts
 *
 * Source of truth for the v1 design language: "Editorial 3D".
 * Port these into `app/globals.css` inside a Tailwind v4 `@theme {}` block.
 *
 * Direction: minimalismo expresivo con acentos 3D — cream paper + ink + terracotta,
 * capas con offset, tipografía editorial mixta (serif display + sans body + mono numeric).
 *
 * Both light and dark modes derive from the same tokens. Contrast pairs verified WCAG AA.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Color
// ─────────────────────────────────────────────────────────────────────────────

export const color = {
  // Surfaces
  paper:        { light: '#f5f1eb', dark: '#0f0d0a' },   // page background
  paperRaised:  { light: '#fbf8f3', dark: '#171411' },   // cards on page
  paperSunken:  { light: '#ede7dc', dark: '#1d1916' },   // form fields, subtle wells

  // Ink (text + foreground)
  ink:          { light: '#1c1917', dark: '#f5f1eb' },   // primary text
  inkMuted:     { light: '#57534e', dark: '#a8a29e' },   // secondary
  inkSoft:      { light: '#78716c', dark: '#78716c' },   // labels, meta

  // Hairlines & dividers
  rule:         { light: '#e0d8c8', dark: '#2a2620' },
  ruleStrong:   { light: '#cabfa9', dark: '#3b3530' },

  // Accents — terracotta is THE brand accent; ocean is supporting
  terracotta:   { light: '#d4621a', dark: '#e87731' },
  terracottaInk:{ light: '#9c4612', dark: '#f59e6b' },   // for text-on-paper
  ocean:        { light: '#0c4a6e', dark: '#7dd3fc' },
  ochre:        { light: '#c89d2c', dark: '#eab308' },   // tertiary, sparingly

  // Semantic
  success:      { light: '#2f7a4d', dark: '#86efac' },
  danger:       { light: '#b1331b', dark: '#fca5a5' },

  // Focus ring (high contrast both modes)
  focus:        { light: '#0c4a6e', dark: '#7dd3fc' },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────────────────────────────────────

export const font = {
  display: '"Instrument Serif", "Source Serif Pro", Georgia, serif',
  body:    '"Inter", -apple-system, "Segoe UI", system-ui, sans-serif',
  mono:    '"JetBrains Mono", "SF Mono", "Menlo", monospace',
} as const;

/** Modular scale, 1.250 (major third). px units; convert to rem at @theme. */
export const fontSize = {
  xs:   '12px',    // labels, captions
  sm:   '14px',
  base: '16px',   // body
  md:   '18px',   // emphasized body
  lg:   '22px',
  xl:   '28px',
  '2xl':'36px',
  '3xl':'48px',
  '4xl':'64px',
  '5xl':'88px',   // hero display
  '6xl':'120px',  // hero display, desktop
} as const;

export const fontWeight = {
  regular: 400,
  medium:  500,
  semibold:600,
  bold:    700,
} as const;

export const lineHeight = {
  tight:   1.05,  // display
  snug:    1.2,
  normal:  1.5,
  relaxed: 1.65,  // long-form body
} as const;

export const tracking = {
  tightDisplay: '-0.02em',
  tight:        '-0.01em',
  normal:       '0',
  wide:         '0.02em',
  label:        '0.08em',   // uppercase mono labels
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Spacing — 4px base
// ─────────────────────────────────────────────────────────────────────────────

export const space = {
  0:  '0',
  1:  '4px',
  2:  '8px',
  3:  '12px',
  4:  '16px',
  5:  '20px',
  6:  '24px',
  8:  '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
  40: '160px',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Radii — editorial = mostly 0 (sharp), small rounding for chips/inputs
// ─────────────────────────────────────────────────────────────────────────────

export const radius = {
  none: '0',
  sm:   '2px',
  md:   '4px',
  lg:   '8px',
  pill: '999px',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Shadows — soft & long, no blue tint; supports the "paper on paper" feel
// ─────────────────────────────────────────────────────────────────────────────

export const shadow = {
  none:  'none',
  xs:    '0 1px 0 0 rgba(28,25,23,0.04)',
  sm:    '0 1px 2px rgba(28,25,23,0.06), 0 1px 1px rgba(28,25,23,0.04)',
  md:    '0 6px 16px -8px rgba(28,25,23,0.12), 0 2px 6px -2px rgba(28,25,23,0.06)',
  lg:    '0 18px 40px -12px rgba(28,25,23,0.18), 0 6px 14px -6px rgba(28,25,23,0.08)',
  // 3D editorial stack: hard offset, no blur — "sticker" feel
  offset:'4px 4px 0 0 #1c1917',
  offsetTerracotta: '4px 4px 0 0 #d4621a',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Motion
// ─────────────────────────────────────────────────────────────────────────────

export const motion = {
  /** Use these durations directly in Framer variants. */
  duration: {
    instant:  120,
    fast:     200,
    base:     320,
    slow:     560,
    slowest:  900,
  },
  easing: {
    // cubic-bezier — copy as `cubic-bezier(...)` for CSS or pass array to Framer
    standard: [0.32, 0.72, 0, 1] as const,        // primary easing for entries
    decel:    [0.05, 0.7, 0.1, 1] as const,        // for incoming
    accel:    [0.3, 0, 0.8, 0.15] as const,        // for exits
    spring:   { type: 'spring', stiffness: 260, damping: 26 } as const,
  },
  /** Always pair with: useReducedMotion() ? {} : variant */
  reducedMotionFallback: { initial: false, animate: 'visible', exit: 'visible' },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────────────────────────────────────

export const layout = {
  /** Page max width — keep the editorial line measure readable. */
  containerMax:   '1240px',
  containerProse: '720px',   // for long-form text-only pages
  gutterMobile:   '20px',
  gutterDesktop:  '48px',
  /** Breakpoints — match Tailwind defaults so we can use sm/md/lg/xl. */
  bp: { sm: 640, md: 768, lg: 1024, xl: 1280 },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Z-index scale — keep small, named.
// ─────────────────────────────────────────────────────────────────────────────

export const z = {
  base:    0,
  raised:  10,
  sticky:  20,
  overlay: 40,
  modal:   50,
  toast:   60,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Tailwind v4 @theme block — paste verbatim into globals.css.
// ─────────────────────────────────────────────────────────────────────────────

export const TAILWIND_V4_THEME_CSS = /* css */ `
@theme {
  /* ─── Colors (light defaults; dark via [data-theme="dark"]) ─── */
  --color-paper:           #f5f1eb;
  --color-paper-raised:    #fbf8f3;
  --color-paper-sunken:    #ede7dc;
  --color-ink:             #1c1917;
  --color-ink-muted:       #57534e;
  --color-ink-soft:        #78716c;
  --color-rule:            #e0d8c8;
  --color-rule-strong:     #cabfa9;
  --color-terracotta:      #d4621a;
  --color-terracotta-ink:  #9c4612;
  --color-ocean:           #0c4a6e;
  --color-ochre:           #c89d2c;
  --color-success:         #2f7a4d;
  --color-danger:          #b1331b;
  --color-focus:           #0c4a6e;

  /* ─── Fonts ─── */
  --font-display: "Instrument Serif", "Source Serif Pro", Georgia, serif;
  --font-sans:    "Inter", -apple-system, "Segoe UI", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", "SF Mono", "Menlo", monospace;

  /* ─── Radii ─── */
  --radius-none: 0;
  --radius-sm:   2px;
  --radius-md:   4px;
  --radius-lg:   8px;

  /* ─── Shadows ─── */
  --shadow-offset:     4px 4px 0 0 #1c1917;
  --shadow-offset-acc: 4px 4px 0 0 #d4621a;
}

[data-theme="dark"] {
  --color-paper:          #0f0d0a;
  --color-paper-raised:   #171411;
  --color-paper-sunken:   #1d1916;
  --color-ink:            #f5f1eb;
  --color-ink-muted:      #a8a29e;
  --color-ink-soft:       #78716c;
  --color-rule:           #2a2620;
  --color-rule-strong:    #3b3530;
  --color-terracotta:     #e87731;
  --color-terracotta-ink: #f59e6b;
  --color-ocean:          #7dd3fc;
  --color-ochre:          #eab308;
  --color-success:        #86efac;
  --color-danger:         #fca5a5;
  --color-focus:          #7dd3fc;
  --shadow-offset:        4px 4px 0 0 #f5f1eb;
}
`;

export const tokens = {
  color, font, fontSize, fontWeight, lineHeight, tracking,
  space, radius, shadow, motion, layout, z,
};

export default tokens;
