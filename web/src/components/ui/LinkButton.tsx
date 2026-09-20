import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'onDark' | 'onDarkOutline';

interface LinkButtonProps {
  to?: string;
  href?: string;
  variant?: Variant;
  icon?: ReactNode;
  full?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const base =
  'inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors disabled:cursor-not-allowed disabled:opacity-60';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
  outline:
    'border border-neutral-300 text-neutral-900 hover:border-indigo-600 hover:text-indigo-600 dark:border-neutral-700 dark:text-white dark:hover:border-indigo-400 dark:hover:text-indigo-400',
  onDark: 'bg-white text-black hover:bg-neutral-200',
  onDarkOutline: 'border border-white/25 text-white hover:border-white/60',
};

export const LinkButton = ({
  to,
  href,
  variant = 'primary',
  icon,
  full,
  className = '',
  children,
  ...rest
}: LinkButtonProps) => {
  const cls = cn(base, variantClasses[variant], full && 'w-full', className);

  if (to) {
    return (
      <Link to={to} className={cls}>
        <span>{children}</span>
        {icon}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        <span>{children}</span>
        {icon}
      </a>
    );
  }

  return (
    <button className={cls} {...rest}>
      <span>{children}</span>
      {icon}
    </button>
  );
};
