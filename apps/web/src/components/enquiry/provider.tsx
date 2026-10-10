import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { EnquiryContext } from '@/components/enquiry/context';
import { EnquiryModal } from '@/components/enquiry/modal';
import { EnquiryFab } from '@/components/enquiry/fab';
import { serviceOptions } from '@/data/formOptions';
import { site } from '@/data/site';
import type { EnquiryModalOptions } from '@/components/enquiry/context';

export { useEnquiryModal, type EnquiryModalOptions } from '@/components/enquiry/context';

/** App-root provider: context, #enquire hash, data-enquiry attributes, modal + FAB. */
export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<EnquiryModalOptions | null>(null);
  const [nudge, setNudge] = useState(false);
  const nudged = useRef(false);

  const open = useCallback((next: EnquiryModalOptions = { source: 'site' }) => {
    nudged.current = true;
    setOptions(next);
  }, []);
  const close = useCallback(() => setOptions(null), []);

  // #enquire hash (e.g. /services#enquire) and data-enquiry="slug" attribute triggers.
  useEffect(() => {
    const fromHash = () => {
      if (window.location.hash === '#enquire') {
        open({ source: 'hash' });
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement | null)?.closest?.('[data-enquiry]');
      if (!trigger) return;
      event.preventDefault();
      const value = trigger.getAttribute('data-enquiry');
      const service =
        value && value !== 'true' && serviceOptions.some(option => option.value === value)
          ? value
          : undefined;
      open({ source: 'attribute', service });
    };
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('hashchange', fromHash);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  // Optional scroll-60% nudge — off by default (site.showNudge === false).
  useEffect(() => {
    if (!site.showNudge) return;
    let armed = true;
    const onScroll = () => {
      if (!armed || nudged.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.6) {
        armed = false;
        setNudge(true);
        window.setTimeout(() => setNudge(false), 6000);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const value = useMemo(
    () => ({ open, close, isOpen: !!options, nudge }),
    [open, close, options, nudge],
  );

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <EnquiryModal open={!!options} options={options ?? undefined} onClose={close} />
      <EnquiryFab nudge={nudge} />
    </EnquiryContext.Provider>
  );
}
