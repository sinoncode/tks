import type { LucideIcon } from 'lucide-react';

type SocialButtonProps = { network: string; href: string; icon: LucideIcon };

/** Circular social link with an orbiting dashed ring and a name tooltip on hover. */
export function SocialButton({ network, href, icon: Icon }: SocialButtonProps) {
  return (
    <a
      className="ft-social-btn"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${network} (opens in a new tab)`}
    >
      <span className="ft-social-ring" aria-hidden="true" />
      <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
      <span className="ft-social-tip" role="tooltip">
        {network}
      </span>
    </a>
  );
}
