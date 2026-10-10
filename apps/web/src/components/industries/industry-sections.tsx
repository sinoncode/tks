import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { GlowIcon } from '@/components/ui/glow-icon';
import { IndustryIllustration } from '@/components/industries/industry-illustration';
import { industries } from '@/data/industries';
import { serviceBySlug } from '@/data/services';

/**
 * Five alternating industry sections with a sticky scroll-spy side nav on
 * desktop and a dropdown on mobile.
 */
export function IndustrySections() {
  const [active, setActive] = useState(industries[0].slug);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id.replace('industry-', ''));
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    for (const industry of industries) {
      const el = document.getElementById(`industry-${industry.slug}`);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="industry-layout shell">
      <nav className="industry-spy" aria-label="Industries">
        <span className="eyebrow">SECTORS</span>
        <ul>
          {industries.map(industry => (
            <li key={industry.slug}>
              <a
                href={`#industry-${industry.slug}`}
                aria-current={active === industry.slug ? 'true' : undefined}
                className={active === industry.slug ? 'is-active' : ''}
              >
                <i aria-hidden="true" />
                {industry.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <label className="industry-select">
        <span className="visually-hidden">Jump to industry</span>
        <select
          value={active}
          onChange={event => {
            setActive(event.target.value);
            document.getElementById(`industry-${event.target.value}`)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {industries.map(industry => (
            <option key={industry.slug} value={industry.slug}>{industry.title}</option>
          ))}
        </select>
      </label>
      <div className="industry-entries">
        {industries.map((industry, i) => {
          const related = industry.relatedServices
            .map(slug => serviceBySlug(slug))
            .filter(service => service !== undefined);
          return (
            <section
              key={industry.slug}
              id={`industry-${industry.slug}`}
              className={`industry-entry${i % 2 === 1 ? ' industry-entry--flip' : ''}`}
            >
              <Reveal className="industry-entry-copy">
                <div className="industry-entry-head">
                  <GlowIcon icon={industry.icon} size={26} />
                  <span className="industry-entry-index">0{i + 1}</span>
                </div>
                <h2>{industry.title}</h2>
                <p>{industry.description}.</p>
                <h3>What they need</h3>
                <div className="service-tags industry-needs">
                  {industry.needs.map(need => <span key={need}>{need}</span>)}
                </div>
                <h3>Related services</h3>
                <div className="lifecycle-related">
                  {related.map(service => (
                    <Link key={service.slug} to={`/services/${service.slug}`}>
                      {service.title}
                      <ArrowRight size={14} />
                    </Link>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.1} className="industry-entry-visual">
                <div className="industry-visual-frame glass-card">
                  <IndustryIllustration kind={industry.illustration} />
                </div>
              </Reveal>
            </section>
          );
        })}
      </div>
    </div>
  );
}
