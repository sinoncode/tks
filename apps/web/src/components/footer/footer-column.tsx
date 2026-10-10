import { useState, type CSSProperties } from 'react';
import { ChevronDown } from 'lucide-react';
import { FooterLink } from '@/components/footer/footer-link';
import { LifecycleMini } from '@/components/footer/lifecycle-mini';
import type { FooterColumnData } from '@/data/footer';

type FooterColumnProps = { column: FooterColumnData; index: number };

/** One link column — heading with swoosh underline, accordion on phones. */
export function FooterColumn({ column, index }: FooterColumnProps) {
  const [open, setOpen] = useState(index === 0);
  const bodyId = `ft-body-${column.id}`;
  return (
    <div
      className={`ft-col${open ? ' is-open' : ''}`}
      style={{ '--d': `${index * 60}ms` } as CSSProperties}
    >
      <h2 className="ft-col-title">
        <button
          type="button"
          className="ft-col-head"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen(value => !value)}
        >
          {column.heading}
          <ChevronDown size={15} strokeWidth={1.75} className="ft-col-chev" aria-hidden="true" />
        </button>
        <svg className="ft-swoosh" viewBox="0 0 120 10" aria-hidden="true">
          <path d="M2 8 C 34 2 72 2 118 5" />
        </svg>
      </h2>
      <div id={bodyId} className="ft-col-body">
        <div className="ft-col-body-in">
          <nav className="ft-col-links" aria-label={`Footer — ${column.heading}`}>
            {column.links.map(link => (
              <FooterLink key={link.href} {...link} />
            ))}
          </nav>
          {column.id === 'references' ? <LifecycleMini /> : null}
        </div>
      </div>
    </div>
  );
}
