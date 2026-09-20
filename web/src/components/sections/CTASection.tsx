import type { ReactNode } from 'react';
import { Section } from './Section';
import { LinkButton } from '@/components/ui/LinkButton';

interface CTAAction {
  label: string;
  to?: string;
  href?: string;
  icon?: ReactNode;
  variant?: 'onDark' | 'onDarkOutline';
}

interface CTASectionProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions: CTAAction[];
  compact?: boolean;
}

export const CTASection = ({ eyebrow, title, description, actions, compact }: CTASectionProps) => (
  <Section
    tone="black"
    topBorder={false}
    className={`text-center ${compact ? 'py-20' : 'py-24 md:py-32'}`}
  >
    {eyebrow && (
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-400">
        {eyebrow}
      </p>
    )}
    <h2
      className={`font-display mx-auto max-w-[20ch] font-bold leading-[1.1] text-white ${
        compact ? 'text-[clamp(2rem,4vw,3.2rem)]' : 'text-[clamp(2.1rem,4.5vw,3.6rem)]'
      }`}
    >
      {title}
    </h2>
    {description && (
      <p className="mx-auto mt-5 max-w-[54ch] text-[15px] leading-relaxed text-neutral-400">
        {description}
      </p>
    )}
    <div className="mt-10 flex flex-wrap justify-center gap-3">
      {actions.map((action, idx) => (
        <LinkButton
          key={idx}
          to={action.to}
          href={action.href}
          variant={action.variant ?? (idx === 0 ? 'onDark' : 'onDarkOutline')}
          icon={action.icon}
        >
          {action.label}
        </LinkButton>
      ))}
    </div>
  </Section>
);
