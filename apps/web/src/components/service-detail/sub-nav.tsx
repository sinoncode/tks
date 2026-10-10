import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#deliverables', label: 'What we deliver' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#technologies', label: 'Technologies' },
  { href: '#related', label: 'Related services' },
];

/** Sticky in-page sub navigation for a service detail page. */
export function ServiceSubNav({ title }: { title: string }) {
  const [active, setActive] = useState(LINKS[0].href);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    for (const link of LINKS) {
      const el = document.getElementById(link.href.slice(1));
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="service-subnav" aria-label={`${title} sections`}>
      <div className="shell service-subnav-bar">
        <span className="service-subnav-title">{title}</span>
        <ul>
          {LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? 'true' : undefined}
                className={active === link.href ? 'is-active' : ''}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
