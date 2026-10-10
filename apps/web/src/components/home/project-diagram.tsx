import type { ProjectDiagram } from '@/data/projects';

/** Small schematic per project type — decorative, no figures claimed. */
export function ProjectDiagram({ type }: { type: ProjectDiagram }) {
  return (
    <svg className="project-diagram" viewBox="0 0 200 110" aria-hidden="true" focusable="false">
      {type === 'wireless' && (
        <g>
          {[40, 100, 160].map(x => (
            <g key={x}>
              <line className="pd-line" x1={x} y1="92" x2={x} y2="34" />
              <line className="pd-line pd-dim" x1={x - 7} y1="92" x2={x} y2="70" />
              <line className="pd-line pd-dim" x1={x + 7} y1="92" x2={x} y2="70" />
              <rect className="pd-node" x={x - 5} y="26" width="10" height="8" rx="2" />
              <circle className="pd-pulse" cx={x} cy="30" r="10" />
            </g>
          ))}
          <path className="pd-line pd-dash" d="M45 32 C62 12 78 12 95 32" />
          <path className="pd-line pd-dash" d="M105 32 C122 12 138 12 155 32" />
        </g>
      )}
      {type === 'fibre' && (
        <g>
          <path className="pd-line pd-dash" d="M16 84 C50 84 58 44 92 44 S150 70 184 30" />
          <rect className="pd-node" x="10" y="78" width="12" height="12" rx="2" />
          <rect className="pd-node" x="86" y="38" width="12" height="12" rx="2" />
          <rect className="pd-node pd-hot" x="178" y="24" width="12" height="12" rx="2" />
          <line className="pd-line pd-dim" x1="16" y1="96" x2="184" y2="96" strokeDasharray="2 6" />
        </g>
      )}
      {type === 'inbuilding' && (
        <g>
          <rect className="pd-line pd-dim" x="52" y="16" width="96" height="80" rx="4" />
          <line className="pd-line pd-dim" x1="52" y1="42" x2="148" y2="42" />
          <line className="pd-line pd-dim" x1="52" y1="68" x2="148" y2="68" />
          <circle className="pd-node pd-hot" cx="78" cy="29" r="3.5" />
          <circle className="pd-node pd-hot" cx="122" cy="55" r="3.5" />
          <circle className="pd-node pd-hot" cx="100" cy="81" r="3.5" />
          <path className="pd-line pd-dash" d="M78 29 L122 55 L100 81" />
        </g>
      )}
    </svg>
  );
}
