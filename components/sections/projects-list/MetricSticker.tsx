/**
 * MetricSticker.tsx — presentational, ported from
 * design-assets/v1/projects-list/MetricSticker.tsx (copied by value).
 *
 * Horizontal label tape rendered between a project's visual and its title.
 * EVERY card has one — the headline metric is the trust signal.
 *
 * Layout: vertical accent strip (3px wide) · big serif value (left) · mono caps
 * label (right). Pure presentational: the label arrives already locale-resolved
 * from the container (no `L`/`pick` here).
 */

export interface CardMetricView {
  /** Pre-formatted display value (e.g. "+25%", "€2M"). */
  value: string;
  /** Locale-resolved label. */
  label: string;
}

export interface MetricStickerProps {
  metric: CardMetricView;
  /** Accent color (CSS var or hex). Use the project's kind accent. */
  accent: string;
}

export function MetricSticker({ metric, accent }: MetricStickerProps) {
  return (
    <div className="mt-4 flex items-stretch border-t border-b border-rule-strong bg-paper-sunken">
      <span
        aria-hidden
        className="block w-[3px] flex-shrink-0"
        style={{ background: accent }}
      />
      <div className="flex items-baseline justify-between gap-4 px-4 py-2.5 flex-1 min-w-0">
        <span className="font-display text-[26px] md:text-[30px] leading-[1] tracking-[-0.02em] text-ink">
          {metric.value}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted text-right truncate">
          {metric.label}
        </span>
      </div>
    </div>
  );
}
