import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, LayoutGrid, List } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { Reveal } from '@/components/ui/reveal';
import { GlowIcon } from '@/components/ui/glow-icon';
import { ServiceSchematic } from '@/components/home/service-schematic';
import { services, type LifecycleStageName } from '@/data/services';

const STAGES: Array<LifecycleStageName | 'All'> = ['All', 'Survey', 'Design', 'Build', 'Integrate', 'Optimise'];

/**
 * The six service cards, filterable by lifecycle stage with layout animations,
 * plus a grid / list view toggle.
 */
export function ServicesFilterGrid() {
  const [stage, setStage] = useState<LifecycleStageName | 'All'>('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () => (stage === 'All' ? services : services.filter(service => service.stages.includes(stage))),
    [stage],
  );

  return (
    <section className="page-section" id="service-filter">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="THE SIX DISCIPLINES"
            title="Filter by lifecycle stage"
            text="Each discipline carries the stages it participates in — pick a stage to see who owns it."
          />
        </Reveal>
        <Reveal delay={0.06}>
          <div className="filter-bar" role="group" aria-label="Filter services by lifecycle stage">
            <div className="filter-chips" aria-label="Filter services by lifecycle stage">
              {STAGES.map(item => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={stage === item}
                  className={`filter-chip${stage === item ? ' is-active' : ''}`}
                  onClick={() => setStage(item)}
                >
                  {item === 'All' ? 'All stages' : item}
                  {item !== 'All' && (
                    <span className="filter-chip-count">
                      {services.filter(service => service.stages.includes(item)).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="view-toggle" role="group" aria-label="Card layout">
              <button
                type="button"
                aria-pressed={view === 'grid'}
                aria-label="Grid view"
                className={view === 'grid' ? 'is-active' : ''}
                onClick={() => setView('grid')}
              >
                <LayoutGrid size={16} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                aria-pressed={view === 'list'}
                aria-label="List view"
                className={view === 'list' ? 'is-active' : ''}
                onClick={() => setView('list')}
              >
                <List size={16} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </Reveal>
        <motion.div
          className={`service-cards service-cards--${view}`}
          layout={!reduce}
          transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence initial={false}>
            {filtered.map(service => (
              <motion.article
                key={service.slug}
                layout={!reduce}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: 'easeOut' }}
                className={`service-card${view === 'list' ? ' service-card--list' : ''}`}
              >
                <ServiceSchematic slug={service.slug} />
                <div className="service-card-top">
                  <GlowIcon icon={service.icon} />
                  <div className="service-stages">
                    {service.stages.map((item, index) => {
                      const stageTitle = typeof item === 'string' ? item : item.title;
                      return <span key={index}>{stageTitle}</span>;
                    })}
                  </div>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-tags">
                  {service.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
                <Link to={`/services/${service.slug}`} className="bento-explore">
                  Explore
                  <ArrowRight size={15} />
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        {filtered.length === 0 && (
          <p className="filter-empty">No discipline carries this stage alone — try another filter.</p>
        )}
      </div>
    </section>
  );
}
