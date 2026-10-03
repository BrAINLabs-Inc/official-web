import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, ArrowRight, CheckCircle2, GraduationCap } from 'lucide-react';
import { iconMap } from '@/lib/icons';
import { SEO } from '@/components/shared/SEO';
import { PageHero } from '@/components/shared/PageHero';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { careersBenefits, careersFaqs, contact } from '@/data/general';

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

      <PageHero
        icon={<Briefcase size={14} />}
        eyebrow="Join Our Team"
        title="Build the Future of"
        highlight="AI Research"
        description="Join a world-class team of researchers and engineers working at the intersection of artificial intelligence and neuroscience."
      />

      {/* ── Benefits ─────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
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
                const BenefitIcon = iconMap[benefit.iconName] ?? CheckCircle2;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
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
        <div className="container mx-auto px-4">
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
                <a href={contact.email}>
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

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-foreground py-20 text-background md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(hsl(var(--background)/0.07)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl"
          >
            <div className="mb-8 flex flex-col items-center gap-3">
              <div className="rounded-xl border border-background/20 bg-background/10 p-2.5">
                <GraduationCap size={22} />
              </div>
              <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
                Common Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {careersFaqs.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="rounded-xl border border-background/15 bg-background/5 px-5 transition-colors hover:border-background/30"
                >
                  <AccordionTrigger className="py-4 text-base font-medium transition-colors hover:text-background/80 hover:no-underline">
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
};
