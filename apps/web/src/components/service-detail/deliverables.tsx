import { motion, useReducedMotion } from 'motion/react';
import { SectionHeader } from '@/components/ui/section-header';
import { Reveal } from '@/components/ui/reveal';
import type { Service } from '@/data/services';

/** "What we deliver" — an animated checklist whose check marks draw in on view. */
export function Deliverables({ service }: { service: Service }) {
  const reduce = useReducedMotion();

  return (
    <section className="page-section" id="deliverables">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="WHAT WE DELIVER"
            title="The checklist behind the discipline"
            text={`What ${service.title} puts in scope — every item closes with documentation.`}
          />
        </Reveal>
        <ul className="deliverable-list">
          {service.deliverables.map((item, i) => (
            <motion.li
              key={typeof item === 'string' ? item : item.title}
              className="deliverable glass-card"
              initial={reduce ? false : { opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : i * 0.06, ease: 'easeOut' }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="deliverable-check">
                <motion.path
                  d="M5 13 L10 18 L19 6"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.15 + i * 0.06, ease: 'easeOut' }}
                />
              </svg>
              {typeof item === 'string' ? (
                <span>{item}</span>
              ) : (
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-foreground">{item.title}</span>
                  {item.description && <span className="text-sm text-muted-foreground">{item.description}</span>}
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
