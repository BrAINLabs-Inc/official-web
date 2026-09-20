import { ExternalLink, BookOpen, FileText, Calendar } from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { Section } from '@/components/sections/Section';
import { PageHero } from '@/components/sections/PageHero';
import { Tag } from '@/components/ui/Tag';
import { publications, type Publication } from '@/data/publications';

export const Publications = () => {
  const publicationsByYear = publications.reduce(
    (acc, pub) => {
      if (!acc[pub.year]) acc[pub.year] = [];
      acc[pub.year].push(pub);
      return acc;
    },
    {} as Record<number, Publication[]>
  );

  const years = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  let globalIndex = 0;
  const citationMap = new Map<number, number>();
  years.forEach((year) => {
    publicationsByYear[year].forEach((pub) => {
      globalIndex++;
      citationMap.set(pub.id, globalIndex);
    });
  });

  return (
    <div className="bg-transparent transition-colors">
      <SEO
        title="Publications - Research Output"
        description="Peer-reviewed research papers and scholarly contributions from BrAIN Labs researchers."
        keywords={[
          'Research Publications',
          'AI Papers',
          'Neuroscience Research',
          'Academic Publications',
          'SNN Publications',
        ]}
      />

      <PageHero
        eyebrow="RESEARCH OUTPUT"
        icon={<FileText size={13} className="text-indigo-600 dark:text-indigo-400" />}
        title="Peer-reviewed papers & scholarly contributions."
        description="Peer-reviewed research papers and scholarly contributions from BrAIN Labs researchers."
        stats={[
          { value: publications.length, label: 'Publications', accent: true },
          { value: years.length, label: 'Years of Output' },
        ]}
      />

      <Section className="py-12 md:py-16">
        <div className="space-y-16">
          {years.map((year) => (
            <div key={year} className="space-y-6">
              <div className="flex items-center gap-4 border-b border-neutral-200 pb-3 dark:border-neutral-800">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Calendar size={18} />
                  <span className="font-display text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    {year}
                  </span>
                </div>
                <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  {publicationsByYear[year].length}{' '}
                  {publicationsByYear[year].length === 1 ? 'paper' : 'papers'}
                </span>
              </div>

              <div className="grid grid-cols-1 border-l border-t border-neutral-200 dark:border-neutral-800">
                {publicationsByYear[year].map((pub) => {
                  const citeNum = citationMap.get(pub.id) ?? 1;
                  return (
                    <div
                      key={pub.id}
                      className="group border-b border-r border-neutral-200 bg-slate-50/70 p-6 transition-colors hover:bg-indigo-50/30 dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:bg-indigo-950/30 md:p-8"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="flex items-start gap-4">
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-neutral-200 bg-neutral-100 font-mono text-sm font-bold text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white">
                            0{citeNum}
                          </span>
                          <div className="space-y-2">
                            <h3 className="font-display text-lg font-bold leading-snug text-neutral-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                              {pub.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                              {pub.authors}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 pt-2">
                              <Tag tone="indigo" className="inline-flex items-center gap-1.5 py-1">
                                <BookOpen size={12} />
                                {pub.venue}
                              </Tag>
                              {pub.doi && (
                                <span className="font-mono text-[11px] text-neutral-500">
                                  {pub.doi}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {pub.link && (
                          <div className="shrink-0 pt-2 md:pt-0">
                            <a
                              href={pub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 border border-neutral-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-900 transition-colors hover:border-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-neutral-700 dark:text-white dark:hover:border-indigo-600 dark:hover:bg-indigo-600"
                            >
                              <span>View Paper</span>
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};
