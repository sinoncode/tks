import type { Route } from './+types/services';
import { seo } from '@/lib/seo';
import { ServicesHero } from '@/components/services/hero';
import { ServicesFilterGrid } from '@/components/services/filter-grid';
import { Capabilities } from '@/components/services/capabilities';
import { CtaBand } from '@/components/cta-band';
import { GlobalPresence } from '@/components/home/GlobalPresence';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Services | TechnoKraft',
		description: 'Six disciplines, one connected lifecycle — deployment, design and optimisation, RF engineering, in-building solutions, fibre construction and survey.',
	});
}

export default function ServicesPage() {
	return (
		<main id="main-content">
			<ServicesHero />
			<ServicesFilterGrid />
			<Capabilities />
			{/* Network Intelligence dashboard (Part 4) mounts here. */}
			<CtaBand
				title="Which discipline does your build need?"
				text="Tell us what you're building. We'll help scope the engineering, deployment and delivery requirements."
				secondaryLabel="Talk to an expert"
				secondaryHref="/contact"
			/>

			<GlobalPresence />
		</main>
	);
}
