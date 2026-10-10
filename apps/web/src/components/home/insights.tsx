import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { SectionHeader } from '@/components/ui/section-header';
import { Reveal } from '@/components/ui/reveal';
import { ChartCard, ChartTooltip } from '@/components/chart-card';
import { useHydrated } from '@/hooks/use-hydrated';
import { kpiRadar, performanceBenchmark, trafficGrowth } from '@/data/charts';

const AXIS = { stroke: 'rgba(185,191,202,.08)', tick: { fill: '#AEB8CF', fontSize: 11 } };

/** Sized chart slot. Avoids recharts ResponsiveContainer, which crashes under React 19. */
function ChartBox({ children }: { children: (size: { width: number; height: number }) => ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const box = el.getBoundingClientRect();
      setSize({ width: Math.max(0, Math.floor(box.width)), height: Math.max(0, Math.floor(box.height)) });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="chart-box">
      {size.width > 0 && size.height > 0 ? children(size) : null}
    </div>
  );
}

export function Insights() {
  const hydrated = useHydrated();

  return (
    <section className="home-section" id="insights">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="TELECOM INSIGHTS"
            title="How networks behave"
            text="Reference views of traffic, KPI and performance dynamics. Every series is illustrative — shaped to explain, not to claim results."
          />
        </Reveal>
        <div className="insights-grid">
          <Reveal delay={0.05}>
            <ChartCard
              title="Mobile data traffic growth"
              subtitle="4G vs 5G, 2020–2030"
              legend={[{ name: '4G', color: '#FF7A1A' }, { name: '5G', color: '#4C7DFF' }]}
              footnote="Illustrative exabytes per month, stacked."
            >
              {hydrated ? (
                <ChartBox>
                  {({ width, height }) => (
                  <AreaChart width={width} height={height} data={trafficGrowth} margin={{ top: 8, right: 6, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradLte" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF7A1A" stopOpacity={0.55} />
                        <stop offset="100%" stopColor="#FF7A1A" stopOpacity={0.04} />
                      </linearGradient>
                      <linearGradient id="gradNr" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4C7DFF" stopOpacity={0.55} />
                        <stop offset="100%" stopColor="#4C7DFF" stopOpacity={0.04} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(185,191,202,.08)" vertical={false} />
                    <XAxis dataKey="year" {...AXIS} tickLine={false} />
                    <YAxis {...AXIS} tickLine={false} width={44} />
                    <Tooltip content={<ChartTooltip unit=" EB/mo" />} cursor={{ stroke: 'rgba(76,125,255,.25)' }} />
                    <Area dataKey="lte" name="4G" stackId="1" stroke="#FF7A1A" strokeWidth={2} fill="url(#gradLte)" />
                    <Area dataKey="nr" name="5G" stackId="1" stroke="#4C7DFF" strokeWidth={2} fill="url(#gradNr)" />
                  </AreaChart>
                  )}
                </ChartBox>
              ) : (
                <div className="chart-skeleton" aria-hidden="true" />
              )}
            </ChartCard>
          </Reveal>

          <Reveal delay={0.1}>
            <ChartCard
              title="Network KPI benchmarking"
              subtitle="Before vs after optimisation"
              legend={[{ name: 'Before', color: '#B9BFCA' }, { name: 'After', color: '#FF7A1A' }]}
              footnote="Illustrative KPI scores out of 100."
            >
              {hydrated ? (
                <ChartBox>
                  {({ width, height }) => (
                  <RadarChart width={width} height={height} data={kpiRadar} margin={{ top: 14, right: 14, bottom: 14, left: 14 }}>
                    <PolarGrid stroke="rgba(255,255,255,.1)" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: '#AEB8CF', fontSize: 10 }} />
                    <Radar name="Before" dataKey="before" stroke="#B9BFCA" strokeWidth={1.5} fill="#B9BFCA" fillOpacity={0.12} />
                    <Radar name="After" dataKey="after" stroke="#FF7A1A" strokeWidth={2} fill="#FF7A1A" fillOpacity={0.22} />
                    <Tooltip content={<ChartTooltip unit=" /100" />} />
                  </RadarChart>
                  )}
                </ChartBox>
              ) : (
                <div className="chart-skeleton" aria-hidden="true" />
              )}
            </ChartCard>
          </Reveal>

          <Reveal delay={0.15}>
            <ChartCard
              title="5G NR vs LTE"
              subtitle="Throughput (bars) and latency (lines) by environment"
              legend={[
                { name: 'LTE throughput', color: '#FF7A1A' },
                { name: '5G NR throughput', color: '#4C7DFF' },
                { name: 'LTE latency', color: '#B9BFCA' },
                { name: '5G NR latency', color: '#FFC46B' },
              ]}
              footnote="Illustrative Mbps and milliseconds."
            >
              {hydrated ? (
                <ChartBox>
                  {({ width, height }) => (
                  <ComposedChart width={width} height={height} data={performanceBenchmark} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(185,191,202,.08)" vertical={false} />
                    <XAxis dataKey="environment" {...AXIS} tickLine={false} />
                    <YAxis yAxisId="throughput" {...AXIS} tickLine={false} width={44} />
                    <YAxis yAxisId="latency" orientation="right" {...AXIS} tickLine={false} width={32} />
                    <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(76,125,255,.05)' }} />
                    <Bar yAxisId="throughput" dataKey="lteThroughput" name="LTE throughput" fill="rgba(255,122,26,.75)" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="throughput" dataKey="nrThroughput" name="5G NR throughput" fill="rgba(76,125,255,.8)" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="latency" dataKey="lteLatency" name="LTE latency" stroke="#B9BFCA" strokeWidth={2} dot={{ r: 3, fill: '#B9BFCA', strokeWidth: 0 }} />
                    <Line yAxisId="latency" dataKey="nrLatency" name="5G NR latency" stroke="#FFC46B" strokeWidth={2} dot={{ r: 3, fill: '#FFC46B', strokeWidth: 0 }} />
                  </ComposedChart>
                  )}
                </ChartBox>
              ) : (
                <div className="chart-skeleton" aria-hidden="true" />
              )}
            </ChartCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
