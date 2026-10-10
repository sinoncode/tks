import type { Route } from './+types/about';
import { seo } from '@/lib/seo';
import { AboutHero } from '@/components/about/hero';
import { Approach } from '@/components/about/approach';
import { Quality } from '@/components/about/quality';
import { ReferencesStrip } from '@/components/about/references';
import { CtaBand } from '@/components/cta-band';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'About | TechnoKraft',
		description: 'An engineering-led delivery model: field survey, design, construction, integration, commissioning and optimisation under one accountable team.',
	});
}

export default function AboutPage() {
	return (
		<main id="main-content">
			<AboutHero />
			<Approach />
			<Quality />
			{/* Network topology diagram (Part 4) mounts here. */}
			<ReferencesStrip />
			<CtaBand
				title="Planning a Network Build?"
				text="Tell us what you're building. We'll help scope the engineering, deployment and delivery requirements."
				secondaryLabel="See our services"
			/>
		</main>
	);
}
