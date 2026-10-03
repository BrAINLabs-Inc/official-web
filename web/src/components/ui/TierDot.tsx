import type { BadgeLevel } from '@/data/badges';
import { cn } from '@/lib/utils';

// Same hues as the generated badge cards (badges/render.ts).
const LEVEL_CLASS: Record<BadgeLevel, string> = {
  gold: 'bg-gradient-to-br from-[#F7DC8A] to-[#B7862C]',
  silver: 'bg-gradient-to-br from-[#F1F3F6] to-[#8E96A3]',
  bronze: 'bg-gradient-to-br from-[#F0B98A] to-[#9A5B2E]',
  standard: 'bg-gradient-to-br from-[#52525B] to-[#18181B]',
};

/** Small metal-coloured dot for a badge level. */
export const TierDot = ({ level, className }: { level: BadgeLevel; className?: string }) => (
  <span
    aria-hidden
    className={cn('inline-block h-2 w-2 shrink-0 rounded-full', LEVEL_CLASS[level], className)}
  />
);
