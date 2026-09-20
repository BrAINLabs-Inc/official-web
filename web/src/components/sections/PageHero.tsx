import { Fragment, type ReactNode } from 'react';
import { Section } from './Section';

interface HeroStat {
  value: ReactNode;
  label: string;
  accent?: boolean;
}

interface PageHeroProps {
  eyebrow: string;
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  stats?: HeroStat[];
  graphic?: ReactNode;
  graphicPosition?: 'top' | 'bottom';
  actions?: ReactNode;
}

export const PageHero = ({
  eyebrow,
  icon,
  title,
  description,
  stats,
  graphic,
  graphicPosition = 'bottom',
  actions,
}: PageHeroProps) => (
  <Section topBorder={false} corners className="pb-14 pt-12 md:pb-14 md:pt-20">
    <div className="inline-flex items-center gap-2 border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
      {icon}
      <span>{eyebrow}</span>
    </div>

    {graphic && graphicPosition === 'top' && <div className="mt-8">{graphic}</div>}

    <h1 className="font-display mt-6 max-w-[880px] text-[clamp(2.4rem,5.2vw,4.1rem)] font-extrabold leading-[1.05] tracking-[-0.01em] text-neutral-900 dark:text-white">
      {title}
    </h1>

    <p className="mt-6 max-w-[62ch] text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
      {description}
    </p>

    {actions && <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>}

    {stats && stats.length > 0 && (
      <div className="mt-8 flex flex-wrap items-center gap-8 border-t border-neutral-200 pt-6 dark:border-neutral-800">
        {stats.map((stat, idx) => (
          <Fragment key={idx}>
            {idx > 0 && <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800" />}
            <div className="flex items-baseline gap-3">
              <span
                className={`text-3xl font-extrabold ${
                  stat.accent
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-neutral-900 dark:text-white'
                }`}
              >
                {stat.value}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {stat.label}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
    )}

    {graphic && graphicPosition === 'bottom' && <div className="mt-12">{graphic}</div>}
  </Section>
);
