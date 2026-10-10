import { Reveal } from '@/components/ui/reveal';
import { TKButton } from '@/components/ui/tk-button';
import { ContactSidePanel } from '@/components/contact/side-panel';

/** Contact hero — copy on the left, direct-channel side panel on the right. */
export function ContactHero() {
  return (
    <section className="page-hero contact-hero" id="contact">
      <div className="shell contact-hero-grid">
        <Reveal className="page-hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span className="live-dot" />
            TECHNOKRAFT / 05 — CONTACT
          </div>
          <h1>
            Let’s connect<span className="period">.</span>
          </h1>
          <p>
            Tell us what you’re building. This guided form walks your enquiry through three short
            steps — about you, your project, and the details — so our engineering team can scope it
            properly the first time.
          </p>
          <div className="hero-actions">
            <TKButton href="#enquiry-form" size="lg">
              Start the enquiry form
            </TKButton>
            <TKButton href="/services" variant="ghost" size="lg">
              Explore our services
            </TKButton>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="contact-hero-side">
          <ContactSidePanel />
        </Reveal>
      </div>
    </section>
  );
}
