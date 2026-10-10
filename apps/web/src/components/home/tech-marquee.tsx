import { Marquee } from '@/components/ui/marquee';
import { techChips } from '@/data/home';

export function TechMarquee() {
  return (
    <div className="tech-strip" aria-label="Technologies and standards we work with">
      <Marquee>
        {techChips.map(chip => (
          <span key={chip} className="tech-chip">
            <i />
            {chip}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
