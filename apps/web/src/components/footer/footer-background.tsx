import { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; vx: number; vy: number };

type WaveConfig = { offset: number; amp: number; wavelength: number; speed: number; color: string };

const WAVES: WaveConfig[] = [
  { offset: 14, amp: 7, wavelength: 240, speed: 0.9, color: 'rgba(185,191,202,.10)' },
  { offset: 30, amp: 10, wavelength: 320, speed: -0.65, color: 'rgba(76,125,255,.14)' },
  { offset: 48, amp: 13, wavelength: 400, speed: 0.45, color: 'rgba(255,122,26,.22)' },
];

const fade = (color: string) => color.replace(/[\d.]+\)$/, '0)');

/**
 * Layered footer background: navy gradient base with drifting aurora blobs, a
 * slowly rotating silver wireframe globe with an orange orbit (echoing the
 * logo), parallax signal waves that react to the pointer, a network particle
 * field, a cursor spotlight and a shimmering top border. One shared rAF loop,
 * started only while the footer is on screen and the tab is visible.
 */
export function FooterBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const footer = canvas.closest('footer');
    if (!(footer instanceof HTMLElement)) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;

    let raf = 0;
    let running = false;
    let intersecting = false;
    let width = 1;
    let height = 1;
    let particles: Particle[] = [];
    const pointer = { x: -1, y: -1, inside: false };
    const start = performance.now();

    const seedParticles = () => {
      const count = width < 640 ? 18 : 40;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.14,
      }));
    };

    const drawGlobe = (t: number) => {
      const mobile = width < 640;
      const radius = mobile ? Math.min(width * 0.52, 240) : Math.min(width * 0.3, 400);
      const cx = mobile ? width * 0.5 : width - radius * 0.55;
      const cy = mobile ? height * 0.26 : height - radius * 0.5;
      const rot = t * ((Math.PI * 2) / 90); // ~90s per turn

      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(185,191,202,.10)';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
      for (let lat = -60; lat <= 60; lat += 30) {
        const phi = (lat * Math.PI) / 180;
        const ry = radius * Math.sin(phi);
        const rx = radius * Math.cos(phi);
        ctx.beginPath();
        ctx.ellipse(cx, cy - ry, Math.max(rx, 0.5), Math.max(rx * 0.3, 0.5), 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      const longitudes: number[] = [];
      for (let j = 0; j < 6; j++) {
        const rx = Math.abs(Math.cos(rot + (j * Math.PI) / 6)) * radius;
        longitudes.push(Math.max(rx, 0.5));
        ctx.beginPath();
        ctx.ellipse(cx, cy, longitudes[j], radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      // Silver node dots sitting on the latitude/longitude intersections.
      ctx.fillStyle = 'rgba(185,191,202,.22)';
      for (let lat = -60; lat <= 60; lat += 30) {
        const phi = (lat * Math.PI) / 180;
        for (let j = 0; j < 6; j++) {
          const x = cx + longitudes[j] * Math.cos(phi);
          const y = cy - radius * Math.sin(phi);
          ctx.beginPath();
          ctx.arc(x, y, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      // Orange orbit arc with a travelling orb — the logo swoosh echo.
      ctx.translate(cx, cy);
      ctx.rotate(-0.32);
      ctx.strokeStyle = 'rgba(255,122,26,.32)';
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.22, radius * 0.44, 0, 0, Math.PI * 2);
      ctx.stroke();
      const theta = t * 0.55;
      ctx.fillStyle = '#FF7A1A';
      ctx.shadowColor = 'rgba(255,122,26,.9)';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(Math.cos(theta) * radius * 1.22, Math.sin(theta) * radius * 0.44, 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawWaves = (t: number) => {
      ctx.save();
      ctx.lineWidth = 1.4;
      for (const wave of WAVES) {
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, fade(wave.color));
        gradient.addColorStop(0.12, wave.color);
        gradient.addColorStop(0.88, wave.color);
        gradient.addColorStop(1, fade(wave.color));
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        const baseY = height - wave.offset;
        for (let x = 0; x <= width; x += 8) {
          let boost = 1;
          if (pointer.inside) {
            const dx = x - pointer.x;
            boost += 0.15 * Math.exp(-(dx * dx) / (2 * 160 * 160));
          }
          const y = baseY - wave.amp * boost * Math.sin(x / wave.wavelength + t * wave.speed);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawParticles = () => {
      if (reduce) return;
      ctx.save();
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < -10) particle.x = width + 10;
        else if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        else if (particle.y > height + 10) particle.y = -10;
      }
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(185,191,202,${(1 - dist / 120) * 0.12})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const particle of particles) {
        const near = pointer.inside
          ? Math.exp(
              -((particle.x - pointer.x) ** 2 + (particle.y - pointer.y) ** 2) / (2 * 130 * 130),
            )
          : 0;
        ctx.fillStyle =
          near > 0.05 ? `rgba(255,162,77,${0.35 + 0.45 * near})` : 'rgba(185,191,202,.30)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.3 + near * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const drawFrame = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      drawGlobe(t);
      drawWaves(t);
      drawParticles();
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = footer.clientWidth;
      height = footer.clientHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
      if (reduce) drawFrame(0.6);
    };

    const loop = (now: number) => {
      if (!running) return;
      drawFrame((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };

    const apply = () => {
      if (reduce) return;
      const next = intersecting && !document.hidden;
      if (next === running) return;
      running = next;
      if (running) raf = requestAnimationFrame(loop);
      else cancelAnimationFrame(raf);
    };

    const observer = new IntersectionObserver(
      entries => {
        intersecting = entries.some(entry => entry.isIntersecting);
        apply();
      },
      { threshold: 0 },
    );
    observer.observe(footer);

    const onVisibility = () => apply();
    document.addEventListener('visibilitychange', onVisibility);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(footer);
    resize();

    const onPointerMove = (event: PointerEvent) => {
      const rect = footer.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.inside = true;
      const spot = spotRef.current;
      if (spot) {
        spot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
        spot.style.opacity = '1';
      }
    };
    const onPointerLeave = () => {
      pointer.inside = false;
      const spot = spotRef.current;
      if (spot) spot.style.opacity = '0';
    };
    if (fine) {
      footer.addEventListener('pointermove', onPointerMove, { passive: true });
      footer.addEventListener('pointerleave', onPointerLeave);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      if (fine) {
        footer.removeEventListener('pointermove', onPointerMove);
        footer.removeEventListener('pointerleave', onPointerLeave);
      }
    };
  }, []);

  return (
    <div className="ft-bg" aria-hidden="true">
      <div className="ft-aurora ft-aurora--blue" />
      <div className="ft-aurora ft-aurora--orange" />
      <canvas ref={canvasRef} className="ft-canvas" />
      <div ref={spotRef} className="ft-spot" />
      <div className="ft-noise" />
      <div className="ft-border">
        <i className="ft-border-beam" />
        <i className="ft-border-orb" />
      </div>
    </div>
  );
}
