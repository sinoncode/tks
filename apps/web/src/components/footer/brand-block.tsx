import { useState, type CSSProperties, type MouseEvent } from 'react';
import { Check, Copy, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router';
import { SocialButton } from '@/components/footer/social-button';
import { Strapline } from '@/components/strapline';
import { footerBrand, footerSocials } from '@/data/footer';
import { site } from '@/data/site';

type ContactRowProps = { icon: LucideIcon; label: string; href?: string; copyValue?: string };

/** One contact row — icon circle fills orange on hover, text slides right. */
function ContactRow({ icon: Icon, label, href, copyValue }: ContactRowProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!copyValue || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — the tooltip simply stays hidden */
    }
  };

  return (
    <div className="ft-row">
      <span className="ft-row-ic" aria-hidden="true">
        <Icon size={15} strokeWidth={1.75} />
      </span>
      {href ? (
        <a className="ft-row-text" href={href}>
          {label}
        </a>
      ) : (
        <span className="ft-row-text">{label}</span>
      )}
      {copyValue ? (
        <button
          type="button"
          className={`ft-copy${copied ? ' is-copied' : ''}`}
          onClick={copy}
          aria-label={`Copy ${label}`}
        >
          {copied ? <Check size={12} strokeWidth={2} /> : <Copy size={12} strokeWidth={1.75} />}
          <span className="ft-copy-tip" role="tooltip">
            {copied ? 'Copied' : 'Copy'}
          </span>
          <span className="visually-hidden" aria-live="polite">
            {copied ? 'Copied' : ''}
          </span>
        </button>
      ) : null}
    </div>
  );
}

/** Brand logo on its pearl plate — lifts, tilts toward the pointer and glows on hover. */
function LogoPlate() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [failed, setFailed] = useState(false);

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 10, y: -(py * 10) }); // up to 5deg
  };

  return (
    <Link
      to="/"
      className="ft-logo"
      aria-label="TechnoKraft home"
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <span
        className="ft-logo-plate"
        style={{ '--rx': `${tilt.x}deg`, '--ry': `${tilt.y}deg` } as CSSProperties}
      >
        {failed ? (
          <span className="ft-logo-word">TechnoKraft</span>
        ) : (
          <img src="/logo.png" alt="" onError={() => setFailed(true)} />
        )}
      </span>
    </Link>
  );
}

/** Brand column: logo plate, strapline, intro line, contact rows and social buttons. */
export function BrandBlock() {
  return (
    <div className="ft-brand" style={{ '--d': '0ms' } as CSSProperties}>
      <LogoPlate />
      <Strapline />
      <p className="ft-brand-intro">{footerBrand.intro}</p>
      <div className="ft-rows">
        <ContactRow
          icon={Mail}
          label={site.contact.email}
          href={`mailto:${site.contact.email}`}
          copyValue={site.contact.email}
        />
        {site.contact.phones.map(phone => (
          <ContactRow
            key={phone}
            icon={Phone}
            label={phone}
            href={`tel:${phone.replace(/[^+\d]/g, '')}`}
            copyValue={phone}
          />
        ))}
        <ContactRow icon={MapPin} label={site.contact.address} />
      </div>
      {footerSocials.length > 0 ? (
        <div className="ft-social">
          {footerSocials.map(social => (
            <SocialButton key={social.network} {...social} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
