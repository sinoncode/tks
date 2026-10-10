import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Logo } from '@/components/logo';
import { Strapline } from '@/components/strapline';

export function SiteLoader() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 800); return () => window.clearTimeout(timer); }, []);
  return (
    <AnimatePresence>
      {loading && (
        <motion.div className="site-loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }} aria-label="Loading TechnoKraft" role="status">
          <div className="loader-mark">
            <Logo height={160} link={false} />
            <svg className="loader-swoosh" viewBox="0 0 280 72" aria-hidden="true" focusable="false">
              <path d="M8 58 C 64 58, 108 14, 168 24 S 236 6, 268 14" />
              <circle cx="268" cy="14" r="5" />
            </svg>
          </div>
          <Strapline />
          <div className="loader-wave" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <span className="eyebrow">INITIALISING CONNECTION</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
