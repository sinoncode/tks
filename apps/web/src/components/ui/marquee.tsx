import type { ReactNode } from 'react';
export function Marquee({ children, className = '' }: { children: ReactNode; className?: string }) { return <div className={`marquee ${className}`}><div className="marquee__track"><span>{children}</span><span aria-hidden="true">{children}</span></div></div>; }
