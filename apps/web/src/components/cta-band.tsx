import { TKButton } from '@/components/ui/tk-button';
import { Reveal } from '@/components/ui/reveal';
import { useEnquiryModal } from '@/components/enquiry/provider';

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  text: string;
  primaryLabel?: string;
  /** Service slug prefilled into the enquiry modal. */
  service?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

/** Shared holographic CTA banner — reused by every non-home page. */
export function CtaBand({
  eyebrow = 'START THE PROGRAM',
  title,
  text,
  primaryLabel = 'Discuss Your Project',
  service,
  secondaryLabel = 'Explore our services',
  secondaryHref = '/services',
}: CtaBandProps) {
  const { open } = useEnquiryModal();
  return (
    <section className="page-section page-section--cta">
      <div className="shell">
        <Reveal>
          <div className="cta-banner">
            <div className="cta-beams" aria-hidden="true">
              <i className="cta-beam cta-beam--a" />
              <i className="cta-beam cta-beam--b" />
            </div>
            <div className="cta-waves" aria-hidden="true">
              {Array.from({ length: 28 }, (_, i) => (
                <i key={i} style={{ animationDelay: `${(i % 7) * 0.12}s` }} />
              ))}
            </div>
            <div className="cta-content">
              <span className="eyebrow">{eyebrow}</span>
              <h2>{title}</h2>
              <p>{text}</p>
              <div className="cta-actions">
                <TKButton size="lg" onClick={() => open({ source: 'cta-band', service })}>{primaryLabel}</TKButton>
                <TKButton href={secondaryHref} variant="ghost" size="lg">{secondaryLabel}</TKButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
