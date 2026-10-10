export type ProjectDiagram = 'wireless' | 'fibre' | 'inbuilding';

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  diagram: ProjectDiagram;
};

/** Client names are withheld by design; no performance figures are claimed. */
export const projects: Project[] = [
  {
    slug: 'multi-site-wireless-deployment',
    title: 'Multi-Site Wireless Deployment',
    summary: 'A coordinated rollout across many sites — survey, design, build and integration sequenced as one program.',
    tags: ['Rollout', 'Wireless', 'Integration'],
    diagram: 'wireless',
  },
  {
    slug: 'fibre-network-expansion',
    title: 'Fibre Network Expansion',
    summary: 'Route engineering and construction extending fibre backhaul into new territory, from make-ready to as-builts.',
    tags: ['Fibre', 'Route engineering', 'Construction'],
    diagram: 'fibre',
  },
  {
    slug: 'in-building-connectivity',
    title: 'In-Building Connectivity',
    summary: 'Distributed antenna systems and small cells bringing reliable coverage deep into large buildings.',
    tags: ['DAS', 'Small cells', 'Coverage'],
    diagram: 'inbuilding',
  },
];
