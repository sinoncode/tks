import type { Route } from './+types/industries';
import { seo } from '@/lib/seo';
import { IndustriesHero } from '@/components/industries/hero';
import { IndustrySections } from '@/components/industries/industry-sections';
import { IndustryMatrix } from '@/components/industries/matrix';
import { CtaBand } from '@/components/cta-band';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Industries | TechnoKraft',
		description: 'Telecommunications, OEMs, tower and fibre infrastructure, enterprise and data centres — five industries served by one connected lifecycle.',
	});
}

export default function IndustriesPage() {
	return (
		<main id="main-content">
			<IndustriesHero />
			<IndustrySections />
			<IndustryMatrix />
			{/* Network topology diagram (Part 4) mounts here. */}
			<CtaBand
				title="Building in one of these sectors?"
				text="Tell us what you're building. We'll help scope the engineering, deployment and delivery requirements."
				secondaryLabel="See our services"
			/>
		</main>
	);
}
