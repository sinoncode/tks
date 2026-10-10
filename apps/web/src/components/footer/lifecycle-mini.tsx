import { footerLifecycle } from '@/data/footer';

/** Compact Survey → Design → Build → Integrate → Optimise loop with a travelling orange pulse. */
export function LifecycleMini() {
  return (
    <div className="ft-lc">
      <span className="visually-hidden">Lifecycle: Survey, Design, Build, Integrate, Optimise</span>
      <div className="ft-lc-rail" aria-hidden="true">
        <span className="ft-lc-line" />
        <span className="ft-lc-pulse" />
      </div>
      {footerLifecycle.map(stage => (
        <button key={stage} type="button" className="ft-lc-node" aria-label={stage}>
          <i />
          <span className="ft-lc-tip" aria-hidden="true">
            {stage}
          </span>
        </button>
      ))}
    </div>
  );
}
