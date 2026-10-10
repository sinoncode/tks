import type { Route } from './+types/not-found';
import { seo } from '@/lib/seo';
import { NotFoundPage } from '@/components/not-found-page';
export function meta({ matches, location }: Route.MetaArgs) { return seo({ matches, location }, { title: 'Signal lost | TechnoKraft', description: 'This page could not be found. Return to TechnoKraft.' }); }
export default function NotFoundRoute() { return <NotFoundPage />; }
