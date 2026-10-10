import { Database, DraftingCompass, Gauge, HardHat } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { Reveal } from '@/components/ui/reveal';
import { GlowIcon } from '@/components/ui/glow-icon';

const steps = [
  { icon: Database, title: 'Field data informs engineering', text: 'Route surveys, site audits and GIS capture ground every design decision in what is actually there.' },
  { icon: DraftingCompass, title: 'Engineering informs construction', text: 'RF plans, link budgets and construction drawings come from the same desk that surveyed the ground.' },
  { icon: HardHat, title: 'Construction feeds into integration', text: 'Fibre routes and site builds land ready for equipment — not after it, not around it.' },
  { icon: Gauge, title: 'Integration informs optimisation', text: 'Commissioning and acceptance testing prove the network before it carries traffic, then KPIs tune it live.' },
] as const;

/**
 * Four-step linked-flow diagram — glass cards joined by animated arrows, each
 * card's icon expanding on hover.
 */
export function Approach() {
  return (
    <section className="page-section" id="approach">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="OUR APPROACH"
            title="One program. One accountable team. One connected lifecycle."
            text="Each stage feeds the next — information moves forward through the same team instead of across company boundaries."
          />
        </Reveal>
        <div className="approach-flow">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.09} className="approach-step">
              <article className="approach-card glass-card">
                <GlowIcon icon={step.icon} size={26} />
                <span className="approach-index">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
              {i < steps.length - 1 && (
                <div className="approach-arrow" aria-hidden="true">
                  <svg viewBox="0 0 64 12" preserveAspectRatio="xMidYMid meet" focusable="false">
                    <line className="ap-line" x1="0" y1="6" x2="52" y2="6" />
                    <path className="ap-head" d="M50 1 L62 6 L50 11" />
                  </svg>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
