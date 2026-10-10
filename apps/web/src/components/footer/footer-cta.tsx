import { useState, type CSSProperties, type MouseEvent } from 'react';
import { TKButton } from '@/components/ui/tk-button';
import { footerCTA } from '@/data/footer';

type FooterCTAProps = { onEnquiry?: () => void };

/** Glass CTA band overlapping the footer's top edge, with a rotating conic border and pointer tilt. */
export function FooterCTA({ onEnquiry }: FooterCTAProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 6 }); // up to 3deg
  };

  return (
    <section className="ft-cta" aria-labelledby="ft-cta-heading">
      <div
        className="ft-cta-panel"
        style={{ '--rx': `${tilt.x}deg`, '--ry': `${tilt.y}deg` } as CSSProperties}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <div className="ft-cta-copy">
          <p className="eyebrow">Start here</p>
          <h2 id="ft-cta-heading">{footerCTA.heading}</h2>
          <p>{footerCTA.line}</p>
        </div>
        <div className="ft-cta-actions">
          {onEnquiry ? (
            <TKButton size="lg" onClick={onEnquiry}>
              Discuss Your Project
            </TKButton>
          ) : (
            <TKButton size="lg" href="/contact">
              Discuss Your Project
            </TKButton>
          )}
          <TKButton size="lg" variant="ghost" href="/contact">
            Talk to an Expert
          </TKButton>
        </div>
      </div>
    </section>
  );
}
