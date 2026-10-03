import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  FileText,
  HelpCircle,
  Mail,
  MessageCircle,
  Send,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SEO } from '@/components/shared/SEO';
import { PageHero } from '@/components/shared/PageHero';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { careersBenefits, careersFaqs, contact } from '@/data/general';
import { iconMap } from '@/lib/icons';
import { fadeUp, fadeUpAt } from '@/lib/motion';

const contactAddress = contact.email.replace(/^mailto:/, '');

const applySteps: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Prepare your application',
    description: 'Your CV plus a short cover letter or research statement covering your interests.',
    icon: FileText,
  },
  {
    title: 'Send it to us',
    description: `Email ${contactAddress} with the position title (or "Open Application") in the subject line.`,
    icon: Send,
  },
  {
    title: 'Start a conversation',
    description: 'We review every application and reach out when there is a fit with our research.',
    icon: MessageCircle,
  },
];

export const Careers = () => (
  <div className="min-h-screen">
    <SEO
      title="Careers at BrAIN Labs"
      description="Join BrAIN Labs and contribute to cutting-edge AI and neuroscience research. Explore open positions and opportunities."
      keywords={[
        'BrAIN Labs Careers',
        'AI Research Jobs',
        'Neuroscience Jobs',
        'Research Positions',
        'Internships',
      ]}
    />

    <PageHero
      icon={<Briefcase size={14} />}
      eyebrow="Join Our Team"
      title="Build the Future of"
      highlight="AI Research"
      description="Join a world-class team of researchers and engineers working at the intersection of artificial intelligence and neuroscience."
    />

    {/* ── Why join ─────────────────────────────────────────── */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-12 lg:gap-14">
        <motion.div {...fadeUp} className="lg:col-span-5">
          <SectionLabel icon={Sparkles}>Why Join Us</SectionLabel>
          <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
            Where curiosity meets real impact.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            We offer an environment where ambitious research questions get the time, mentorship and
            collaboration they deserve. Here's what makes our team special.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {careersBenefits.map((benefit, idx) => {
            const Icon = iconMap[benefit.iconName] ?? CheckCircle2;
            return (
              <motion.div
                key={benefit.title}
                {...fadeUpAt(idx)}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/25"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold leading-snug">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ── Open positions + how to apply ────────────────────── */}
    <section className="border-t border-border/60 py-16 md:py-20">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-12 lg:gap-14">
        <motion.div {...fadeUp} className="lg:col-span-5">
          <SectionLabel icon={Briefcase}>Open Positions</SectionLabel>
          <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            No open roles right now, but we're always listening.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            New research positions and internships are posted here as they open. Talented
            researchers and engineers are welcome to send an open application at any time.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:col-span-7">
          {applySteps.map(({ title, description, icon: Icon }, idx) => (
            <motion.div
              key={title}
              {...fadeUpAt(idx)}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/25 sm:p-6"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary">
                <Icon size={20} />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Step {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-1 text-base font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Apply CTA ────────────────────────────────────────── */}
    <section className="border-y border-zinc-300/70 bg-zinc-200/70 py-16 md:py-20">
      <motion.div
        {...fadeUp}
        className="container mx-auto flex flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between"
      >
        <div className="flex max-w-2xl items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
            <Mail size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to join the lab?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/70">
              Send us your CV and research interests. We'd love to hear what you want to work on.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <a
            href={`${contact.email}?subject=${encodeURIComponent('Open Application')}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Send Your CV
            <ArrowRight size={15} />
          </a>
          <Link
            to="/team"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-foreground/20 bg-background px-6 text-sm font-medium transition-colors hover:border-foreground/40"
          >
            <Users size={15} />
            Meet the Team
          </Link>
        </div>
      </motion.div>
    </section>

    {/* ── FAQ ──────────────────────────────────────────────── */}
    <section className="relative overflow-hidden bg-foreground py-16 text-background md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(hsl(var(--background)/0.07)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="container relative mx-auto grid gap-10 px-4 lg:grid-cols-12 lg:gap-14">
        <motion.div {...fadeUp} className="lg:col-span-5">
          <SectionLabel icon={HelpCircle} inverted>
            FAQ
          </SectionLabel>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Common Questions</h2>
          <p className="mt-4 text-base leading-relaxed text-background/70">
            Have a question about joining us that isn't covered here? Get in touch.
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
            {careersFaqs.map((item, idx) => (
              <AccordionItem
                key={item.q}
                value={`item-${idx}`}
                className="rounded-xl border border-background/15 bg-background/5 px-5 transition-colors hover:border-background/30"
              >
                <AccordionTrigger className="py-4 text-left text-base font-medium hover:text-background/80 hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-background/70">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  </div>
);
