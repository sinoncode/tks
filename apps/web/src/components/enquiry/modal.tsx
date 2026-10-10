import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Strapline } from '@/components/strapline';
import { EnquiryModalForm } from '@/components/enquiry/modal-form';
import type { EnquiryModalOptions } from '@/components/enquiry/context';
import { site } from '@/data/site';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type Props = {
  open: boolean;
  options?: EnquiryModalOptions;
  onClose: () => void;
};

/** Global enquiry dialog — two panes on desktop, drag-to-close bottom sheet on mobile. */
export function EnquiryModal({ open, options, onClose }: Props) {
  const [sheet, setSheet] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 699px)');
    const update = () => setSheet(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Scroll lock without layout shift, inert background, focus in / focus back.
  useEffect(() => {
    if (!open) return;
    restoreFocus.current = document.activeElement as HTMLElement | null;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    document.getElementById('root')?.setAttribute('inert', '');
    const timer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 80);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPad;
      document.getElementById('root')?.removeAttribute('inert');
      restoreFocus.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setDirty(false);
      setConfirming(false);
    }
  }, [open]);

  const requestClose = () => {
    if (dirty) setConfirming(true);
    else onClose();
  };

  const onKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      requestClose();
      return;
    }
    if (event.key !== 'Tab' || !dialogRef.current) return;
    const focusables = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter(element => element.offsetParent !== null);
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (typeof document === 'undefined') return null;

  const confirmOverlay = confirming ? (
    <motion.div
      className="enquiry-confirm"
      initial={reduce ? false : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.18 }}
      role="alertdialog"
      aria-label="Discard changes"
    >
      <p>Discard your enquiry?</p>
      <div className="enquiry-confirm-actions">
        <button type="button" onClick={() => setConfirming(false)}>
          Keep editing
        </button>
        <button
          type="button"
          className="is-danger"
          onClick={() => {
            setConfirming(false);
            onClose();
          }}
        >
          Discard
        </button>
      </div>
    </motion.div>
  ) : null;

  return createPortal(
    <AnimatePresence>
      {open && options ? (
        <>
          <motion.div
            className="enquiry-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={requestClose}
          />
          {sheet ? (
            <motion.div
              className="enquiry-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Discuss your project"
              ref={dialogRef}
              onKeyDown={onKey}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 42 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_event, info) => {
                if (info.offset.y > 120) requestClose();
              }}
            >
              <div className="enquiry-sheet-grip" aria-hidden="true">
                <i />
              </div>
              <button type="button" className="enquiry-close" onClick={requestClose} aria-label="Close enquiry form">
                <X size={18} strokeWidth={1.9} aria-hidden="true" />
              </button>
              <div className="enquiry-sheet-scroll">
                <header className="enquiry-sheet-head">
                  <Logo height={40} link={false} />
                  <h2>
                    Discuss your project<span className="period">.</span>
                  </h2>
                  <p>{options.title ?? 'A short enquiry — an engineer gets back to you.'}</p>
                </header>
                <EnquiryModalForm options={options} onClose={onClose} onDirtyChange={setDirty} />
              </div>
              {confirmOverlay}
            </motion.div>
          ) : (
            <motion.div
              className="enquiry-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="enquiry-title"
              ref={dialogRef}
              onKeyDown={onKey}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 26 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 18 }}
              transition={reduce ? { duration: 0.15 } : { type: 'spring', stiffness: 320, damping: 30 }}
            >
              <svg className="enquiry-swoosh" viewBox="0 0 920 24" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 18 C 240 4, 480 22, 920 8" />
              </svg>
              <aside className="enquiry-brand">
                <Logo height={44} link={false} />
                <Strapline />
                <h3>One team, end to end.</h3>
                <ul className="enquiry-reasons">
                  {site.modalReasons.map(reason => (
                    <li key={reason}>
                      <i aria-hidden="true" />
                      {reason}
                    </li>
                  ))}
                </ul>
                <div className="enquiry-brand-alt">
                  <span className="eyebrow">PREFER EMAIL?</span>
                  <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                </div>
                <div className="enquiry-brand-globe" aria-hidden="true" />
              </aside>
              <div className="enquiry-pane">
                <button type="button" className="enquiry-close" onClick={requestClose} aria-label="Close enquiry form">
                  <X size={18} strokeWidth={1.9} aria-hidden="true" />
                </button>
                <header className="enquiry-pane-head">
                  <h2 id="enquiry-title">
                    Discuss your project<span className="period">.</span>
                  </h2>
                  <p>{options.title ?? 'A short enquiry — under a minute — and an engineer gets back to you.'}</p>
                </header>
                <EnquiryModalForm options={options} onClose={onClose} onDirtyChange={setDirty} />
              </div>
              {confirmOverlay}
            </motion.div>
          )}
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
