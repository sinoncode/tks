import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const RING_RADIUS = 21;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

/** 48px circle with an orange scroll-progress ring; smooth-scrolls back to the top. */
export function BackToTop() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'instant' : 'smooth' });
  };

  return (
    <button type="button" className="ft-top" aria-label="Back to top" onClick={toTop}>
      <svg className="ft-top-ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle className="ft-top-ring-base" cx="24" cy="24" r={RING_RADIUS} />
        <circle
          className="ft-top-ring-fill"
          cx="24"
          cy="24"
          r={RING_RADIUS}
          strokeDasharray={RING_LENGTH}
          strokeDashoffset={RING_LENGTH * (1 - progress)}
        />
      </svg>
      <ArrowUp size={18} strokeWidth={1.75} className="ft-top-arrow" aria-hidden="true" />
    </button>
  );
}
