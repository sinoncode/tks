import type { LucideIcon } from 'lucide-react';

/** Wizard progress rail — the orange swoosh fills as steps complete. */
export function StepProgress({
  steps,
  current,
}: {
  steps: { label: string; icon: LucideIcon }[];
  current: number;
}) {
  const pct = steps.length > 1 ? (current / (steps.length - 1)) * 100 : 0;
  return (
    <div className="step-progress">
      <div className="step-rail" aria-hidden="true">
        <i className="step-rail-fill" style={{ width: `${pct}%` }} />
        <span className="step-rail-orb" style={{ left: `${pct}%` }} />
      </div>
      <ol className="step-nodes">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const state = index < current ? 'is-done' : index === current ? 'is-current' : '';
          return (
            <li key={step.label} className={state} aria-current={index === current ? 'step' : undefined}>
              <span className="step-node">
                <Icon size={15} strokeWidth={1.9} aria-hidden="true" />
              </span>
              <span className="step-label">{step.label}</span>
            </li>
          );
        })}
      </ol>
      <p className="step-count" aria-live="polite">
        Step {current + 1} of {steps.length}
      </p>
    </div>
  );
}
