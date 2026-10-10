import type { ReactNode } from 'react';

export type TooltipEntry = {
  name?: string | number;
  value?: number | string;
  color?: string;
  dataKey?: string | number;
};

/** Glass tooltip shared by every chart on the site. */
export function ChartTooltip({
  active,
  payload,
  label,
  unit = '',
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
  unit?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      {label !== undefined && label !== '' && <span className="chart-tooltip-label">{label}</span>}
      {payload.map(entry => (
        <span key={`${entry.dataKey}-${entry.name}`} className="chart-tooltip-row">
          <i style={{ background: entry.color || 'var(--color-cyan)' }} />
          <span>{entry.name}</span>
          <b>{entry.value}{unit}</b>
        </span>
      ))}
    </div>
  );
}

export type ChartLegendItem = { name: string; color: string };

/** Reusable glass frame for a chart: title, "Illustrative data" badge, legend, body. */
export function ChartCard({
  title,
  subtitle,
  legend,
  footnote,
  children,
}: {
  title: string;
  subtitle?: string;
  legend?: ChartLegendItem[];
  footnote?: string;
  children: ReactNode;
}) {
  return (
    <div className="chart-card">
      <div className="chart-card-head">
        <div>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <span className="tk-badge chart-badge">Illustrative data</span>
      </div>
      <div className="chart-body">{children}</div>
      {legend && (
        <div className="chart-legend">
          {legend.map(item => (
            <span key={item.name}>
              <i style={{ background: item.color }} />
              {item.name}
            </span>
          ))}
        </div>
      )}
      {footnote && <p className="chart-footnote">{footnote}</p>}
    </div>
  );
}
