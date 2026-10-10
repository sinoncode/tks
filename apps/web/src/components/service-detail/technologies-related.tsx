import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { Reveal } from '@/components/ui/reveal';
import { GlowIcon } from '@/components/ui/glow-icon';
import { serviceBySlug, type Service } from '@/data/services';

/** Technology chips + related service cards for a service detail page. */
export function TechnologiesAndRelated({ service }: { service: Service }) {
  const related = service.related
    .map(slug => serviceBySlug(slug))
    .filter((item): item is Service => item !== undefined && item.slug !== service.slug);

  return (
    <>
      <section className="page-section page-section--tight" id="technologies">
        <div className="shell">
          <Reveal>
            <div className="tech-block glass-card">
              <span className="eyebrow">TECHNOLOGIES & METHODS</span>
              <div className="service-tags tech-tags">
                {service.technologies.map(tech => <span key={tech}>{tech}</span>)}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="page-section" id="related">
        <div className="shell">
          <Reveal>
            <SectionHeader
              eyebrow="RELATED SERVICES"
              title="Disciplines that plug in next"
              text="The services that share this program — one team, no hand-offs between them."
            />
          </Reveal>
          <div className="related-grid">
            {related.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.07} className="related-cell">
                <Link to={`/services/${item.slug}`} className="related-card glass-card">
                  <GlowIcon icon={item.icon} />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="bento-explore">Explore <ArrowRight size={15} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
