import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { TKButton } from '@/components/ui/tk-button';
import { HeroGlobe } from '@/components/home/hero-globe';
import { useEnquiryModal } from '@/components/enquiry/provider';
import { heroCopy, hudCards } from '@/data/home';

function Sparkline({ data }: { data: readonly number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${28 - ((v - min) / (max - min || 1)) * 24}`)
    .join(' ');
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="sparkline" aria-hidden="true">
      <polyline points={points} fill="none" />
    </svg>
  );
}

export function Hero() {
  const { open } = useEnquiryModal();
  const hero = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const globeY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const words = [...heroCopy.headlineLead, ...heroCopy.headlineAccent];

  return (
    <section ref={hero} className="home-hero" id="hero">
      <div className="shell hero-shell">
        <motion.div className="hero-copy" style={{ y: copyY, opacity: fade }}>
          <div className="eyebrow hero-eyebrow">
            <span className="live-dot" />
            {heroCopy.eyebrow}
          </div>
          <h1>
            {words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="hero-word"
                style={{ animationDelay: `${0.15 + i * 0.09}s` }}
              >
                {(heroCopy.headlineAccent as readonly string[]).includes(word) ? (
                  <span className="gradient-shimmer">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>
          <p>{heroCopy.sub}</p>
          <div className="hero-actions">
            <TKButton size="lg" onClick={() => open({ source: 'home-hero' })}>Discuss Your Project</TKButton>
            <TKButton variant="ghost" size="lg" onClick={() => open({ source: 'home-hero', title: 'Talk to an engineer about your program.' })}>Talk to an Expert</TKButton>
          </div>
        </motion.div>
        <motion.div className="hero-visual" style={{ y: globeY }} aria-hidden="true">
          <HeroGlobe />
          {hudCards.map((card, i) => (
            <div key={card.label} className={`hud-card hud-card--${i + 1}`}>
              <div className="hud-card-top">
                <span>{card.label}</span>
                <span className="hud-illustrative">Illustrative</span>
              </div>
              <Sparkline data={card.data} />
            </div>
          ))}
        </motion.div>
      </div>
      <a className="scroll-cue" href="#lifecycle">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  );
}
