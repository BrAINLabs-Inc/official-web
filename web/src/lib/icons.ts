import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap = Icons as unknown as Record<string, LucideIcon>;

export const getLucideIcon = (name: string, fallback: LucideIcon): LucideIcon =>
  iconMap[name] || fallback;
