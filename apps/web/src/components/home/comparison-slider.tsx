import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';

const NODES: [number, number][] = [
  [60, 44],
  [180, 96],
  [300, 52],
  [420, 104],
  [540, 62],
];

/**
 * Draggable before/after slider — traditional fragmented hand-offs on the
 * left, the TechnoKraft connected lifecycle on the right. Keyboard-operable
 * via the slider role; pointer drag on touch and mouse.
 */
export function ComparisonSlider() {
  const [pos, setPos] = useState(50);
  const wrap = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const rect = wrap.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(94, Math.max(6, next)));
  };
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    wrap.current?.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') setPos(p => Math.max(6, p - 4));
    if (e.key === 'ArrowRight') setPos(p => Math.min(94, p + 4));
  };

  return (
    <div
      className="compare"
      ref={wrap}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="compare-pane">
        <span className="compare-tag compare-tag--a">Traditional multi-party hand-offs</span>
        <svg className="compare-svg" viewBox="0 0 600 220" preserveAspectRatio="none" aria-hidden="true">
          {NODES.slice(0, -1).map(([x, y], i) => {
            const [nx, ny] = NODES[i + 1];
            const mx = (x + nx) / 2;
            const my = (y + ny) / 2;
            return (
              <g key={`t-${i}`}>
                <line className="cp-broken" x1={x} y1={y} x2={mx - 14} y2={my} />
                <line className="cp-broken" x1={mx + 14} y1={my} x2={nx} y2={ny} />
                <g className="cp-x">
                  <line x1={mx - 5} y1={my - 5} x2={mx + 5} y2={my + 5} />
                  <line x1={mx - 5} y1={my + 5} x2={mx + 5} y2={my - 5} />
                </g>
              </g>
            );
          })}
          {NODES.map(([x, y], i) => (
            <circle key={`tn-${i}`} className="cp-node cp-node--dim" cx={x} cy={y} r="7" />
          ))}
        </svg>
      </div>
      <div className="compare-pane compare-pane--top" style={{ clipPath: `inset(0 0 0 ${pos}%)` }} aria-hidden="true">
        <span className="compare-tag compare-tag--b">TechnoKraft connected lifecycle</span>
        <svg className="compare-svg" viewBox="0 0 600 220" preserveAspectRatio="none">
          <path
            className="cp-flow"
            d="M60 44 C100 44 140 96 180 96 S260 52 300 52 S380 104 420 104 S500 62 540 62"
          />
          <path
            className="cp-flow cp-flow--dash"
            d="M60 44 C100 44 140 96 180 96 S260 52 300 52 S380 104 420 104 S500 62 540 62"
          />
          {NODES.map(([x, y], i) => (
            <circle key={`cn-${i}`} className="cp-node" cx={x} cy={y} r="7" />
          ))}
        </svg>
      </div>
      <div
        className="compare-handle"
        role="slider"
        tabIndex={0}
        aria-label="Compare traditional hand-offs with the TechnoKraft lifecycle"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        style={{ left: `${pos}%` }}
        onKeyDown={onKey}
      >
        <span className="compare-knob">
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path d="M9 6 L4 12 L9 18 M15 6 L20 12 L15 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}
