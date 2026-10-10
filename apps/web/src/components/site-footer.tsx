import { Suspense, lazy, useContext } from 'react';
import { EnquiryContext } from '@/components/enquiry/context';
import { BackToTop } from '@/components/footer/back-to-top';
import { BrandBlock } from '@/components/footer/brand-block';
import { FooterCTA } from '@/components/footer/footer-cta';
import { FooterColumn } from '@/components/footer/footer-column';
import { FooterLink } from '@/components/footer/footer-link';
import { TaglineMarquee } from '@/components/footer/tagline-marquee';
import { useInView } from '@/components/footer/use-in-view';
import { footerColumns, footerLegal } from '@/data/footer';

/** The heavy background layer is lazy-loaded so it never blocks first paint. */
const FooterBackground = lazy(() =>
  import('@/components/footer/footer-background').then(module => ({
    default: module.FooterBackground,
  })),
);

/** Animated dynamic footer: layered background, CTA band, link grid, tagline marquee, bottom bar. */
export function SiteFooter() {
  const enquiry = useContext(EnquiryContext);
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.06 });

  return (
    <footer className={`site-footer ft${inView ? ' is-in' : ''}`} ref={ref}>
      <Suspense fallback={null}>
        <FooterBackground />
      </Suspense>
      <div className="ft-shell">
        <FooterCTA onEnquiry={enquiry ? () => enquiry.open({ source: 'footer-cta' }) : undefined} />
        <div className="ft-grid">
          <BrandBlock />
          {footerColumns.map((column, index) => (
            <FooterColumn key={column.id} column={column} index={index + 1} />
          ))}
        </div>
        <TaglineMarquee />
        <div className="ft-bottom">
          <span className="ft-bottom-copy">
            © {new Date().getUTCFullYear()} TechnoKraft. All rights reserved.
          </span>
          <nav className="ft-legal" aria-label="Footer — legal">
            {footerLegal.map(link => (
              <FooterLink key={link.href} {...link} className="ft-link--sm" />
            ))}
          </nav>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
