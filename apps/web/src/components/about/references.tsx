import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { site } from '@/data/site';

/** External technical references strip — outbound link badges. */
export function ReferencesStrip() {
  return (
    <section className="page-section page-section--tight" id="references">
      <div className="shell">
        <Reveal>
          <div className="references-strip">
            <span className="references-label">Engineering against recognised standards</span>
            <div className="references-badges">
              {site.references.map(ref => (
                <a
                  key={ref.label}
                  href={ref.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reference-badge"
                >
                  {ref.label}
                  <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
