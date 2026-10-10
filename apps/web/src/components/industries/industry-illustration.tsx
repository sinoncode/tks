import type { IndustryIllustration } from '@/data/industries';

/**
 * One animated SVG illustration per industry — tower, chip, infrastructure,
 * fibre strands and data-centre racks. Pure SVG + CSS keyframes.
 */
export function IndustryIllustration({ kind }: { kind: IndustryIllustration }) {
  return (
    <svg
      className={`ind-illustration ind-illustration--${kind}`}
      viewBox="0 0 320 220"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {kind === 'tower' && (
        <g>
          <path className="il-line" d="M160 200 L138 60 M160 200 L182 60" />
          <path className="il-line il-dim" d="M143 170 L177 150 M147 140 L173 120 M151 110 L169 95 M155 82 L165 74" />
          <path className="il-line il-dim" d="M143 170 L177 150 M147 140 L173 120" />
          <rect className="il-node" x="150" y="44" width="20" height="14" rx="3" />
          <circle className="il-hot" cx="160" cy="51" r="3" />
          <path className="il-wave" style={{ animationDelay: '0s' }} d="M126 44 A38 38 0 0 1 194 44" />
          <path className="il-wave" style={{ animationDelay: '.9s' }} d="M106 34 A58 58 0 0 1 214 34" />
          <path className="il-wave" style={{ animationDelay: '1.8s' }} d="M86 24 A78 78 0 0 1 234 24" />
          <path className="il-line il-dim" d="M60 200 H260" strokeDasharray="3 7" />
        </g>
      )}
      {kind === 'chip' && (
        <g>
          <rect className="il-line il-fill" x="110" y="60" width="100" height="100" rx="10" />
          <rect className="il-line il-dim" x="132" y="82" width="56" height="56" rx="6" />
          <circle className="il-hot" cx="160" cy="110" r="5" />
          {[[130, 40], [160, 40], [190, 40], [130, 180], [160, 180], [190, 180], [90, 85], [90, 135], [230, 85], [230, 135]].map(([x, y], i) => (
            <path key={i} className={`il-pin ${i % 3 === 0 ? 'il-pin--hot' : ''}`} style={{ animationDelay: `${(i % 3) * 0.4}s` }} d={`M${x} ${y} v${y < 110 ? 20 : -20}`} />
          ))}
          <path className="il-dash" d="M40 30 H90 M40 190 H90 M280 30 H230 M280 190 H230" />
          <circle className="il-node" cx="40" cy="30" r="4" /><circle className="il-node" cx="40" cy="190" r="4" />
          <circle className="il-node" cx="280" cy="30" r="4" /><circle className="il-node" cx="280" cy="190" r="4" />
        </g>
      )}
      {kind === 'infrastructure' && (
        <g>
          <path className="il-line" d="M90 200 L74 70 M90 200 L106 70" />
          <path className="il-line il-dim" d="M79 160 L101 145 M83 125 L97 112 M86 92 L94 84" />
          <path className="il-line" d="M230 200 L214 70 M230 200 L246 70" />
          <path className="il-line il-dim" d="M219 160 L241 145 M223 125 L237 112 M226 92 L234 84" />
          <rect className="il-node" x="82" y="56" width="16" height="12" rx="3" />
          <rect className="il-node" x="222" y="56" width="16" height="12" rx="3" />
          <path className="il-dash" d="M98 62 C140 20 180 20 222 62" />
          <circle className="il-hot" cx="160" cy="34" r="4" />
          <path className="il-wave" style={{ animationDelay: '0s' }} d="M132 28 A30 30 0 0 1 188 28" />
          <path className="il-wave" style={{ animationDelay: '1s' }} d="M116 18 A48 48 0 0 1 204 18" />
          <path className="il-line il-dim" d="M50 200 H270" strokeDasharray="3 7" />
        </g>
      )}
      {kind === 'fibre' && (
        <g>
          {[0, 1, 2, 3, 4].map(i => (
            <path
              key={i}
              className={`il-dash il-dash--${i}`}
              style={{ animationDelay: `${i * 0.35}s` }}
              d={`M20 ${60 + i * 25} C100 ${30 + i * 25} 160 ${100 + i * 18} 300 ${50 + i * 25}`}
            />
          ))}
          {[[20, 60], [20, 85], [20, 110], [20, 135], [20, 160]].map(([x, y], i) => (
            <circle key={i} className="il-node" cx={x} cy={y} r="4" />
          ))}
          <circle className="il-hot" cx="300" cy="110" r="5" />
          <circle className="il-hot il-hot--delay" cx="300" cy="60" r="4" />
          <circle className="il-hot il-hot--delay2" cx="300" cy="160" r="4" />
        </g>
      )}
      {kind === 'datacentre' && (
        <g>
          {[0, 1].map(rack => (
            <g key={rack} transform={`translate(${60 + rack * 130} 40)`}>
              <rect className="il-line il-fill" x="0" y="0" width="70" height="140" rx="6" />
              {[0, 1, 2, 3, 4].map(unit => (
                <g key={unit}>
                  <rect className="il-line il-dim" x="8" y={10 + unit * 26} width="54" height="18" rx="3" />
                  <circle className={`il-led ${unit % 2 === 0 ? 'il-led--a' : 'il-led--b'}`} style={{ animationDelay: `${(unit + rack) * 0.3}s` }} cx="18" cy={19 + unit * 26} r="2.4" />
                  <circle className="il-led il-led--b" style={{ animationDelay: `${(unit * 2 + rack) * 0.25}s` }} cx="28" cy={19 + unit * 26} r="2.4" />
                </g>
              ))}
            </g>
          ))}
          <path className="il-dash" d="M130 110 H190" />
          <circle className="il-hot" cx="160" cy="110" r="4" />
          <path className="il-wave" style={{ animationDelay: '0s' }} d="M140 96 A24 24 0 0 1 140 124" />
          <path className="il-wave" style={{ animationDelay: '1s' }} d="M132 88 A34 34 0 0 1 132 132" />
        </g>
      )}
    </svg>
  );
}
