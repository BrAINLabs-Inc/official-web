import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MatrixGridProps {
  cols?: 2 | 3 | 4;
  className?: string;
  children: ReactNode;
}

const colsClass: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
};

export const MatrixGrid = ({ cols = 3, className = '', children }: MatrixGridProps) => (
  <div
    className={cn(
      'grid grid-cols-1 border-l border-t border-neutral-200 dark:border-neutral-800',
      colsClass[cols],
      className
    )}
  >
    {children}
  </div>
);

interface MatrixCardProps {
  className?: string;
  hover?: boolean;
  children: ReactNode;
}

export const MatrixCard = ({ className = '', hover = true, children }: MatrixCardProps) => (
  <div
    className={cn(
      'group flex flex-col border-b border-r border-neutral-200 bg-slate-50/70 p-8 transition-colors dark:border-neutral-800 dark:bg-neutral-900/50',
      hover && 'hover:bg-indigo-50/30 dark:hover:bg-indigo-950/30',
      className
    )}
  >
    {children}
  </div>
);
