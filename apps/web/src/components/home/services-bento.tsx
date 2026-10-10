import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { Reveal } from '@/components/ui/reveal';
import { TiltCard } from '@/components/ui/tilt-card';
import { GlowIcon } from '@/components/ui/glow-icon';
import { ServiceSchematic } from '@/components/home/service-schematic';
import { services } from '@/data/services';

export function ServicesBento() {
  return (
    <section className="home-section" id="services">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="SIX CORE SERVICES"
            title="Every discipline the network needs"
            text="Hover a card to see the discipline at work — each service plugs into the same accountable program."
          />
        </Reveal>
        <div className="bento-grid">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.06} className={`bento-cell bento-cell--${i + 1}`}>
              <TiltCard className="bento-card">
                <ServiceSchematic slug={service.slug} />
                <div className="bento-card-top">
                  <GlowIcon icon={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-tags">
                  {service.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
                <Link to={`/services/${service.slug}`} className="bento-explore">
                  Explore
                  <ArrowRight size={15} />
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
