import { useEffect, useRef, useState } from 'react';
export function StatCounter({ value, suffix = '', duration = 1300 }: { value: number; suffix?: string; duration?: number }) {
  const node = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const el = node.current; if (!el) return;
    let frame = 0;
    const observer = new IntersectionObserver(entries => { if (!entries[0].isIntersecting) return; observer.disconnect(); if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCount(value); return; } const start = performance.now(); const tick = (now: number) => { const progress = Math.min(1, (now - start) / duration); setCount(Math.round(value * (1 - Math.pow(1 - progress, 3)))); if (progress < 1) frame = requestAnimationFrame(tick); }; frame = requestAnimationFrame(tick); });
    observer.observe(el); return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value, duration]);
  return <span ref={node} className="stat-counter">{count.toLocaleString('en-US')}{suffix}</span>;
}
