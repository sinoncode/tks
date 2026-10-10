import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { Reveal } from '@/components/ui/reveal';
import { GlowIcon } from '@/components/ui/glow-icon';
import { industries } from '@/data/industries';

export function IndustriesCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const drag = useRef({ down: false, moved: false, startX: 0, startLeft: 0 });

  const step = () => {
    const el = track.current;
    if (!el) return 320;
    const card = el.querySelector<HTMLElement>('.carousel-card');
    if (!card) return 320;
    const gap = parseFloat(getComputedStyle(el).columnGap || '0') || 0;
    return card.offsetWidth + gap;
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const card = el.querySelector<HTMLElement>('.carousel-card');
        const gap = parseFloat(getComputedStyle(el).columnGap || '0') || 0;
        const s = card ? card.offsetWidth + gap : 320;
        setActive(Math.min(industries.length - 1, Math.max(0, Math.round(el.scrollLeft / s))));
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Mouse drag-to-scroll; touch keeps native momentum + snap scrolling.
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = track.current;
    if (!el || e.pointerType !== 'mouse') return;
    drag.current = { down: true, moved: false, startX: e.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = track.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) {
      drag.current.moved = true;
      el.classList.add('is-dragging');
    }
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    const el = track.current;
    if (el) el.classList.remove('is-dragging');
    drag.current.down = false;
  };

  const scrollTo = (index: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: index * step(), behavior: 'smooth' });
  };
  const nudge = (direction: 1 | -1) => {
    scrollTo(Math.min(industries.length - 1, Math.max(0, active + direction)));
  };

  return (
    <section className="home-section" id="industries">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="INDUSTRIES SERVED"
            title="Who we build for"
            text="Drag through the sectors we work in — every one runs on the same survey-to-optimisation lifecycle."
          />
        </Reveal>
      </div>
      <Reveal delay={0.08}>
        <div className="carousel">
          <div
            className="carousel-track shell"
            ref={track}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {industries.map(industry => (
              <article key={industry.slug} className="carousel-card">
                <GlowIcon icon={industry.icon} size={26} />
                <h3>{industry.title}</h3>
                <p>{industry.description}</p>
                <div className="service-tags">
                  {industry.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
          <div className="shell carousel-controls">
            <div className="carousel-arrows">
              <button type="button" aria-label="Previous industry" onClick={() => nudge(-1)}>
                <ArrowLeft size={17} />
              </button>
              <button type="button" aria-label="Next industry" onClick={() => nudge(1)}>
                <ArrowRight size={17} />
              </button>
            </div>
            <div className="carousel-dots" aria-label="Industries">
              {industries.map((industry, i) => (
                <button
                  key={industry.slug}
                  type="button"
                  aria-label={`Show ${industry.title}`}
                  aria-current={active === i}
                  className={active === i ? 'is-active' : ''}
                  onClick={() => scrollTo(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
