import { useState, type MouseEvent, type ReactNode } from 'react';
export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  function move(e: MouseEvent<HTMLDivElement>) { if (!window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return; const r = e.currentTarget.getBoundingClientRect(); setTilt({ x: -((e.clientY - r.top) / r.height - .5) * 12, y: ((e.clientX - r.left) / r.width - .5) * 12 }); }
  return <div className={`tilt-card ${className}`} onMouseMove={move} onMouseLeave={() => setTilt({ x: 0, y: 0 })} style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>{children}</div>;
}
