import { Reveal } from '@/components/ui/reveal';
import { TKButton } from '@/components/ui/tk-button';
import { ServiceSchematic } from '@/components/home/service-schematic';
import { useEnquiryModal } from '@/components/enquiry/provider';
import type { Service } from '@/data/services';

/** Service detail hero — unique animated schematic per service, stage badges, deep-link CTA. */
export function ServiceDetailHero({ service }: { service: Service }) {
  const { open } = useEnquiryModal();
  return (
    <section className="page-hero service-hero" id={`service-${service.slug}`}>
      <div className="service-hero-schematic" aria-hidden="true">
        <ServiceSchematic slug={service.slug} />
      </div>
      <div className="shell">
        <Reveal className="page-hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="live-dot" />SERVICE / {service.stages.map(item => typeof item === 'string' ? item : item.title).join(' + ').toUpperCase()}</div>
          <h1>{service.title}<span className="period">.</span></h1>
          {typeof service.intro === 'string' ? (
            <p>{service.intro}</p>
          ) : (
            <div className="flex flex-col gap-2 mb-6">
              <h3 className="text-xl md:text-2xl text-foreground font-semibold m-0">{service.intro.heading}</h3>
              <p>{service.intro.description}</p>
            </div>
          )}
          <div className="hero-actions">
            <TKButton size="lg" onClick={() => open({ source: 'service-hero', service: service.slug })}>Discuss Your Project</TKButton>
            <TKButton href="#deliverables" variant="outline" size="lg">What we deliver</TKButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
