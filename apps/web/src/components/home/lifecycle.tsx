import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { Reveal } from '@/components/ui/reveal';
import { LifecycleLoop } from '@/components/home/lifecycle-loop';
import { lifecycleStages } from '@/data/home';
import { services } from '@/data/services';

export function Lifecycle() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const stage = lifecycleStages[active];
  const related = stage.services
    .map(slug => services.find(s => s.slug === slug))
    .filter(s => s !== undefined);

  return (
    <section className="home-section" id="lifecycle">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="THE TELECOMMUNICATIONS LIFECYCLE"
            title="Survey → Design → Build → Integrate → Optimise"
            text="Five stages, one continuous program. Hover or tap a stage to see what it feeds into the next."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="lifecycle-track">
            <svg className="lifecycle-line lifecycle-line--h" viewBox="0 0 1000 4" preserveAspectRatio="none" aria-hidden="true">
              <motion.line
                x1="0" y1="2" x2="1000" y2="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: reduce ? 0 : 1.4, ease: 'easeInOut' }}
              />
            </svg>
            <svg className="lifecycle-line lifecycle-line--v" viewBox="0 0 4 1000" preserveAspectRatio="none" aria-hidden="true">
              <motion.line
                x1="2" y1="0" x2="2" y2="1000"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reduce ? 0 : 1.4, ease: 'easeInOut' }}
              />
            </svg>
            <div className="lifecycle-nodes">
              {lifecycleStages.map((s, i) => (
                <button
                  key={s.stage}
                  type="button"
                  aria-selected={active === i}
                  className={`lifecycle-node${active === i ? ' is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="lifecycle-index">0{i + 1}</span>
                  <span className="lifecycle-dot"><i /></span>
                  <span className="lifecycle-stage">{s.stage}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="lifecycle-detail glass-card">
            <div className="lifecycle-detail-head">
              <span className="lifecycle-detail-index">0{active + 1}</span>
              <h3>{stage.stage}</h3>
            </div>
            <p>{stage.description}</p>
            <div className="lifecycle-related">
              {related.map(s => (
                <Link key={s.slug} to={`/services/${s.slug}`}>
                  {s.title}
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
        <LifecycleLoop />
      </div>
    </section>
  );
}
