import { useEffect, useRef } from 'react';

const NODE_COUNT = 96;
const ARC_COUNT = 22;
const TOWER_STEP = 14;

type Vec3 = { x: number; y: number; z: number };

/**
 * Holographic network globe rendered on a 2D canvas — a sphere of nodes with
 * glowing great-circle arcs and pulsing tower markers. Chosen over a WebGL
 * dependency on purpose: it stays lightweight, pauses when off-screen or when
 * the tab is hidden, and draws a single static frame under reduced motion.
 */
export function HeroGlobe() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const target = canvas.current;
    if (!target) return;
    const ctx = target.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fibonacci-distributed nodes on the unit sphere.
    const nodes: Vec3[] = Array.from({ length: NODE_COUNT }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return { x: Math.sin(phi) * Math.cos(theta), y: Math.cos(phi), z: Math.sin(phi) * Math.sin(theta) };
    });
    const arcs: [number, number][] = Array.from({ length: ARC_COUNT }, (_, i) => {
      const a = (i * 4 + 1) % NODE_COUNT;
      return [a, (a + 17) % NODE_COUNT];
    });
    const towers = nodes.filter((_, i) => (i + 3) % TOWER_STEP === 0);

    let width = 0;
    let height = 0;
    let frame = 0;
    let onScreen = true;
    let running = false;

    const resize = () => {
      const rect = target.parentElement?.getBoundingClientRect();
      if (!rect || rect.width === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      target.width = width * dpr;
      target.height = height * dpr;
      target.style.width = `${width}px`;
      target.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rotate = (v: Vec3, angle: number): Vec3 => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const tilt = -0.42;
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);
      const x = v.x * cos + v.z * sin;
      const z0 = -v.x * sin + v.z * cos;
      return { x, y: v.y * ct - z0 * st, z: v.y * st + z0 * ct };
    };

    const draw = (time: number) => {
      const t = time / 1000;
      const angle = reduce ? 0.6 : t * 0.16;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.36;
      ctx.clearRect(0, 0, width, height);
      const projected = nodes.map(n => rotate(n, angle));

      for (const [ai, bi] of arcs) {
        const a = projected[ai];
        const b = projected[bi];
        if (a.z < -0.15 && b.z < -0.15) continue;
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const mz = (a.z + b.z) / 2;
        const len = Math.hypot(mx, my, mz) || 1;
        const lift = 1.42;
        const depth = (a.z + b.z) / 2;
        const alpha = 0.12 + Math.max(0, depth) * 0.5;
        const grad = ctx.createLinearGradient(
          cx + a.x * radius, cy - a.y * radius,
          cx + b.x * radius, cy - b.y * radius,
        );
        grad.addColorStop(0, `rgba(185,191,202,${alpha})`);
        grad.addColorStop(1, `rgba(227,231,238,${alpha * 0.7})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx + a.x * radius, cy - a.y * radius);
        ctx.quadraticCurveTo(
          cx + (mx / len) * lift * radius,
          cy - (my / len) * lift * radius,
          cx + b.x * radius, cy - b.y * radius,
        );
        ctx.stroke();
      }

      for (const p of projected) {
        const front = p.z > 0;
        ctx.fillStyle = front ? 'rgba(227,231,238,.92)' : 'rgba(185,191,202,.28)';
        ctx.beginPath();
        ctx.arc(cx + p.x * radius, cy - p.y * radius, front ? 1.6 : 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      const phase = reduce ? 0.5 : (t % 2.4) / 2.4;
      for (const tower of towers) {
        const p = rotate(tower, angle);
        if (p.z < 0.05) continue;
        const px = cx + p.x * radius;
        const py = cy - p.y * radius;
        ctx.fillStyle = '#E3E7EE';
        ctx.shadowColor = 'rgba(185,191,202,.8)';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(px, py, 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = `rgba(185,191,202,${(1 - phase) * 0.45})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(px, py, 3 + phase * 16, 0, Math.PI * 2);
        ctx.stroke();
      }

      const orbitR = radius * 1.12;
      const rot = -0.42;
      const ang = reduce ? 1.1 : t * 0.62;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.strokeStyle = 'rgba(255,122,26,.9)';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = 'rgba(255,122,26,.7)';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.ellipse(0, 0, orbitR, orbitR * 0.36, 0, 0.2, Math.PI * 1.65);
      ctx.stroke();
      ctx.shadowBlur = 0;
      const ox = Math.cos(ang) * orbitR;
      const oy = Math.sin(ang) * orbitR * 0.36;
      ctx.fillStyle = '#FF7A1A';
      ctx.shadowColor = 'rgba(255,122,26,.95)';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(ox, oy, 4.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };
    const sync = () => {
      if (!onScreen || document.hidden || reduce) stop();
      else start();
    };

    resize();
    if (reduce) draw(0);
    else start();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(0);
    });
    if (target.parentElement) ro.observe(target.parentElement);
    const io = new IntersectionObserver(entries => {
      onScreen = entries[0]?.isIntersecting ?? true;
      sync();
    }, { threshold: 0.05 });
    io.observe(target);
    const onVisibility = () => sync();
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="globe-wrap">
      <canvas ref={canvas} aria-hidden="true" />
    </div>
  );
}
