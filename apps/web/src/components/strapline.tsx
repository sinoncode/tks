/** Logo strapline — silver words, orange pipes. Not a replacement for the lifecycle tagline. */
export function Strapline({ className = '' }: { className?: string }) {
  return (
    <p className={`brand-strapline ${className}`}>
      <span>NETWORKING</span>
      <i aria-hidden="true" />
      <span>SOLUTIONS</span>
      <i aria-hidden="true" />
      <span>CONNECTIVITY</span>
    </p>
  );
}
