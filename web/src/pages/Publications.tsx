import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AcademicPaperIcon } from '@/components/ui/PageIcons';
import { ExternalLink, FileText, Calendar, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SEO } from '@/components/shared/SEO';
import { PageHero } from '@/components/shared/PageHero';
import { publications, type Publication } from '@/data/publications';

const publicationsByYear = publications.reduce(
  (acc, pub) => {
    (acc[pub.year] ??= []).push(pub);
    return acc;
  },
  {} as Record<number, Publication[]>
);

const years = Object.keys(publicationsByYear)
  .map(Number)
  .sort((a, b) => b - a);

const citationMap = new Map<number, number>(
  years.flatMap((year) => publicationsByYear[year]).map((pub, i) => [pub.id, i + 1])
);

export const Publications = () => (
  <div className="min-h-screen">
    <SEO
      title="Publications"
      description="Browse peer-reviewed research papers and scholarly contributions from BrAIN Labs researchers."
      keywords={[
        'Research Publications',
        'AI Papers',
        'Neuroscience Research',
        'Academic Publications',
        'SNN Publications',
      ]}
    />

    <PageHero
      icon={<AcademicPaperIcon size={14} />}
      eyebrow="Publications"
      title="Research"
      highlight="Output"
      description="Peer-reviewed research papers and scholarly contributions from BrAIN Labs researchers."
      stats={[
        { value: publications.length, label: 'Publications' },
        { value: years.length, label: 'Years of Output' },
      ]}
    />

    {/* ── Body ─────────────────────────────────────────────── */}
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl space-y-14">
          {years.map((year, yearIdx) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: yearIdx * 0.1, duration: 0.6 }}
              className="space-y-5"
            >
              {/* Year Header */}
              <div className="sticky top-20 z-10 -mx-2 flex items-center gap-4 rounded-lg bg-background/80 px-2 py-2">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-lg border border-primary/15 bg-primary/10 p-1.5">
                    <Calendar size={16} className="text-primary" />
                  </div>
                  <span className="text-2xl font-bold tracking-tight text-primary">{year}</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-border/80 to-transparent" />
                <Badge
                  variant="secondary"
                  className="bg-primary/8 rounded-full border border-primary/15 px-2.5 text-[10px] font-semibold tabular-nums text-primary"
                >
                  {publicationsByYear[year].length} paper
                  {publicationsByYear[year].length !== 1 ? 's' : ''}
                </Badge>
              </div>

              {/* Publications */}
              <div className="space-y-4">
                {publicationsByYear[year].map((pub, idx) => (
                  <motion.div
                    key={pub.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                  >
                    <Card className="group border-border/50 bg-card/80 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                      <CardContent className="p-5 md:p-6">
                        <div className="flex flex-col items-start gap-4 md:flex-row md:gap-5">
                          {/* Citation number */}
                          <div className="bg-primary/8 hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/15 text-sm font-bold text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground md:flex">
                            {citationMap.get(pub.id)}
                          </div>

                          <div className="min-w-0 flex-1 space-y-3">
                            <div>
                              <h3 className="mb-2 text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                                {pub.title}
                              </h3>
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                {pub.authors}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                              <Badge
                                variant="outline"
                                className="rounded-full border-primary/20 bg-primary/5 font-medium text-primary transition-colors hover:bg-primary/10"
                              >
                                <BookOpen size={11} className="mr-1.5" />
                                {pub.venue}
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="rounded-full text-[10px] font-medium text-muted-foreground"
                              >
                                {pub.type}
                              </Badge>
                              {pub.doi && (
                                <span className="font-mono text-[11px] text-muted-foreground opacity-60">
                                  {pub.doi}
                                </span>
                              )}
                            </div>
                          </div>

                          {pub.link && (
                            <div className="shrink-0">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="group/btn hover:bg-primary/8 h-8 rounded-lg px-3 text-muted-foreground hover:text-primary"
                                asChild
                              >
                                <a
                                  href={pub.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5"
                                >
                                  <FileText size={13} />
                                  <span className="text-xs font-medium">View Paper</span>
                                  <ExternalLink
                                    className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                                    size={11}
                                  />
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);
