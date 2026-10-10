import { useEffect, useRef } from 'react';
export function Atmosphere() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const spot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = canvas.current; if (!target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = target.getContext('2d'); if (!ctx) return;
    let points: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    let frame = 0; let width = 0; let height = 0;
    const resize = () => { const dpr = Math.min(window.devicePixelRatio || 1, 2); width = window.innerWidth; height = window.innerHeight; target.width = width * dpr; target.height = height * dpr; target.style.width = `${width}px`; target.style.height = `${height}px`; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); points = Array.from({ length: width < 768 ? 25 : 60 }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22, radius: Math.random() * 1.2 + .4 })); };
    const draw = () => { if (document.hidden) return; ctx.clearRect(0, 0, width, height); for (let i = 0; i < points.length; i++) { const p = points[i]; p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > width) p.vx *= -1; if (p.y < 0 || p.y > height) p.vy *= -1; const pulse = i % 9 === 0; ctx.fillStyle = pulse ? 'rgba(255,122,26,.75)' : 'rgba(185,191,202,.42)'; ctx.beginPath(); ctx.arc(p.x, p.y, pulse ? p.radius + 0.8 : p.radius, 0, Math.PI * 2); ctx.fill(); for (let j = i + 1; j < points.length; j++) { const q = points[j]; const distance = Math.hypot(p.x - q.x, p.y - q.y); if (distance < 130) { ctx.strokeStyle = `rgba(185,191,202,${(1 - distance / 130) * .1})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); } } } frame = requestAnimationFrame(draw); };
    const visibility = () => { if (document.hidden) cancelAnimationFrame(frame); else frame = requestAnimationFrame(draw); };
    resize(); draw(); window.addEventListener('resize', resize); document.addEventListener('visibilitychange', visibility); return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => { const el = spot.current; if (!el || !window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return; const move = (e: PointerEvent) => { el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`; }; window.addEventListener('pointermove', move, { passive: true }); return () => window.removeEventListener('pointermove', move); }, []);
  return <div className="atmosphere" aria-hidden="true"><div className="aurora" /><div className="perspective-grid" /><canvas ref={canvas} /><div className="cursor-spot" ref={spot} /><div className="noise" /></div>;
}
