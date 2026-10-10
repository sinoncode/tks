import { useEffect, useRef, useState } from 'react';

type UseInViewOptions = { once?: boolean; threshold?: number };

/** IntersectionObserver visibility hook — one-shot by default. */
export function useInView<T extends HTMLElement>(options?: UseInViewOptions) {
  const { once = true, threshold = 0.12 } = options ?? {};
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold]);

  return { ref, inView };
}
