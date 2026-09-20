import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TagProps {
  children: ReactNode;
  tone?: 'neutral' | 'indigo';
  className?: string;
}

export const Tag = ({ children, tone = 'neutral', className = '' }: TagProps) => (
  <span
    className={cn(
      'inline-block border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider',
      tone === 'indigo'
        ? 'border-indigo-100 bg-indigo-50 text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-300'
        : 'border-neutral-200 bg-neutral-100/60 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300',
      className
    )}
  >
    {children}
  </span>
);
