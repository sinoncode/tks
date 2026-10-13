import type { Route } from './+types/home';
import { seo } from '@/lib/seo';
import { Hero } from '@/components/home/hero';
import { TechMarquee } from '@/components/home/tech-marquee';
import { Lifecycle } from '@/components/home/lifecycle';
import { ServicesBento } from '@/components/home/services-bento';
import { WhyTechnoKraft } from '@/components/home/why-technokraft';
import { Insights } from '@/components/home/insights';
import { IndustriesCarousel } from '@/components/home/industries-carousel';
import { ProjectHighlights } from '@/components/home/project-highlights';
import { FinalCta } from '@/components/home/final-cta';
import { CustomSection } from '@/components/home/custom-section';
import { CustomerCarousel } from '@/components/home/CustomerCarousel';
import { GlobalPresence } from '@/components/home/GlobalPresence';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'TechnoKraft | Telecommunications Infrastructure',
		description: 'Survey, design, build, integrate and optimise connected networks — one accountable program from field survey to live network.',
	});
}

export default function HomePage() {
	return (
		<main id="main-content" className="home-main">
			<Hero />
			<TechMarquee />
			<Lifecycle />
			<ServicesBento />
			<WhyTechnoKraft />
			<CustomerCarousel />
			<Insights />
			<IndustriesCarousel />
			<ProjectHighlights />
			{/* FAQ (Part 5) mounts here, above the final CTA banner. */}
			<CustomSection />
			<GlobalPresence />
			<FinalCta />
		</main>
	);
}
