import { Link } from 'react-router';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { TKButton } from '@/components/ui/tk-button';

const TIMELINE = [
  { title: 'Review', text: 'An engineer on our team reads your enquiry.' },
  { title: 'Scoping conversation', text: 'We talk through scope, constraints and timeline.' },
  { title: 'Proposal', text: 'You receive a structured proposal for the program.' },
];

/** Animated orange swoosh check drawn on mount. */
export function SwooshCheck() {
  return (
    <span className="swoosh-check" role="img" aria-label="Enquiry sent">
      <svg viewBox="0 0 64 64" focusable="false" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="none" strokeWidth="2" className="swoosh-check-ring" />
        <path d="M8 40 C 20 44, 30 30, 40 24" fill="none" strokeWidth="2.4" className="swoosh-check-swoosh" />
        <path d="M22 33 L 29 40 L 44 24" fill="none" strokeWidth="3" className="swoosh-check-tick" />
      </svg>
    </span>
  );
}

/** Shared success state for the contact wizard. */
export function ContactSuccess({
  name,
  summary,
}: {
  name: string;
  summary: readonly (readonly [string, string])[];
}) {
  const reduce = useReducedMotion();
  const firstName = name.trim().split(/\s+/)[0] || name;
  return (
    <motion.div
      className="form-success"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <SwooshCheck />
      <h2>
        Thank you, {firstName}
        <span className="period">.</span>
      </h2>
      <p className="form-success-lead">
        Our team will review your enquiry and get back to you. Here is a summary of what was sent:
      </p>
      <dl className="form-success-summary">
        {summary.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <div className="form-success-actions">
        <TKButton href="/" size="lg">
          Back to home
        </TKButton>
        <TKButton href="/services" variant="ghost" size="lg">
          Explore services
        </TKButton>
      </div>
      <div className="form-success-next">
        <h3>What happens next</h3>
        <ol>
          {TIMELINE.map((step, index) => (
            <motion.li
              key={step.title}
              initial={reduce ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + index * 0.12, duration: 0.4 }}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step.title}</strong>
              <em>{step.text}</em>
            </motion.li>
          ))}
        </ol>
        <p>
          Prefer to keep browsing in the meantime?{' '}
          <Link to="/projects">
            See the shape of our work <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
