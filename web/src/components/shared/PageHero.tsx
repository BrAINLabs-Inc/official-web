import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface HeroStat {
  value: ReactNode;
  label: string;
}

interface PageHeroProps {
  icon: ReactNode;
  eyebrow: string;
  /** Main title; `highlight` is rendered after it in a softer tone. */
  title: string;
  highlight?: string;
  description: string;
  stats?: HeroStat[];
  /** Extra content under the description (e.g. a search form). */
  children?: ReactNode;
}

/** Page header shared by all top-level pages. */
export const PageHero = ({
  icon,
  eyebrow,
  title,
  highlight,
  description,
  stats,
  children,
}: PageHeroProps) => (
  <section className="relative overflow-hidden">
    <div className="from-primary/6 pointer-events-none absolute inset-0 bg-gradient-to-br via-background to-background" />

    <div className="container relative mx-auto px-4 pb-16 pt-16 md:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex max-w-3xl flex-col items-start text-left"
      >
        <div className="bg-primary/8 mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-primary">
          {icon}
          {eyebrow}
        </div>

        <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
          {title}
          {highlight && (
            <>
              {' '}
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                {highlight}
              </span>
            </>
          )}
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>

        {children}

        {stats && stats.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  </section>
);
