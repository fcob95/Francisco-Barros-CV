"use client";

/**
 * template.tsx — per-navigation page-transition wrapper (F5).
 *
 * Next.js re-mounts a `template` on every navigation (unlike `layout`, which
 * persists), so it is the correct primitive for entry transitions: each route
 * change yields a fresh mount and replays the `initial → animate` cycle once.
 *
 * "use client" justification: framer-motion + useReducedMotion require client
 * hooks. This is the ONLY client boundary added in F5. CRITICAL: `children`
 * (the server-rendered page tree) is passed through as a prop and never
 * imported here, so page content stays server-rendered — only this thin
 * wrapper crosses into the client.
 *
 * Reduced-motion: when `useReducedMotion()` is true, children render with no
 * motion wrapper at all (static, opacity 1) — no transform, no fade, no layout
 * shift. The global CSS reset in app/globals.css is a second line of defence.
 *
 * The transition is intentionally subtle (opacity + 8px lift, ~300ms) and uses
 * the same easing as the Hero entry ([0.32, 0.72, 0, 1]) for a consistent feel.
 * `transform`/`opacity` are GPU-composited, so there is no layout shift and
 * scroll position is preserved by the App Router's scroll restoration.
 */

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}
