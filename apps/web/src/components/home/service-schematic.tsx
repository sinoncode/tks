import type { services } from '@/data/services';

type ServiceSlug = (typeof services)[number]['slug'];

/**
 * Animated schematic backgrounds revealed on card hover — one visual metaphor
 * per service. Pure SVG + CSS keyframes, no runtime cost while hidden.
 */
export function ServiceSchematic({ slug }: { slug: ServiceSlug }) {
  return (
    <svg
      className={`schematic schematic--${slug}`}
      viewBox="0 0 220 130"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {slug === 'network-deployment-rollout' && (
        <g className="s-group">
          <path className="s-line" d="M110 112 L110 34" />
          <path className="s-line s-dim" d="M96 112 L110 88 L124 112" />
          <path className="s-line s-dim" d="M100 96 L120 96" />
          <rect className="s-node" x="102" y="24" width="16" height="12" rx="3" />
          <path className="s-wave" style={{ animationDelay: '0s' }} d="M88 30 A26 26 0 0 1 132 30" />
          <path className="s-wave" style={{ animationDelay: '.8s' }} d="M76 30 A40 40 0 0 1 144 30" />
          <path className="s-wave" style={{ animationDelay: '1.6s' }} d="M64 30 A54 54 0 0 1 156 30" />
        </g>
      )}
      {slug === 'network-design-optimisation' && (
        <g className="s-group">
          <path className="s-line s-dim" d="M40 90 L80 60 L120 70 L160 40" />
          <path className="s-line s-dim" d="M40 90 L90 100 L120 70" />
          <path className="s-line s-dim" d="M80 60 L90 100 L160 40" />
          <path className="s-line s-dash" d="M40 90 L80 60 L120 70 L160 40" />
          <circle className="s-node" cx="40" cy="90" r="4" />
          <circle className="s-node" cx="80" cy="60" r="4" />
          <circle className="s-node" cx="120" cy="70" r="4" />
          <circle className="s-node" cx="90" cy="100" r="4" />
          <circle className="s-node s-hot" cx="160" cy="40" r="5" />
        </g>
      )}
      {slug === 'rf-engineering' && (
        <g className="s-group">
          <path className="s-line" d="M30 65 L58 65" />
          <path className="s-line s-dim" d="M44 65 L44 92 M38 92 L50 92" />
          <path className="s-wave" style={{ animationDelay: '0s' }} d="M70 45 A28 28 0 0 1 70 85" />
          <path className="s-wave" style={{ animationDelay: '.8s' }} d="M88 32 A44 44 0 0 1 88 98" />
          <path className="s-wave" style={{ animationDelay: '1.6s' }} d="M106 19 A60 60 0 0 1 106 111" />
          <path className="s-wave" style={{ animationDelay: '2.4s' }} d="M124 6 A76 76 0 0 1 124 124" />
        </g>
      )}
      {slug === 'in-building-solutions-small-cells' && (
        <g className="s-group">
          <rect className="s-line s-dim" x="60" y="18" width="100" height="94" rx="4" />
          <path className="s-line s-dim" d="M60 49 H160 M60 80 H160" />
          <circle className="s-node s-hot" style={{ animationDelay: '0s' }} cx="90" cy="34" r="3.5" />
          <circle className="s-node s-hot" style={{ animationDelay: '.7s' }} cx="130" cy="65" r="3.5" />
          <circle className="s-node s-hot" style={{ animationDelay: '1.4s' }} cx="105" cy="96" r="3.5" />
          <path className="s-line s-dash" d="M90 34 L130 65 L105 96" />
        </g>
      )}
      {slug === 'fibre-construction' && (
        <g className="s-group">
          <path className="s-line s-dash" d="M20 100 C60 100 70 60 110 60 S160 30 200 30" />
          <rect className="s-node" x="14" y="94" width="12" height="12" rx="2" />
          <rect className="s-node" x="104" y="54" width="12" height="12" rx="2" />
          <rect className="s-node s-hot" x="194" y="24" width="12" height="12" rx="2" />
          <path className="s-line s-dim" d="M20 100 V118 M110 60 V118 M200 30 V118" strokeDasharray="2 6" />
        </g>
      )}
      {slug === 'fibre-engineering-survey' && (
        <g className="s-group">
          <path className="s-line s-dim" d="M20 100 C60 70 90 110 130 80 S190 60 205 40" />
          <path className="s-line s-dim" d="M20 115 C70 90 100 125 140 100 S185 80 205 62" />
          <path className="s-line s-dash" d="M20 85 C60 55 95 95 135 62 S190 40 205 22" />
          <g className="s-pin">
            <circle className="s-node s-hot" cx="135" cy="62" r="5" />
            <circle className="s-wave" style={{ animationDelay: '0s' }} cx="135" cy="62" r="10" />
          </g>
        </g>
      )}
    </svg>
  );
}
