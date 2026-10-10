import { lifecycleStages } from '@/data/home';

/**
 * Circular closed-loop view of the same lifecycle — shown on wide screens
 * (1280px+) as a slowly rotating orbit. Decorative: the interactive track
 * above carries the same information accessibly.
 */
export function LifecycleLoop() {
  return (
    <div className="lifecycle-loop-wrap">
      <div className="lifecycle-loop" aria-hidden="true">
        <div className="loop-ring" />
        <div className="loop-pulse" />
        <div className="loop-core">
          <span>Closed</span>
          <span>loop</span>
        </div>
        {lifecycleStages.map((s, i) => {
          const angle = (i / lifecycleStages.length) * 360 - 90;
          return (
            <div
              key={s.stage}
              className="loop-node"
              style={{ transform: `rotate(${angle}deg) translate(150px) rotate(${-angle}deg)` }}
            >
              <span className="loop-dot" />
              <span className="loop-label">{s.stage}</span>
            </div>
          );
        })}
      </div>
      <p className="lifecycle-loop-caption">
        The same five stages, closed into a loop — optimisation feeds the next survey.
      </p>
    </div>
  );
}
