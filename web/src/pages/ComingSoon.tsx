import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock, Mail, Rocket } from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { contact } from '@/data/general';
import { cn } from '@/lib/utils';

interface ComingSoonProps {
  /** Name of the upcoming feature, e.g. "Badge Verification". */
  feature?: string;
  description?: string;
}

const steps = [
  { label: 'Designed', done: true },
  { label: 'In development', done: true, current: true },
  { label: 'Launching soon', done: false },
];

export const ComingSoon = ({
  feature,
  description = "We're working hard to bring you new features and experiences. Stay tuned for updates from BrAIN Labs.",
}: ComingSoonProps) => {
  const email = contact.email.replace('mailto:', '');

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-foreground py-20 text-background">
      <SEO
        title={feature ? `${feature} | Coming Soon` : 'Coming Soon'}
        description={description}
        keywords={['Coming Soon', 'BrAIN Labs', 'Upcoming']}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(hsl(var(--background)/0.07)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--background)/0.08),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="container relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center"
      >
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-background/20 bg-background/10">
          <Rocket size={28} />
        </div>

        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wide">
          <Clock size={13} />
          {feature ? `${feature} · In Development` : 'In Development'}
        </div>

        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Something Amazing
          <br />
          <span className="text-background/60">is on the Way</span>
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-background/70 md:text-lg">
          {description}
        </p>

        {/* Progress */}
        <ol className="mt-10 flex w-full max-w-md items-start">
          {steps.map((step, i) => (
            <li key={step.label} className="relative flex flex-1 flex-col items-center gap-2">
              {i > 0 && (
                <span
                  aria-hidden
                  className={cn(
                    'absolute right-1/2 top-4 h-px w-full -translate-y-1/2',
                    step.done ? 'bg-background/60' : 'bg-background/20'
                  )}
                />
              )}
              <span
                className={cn(
                  'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold',
                  step.done
                    ? 'border-background bg-background text-foreground'
                    : 'border-background/30 bg-foreground text-background/60',
                  step.current && 'ring-4 ring-background/15'
                )}
              >
                {step.done && !step.current ? <Check size={14} /> : i + 1}
              </span>
              <span
                className={cn(
                  'text-xs font-medium',
                  step.done ? 'text-background' : 'text-background/50'
                )}
              >
                {step.label}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            to="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-background px-7 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
          >
            Back to Home
            <ArrowRight size={15} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full border border-background/30 px-7 text-sm font-medium transition-colors hover:bg-background/10"
          >
            Get in Touch
          </Link>
        </div>

        <a
          href={contact.email}
          className="mt-8 inline-flex items-center gap-2 text-sm text-background/60 transition-colors hover:text-background"
        >
          <Mail size={14} />
          Questions? {email}
        </a>
      </motion.div>
    </section>
  );
};
