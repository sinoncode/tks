import { createContext, useContext } from 'react';

export type EnquiryModalOptions = {
  /** Which trigger opened the modal — sent with the enquiry. */
  source: string;
  /** Service slug to prefill. */
  service?: string;
  /** Optional custom subtitle. */
  title?: string;
  /** Optional raw prefill values. */
  prefill?: Record<string, unknown>;
};

export type EnquiryContextValue = {
  open: (options?: EnquiryModalOptions) => void;
  close: () => void;
  isOpen: boolean;
  nudge: boolean;
};

/** Shared context — kept in its own module so the modal, form and FAB never cycle. */
export const EnquiryContext = createContext<EnquiryContextValue | null>(null);

/** Access the global enquiry modal from anywhere in the tree. */
export function useEnquiryModal() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiryModal must be used inside <EnquiryModalProvider>');
  }
  return context;
}
