import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { accentBoxClasses, type Accent } from '@/lib/accents';

const sizeClasses = { sm: 'h-9 w-9', md: 'h-10 w-10', lg: 'h-12 w-12' };

interface IconBoxProps {
  icon: ReactNode;
  accent?: Accent;
  size?: keyof typeof sizeClasses;
  className?: string;
}

export const IconBox = ({ icon, accent = 'indigo', size = 'md', className = '' }: IconBoxProps) => (
  <span
    className={cn(
      'inline-flex items-center justify-center rounded-lg border transition-transform group-hover:scale-105',
      sizeClasses[size],
      accentBoxClasses[accent],
      className
    )}
  >
    {icon}
  </span>
);
