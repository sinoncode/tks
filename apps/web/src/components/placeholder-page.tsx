import { ArrowDownRight, Radio } from 'lucide-react';
import { Link } from 'react-router';
import { Reveal } from '@/components/ui/reveal';
import { TKButton } from '@/components/ui/tk-button';
import { useEnquiryModal } from '@/components/enquiry/provider';
import { site } from '@/data/site';

export function PlaceholderPage({ title, index, home = false, watermark = false }: { title: string; index: string; home?: boolean; watermark?: boolean }) {
  const { open } = useEnquiryModal();
  return <main id="main-content" className={`placeholder-main${watermark ? ' globe-watermark' : ''}`}><div className="shell placeholder-shell"><Reveal className="placeholder-copy"><div className="eyebrow"><span className="live-dot" /> {home ? 'TELECOMMUNICATIONS INFRASTRUCTURE' : `TECHNOKRAFT / ${index}`}</div><h1>{home ? <>ENGINEERING<br /><span className="gradient-text">THE CONNECTED</span><br />FUTURE<span className="period">.</span></> : <>{title.toUpperCase()}<span className="period">.</span></>}</h1><p>{home ? site.positioning : 'The next chapter of connected infrastructure is taking shape. Explore our capabilities or start a conversation with our team.'}</p><div className="placeholder-actions"><TKButton size="lg" onClick={() => open({ source: 'placeholder' })}>Discuss Your Project</TKButton>{home && <TKButton href="/services" variant="outline" size="lg">Explore our services</TKButton>}</div></Reveal><div className="placeholder-side" aria-hidden="true"><div className="orbital-ring orbital-ring-one" /><div className="orbital-ring orbital-ring-two" /><div className="orbital-core"><Radio size={48} strokeWidth={1} /></div><div className="orbit-label orbit-label-top">SIGNAL / ACTIVE</div><div className="orbit-label orbit-label-bottom">TK—{index} / 2060</div></div><div className="placeholder-bottom"><span>01 / 05 <span className="muted">SURVEY → DESIGN → BUILD → INTEGRATE → OPTIMISE</span></span><Link to="/services">DISCOVER THE SYSTEM <ArrowDownRight size={17} /></Link></div></div></main>;
}
