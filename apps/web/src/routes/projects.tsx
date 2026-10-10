import type { Route } from './+types/projects';
import { seo } from '@/lib/seo';
import { PlaceholderPage } from '@/components/placeholder-page';
export function meta({ matches, location }: Route.MetaArgs) { return seo({ matches, location }, { title: 'Projects | TechnoKraft', description: 'Discover the network infrastructure projects behind connected communities.' }); }
export default function ProjectsPage() { return <PlaceholderPage title="Projects" index="04" />; }
