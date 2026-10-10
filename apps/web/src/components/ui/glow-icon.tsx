import type { LucideIcon } from 'lucide-react';
export function GlowIcon({ icon: Icon, size = 22 }: { icon: LucideIcon; size?: number }) { return <span className="glow-icon"><Icon size={size} strokeWidth={1.75} aria-hidden="true" /></span>; }
