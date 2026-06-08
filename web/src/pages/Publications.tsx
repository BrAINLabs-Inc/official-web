import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AcademicPaperIcon } from '@/components/ui/PageIcons';
import { ExternalLink, FileText, Calendar, BookOpen, Quote, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SEO } from '@/components/shared/SEO';
import { DataUnavailable } from '@/components/ui/DataUnavailable';
import { api, type PublicPublication } from '@/lib/api';

export const Publications = () => {
  const [publications, setPublications] = useState<PublicPublication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.publications
      .list()
      .then(setPublications)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Group by year from created_at
  const publicationsByYear = publications.reduce(
    (acc, pub) => {
      const year = new Date(pub.created_at).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(pub);
      return acc;
    },
    {} as Record<number, PublicPublication[]>
  );

  const years = Object.keys(publicationsByYear).sort((a, b) => Number(b) - Number(a));

  let citationCounter = 0;
  const citationMap = new Map<number, number>();
  years.forEach((year) => {
    publicationsByYear[Number(year)].forEach((pub) => {
      citationCounter++;
      citationMap.set(pub.id, citationCounter);
    });
  });

  // Get the best link/identifier from a publication's subtype
  const getSubtypeInfo = (pub: PublicPublication) => {
    if (pub.article) return { id: pub.article.doi, link: pub.article.link, label: 'Article' };
    if (pub.journal) return { id: pub.journal.issn, link: pub.journal.link, label: 'Journal' };
    if (pub.conference_paper)
      return {
        id: pub.conference_paper.paper_id,
        link: pub.conference_paper.link,
        label: 'Conference Paper',
      };
    if (pub.book) return { id: pub.book.isbn, link: pub.book.link, label: 'Book' };
    return { id: null, link: null, label: 'Publication' };
  };

  const getAuthorName = (pub: PublicPublication) => {
    if (!pub.member) return 'BrAIN Labs';
    return `${pub.member.first_name} ${pub.member.second_name}`;
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Publications"
        description="Browse peer-reviewed research papers and scholarly contributions from BrAIN Labs researchers."
        keywords={[
          'Research Publications',
          'AI Papers',
          'Neuroscience Research',
          'Academic Publications',
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-16 pt-24 md:pt-32">
        <div className="from-primary/6 absolute inset-0 bg-gradient-to-br via-background to-background" />
        <div className="absolute left-1/3 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl lg:pl-4"
          >
            <div className="bg-primary/8 mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-primary">
              <AcademicPaperIcon size={14} />
              Publications
            </div>

            <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Research{' '}
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Output
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Peer-reviewed research papers and scholarly contributions from BrAIN Labs researchers.
            </p>

            {!loading && !error && (
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Quote size={14} className="text-primary/60" />
                <span>
                  <span className="font-semibold text-foreground">{publications.length}</span>{' '}
                  publications across {years.length} year{years.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────── */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 lg:pl-8">
          {loading && (
            <div className="flex items-center justify-center gap-3 py-20 text-muted-foreground">
              <Loader2 size={20} className="animate-spin text-primary" />
              <span className="text-sm">Loading publications…</span>
            </div>
          )}

          {error && (
            <div className="mx-auto max-w-2xl">
              <DataUnavailable />
            </div>
          )}

          {!loading && !error && publications.length === 0 && (
            <div className="py-20 text-center">
              <AcademicPaperIcon size={40} className="mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No publications available yet.</p>
            </div>
          )}

          {!loading && !error && publications.length > 0 && (
            <div className="max-w-4xl space-y-14">
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
                  <div className="sticky top-20 z-10 -mx-2 flex items-center gap-4 rounded-lg bg-background/80 px-2 py-2 backdrop-blur-sm">
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
                      {publicationsByYear[Number(year)].length} paper
                      {publicationsByYear[Number(year)].length !== 1 ? 's' : ''}
                    </Badge>
                  </div>

                  {/* Publications */}
                  <div className="space-y-4">
                    {publicationsByYear[Number(year)].map((pub, idx) => {
                      const citeNum = citationMap.get(pub.id) ?? 0;
                      const { id: subtypeId, link, label } = getSubtypeInfo(pub);
                      return (
                        <motion.div
                          key={pub.id}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.08, duration: 0.5 }}
                          whileHover={{ x: 3 }}
                        >
                          <Card className="group border-border/50 bg-card/80 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                            <CardContent className="p-5 md:p-6">
                              <div className="flex flex-col items-start gap-4 md:flex-row md:gap-5">
                                {/* Citation number */}
                                <div className="bg-primary/8 hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/15 text-sm font-bold text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground md:flex">
                                  {citeNum}
                                </div>

                                <div className="min-w-0 flex-1 space-y-3">
                                  <div>
                                    <h3 className="mb-2 text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                                      {pub.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                      {getAuthorName(pub)}
                                    </p>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-3">
                                    <Badge
                                      variant="outline"
                                      className="rounded-full border-primary/20 bg-primary/5 font-medium text-primary transition-colors hover:bg-primary/10"
                                    >
                                      <BookOpen size={11} className="mr-1.5" />
                                      {label}
                                    </Badge>
                                    {subtypeId && (
                                      <span className="font-mono text-[11px] text-muted-foreground opacity-60">
                                        {subtypeId}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {link && (
                                  <div className="shrink-0">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="group/btn hover:bg-primary/8 h-8 rounded-lg px-3 text-muted-foreground hover:text-primary"
                                      asChild
                                    >
                                      <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5"
                                      >
                                        <FileText size={13} />
                                        <span className="text-xs font-medium">View</span>
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
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
