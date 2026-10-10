import { Reveal } from '@/components/ui/reveal';
import { TKButton } from '@/components/ui/tk-button';

export function IndustriesHero() {
  return (
    <section className="page-hero" id="industries-hero">
      <div className="shell">
        <Reveal className="page-hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="live-dot" />INDUSTRIES SERVED</div>
          <h1>Connectivity for the sectors<br /><span className="gradient-text">that run the world</span><span className="period">.</span></h1>
          <p>
            Five industries, one delivery model. Every sector below runs on the same
            survey-to-optimisation lifecycle, tuned to what that industry actually needs.
          </p>
          <div className="hero-actions">
            <TKButton href="#industry-matrix" size="lg">See the service matrix</TKButton>
            <TKButton href="/services" variant="outline" size="lg">Explore our services</TKButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
