import { WifiOff } from 'lucide-react';
import { Logo } from '@/components/logo';
import { TKButton } from '@/components/ui/tk-button';
export function NotFoundPage() { return <main id="main-content" className="not-found shell"><Logo height={48} link={false} /><div className="not-found-code">404 <span> / CONNECTION ERROR</span></div><WifiOff size={62} strokeWidth={1} className="not-found-icon" /><h1>Signal <span className="gradient-text">lost.</span></h1><p>Looks like this frequency is out of range. Let’s get you back on the network.</p><TKButton href="/" size="lg">Return home</TKButton></main>; }
