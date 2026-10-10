import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';

type Props = { children: ReactNode; href?: string; variant?: 'primary' | 'ghost' | 'outline'; size?: 'sm' | 'md' | 'lg'; className?: string; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean };
export function TKButton({ children, href, variant = 'primary', size = 'md', className = '', onClick, type = 'button', disabled = false }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [pull, setPull] = useState({ x: 0, y: 0 });
  const move = (event: MouseEvent<HTMLElement>) => {
    if (variant !== 'primary' || !window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setPull({ x: Math.max(-6, Math.min(6, (event.clientX - rect.left - rect.width / 2) * .11)), y: Math.max(-6, Math.min(6, (event.clientY - rect.top - rect.height / 2) * .11)) });
  };
  const props = { className: `tk-button tk-button--${variant} tk-button--${size} ${className}`, onMouseMove: move, onMouseLeave: () => setPull({ x: 0, y: 0 }), style: { '--pull-x': `${pull.x}px`, '--pull-y': `${pull.y}px` } as React.CSSProperties, onClick, disabled, 'aria-busy': disabled || undefined };
  const content = <><span className="tk-button__shine" aria-hidden="true" /><span className="tk-button__label">{children}</span><ArrowUpRight size={17} strokeWidth={1.75} className="tk-button__arrow" aria-hidden="true" /></>;
  if (href) return <Link to={href} {...props} onClick={onClick}>{content}</Link>;
  return <button ref={ref as React.Ref<HTMLButtonElement>} type={type} {...props} onClick={onClick}>{content}</button>;
}
