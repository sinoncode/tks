import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Logo } from '@/components/logo';
import { TKButton } from '@/components/ui/tk-button';
import { GlowIcon } from '@/components/ui/glow-icon';
import { navigation } from '@/data/nav';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { useEnquiryModal } from '@/components/enquiry/provider';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mega, setMega] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const header = useRef<HTMLElement>(null);
  const intent = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastY = useRef(0);
  const location = useLocation();
  const { open } = useEnquiryModal();
  const closeMega = () => { if (intent.current) clearTimeout(intent.current); setMega(false); };
  useEffect(() => { closeMega(); setDrawer(false); setExpanded(false); }, [location.pathname]);
  useEffect(() => {
    let ticking = false;
    const update = () => { const y = window.scrollY; setScrolled(y > 24); setHidden(y > 140 && y > lastY.current + 3 && !mega && !drawer); if (y < lastY.current - 3) setHidden(false); lastY.current = y; const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? y / max * 100 : 0); ticking = false; };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    window.addEventListener('scroll', onScroll, { passive: true }); update(); return () => window.removeEventListener('scroll', onScroll);
  }, [mega, drawer]);
  useEffect(() => { if (!drawer) return; const old = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = old; }; }, [drawer]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { closeMega(); setDrawer(false); } };
    const outside = (e: PointerEvent) => { if (header.current && !header.current.contains(e.target as Node)) closeMega(); };
    document.addEventListener('keydown', onKey); document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', outside); if (intent.current) clearTimeout(intent.current); };
  }, []);
  const openIntent = () => { if (intent.current) clearTimeout(intent.current); intent.current = setTimeout(() => setMega(true), 120); };
  const cancelIntent = () => { if (intent.current) clearTimeout(intent.current); intent.current = setTimeout(() => setMega(false), 120); };
  const navigateCards = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const cards = Array.from(e.currentTarget.querySelectorAll<HTMLAnchorElement>('.service-menu-card'));
    const index = cards.indexOf(document.activeElement as HTMLAnchorElement);
    if (index < 0) return;
    const step: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 3, ArrowUp: -3 };
    if (e.key in step) { e.preventDefault(); cards[(index + step[e.key] + cards.length) % cards.length]?.focus(); }
  };
  return <header ref={header} className={`site-header ${scrolled ? 'is-compact' : ''} ${hidden && !mega && !drawer ? 'is-hidden' : ''}`} onMouseLeave={cancelIntent}>
    <div className="header-bar shell">
      <Logo height={90} />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map(item => item.label === 'Services' ? <div key={item.href} className="nav-services" onMouseEnter={openIntent} onFocus={openIntent}>
          <NavLink to={item.href} aria-haspopup="true" aria-expanded={mega} onClick={e => { if (window.matchMedia('(pointer: coarse)').matches && !mega) { e.preventDefault(); setMega(true); } }} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><span>{item.label}</span><ChevronDown size={13} className={mega ? 'chevron-open' : ''} />{location.pathname.startsWith('/services') && <motion.span layoutId="nav-underline" className="nav-underline" />}</NavLink>
        </div> : <NavLink key={item.href} to={item.href} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><span>{item.label}</span>{location.pathname === item.href && <motion.span layoutId="nav-underline" className="nav-underline" />}</NavLink>)}
      </nav>
      <div className="header-action"><TKButton size="sm" onClick={() => open({ source: 'header' })}>Discuss Your Project</TKButton></div>
      <button type="button" className={`menu-toggle ${drawer ? 'is-open' : ''}`} aria-label={drawer ? 'Close menu' : 'Open menu'} aria-expanded={drawer} onClick={() => { setDrawer(v => !v); closeMega(); }}><span className="menu-toggle-lines"><i /><i /><i /></span><span className="sr-only">Menu</span></button>
    </div>
    <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
    <AnimatePresence>{mega && <motion.div className="mega-menu" initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)', filter: 'blur(12px)' }} animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)', filter: 'blur(0px)' }} exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)', filter: 'blur(8px)' }} transition={{ duration: .24, ease: 'easeOut' }} onMouseEnter={() => { if (intent.current) clearTimeout(intent.current); }}>
      <div className="mega-inner shell">
        <div className="mega-intro"><span className="eyebrow">THE CONNECTED NETWORK</span><h2>Our Services<span className="period">.</span></h2><p>Six disciplines. One accountable program.</p><div className="lifecycle" aria-label={site.tagline}>{site.lifecycle.map((stage, i) => <div key={stage} className="lifecycle-step"><span className="lifecycle-index">0{i + 1}</span><span>{stage}</span></div>)}<span className="lifecycle-pulse" aria-hidden="true" /></div><Link className="mega-text-link" to="/services">View all services <ArrowRight size={16} /></Link></div>
        <div className="mega-cards" onKeyDown={navigateCards}>{services.map((service, i) => <motion.div key={service.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .04 + i * .045 }}><Link to={`/services/${service.slug}`} className="service-menu-card"><div className="service-menu-top"><GlowIcon icon={service.icon} /><ArrowRight size={17} className="service-arrow" /></div><h3>{service.title}</h3><p>{service.description}</p><div className="service-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></Link></motion.div>)}</div>
        <div className="mega-bottom"><span><span className="live-dot" /> Planning a network build?</span><button type="button" className="mega-bottom-cta" onClick={() => open({ source: 'megamenu' })}>Talk to an Expert <ArrowRight size={17} /></button></div>
      </div>
    </motion.div>}</AnimatePresence>
    <AnimatePresence>{drawer && <motion.div className="mobile-drawer" initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} transition={{ duration: .28, ease: [0.22, 1, 0.36, 1] }}>
      <nav aria-label="Mobile navigation"><Logo height={40} /><span className="eyebrow">EXPLORE / TECHNOKRAFT</span>{navigation.map(item => item.label === 'Services' ? <div className="mobile-service-group" key={item.href}><button className="mobile-nav-link" type="button" aria-expanded={expanded} onClick={() => setExpanded(v => !v)}>Services <ChevronDown className={expanded ? 'chevron-open' : ''} size={20} /></button><AnimatePresence>{expanded && <motion.div className="mobile-services" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}><Link to="/services" className="mobile-service-all">View all services <ArrowRight size={16} /></Link>{services.map(s => <Link to={`/services/${s.slug}`} key={s.slug} className="mobile-service-card"><s.icon size={19} strokeWidth={1.75} /><span>{s.title}</span><ArrowRight size={15} /></Link>)}</motion.div>}</AnimatePresence></div> : <NavLink to={item.href} key={item.href} className="mobile-nav-link">{item.label}<ArrowRight size={20} /></NavLink>)}<TKButton size="lg" className="drawer-cta" onClick={() => open({ source: 'header-drawer' })}>Discuss Your Project</TKButton></nav><div className="mobile-drawer-foot">{site.tagline}</div>
    </motion.div>}</AnimatePresence>
  </header>;
}
