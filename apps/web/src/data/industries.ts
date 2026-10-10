import { Antenna, Cable, Cpu, RadioTower, Server, type LucideIcon } from 'lucide-react';

export type IndustryIllustration = 'tower' | 'chip' | 'infrastructure' | 'fibre' | 'datacentre';

export type Industry = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  /** "What they need" chips. */
  needs: string[];
  /** Slugs of the services most relevant to this industry. */
  relatedServices: string[];
  /** Which animated SVG illustration to show. */
  illustration: IndustryIllustration;
};

export const industries: Industry[] = [
  {
    slug: 'telecommunications',
    title: 'Telecommunications',
    description: 'Wireless carriers, telecom operators and network service providers.',
    icon: RadioTower,
    tags: ['Carriers', 'Operators'],
    needs: ['RF design', 'Coverage & capacity', 'Rollout programs', 'KPI optimisation'],
    relatedServices: ['network-deployment-rollout', 'network-design-optimisation', 'rf-engineering'],
    illustration: 'tower',
  },
  {
    slug: 'network-equipment-oems',
    title: 'Network Equipment & OEMs',
    description: 'Equipment manufacturers requiring engineering, deployment and integration support.',
    icon: Cpu,
    tags: ['OEM', 'Integration'],
    needs: ['Integration support', 'Field deployment', 'Validation & testing'],
    relatedServices: ['network-deployment-rollout', 'in-building-solutions-small-cells'],
    illustration: 'chip',
  },
  {
    slug: 'tower-infrastructure',
    title: 'Tower & Infrastructure',
    description: 'Tower companies and infrastructure owners requiring site engineering, construction and deployment.',
    icon: Antenna,
    tags: ['Site engineering', 'Construction'],
    needs: ['Site engineering', 'Construction', 'Structural coordination', 'Deployment'],
    relatedServices: ['network-deployment-rollout', 'fibre-construction'],
    illustration: 'infrastructure',
  },
  {
    slug: 'fibre-broadband',
    title: 'Fibre & Broadband',
    description: 'Fibre operators and broadband providers requiring route engineering and network construction.',
    icon: Cable,
    tags: ['Route engineering', 'Construction'],
    needs: ['Route engineering', 'Make-ready', 'Network construction', 'As-built documentation'],
    relatedServices: ['fibre-engineering-survey', 'fibre-construction'],
    illustration: 'fibre',
  },
  {
    slug: 'enterprise-data-centres',
    title: 'Enterprise & Data Centres',
    description: 'Organisations requiring dedicated fibre, campus connectivity and in-building wireless infrastructure.',
    icon: Server,
    tags: ['Campus', 'In-building'],
    needs: ['Dedicated fibre', 'Campus connectivity', 'In-building wireless', 'DAS & small cells'],
    relatedServices: ['in-building-solutions-small-cells', 'fibre-construction', 'fibre-engineering-survey'],
    illustration: 'datacentre',
  },
];
