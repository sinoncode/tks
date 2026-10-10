import { useState } from 'react';
import { Link } from 'react-router';

type LogoProps = { height?: number; className?: string; link?: boolean };
export function Logo({ height = 48, className = '', link = true }: LogoProps) {
  const [source, setSource] = useState('/logo.png');
  const [failed, setFailed] = useState(false);
  const inner = failed ? (
    <span className="logo-wordmark">TechnoKraft</span>
  ) : (
    <img
      src={source}
      alt="TechnoKraft"
      style={{ height }}
      onError={() => (source === '/logo.png' ? setSource('/logo.svg') : setFailed(true))}
    />
  );
  const plate = <span className={`logo-mark ${className}`}>{inner}</span>;
  return link ? (
    <Link to="/" aria-label="TechnoKraft home" className="brand-logo">{plate}</Link>
  ) : (
    <span className="brand-logo">{plate}</span>
  );
}
