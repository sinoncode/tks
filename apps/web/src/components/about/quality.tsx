import { ClipboardCheck, FileCheck2, Ruler, Settings2, TestTube2 } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { Reveal } from '@/components/ui/reveal';
import { GlowIcon } from '@/components/ui/glow-icon';

const tiles = [
  { icon: Ruler, title: 'Engineering standards', text: 'Designs follow recognised engineering practice and the applicable 3GPP, IEEE and ETSI references.' },
  { icon: ClipboardCheck, title: 'Construction QA', text: 'Builds are inspected against the engineering drawings before equipment ever arrives.' },
  { icon: Settings2, title: 'Commissioning', text: 'Equipment is brought online against a documented commissioning procedure.' },
  { icon: TestTube2, title: 'Acceptance testing', text: 'The network is tested against agreed acceptance criteria before it carries traffic.' },
  { icon: FileCheck2, title: 'As-built documentation', text: 'Every stage closes with as-builts, test results and acceptance records.' },
] as const;

const gates = ['Engineering standards', 'Construction QA', 'Commissioning', 'Acceptance testing', 'As-built documentation'];

/**
 * Quality & accountability — five animated tiles plus a "quality gate"
 * pipeline where a pulse passes through each gate and a check mark draws in.
 */
export function Quality() {
  return (
    <section className="page-section" id="quality">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="QUALITY & ACCOUNTABILITY"
            title="Every stage passes a gate"
            text="Work does not move forward until it clears the gate in front of it — and every gate leaves a record behind."
          />
        </Reveal>
        <div className="quality-grid">
          {tiles.map((tile, i) => (
            <Reveal key={tile.title} delay={i * 0.07} className="quality-cell">
              <article className="quality-tile">
                <GlowIcon icon={tile.icon} />
                <h3>{tile.title}</h3>
                <p>{tile.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="gate-pipeline glass-card" role="img" aria-label="Quality gate pipeline: a pulse passes through engineering standards, construction QA, commissioning, acceptance testing and as-built documentation, each marked with a check.">
            <div className="gate-track" aria-hidden="true">
              <i className="gate-pulse" />
              {gates.map((_, i) => (
                <span key={i} className="gate-node" style={{ left: `${(i + 0.5) * (100 / gates.length)}%` }}>
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path className="gate-check" style={{ animationDelay: `${i * 1.05}s` }} d="M5 13 L10 18 L19 6" />
                  </svg>
                </span>
              ))}
            </div>
            <div className="gate-labels" aria-hidden="true">
              {gates.map(label => <span key={label}>{label}</span>)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
