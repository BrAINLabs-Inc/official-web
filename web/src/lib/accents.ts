export type Accent = 'indigo' | 'cyan' | 'violet' | 'amber' | 'rose' | 'emerald';

export const accentOrder: Accent[] = ['indigo', 'cyan', 'violet', 'amber', 'rose', 'emerald'];

export const accentBoxClasses: Record<Accent, string> = {
  indigo:
    'border-indigo-200/80 bg-indigo-100/70 text-indigo-600 dark:border-indigo-900/60 dark:bg-indigo-950/70 dark:text-indigo-400',
  cyan: 'border-cyan-200/80 bg-cyan-100/70 text-cyan-600 dark:border-cyan-900/60 dark:bg-cyan-950/70 dark:text-cyan-400',
  violet:
    'border-violet-200/80 bg-violet-100/70 text-violet-600 dark:border-violet-900/60 dark:bg-violet-950/70 dark:text-violet-400',
  amber:
    'border-amber-200/80 bg-amber-100/70 text-amber-600 dark:border-amber-900/60 dark:bg-amber-950/70 dark:text-amber-400',
  rose: 'border-rose-200/80 bg-rose-100/70 text-rose-600 dark:border-rose-900/60 dark:bg-rose-950/70 dark:text-rose-400',
  emerald:
    'border-emerald-200/80 bg-emerald-100/70 text-emerald-600 dark:border-emerald-900/60 dark:bg-emerald-950/70 dark:text-emerald-400',
};

export const accentHoverText: Record<Accent, string> = {
  indigo: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
  cyan: 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400',
  violet: 'group-hover:text-violet-600 dark:group-hover:text-violet-400',
  amber: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
  rose: 'group-hover:text-rose-600 dark:group-hover:text-rose-400',
  emerald: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
};
