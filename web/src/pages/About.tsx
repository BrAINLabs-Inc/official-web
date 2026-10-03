import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  Cpu,
  Handshake,
  HeartPulse,
  HelpCircle,
  Mail,
  Rocket,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { MissionCompassIcon } from '@/components/ui/PageIcons';
import { SEO } from '@/components/shared/SEO';
import { PageHero } from '@/components/shared/PageHero';
import { collaborations, faq, futureDirections, intro, mission } from '@/data/general';
import { statsData } from '@/data/grants';
import { iconMap } from '@/lib/icons';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
} as const;

const glance: { value: string | number; label: string; icon: LucideIcon }[] = [
  { value: statsData.researchers, label: 'Researchers', icon: Users },
  { value: statsData.projects, label: 'Active Projects', icon: Cpu },
  { value: statsData.publications, label: 'Publications', icon: BookOpen },
  { value: 2, label: 'Research Areas', icon: Brain },
];

const futureIcons: LucideIcon[] = [Brain, Activity, HeartPulse, Sparkles];

/** "Title: description" -> { title, description }; plain strings become a title only. */
const splitPoint = (point: string) => {
  const i = point.indexOf(':');
  return i === -1
    ? { title: point, description: '' }
    : { title: point.slice(0, i).trim(), description: point.slice(i + 1).trim() };
};

const SectionLabel = ({ icon: Icon, children }: { icon: LucideIcon; children: string }) => (
  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wide text-foreground/80">
    <Icon size={13} />
    {children}
  </div>
);

export const About = () => (
  <div className="min-h-screen">
    <SEO
      title="About BrAIN Labs"
      description="Learn about BrAIN Labs' mission to pioneer AI and neuroscience research, our collaborations, and future directions."
      keywords={['About BrAIN Labs', 'AI Mission', 'Neuroscience Research', 'AI Collaborations']}
    />

    <PageHero
      icon={<MissionCompassIcon size={14} />}
      eyebrow="About Us"
      title="Pioneering"
      highlight="AI Research"
      description="Exploring the intersection of artificial intelligence and neuroscience to build the next generation of intelligent systems."
    />

    {/* ── Who we are ───────────────────────────────────────── */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-12 lg:gap-14">
        <motion.div {...fadeUp} className="lg:col-span-7">
          <SectionLabel icon={Sparkles}>Who We Are</SectionLabel>
          <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
            Brain-inspired research for explainable, efficient AI.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {intro.description}
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-3 sm:gap-4 sm:p-4">
            {glance.map(({ value, label, icon: Icon }) => (
              <div key={label} className="rounded-xl bg-secondary/60 p-4 sm:p-5">
                <Icon size={18} className="mb-3 text-muted-foreground" />
                <div className="text-3xl font-bold tracking-tight">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Mission ──────────────────────────────────────────── */}
    <section className="border-t border-border/60 py-16 md:py-20">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-12 lg:gap-14">
        <motion.div {...fadeUp} className="lg:col-span-5">
          <SectionLabel icon={Target}>Our Mission</SectionLabel>
          <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            Understanding the brain to build better AI.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {mission.description}
          </p>
        </motion.div>

        <div className="grid gap-4 lg:col-span-7">
          {mission.points.map((point, idx) => {
            const Icon = iconMap[point.iconName] ?? Target;
            return (
              <motion.div
                key={point.text}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: idx * 0.06 }}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/25 sm:p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Aim {String(idx + 1).padStart(2, '0')}
                  </div>
                  <p className="mt-1 text-base font-medium leading-relaxed">{point.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── Future directions ────────────────────────────────── */}
    <section className="border-t border-border/60 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="max-w-3xl">
          <SectionLabel icon={Rocket}>{futureDirections.title}</SectionLabel>
          <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            Where our research is heading next.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {futureDirections.description}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {futureDirections.points.map((point, idx) => {
            const { title, description } = splitPoint(point);
            const Icon = futureIcons[idx % futureIcons.length];
            return (
              <motion.div
                key={point}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: idx * 0.06 }}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/25"
              >
                <div className="mb-4 inline-flex w-fit rounded-xl border border-border bg-secondary p-2.5">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold leading-snug">{title}</h3>
                {description && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── Collaborations ───────────────────────────────────── */}
    <section className="border-y border-zinc-300/70 bg-zinc-200/70 py-16 md:py-20">
      <motion.div
        {...fadeUp}
        className="container mx-auto flex flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between"
      >
        <div className="flex max-w-2xl items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
            <Handshake size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {collaborations.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/70">
              {collaborations.description}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Partner with Us
            <ArrowRight size={15} />
          </Link>
          <Link
            to="/projects"
            className="inline-flex h-11 items-center justify-center rounded-full border border-foreground/20 bg-background px-6 text-sm font-medium transition-colors hover:border-foreground/40"
          >
            Explore Our Research
          </Link>
        </div>
      </motion.div>
    </section>

    {/* ── FAQ ──────────────────────────────────────────────── */}
    <section className="relative overflow-hidden bg-foreground py-16 text-background md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(hsl(var(--background)/0.07)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="container relative mx-auto grid gap-10 px-4 lg:grid-cols-12 lg:gap-14">
        <motion.div {...fadeUp} className="lg:col-span-5">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-3 py-1 text-xs font-medium uppercase tracking-wide">
            <HelpCircle size={13} />
            FAQ
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-background/70">
            Can't find what you're looking for? Our team is happy to help.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-background px-6 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
          >
            <Mail size={15} />
            Contact Us
          </Link>
        </motion.div>

        <motion.div {...fadeUp} className="lg:col-span-7">
          <Accordion type="single" collapsible className="space-y-3">
            {faq.map((item, idx) => (
              <AccordionItem
                key={item.question}
                value={`item-${idx}`}
                className="rounded-xl border border-background/15 bg-background/5 px-5 transition-colors hover:border-background/30"
              >
                <AccordionTrigger className="py-4 text-left text-base font-medium hover:text-background/80 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-background/70">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  </div>
);
