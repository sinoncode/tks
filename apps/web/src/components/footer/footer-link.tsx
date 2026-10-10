import { ChevronRight, ExternalLink, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router';

type FooterLinkProps = {
  href: string;
  label: string;
  external?: boolean;
  icon?: LucideIcon;
  className?: string;
};

/** Footer text link — orange dot, swoosh underline, slide + chevron on hover. */
export function FooterLink({ href, label, external, icon: Icon, className = '' }: FooterLinkProps) {
  if (external) {
    return (
      <a className={`ft-link ft-link--ext ${className}`} href={href} target="_blank" rel="noopener noreferrer">
        <span>{label}</span>
        <ExternalLink size={12} strokeWidth={1.75} className="ft-link-ext" aria-hidden="true" />
      </a>
    );
  }
  return (
    <Link className={`ft-link ${className}`} to={href}>
      {Icon ? (
        <span className="ft-link-ic" aria-hidden="true">
          <Icon size={13} strokeWidth={1.75} />
        </span>
      ) : null}
      <span>{label}</span>
      <ChevronRight size={13} strokeWidth={1.75} className="ft-link-chev" aria-hidden="true" />
    </Link>
  );
}
