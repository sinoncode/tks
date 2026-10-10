import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SectionHeader } from '@/components/ui/section-header';
import { Reveal } from '@/components/ui/reveal';
import { capabilityTabs } from '@/data/capabilities';

/**
 * Technical capabilities — animated tab panels where the chips of the active
 * panel stagger in.
 */
export function Capabilities() {
  const [active, setActive] = useState(capabilityTabs[0].id);
  const reduce = useReducedMotion();
  const tab = capabilityTabs.find(item => item.id === active) ?? capabilityTabs[0];

  return (
    <section className="page-section" id="capabilities">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="TECHNICAL CAPABILITIES"
            title="What sits in the toolbox"
            text="The capabilities behind the six disciplines — switch a panel to see what each area covers."
          />
        </Reveal>
        <Reveal delay={0.06}>
          <div className="cap-tabs" role="tablist" aria-label="Technical capability areas">
            {capabilityTabs.map(item => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`cap-tab-${item.id}`}
                aria-selected={active === item.id}
                aria-controls={`cap-panel-${item.id}`}
                className={`cap-tab${active === item.id ? ' is-active' : ''}`}
                onClick={() => setActive(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>
        <motion.div
          key={tab.id}
          id={`cap-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`cap-tab-${tab.id}`}
          className="cap-panel glass-card"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: 'easeOut' }}
        >
          <div className="cap-chips">
            {tab.chips.map((chip, i) => (
              <motion.span
                key={chip}
                className="cap-chip"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 0.05 + i * 0.045, ease: 'easeOut' }}
              >
                <i aria-hidden="true" />
                {chip}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
