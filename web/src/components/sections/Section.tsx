import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'default' | 'sunken' | 'dark' | 'black';

const toneClasses: Record<Tone, string> = {
  default: 'bg-transparent',
  sunken: 'bg-transparent',
  dark: 'bg-neutral-950 text-white',
  black: 'bg-black text-white',
};

interface SectionProps {
  id?: string;
  tone?: Tone;
  topBorder?: boolean;
  corners?: boolean;
  className?: string;
  children: ReactNode;
}

export const Section = ({
  id,
  tone = 'default',
  topBorder = true,
  corners = false,
  className = '',
  children,
}: SectionProps) => {
  const isInverted = tone === 'dark' || tone === 'black';
  const borderColor = isInverted
    ? 'border-neutral-800'
    : 'border-neutral-300 dark:border-neutral-800';

  const innerBg =
    tone === 'dark'
      ? 'bg-neutral-950'
      : tone === 'black'
      ? 'bg-black'
      : tone === 'sunken'
      ? 'bg-neutral-50/70 dark:bg-neutral-900/50 backdrop-blur-md'
      : 'bg-white/85 dark:bg-neutral-950/85 backdrop-blur-md';

  return (
    <section
      id={id}
      className={`${toneClasses[tone]} ${topBorder ? `border-t border-dashed ${borderColor}` : ''}`}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <div
          className={cn(
            'relative border-x border-dashed px-6 py-16 sm:px-10 md:px-14 md:py-24',
            innerBg,
            borderColor,
            className
          )}
        >
          {corners && (
            <>
              <span className="frame-plus frame-plus--tl text-neutral-400 dark:text-neutral-600" />
              <span className="frame-plus frame-plus--tr text-neutral-400 dark:text-neutral-600" />
            </>
          )}
          {children}
        </div>
      </div>
    </section>
  );
};
