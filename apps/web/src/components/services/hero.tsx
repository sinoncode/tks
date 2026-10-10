import { Reveal } from '@/components/ui/reveal';
import { TKButton } from '@/components/ui/tk-button';
import { useEnquiryModal } from '@/components/enquiry/provider';

export function ServicesHero() {
  const { open } = useEnquiryModal();
  return (
    <section className="page-hero" id="services-hero">
      <div className="shell">
        <Reveal className="page-hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="live-dot" />OUR SERVICES</div>
          <h1>Six disciplines.<br /><span className="gradient-text">One connected lifecycle.</span><span className="period">.</span></h1>
          <p>
            Filter the six disciplines by the lifecycle stage they serve — every one plugs into
            the same accountable program, from first survey to live optimisation.
          </p>
          <div className="hero-actions">
            <TKButton href="#capabilities" size="lg">Technical capabilities</TKButton>
            <TKButton variant="outline" size="lg" onClick={() => open({ source: 'services-hero' })}>Discuss Your Project</TKButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
