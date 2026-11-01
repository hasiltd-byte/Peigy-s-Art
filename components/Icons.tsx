import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };
const base = { fill:"none", stroke:"currentColor", strokeWidth:1.7, strokeLinecap:"round" as const, strokeLinejoin:"round" as const };
export function ArrowLeft({size=20,...props}:IconProps){return <svg {...base} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><path d="M19 12H5m0 0 6-6m-6 6 6 6"/></svg>}
export function ArrowUpLeft({size=20,...props}:IconProps){return <svg {...base} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><path d="M17 17 7 7m0 0h10M7 7v10"/></svg>}
export function WhatsappIcon({size=21,...props}:IconProps){return <svg {...base} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><path d="M20.2 11.6A8.2 8.2 0 0 1 8 19.3L3 21l1.7-4.8A8.2 8.2 0 1 1 20.2 11.6Z"/><path d="M8 8.4c.1-.4.5-.5.8-.5.3 0 .6.1.7.4l.8 1.6c.1.2.1.4-.1.6l-.6.7c.8 1.6 1.8 2.5 3.4 3.2l.7-.7c.2-.2.4-.2.6-.1l1.5.7c.3.2.5.4.4.8-.1.7-.8 1.2-1.5 1.2-3.8-.1-7.2-3.4-7.4-7.1 0-.3.3-.6.7-.8Z"/></svg>}
export function Sparkle({size=22,...props}:IconProps){return <svg {...base} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z"/></svg>}
export function Pin({size=20,...props}:IconProps){return <svg {...base} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/></svg>}
export function Phone({size=20,...props}:IconProps){return <svg {...base} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><path d="M8.3 3.5 5.1 4.8C3.7 5.4 3.5 7 4 8.4c2 5.4 6.2 9.6 11.6 11.6 1.4.5 3 .3 3.6-1.1l1.3-3.2-4.7-2.5-2 2.4c-2.5-1.2-4.2-2.9-5.4-5.4l2.4-2-2.5-4.7Z"/></svg>}
export function ChevronDown({size=18,...props}:IconProps){return <svg {...base} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><path d="m6 9 6 6 6-6"/></svg>}
export function MenuIcon({size=24,...props}:IconProps){return <svg {...base} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><path d="M4 7h16M4 12h16M4 17h16"/></svg>}
export function CloseIcon({size=24,...props}:IconProps){return <svg {...base} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><path d="m6 6 12 12M6 18 18 6"/></svg>}
export function BagIcon({size=22,...props}:IconProps){return <svg {...base} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><path d="M5 7h14l1 14H4L5 7Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>}
export function PlusIcon({size=20,...props}:IconProps){return <svg {...base} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><path d="M12 5v14M5 12h14"/></svg>}
export function RotateIcon({size=22,...props}:IconProps){return <svg {...base} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}><path d="M20 7v5h-5M4 17v-5h5"/><path d="M6 7a7 7 0 0 1 12-1l2 3M4 15l2 3a7 7 0 0 0 12-1"/></svg>}
