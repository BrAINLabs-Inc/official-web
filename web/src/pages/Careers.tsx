import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, ArrowRight, CheckCircle2, GraduationCap } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/shared/SEO';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { careersBenefits, careersFaqs } from '@/data/general';

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-primary/8 mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-primary">
    {children}
  </div>
);

export const Careers = () => {
  return (
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

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-16 pt-24 md:pt-32">
        <div className="from-primary/6 absolute inset-0 bg-gradient-to-br via-background to-background" />
        <div className="bg-primary/4 absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl lg:pl-4"
          >
            <SectionLabel>
              <Briefcase size={14} />
              Join Our Team
            </SectionLabel>

            <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Build the Future of{' '}
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                AI Research
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Join a world-class team of researchers and engineers working at the intersection of
              artificial intelligence and neuroscience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:pl-8">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl border border-primary/15 bg-primary/10 p-2.5">
                  <CheckCircle2 className="text-primary" size={22} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Why Join BrAIN Labs
                </h2>
              </div>
              <p className="max-w-3xl border-l-2 border-primary/30 pl-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                We offer an environment where curiosity meets impact. Here's what makes our team
                special.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              {careersBenefits.map((benefit, idx) => {
                const BenefitIcon = (Icons as any)[benefit.iconName] || CheckCircle2;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card className="group h-full border-border/50 bg-card/60 transition-all duration-300 hover:border-primary/40 hover:shadow-md">
                      <CardHeader className="space-y-4 pb-4">
                        <div className="bg-primary/8 group-hover:bg-primary/14 w-fit rounded-xl p-3 transition-colors">
                          <BenefitIcon className="text-primary" size={22} />
                        </div>
                        <p className="text-base font-semibold leading-snug text-foreground/90">
                          {benefit.title}
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {benefit.description}
                        </p>
                      </CardHeader>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Current Openings ─────────────────────────────────── */}
      <section className="border-y border-border/40 bg-muted/30 py-16">
        <div className="container mx-auto px-4 lg:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <div className="mb-10 flex flex-col items-center gap-3">
              <div className="rounded-xl border border-primary/15 bg-primary/10 p-2.5">
                <Briefcase className="text-primary" size={22} />
              </div>
              <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">
                Current Openings
              </h2>
            </div>

            <Card className="border-border/50 bg-card/60">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-primary/8 mb-6 rounded-full border border-primary/15 p-4">
                  <Briefcase size={32} className="text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">No positions listed yet</h3>
                <p className="mb-6 max-w-md text-sm text-muted-foreground">
                  We're always looking for talented researchers and engineers. Check back soon for
                  new opportunities, or send us your CV for future consideration.
                </p>
                <a href="mailto:mahima.w@sliit.lk">
                  <Button className="h-10 rounded-full bg-foreground px-6 text-sm font-medium text-background shadow-md transition-all hover:bg-foreground/90 hover:shadow-lg">
                    Send Your CV
                    <ArrowRight size={14} className="ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl space-y-6 text-center"
          >
            <div className="mb-2 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <Users size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Ready to Shape the Future?
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground">
              Whether you're a PhD student, postdoc, or experienced researcher, we'd love to hear
              from you. Drop us a line and let's explore how you can contribute.
            </p>
            <Link to="/contact">
              <Button className="h-10 rounded-full bg-foreground px-7 text-sm text-background shadow-md transition-all hover:bg-foreground/90 hover:shadow-lg">
                Get in Touch
                <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="border-t border-border/50 bg-muted/30 py-16">
        <div className="container mx-auto px-4 lg:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl"
          >
            <div className="mb-8 flex flex-col items-center gap-3">
              <div className="rounded-xl border border-primary/15 bg-primary/10 p-2.5">
                <GraduationCap className="text-primary" size={22} />
              </div>
              <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">
                Common Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {careersFaqs.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="rounded-xl border border-border/60 bg-background/60 px-5 transition-colors hover:border-primary/30"
                >
                  <AccordionTrigger className="py-4 text-base font-medium transition-colors hover:text-primary hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
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
};
