import { Mail, MapPin, MessageSquareText, Phone, ShieldCheck } from 'lucide-react';
import { site } from '@/data/site';

const NEXT_STEPS = [
  { title: 'Review', text: 'An engineer reads your enquiry — no call centre in between.' },
  { title: 'Scoping conversation', text: 'We talk through scope, sites or route, and constraints.' },
  { title: 'Proposal', text: 'You receive a structured proposal for the program.' },
];

/** Side panel — direct channels and what happens next. */
export function ContactSidePanel() {
  return (
    <aside className="contact-side glass-card" aria-label="Direct channels and next steps">
      <span className="eyebrow">DIRECT CHANNELS</span>
      <h2>Talk to an engineer</h2>
      <a className="contact-side-mail" href={`mailto:${site.contact.email}`}>
        <Mail size={17} strokeWidth={1.75} aria-hidden="true" />
        {site.contact.email}
      </a>
      <div className="contact-side-details">
        {site.contact.phones.map(phone => (
          <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`}>
            <Phone size={16} strokeWidth={1.75} aria-hidden="true" />
            {phone}
          </a>
        ))}
        <address>
          <MapPin size={16} strokeWidth={1.75} aria-hidden="true" />
          {site.contact.address}
        </address>
      </div>
      <p className="contact-side-note">{site.contact.note}</p>
      <div className="contact-side-divider" aria-hidden="true" />
      <h3>What happens next</h3>
      <ol className="contact-side-steps">
        {NEXT_STEPS.map((step, index) => (
          <li key={step.title}>
            <span className="contact-side-step-index">{String(index + 1).padStart(2, '0')}</span>
            <span>
              <strong>{step.title}</strong>
              <em>{step.text}</em>
            </span>
          </li>
        ))}
      </ol>
      <p className="contact-side-foot">
        <ShieldCheck size={14} strokeWidth={1.75} aria-hidden="true" />
        Every enquiry is covered by an NDA on request — just tick the box in the form.
      </p>
      <p className="contact-side-foot">
        <MessageSquareText size={14} strokeWidth={1.75} aria-hidden="true" />
        In a hurry? The short form in the “Talk to an Expert” bubble takes under a minute.
      </p>
    </aside>
  );
}
