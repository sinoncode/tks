import { Reveal } from '@/components/ui/reveal';
import { TKButton } from '@/components/ui/tk-button';
import { useEnquiryModal } from '@/components/enquiry/provider';

/**
 * About hero over animated topographic contour lines with expanding signal
 * rings radiating from the peak — pure SVG + CSS keyframes.
 */
export function AboutHero() {
  const { open } = useEnquiryModal();
  return (
    <section className="about-hero globe-watermark" id="about-hero">
      <div className="topo-field" aria-hidden="true">
        <svg className="topo-svg" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" focusable="false">
          <title>Topographic contour lines</title>
          <path className="topo-line" d="M600 60 C780 70 950 170 930 300 C910 430 760 500 600 480 C440 500 260 430 250 300 C240 170 420 70 600 60 Z" />
          <path className="topo-line" d="M600 110 C740 118 880 200 865 300 C850 400 730 455 600 438 C470 455 340 400 330 300 C320 200 460 118 600 110 Z" />
          <path className="topo-line" d="M600 160 C700 166 800 230 790 305 C780 375 690 415 600 400 C510 415 420 375 410 305 C400 230 500 166 600 160 Z" />
          <path className="topo-line" d="M600 210 C665 214 725 258 718 308 C711 352 655 380 600 368 C545 380 489 352 482 308 C475 258 535 214 600 210 Z" />
          <path className="topo-line topo-line--peak" d="M600 255 C630 257 655 280 652 306 C649 330 628 344 600 338 C572 344 551 330 548 306 C545 280 570 257 600 255 Z" />
          <path className="topo-line topo-line--dim" d="M-20 470 C160 430 320 500 480 460 C640 420 800 495 960 455 C1080 425 1160 470 1220 450" />
          <path className="topo-line topo-line--dim" d="M-20 510 C180 480 340 540 520 505 C700 470 860 535 1020 500 C1120 478 1180 505 1220 492" />
        </svg>
        <div className="topo-rings">
          <i /><i /><i /><i />
        </div>
      </div>
      <div className="shell about-hero-shell">
        <Reveal className="about-hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="live-dot" />ABOUT TECHNOKRAFT</div>
          <h1>Engineering Networks<br /><span className="gradient-text">From the Ground Up</span><span className="period">.</span></h1>
          <p>
            TechnoKraft is a telecommunications infrastructure company with an engineering-led
            delivery model, providing end-to-end services from field survey and engineering design
            through construction, integration, commissioning and optimisation.
          </p>
          <div className="hero-actions">
            <TKButton size="lg" onClick={() => open({ source: 'about-hero' })}>Discuss Your Project</TKButton>
            <TKButton href="/services" variant="outline" size="lg">Explore our services</TKButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
