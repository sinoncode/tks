export function SectionHeader({ eyebrow, title, text, className = '' }: { eyebrow: string; title: string; text?: string; className?: string }) {
  return (
    <div className={`section-header ${className}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="gradient-text">{title}</h2>
      <svg className="title-swoosh" viewBox="0 0 220 18" aria-hidden="true" focusable="false">
        <path className="title-swoosh-path" d="M4 14 C 48 14, 78 3, 118 8 S 176 2, 206 6" />
        <circle className="title-swoosh-orb" cx="210" cy="5.2" r="3.2" />
      </svg>
      {text && <p>{text}</p>}
    </div>
  );
}
