import { SectionHeader } from '@/components/ui/section-header';
import { Reveal } from '@/components/ui/reveal';
import { StatCounter } from '@/components/ui/stat-counter';
import { ComparisonSlider } from '@/components/home/comparison-slider';
import { structuralStats, whyTiles } from '@/data/home';

export function WhyTechnoKraft() {
  return (
    <section className="home-section" id="why">
      <div className="shell">
        <div className="why-grid">
          <div className="why-copy">
            <Reveal>
              <span className="eyebrow">WHY TECHNOKRAFT</span>
              <h2 className="gradient-text why-title">One accountable program<span className="period">.</span></h2>
              <p>
                Most networks are delivered in fragments — one party surveys, another designs,
                a third builds, a fourth integrates, and nobody owns the outcome. TechnoKraft
                runs the whole lifecycle as a single program, so every stage hands its
                knowledge to the next instead of dropping it.
              </p>
              <div className="why-stats">
                {structuralStats.map(stat => (
                  <div key={stat.label} className="why-stat">
                    <StatCounter value={stat.value} suffix={stat.suffix} />
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="why-tiles">
            {whyTiles.map((tile, i) => (
              <Reveal key={tile.title} delay={i * 0.05} className="why-tile">
                <span className="glow-icon">
                  <tile.icon size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3>{tile.title}</h3>
                <p>{tile.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.1}>
          <div className="compare-wrap">
            <ComparisonSlider />
            <p className="compare-hint">Drag the handle — or focus it and use the arrow keys — to compare.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
