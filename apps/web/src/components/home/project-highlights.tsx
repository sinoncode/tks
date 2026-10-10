import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { Reveal } from '@/components/ui/reveal';
import { useEnquiryModal } from '@/components/enquiry/provider';
import { ProjectDiagram } from '@/components/home/project-diagram';
import { projects } from '@/data/projects';

const SERVICE_BY_DIAGRAM: Record<string, string> = {
  wireless: 'network-deployment-rollout',
  fibre: 'fibre-construction',
  inbuilding: 'in-building-solutions-small-cells',
};

export function ProjectHighlights() {
  const { open } = useEnquiryModal();
  return (
    <section className="home-section" id="projects">
      <div className="shell">
        <Reveal>
          <SectionHeader
            eyebrow="PROJECT HIGHLIGHTS"
            title="Work that speaks in scope"
            text="Client names withheld by design — what matters here is the shape of the program, not the logo on it."
          />
        </Reveal>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.07} className="project-cell">
              <article className="project-card">
                <ProjectDiagram type={project.diagram} />
                <div className="service-tags">
                  {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <button type="button" className="bento-explore" onClick={() => open({ source: 'project-card', service: SERVICE_BY_DIAGRAM[project.diagram] })}>
                  Discuss a similar project
                  <ArrowRight size={15} />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
