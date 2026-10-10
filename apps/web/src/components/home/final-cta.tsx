import { TKButton } from '@/components/ui/tk-button';
import { Reveal } from '@/components/ui/reveal';
import { useEnquiryModal } from '@/components/enquiry/provider';

export function FinalCta() {
  const { open } = useEnquiryModal();
  return (
    <section className="home-section home-section--cta" id="cta">
      <div className="shell">
        <Reveal>
          <div className="cta-banner">
            <div className="cta-beams" aria-hidden="true">
              <i className="cta-beam cta-beam--a" />
              <i className="cta-beam cta-beam--b" />
            </div>
            <div className="cta-waves" aria-hidden="true">
              {Array.from({ length: 28 }, (_, i) => (
                <i key={i} style={{ animationDelay: `${(i % 7) * 0.12}s` }} />
              ))}
            </div>
            <div className="cta-content">
              <span className="eyebrow">START THE PROGRAM</span>
              <h2>Planning a Network Build?</h2>
              <p>Tell us what you're building. We'll help scope the engineering, deployment and delivery requirements.</p>
              <div className="cta-actions">
                <TKButton size="lg" onClick={() => open({ source: 'home-cta' })}>Discuss Your Project</TKButton>
                <TKButton variant="ghost" size="lg" onClick={() => open({ source: 'home-cta', title: 'Talk to an engineer about your program.' })}>Talk to an Expert</TKButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
