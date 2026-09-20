import type { ReactNode } from 'react';

interface SectionIntroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  accent?: boolean;
  center?: boolean;
  dark?: boolean;
  maxWidth?: string;
  className?: string;
}

export const SectionIntro = ({
  eyebrow,
  title,
  description,
  accent,
  center,
  dark,
  maxWidth = 'max-w-3xl',
  className = '',
}: SectionIntroProps) => (
  <div
    className={`${maxWidth} ${center ? 'mx-auto flex flex-col items-center text-center' : ''} ${className}`}
  >
    <p
      className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] ${
        accent
          ? dark
            ? 'text-indigo-400'
            : 'text-indigo-600 dark:text-indigo-400'
          : 'text-neutral-500'
      }`}
    >
      {eyebrow}
    </p>
    <h2
      className={`font-display text-[clamp(1.9rem,3.8vw,3rem)] font-bold leading-[1.15] ${
        dark ? 'text-white' : 'text-neutral-900 dark:text-white'
      }`}
    >
      {title}
    </h2>
    {description && (
      <p
        className={`mt-4 text-base leading-relaxed ${dark ? 'text-neutral-400' : 'text-neutral-600 dark:text-neutral-400'}`}
      >
        {description}
      </p>
    )}
  </div>
);
