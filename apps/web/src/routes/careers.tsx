import type { Route } from './+types/careers';
import { seo } from '@/lib/seo';
import { PlaceholderPage } from '@/components/placeholder-page';
export function meta({ matches, location }: Route.MetaArgs) { return seo({ matches, location }, { title: 'Careers | TechnoKraft', description: 'Build the future of connected networks with TechnoKraft.' }); }
export default function CareersPage() { return <PlaceholderPage title="Careers" index="06" />; }
