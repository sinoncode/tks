import { useLocation } from 'react-router';
import { MessagesSquare } from 'lucide-react';
import { useEnquiryModal } from '@/components/enquiry/context';

/** Floating "Talk to an Expert" orb — hidden on /contact and while the modal is open. */
export function EnquiryFab({ nudge }: { nudge: boolean }) {
  const { open, isOpen } = useEnquiryModal();
  const location = useLocation();
  if (location.pathname === '/contact' || isOpen) return null;
  return (
    <button
      type="button"
      className={`enquiry-fab ${nudge ? 'is-nudged' : ''}`.trim()}
      onClick={() => open({ source: 'fab' })}
      aria-label="Talk to an Expert"
    >
      <span className="enquiry-fab-ring" aria-hidden="true" />
      <span className="enquiry-fab-label">Talk to an Expert</span>
      <span className="enquiry-fab-orb">
        <MessagesSquare size={20} strokeWidth={1.9} aria-hidden="true" />
      </span>
    </button>
  );
}
