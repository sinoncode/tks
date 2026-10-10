/**
 * Chart datasets for the Telecom Insights section.
 * Every series is labelled "Illustrative data" on the page — these are
 * shaped reference curves, not measured client results.
 */

/** Stacked area — mobile data traffic growth 2020–2030, 4G vs 5G (illustrative EB/month). */
export type TrafficPoint = { year: string; lte: number; nr: number };
export const trafficGrowth: TrafficPoint[] = [
  { year: '2020', lte: 38, nr: 3 },
  { year: '2021', lte: 44, nr: 7 },
  { year: '2022', lte: 49, nr: 14 },
  { year: '2023', lte: 52, nr: 24 },
  { year: '2024', lte: 53, nr: 39 },
  { year: '2025', lte: 51, nr: 60 },
  { year: '2026', lte: 48, nr: 88 },
  { year: '2027', lte: 44, nr: 124 },
  { year: '2028', lte: 39, nr: 168 },
  { year: '2029', lte: 33, nr: 220 },
  { year: '2030', lte: 27, nr: 285 },
];

/** Radar — network KPI benchmarking, before vs after optimisation (illustrative scores /100). */
export type KpiPoint = { metric: string; before: number; after: number };
export const kpiRadar: KpiPoint[] = [
  { metric: 'Coverage', before: 62, after: 91 },
  { metric: 'Throughput', before: 58, after: 88 },
  { metric: 'Latency', before: 47, after: 84 },
  { metric: 'Reliability', before: 66, after: 93 },
  { metric: 'Energy efficiency', before: 44, after: 71 },
  { metric: 'Site utilisation', before: 52, after: 86 },
];

/** Grouped bar + line — 5G NR vs LTE throughput (Mbps) and latency (ms) by environment (illustrative). */
export type PerformancePoint = {
  environment: string;
  lteThroughput: number;
  nrThroughput: number;
  lteLatency: number;
  nrLatency: number;
};
export const performanceBenchmark: PerformancePoint[] = [
  { environment: 'Dense urban', lteThroughput: 38, nrThroughput: 142, lteLatency: 32, nrLatency: 9 },
  { environment: 'Urban', lteThroughput: 32, nrThroughput: 118, lteLatency: 34, nrLatency: 10 },
  { environment: 'Suburban', lteThroughput: 24, nrThroughput: 84, lteLatency: 38, nrLatency: 12 },
  { environment: 'Rural', lteThroughput: 14, nrThroughput: 46, lteLatency: 44, nrLatency: 16 },
];
