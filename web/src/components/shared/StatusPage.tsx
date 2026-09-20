import type { ReactNode } from 'react';
import { Section } from '@/components/sections/Section';
import { IconBox } from '@/components/ui/IconBox';
import type { Accent } from '@/lib/accents';
import { SEO } from './SEO';

interface StatusPageProps {
  seoTitle: string;
  seoDescription: string;
  icon: ReactNode;
  accent?: Accent;
  eyebrow: string;
  title: ReactNode;
  description: string;
  actions: ReactNode;
}

export const StatusPage = ({
  seoTitle,
  seoDescription,
  icon,
  accent = 'indigo',
  eyebrow,
  title,
  description,
  actions,
}: StatusPageProps) => (
  <div className="bg-transparent">
    <SEO title={seoTitle} description={seoDescription} />
    <Section topBorder={false} corners className="py-24 text-center md:py-32">
      <div className="mx-auto flex max-w-lg flex-col items-center">
        <IconBox icon={icon} accent={accent} size="lg" />
        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
          {eyebrow}
        </p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>
      </div>
    </Section>
  </div>
);
