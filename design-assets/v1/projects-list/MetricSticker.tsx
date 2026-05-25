"use client";

/**
 * MetricSticker.tsx
 *
 * Horizontal label tape rendered between a project's visual and its title.
 * EVERY card has one — the headline metric is the trust signal.
 *
 * Layout: vertical accent strip (3px wide) · big serif value (left) · mono caps label (right).
 *
 * Sits between visual and title, with hairline borders top & bottom to feel like a
 * thin band layered on the card.
 */

import type { LFn, ProjectMetric } from "@/design-assets/v1/shapes";

export interface MetricStickerProps {
  metric: ProjectMetric;
  /** Accent color (CSS var or hex). Use the project's kind accent. */
  accent: string;
  L: LFn;
}

export function MetricSticker({ metric, accent, L }: MetricStickerProps) {
  return (
    <div className="mt-4 flex items-stretch border-t border-b border-rule-strong bg-paper-sunken">
      <span aria-hidden className="block w-[3px] flex-shrink-0" style={{ background: accent }} />
      <div className="flex items-baseline justify-between gap-4 px-4 py-2.5 flex-1 min-w-0">
        <span className="font-display text-[26px] md:text-[30px] leading-[1] tracking-[-0.02em] text-ink">
          {metric.value}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted text-right truncate">
          {L(metric.label)}
        </span>
      </div>
    </div>
  );
}
