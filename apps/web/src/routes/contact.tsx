import type { Route } from './+types/contact';
import { seo } from '@/lib/seo';
import { ContactHero } from '@/components/contact/hero';
import { ContactWizard } from '@/components/contact/wizard';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Contact | TechnoKraft',
		description: 'Start a conversation about your telecommunications infrastructure program — a guided three-step project enquiry form for our engineering team.',
	});
}

export default function ContactPage() {
	return (
		<main id="main-content" className="contact-main">
			<ContactHero />
			<section className="page-section" id="enquiry-form">
				<div className="shell contact-form-shell">
					<ContactWizard />
				</div>
			</section>
		</main>
	);
}
