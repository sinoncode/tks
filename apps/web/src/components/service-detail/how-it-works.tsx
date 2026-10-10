import { SectionHeader } from '@/components/ui/section-header';
import { Reveal } from '@/components/ui/reveal';
import { site } from '@/data/site';
import type { Service } from '@/data/services';

/**
 * "How it works" — the five-stage mini lifecycle with the stages this service
 * participates in highlighted.
 */
export function HowItWorks({ service }: { service: Service }) {
  return (
    <section className="page-section" id="how-it-works">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="HOW IT WORKS"
            title="Where this discipline sits in the lifecycle"
            text="The connected lifecycle stays the same — this service lights up the stages it owns."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <ol className="mini-lifecycle glass-card" aria-label="Service lifecycle stages">
            {site.lifecycle.map((stage, i) => {
              const owns = service.stages.includes(stage);
              return (
                <li
                  key={stage}
                  className={`mini-stage${owns ? ' is-owned' : ''}`}
                  aria-current={owns ? 'step' : undefined}
                >
                  <span className="mini-stage-index">0{i + 1}</span>
                  <span className="mini-stage-dot"><i /></span>
                  <span className="mini-stage-name">{stage}</span>
                  <span className="mini-stage-role">{owns ? 'This service' : 'Program'}</span>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
