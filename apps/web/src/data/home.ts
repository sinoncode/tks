import { FileCheck, Gauge, Map, Target, Users, Workflow } from 'lucide-react';

export const heroCopy = {
  eyebrow: 'TELECOMMUNICATIONS INFRASTRUCTURE',
  headlineLead: ['Telecommunications', 'Infrastructure,'],
  headlineAccent: ['Built', 'End-to-End'],
  sub: 'From field survey and engineering design to network deployment, integration and optimisation, TechnoKraft delivers the infrastructure behind connected networks.',
} as const;

export const techChips = [
  'LTE',
  '5G NR',
  'DAS',
  'Small Cells',
  'Fibre',
  'RF Planning',
  'GIS',
  '3GPP',
  'IEEE',
  'ETSI',
] as const;

export type LifecycleStage = {
  stage: string;
  description: string;
  services: string[];
};

export const lifecycleStages: LifecycleStage[] = [
  {
    stage: 'Survey',
    description: 'Field data informs engineering. Route surveys, site audits and GIS capture ground the design in what is actually there.',
    services: ['fibre-engineering-survey', 'rf-engineering'],
  },
  {
    stage: 'Design',
    description: 'Engineering informs construction. RF plans, link budgets and construction drawings come from the same desk.',
    services: ['network-design-optimisation', 'rf-engineering'],
  },
  {
    stage: 'Build',
    description: 'Construction feeds into integration. Fibre routes and site builds land ready for equipment, not after it.',
    services: ['fibre-construction', 'network-deployment-rollout'],
  },
  {
    stage: 'Integrate',
    description: 'Integration informs optimisation. Commissioning, testing and acceptance prove the network before it carries traffic.',
    services: ['in-building-solutions-small-cells', 'network-deployment-rollout'],
  },
  {
    stage: 'Optimise',
    description: 'KPI-driven tuning of the live network. Coverage, capacity and quality are measured, then adjusted against real traffic.',
    services: ['network-design-optimisation'],
  },
];

export const whyTiles = [
  { icon: Target, title: 'One accountable program', text: 'A single team owns the outcome from first survey to live network.' },
  { icon: Users, title: 'Engineering + construction, one team', text: 'Designers and builders work from the same playbook and the same data.' },
  { icon: Workflow, title: 'Reduced hand-offs', text: 'Fewer transfers between parties means fewer gaps for scope and quality to fall through.' },
  { icon: Map, title: 'Field-to-design coordination', text: 'Survey findings flow straight into engineering, while the ground truth is still fresh.' },
  { icon: Gauge, title: 'Scalable deployment', text: 'From a single site to a multi-market rollout, the program scales without changing shape.' },
  { icon: FileCheck, title: 'Quality documentation', text: 'Every stage is documented — as-builts, test results and acceptance records.' },
] as const;

export const hudCards = [
  { label: '5G NR — coverage', data: [12, 18, 15, 24, 30, 28, 38, 44, 41, 52] },
  { label: 'Fibre backhaul', data: [30, 34, 33, 40, 46, 44, 52, 58, 62, 70] },
  { label: 'Optimisation KPIs', data: [40, 36, 44, 42, 52, 50, 60, 58, 68, 74] },
] as const;

/** Structural facts only — no invented company statistics. */
export const structuralStats = [
  { value: 6, suffix: '', label: 'Core services' },
  { value: 5, suffix: '', label: 'Lifecycle stages' },
  { value: 1, suffix: '', label: 'Accountable team' },
] as const;
