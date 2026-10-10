import { useState, type MouseEvent, type ReactNode } from 'react';
export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  function move(e: MouseEvent<HTMLDivElement>) { const r = e.currentTarget.getBoundingClientRect(); setPos({ x: (e.clientX - r.left) / r.width * 100, y: (e.clientY - r.top) / r.height * 100 }); }
  return <div className={`glass-card ${className}`} onMouseMove={move} style={{ '--mouse-x': `${pos.x}%`, '--mouse-y': `${pos.y}%` } as React.CSSProperties}>{children}</div>;
}
