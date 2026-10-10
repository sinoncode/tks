import type { Route } from './+types/service-detail';
import { seo } from '@/lib/seo';
import { serviceBySlug } from '@/data/services';
import { NotFoundPage } from '@/components/not-found-page';
import { ServiceDetailHero } from '@/components/service-detail/hero';
import { ServiceSubNav } from '@/components/service-detail/sub-nav';
import { Deliverables } from '@/components/service-detail/deliverables';
import { CustomSections } from '@/components/service-detail/custom-sections';
import { HowItWorks } from '@/components/service-detail/how-it-works';
import { TechnologiesAndRelated } from '@/components/service-detail/technologies-related';
import { CtaBand } from '@/components/cta-band';

export function meta({ matches, location, params }: Route.MetaArgs) {
	const service = serviceBySlug(params.slug);
	return seo({ matches, location }, {
		title: `${service?.title ?? 'Service'} | TechnoKraft`,
		description: service?.description ?? 'Explore TechnoKraft telecommunications infrastructure services.',
	});
}

export default function ServiceDetailPage({ params }: Route.ComponentProps) {
	const service = serviceBySlug(params.slug);
	if (!service) return <NotFoundPage />;

	return (
		<main id="main-content">
			<ServiceDetailHero service={service} />
			<ServiceSubNav title={service.title} />
			<Deliverables service={service} />
			<CustomSections service={service} />
			<HowItWorks service={service} />
			{/* Signature charts and diagrams for this service (Part 4) mount here. */}
			<TechnologiesAndRelated service={service} />
			{/* Service FAQ, filtered by category (Part 5), mounts here. */}
			<CtaBand
				eyebrow={`START WITH ${service.title.toUpperCase()}`}
				title="Planning a Network Build?"
				text={`Tell us what you're building. We'll scope the ${service.title.toLowerCase()} requirements with you.`}
				service={service.slug}
				secondaryLabel="See all services"
				secondaryHref="/services"
			/>
		</main>
	);
}
