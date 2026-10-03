import {
  Activity,
  Brain,
  Building2,
  Cpu,
  Globe,
  GraduationCap,
  Handshake,
  Lightbulb,
  Microscope,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

// Icons that data files refer to by name. Importing them explicitly (instead of
// `import * as Icons`) keeps the rest of lucide-react out of the bundle.
export const iconMap: Record<string, LucideIcon | undefined> = {
  Activity,
  Brain,
  Building2,
  Cpu,
  Globe,
  GraduationCap,
  Handshake,
  Lightbulb,
  Microscope,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
};
