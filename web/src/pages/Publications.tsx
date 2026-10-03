import { motion } from 'framer-motion';
import { Fragment, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  FileText,
  Library,
  Quote,
  Search,
  X,
} from 'lucide-react';
import { AcademicPaperIcon } from '@/components/ui/PageIcons';
import { SEO } from '@/components/shared/SEO';
import { PageHero } from '@/components/shared/PageHero';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { publications, type Publication } from '@/data/publications';
import { researchers } from '@/data/team';
import { fadeUp, fadeUpAt } from '@/lib/motion';

const sorted = [...publications].sort((a, b) => b.year - a.year || a.id - b.id);
const years = [...new Set(sorted.map((p) => p.year))];
const types = [...new Set(sorted.map((p) => p.type))];
const venues = new Set(sorted.map((p) => p.venue));

/** Surnames of lab members, used to highlight them in author lists. */
const labSurnames = new Set(researchers.map((r) => r.member.second_name.toLowerCase()));
const isLabAuthor = (author: string) =>
  labSurnames.has(author.trim().split(/\s+/).pop()?.toLowerCase() ?? '');

const doiOf = (pub: Publication) => pub.doi?.replace(/^DOI:\s*/i, '');

/** Plain-text APA-style reference for the clipboard. */
const citation = (pub: Publication) => {
  const doi = doiOf(pub);
  return `${pub.authors} (${pub.year}). ${pub.title}. ${pub.venue}.${
    doi ? ` https://doi.org/${doi}` : pub.link ? ` ${pub.link}` : ''
  }`;
};

const Authors = ({ authors }: { authors: string }) => (
  <p className="text-sm leading-relaxed text-muted-foreground">
    {authors.split(',').map((author, i) => (
      <Fragment key={i}>
        {i > 0 && ', '}
        <span className={isLabAuthor(author) ? 'font-medium text-foreground' : undefined}>
          {author.trim()}
        </span>
      </Fragment>
    ))}
  </p>
);

const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable (e.g. insecure context); nothing to do.
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-4 text-xs font-medium transition-colors hover:border-foreground/40"
    >
      {copied ? <Check size={13} /> : <Quote size={13} />}
      {copied ? 'Copied' : label}
    </button>
  );
};

const PublicationCard = ({ pub, idx }: { pub: Publication; idx: number }) => {
  const doi = doiOf(pub);
  return (
    <motion.article
      {...fadeUpAt(idx)}
      className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/25 sm:p-6"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-foreground px-2.5 py-0.5 font-medium text-background">
          {pub.type}
        </span>
        {pub.venue !== pub.type && (
          <span className="inline-flex items-center gap-1.5 font-medium text-foreground/80">
            <BookOpen size={12} />
            {pub.venue}
          </span>
        )}
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-snug">
        {pub.link ? (
          <a
            href={pub.link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline"
          >
            {pub.title}
          </a>
        ) : (
          pub.title
        )}
      </h3>
      <div className="mt-2">
        <Authors authors={pub.authors} />
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        {doi ? (
          <a
            href={`https://doi.org/${doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            doi:{doi}
          </a>
        ) : (
          <span />
        )}
        <div className="flex shrink-0 flex-wrap gap-2">
          <CopyButton text={citation(pub)} label="Cite" />
          {pub.link && (
            <a
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-4 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              <FileText size={13} />
              View Paper
              <ArrowUpRight
                size={13}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export const Publications = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<Publication['type'] | null>(null);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      sorted.filter(
        (p) =>
          (!type || p.type === type) &&
          (!q || [p.title, p.authors, p.venue].join(' ').toLowerCase().includes(q))
      ),
    [q, type]
  );
  const isFiltering = q !== '' || type !== null;
  const clearFilters = () => {
    setQuery('');
    setType(null);
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
          { value: venues.size, label: venues.size === 1 ? 'Venue' : 'Venues' },
          {
            value: years.length > 1 ? `${years[years.length - 1]}–${years[0]}` : (years[0] ?? '—'),
            label: 'Years',
          },
        ]}
      />

      {/* ── Filters ──────────────────────────────────────────── */}
      <section className="border-y border-border/60 bg-secondary/40 py-5">
        <div className="container mx-auto flex flex-col gap-4 px-4 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-sm">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, author or venue"
              aria-label="Search publications"
              className="h-11 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground/40"
            />
          </div>
          <div
            role="group"
            aria-label="Filter by type"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0"
          >
            {[null, ...types].map((t) => (
              <button
                key={t ?? 'all'}
                type="button"
                onClick={() => setType(t)}
                aria-pressed={type === t}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  type === t
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border bg-background text-foreground/80 hover:border-foreground/40'
                }`}
              >
                {t ?? 'All types'}
                <span className="ml-1.5 tabular-nums opacity-60">
                  {t ? sorted.filter((p) => p.type === t).length : sorted.length}
                </span>
              </button>
            ))}
          </div>
          {isFiltering && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium underline-offset-4 hover:underline md:ml-auto"
            >
              <X size={13} />
              Clear
            </button>
          )}
        </div>
      </section>

      {/* ── List ─────────────────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary">
                <Library size={22} />
              </div>
              <p className="font-semibold">No publications match your search</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different keyword or publication type.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 inline-flex h-10 items-center rounded-full border border-border px-5 text-sm font-medium transition-colors hover:border-foreground/40"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-12 md:space-y-16">
              {years
                .filter((year) => filtered.some((p) => p.year === year))
                .map((year) => {
                  const pubs = filtered.filter((p) => p.year === year);
                  return (
                    <div key={year} className="grid gap-5 lg:grid-cols-12 lg:gap-10">
                      <motion.div {...fadeUp} className="lg:col-span-3">
                        <div className="flex items-baseline gap-3 lg:sticky lg:top-28 lg:block">
                          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{year}</h2>
                          <p className="text-sm text-muted-foreground lg:mt-2">
                            {pubs.length} {pubs.length === 1 ? 'publication' : 'publications'}
                          </p>
                        </div>
                      </motion.div>
                      <div className="space-y-4 lg:col-span-9">
                        {pubs.map((pub, idx) => (
                          <PublicationCard key={pub.id} pub={pub} idx={idx} />
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {!isFiltering && (
            <p className="mt-12 flex items-center gap-2 text-xs text-muted-foreground">
              <Copy size={12} />
              Names in bold are BrAIN Labs members. Use “Cite” to copy an APA-style reference.
            </p>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-foreground py-16 text-background md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(hsl(var(--background)/0.07)_1px,transparent_1px)] [background-size:28px_28px]" />
        <motion.div
          {...fadeUp}
          className="container relative mx-auto flex flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between"
        >
          <div className="max-w-2xl">
            <SectionLabel icon={BookOpen} inverted>
              Keep Exploring
            </SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              See the work behind the papers.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-background/70">
              Explore our ongoing research projects, or reach out to collaborate on the next one.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              to="/projects"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-background px-6 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
            >
              Our Projects
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full border border-background/25 px-6 text-sm font-medium transition-colors hover:border-background/50"
            >
              Collaborate
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
