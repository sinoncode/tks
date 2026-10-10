import { useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { footerTagline } from '@/data/footer';

const REPEATS = 6;

/** Outlined tagline marquee — slows on hover, cursor fills the text with an orange gradient. */
export function TaglineMarquee() {
  const baseRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  const setRate = (rate: number) => {
    for (const ref of [baseRef, fillRef]) {
      for (const animation of ref.current?.getAnimations() ?? []) {
        animation.playbackRate = rate;
      }
    }
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const fill = fillRef.current;
    if (!fill) return;
    const rect = fill.getBoundingClientRect();
    fill.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    fill.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  const halves = [0, 1];

  return (
    <div
      className="ft-marquee"
      onPointerEnter={() => setRate(0.25)}
      onPointerLeave={() => setRate(1)}
      onPointerMove={onPointerMove}
    >
      <div className="ft-marquee-track" ref={baseRef} aria-hidden="true">
        {halves.map(half => (
          <div className="ft-marquee-half" key={half}>
            {Array.from({ length: REPEATS }, (_, index) => (
              <span className="ft-marquee-text" key={index}>
                {footerTagline}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="ft-marquee-track ft-marquee-track--fill" ref={fillRef} aria-hidden="true">
        {halves.map(half => (
          <div className="ft-marquee-half" key={half}>
            {Array.from({ length: REPEATS }, (_, index) => (
              <span className="ft-marquee-text" key={index}>
                {footerTagline}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
