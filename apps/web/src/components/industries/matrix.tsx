import { useState } from 'react';
import { SectionHeader } from '@/components/ui/section-header';
import { Reveal } from '@/components/ui/reveal';
import { industries } from '@/data/industries';
import { services } from '@/data/services';

/**
 * Interactive industries × services matrix. Hovering (or focusing) a row or
 * column highlights the relevant intersections with a glow.
 */
export function IndustryMatrix() {
  const [hover, setHover] = useState<{ row: number; col: number } | null>(null);

  const cellState = (row: number, col: number) => {
    if (!industries[row].relatedServices.includes(services[col].slug)) return 'off';
    if (hover && (hover.row === row || hover.col === col)) return 'hot';
    return 'on';
  };

  return (
    <section className="page-section" id="industry-matrix">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="SERVICE MATRIX"
            title="Every sector, every discipline"
            text="Hover a row or column to see where an industry's needs and our disciplines intersect."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div
            className="matrix-wrap glass-card"
            onMouseLeave={() => setHover(null)}
            role="table"
            aria-label="Industries by services matrix"
          >
            <div className="matrix-scroll" role="rowgroup">
              <div className="matrix-row matrix-row--head" role="row">
                <span className="matrix-corner" role="columnheader" aria-label="Industry versus service" />
                {services.map((service, col) => (
                  <span
                    key={service.slug}
                    className={`matrix-colhead${hover?.col === col ? ' is-hot' : ''}`}
                    role="columnheader"
                    onMouseEnter={() => setHover({ row: -1, col })}
                    onFocus={() => setHover({ row: -1, col })}
                  >
                    {service.title}
                  </span>
                ))}
              </div>
              {industries.map((industry, row) => (
                <div
                  key={industry.slug}
                  className="matrix-row"
                  role="row"
                  onMouseEnter={() => setHover({ row, col: -1 })}
                  onFocus={() => setHover({ row, col: -1 })}
                >
                  <span className={`matrix-rowhead${hover?.row === row ? 'is-hot' : ''}`} role="rowheader">
                    {industry.title}
                  </span>
                  {services.map((service, col) => (
                    <span
                      key={service.slug}
                      className={`matrix-cell matrix-cell--${cellState(row, col)}`}
                      role="cell"
                      onMouseEnter={() => setHover({ row, col })}
                      onFocus={() => setHover({ row, col })}
                      aria-label={`${industry.title} — ${service.title}: ${industry.relatedServices.includes(service.slug) ? 'relevant' : 'not typically required'}`}
                    >
                      <i aria-hidden="true" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
