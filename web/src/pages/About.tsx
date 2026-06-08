import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { mission, collaborations, futureDirections, faq } from '@/data/general';
import * as Icons from 'lucide-react';
import { Target, Handshake, Rocket, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MissionCompassIcon } from '@/components/ui/PageIcons';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/shared/SEO';

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-primary/8 mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-primary">
    {children}
  </div>
);

export const About = () => {
  const MissionIcon = (Icons as any)[mission.iconName] || Target;
  const CollabIcon = (Icons as any)[collaborations.iconName] || Handshake;
  const FutureIcon = (Icons as any)[futureDirections.iconName] || Rocket;

  return (
    <div className="min-h-screen">
      <SEO
        title="About BrAIN Labs"
        description="Learn about BrAIN Labs' mission to pioneer AI and neuroscience research, our collaborations, and future directions."
        keywords={['About BrAIN Labs', 'AI Mission', 'Neuroscience Research', 'AI Collaborations']}
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
              <MissionCompassIcon size={14} /> About Us
            </SectionLabel>

            <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Pioneering{' '}
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                AI Research
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Exploring the intersection of artificial intelligence and neuroscience to build the
              next generation of intelligent systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────── */}
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
                  <MissionIcon className="text-primary" size={22} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{mission.title}</h2>
              </div>
              <p className="max-w-3xl border-l-2 border-primary/30 pl-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {mission.description}
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-3">
              {mission.points.map((point, idx) => {
                const PointIcon = (Icons as any)[point.iconName] || Target;
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
                          <PointIcon className="text-primary" size={22} />
                        </div>
                        <p className="text-sm font-medium leading-relaxed text-foreground/90">
                          {point.text}
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

      {/* ── Collaborations ───────────────────────────────────── */}
      <section className="border-y border-border/40 bg-muted/30 py-16">
        <div className="container mx-auto px-4 lg:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 shrink-0 rounded-xl border border-primary/15 bg-primary/10 p-2.5">
                <CollabIcon className="text-primary" size={22} />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
                  {collaborations.title}
                </h2>
                <p className="mb-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {collaborations.description}
                </p>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-primary/8 group border-primary/30 hover:border-primary/50"
                  >
                    Partner with Us
                    <ArrowRight
                      size={14}
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Future Directions ────────────────────────────────── */}
      <section className="py-16 md:py-24">
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
                  <FutureIcon className="text-primary" size={22} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {futureDirections.title}
                </h2>
              </div>
              <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
                {futureDirections.description}
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {futureDirections.points.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  whileHover={{ x: 4 }}
                >
                  <Card className="group h-full border-border/50 bg-card/60 transition-all duration-200 hover:border-primary/40">
                    <CardContent className="flex items-start gap-3 pb-5 pt-5">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-primary transition-transform group-hover:scale-110"
                      />
                      <p className="text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
                        {point}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="border-t border-border/50 bg-muted/30 py-16">
        <div className="container mx-auto px-4 lg:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl border border-primary/15 bg-primary/10 p-2.5">
                <HelpCircle className="text-primary" size={22} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Frequently Asked Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faq.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="rounded-xl border border-border/60 bg-background/60 px-5 transition-colors hover:border-primary/30"
                >
                  <AccordionTrigger className="py-4 text-base font-medium transition-colors hover:text-primary hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
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
};
