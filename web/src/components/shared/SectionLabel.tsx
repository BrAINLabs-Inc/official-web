import type { LucideIcon } from 'lucide-react';

/** Small pill shown above a section heading. `inverted` is for dark (bg-foreground) sections. */
export const SectionLabel = ({
  icon: Icon,
  children,
  inverted = false,
}: {
  icon: LucideIcon;
  children: string;
  inverted?: boolean;
}) => (
  <div
    className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${
      inverted
        ? 'border-background/20 bg-background/10'
        : 'border-border bg-secondary text-foreground/80'
    }`}
  >
    <Icon size={13} />
    {children}
  </div>
);
