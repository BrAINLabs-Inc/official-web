import { useEffect, useState, type ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  FileX,
  Link2,
  Linkedin,
  Newspaper,
  Tag,
  User,
} from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { blogPosts } from '@/data/blogs';
import { formatPostDate, postPath, postsNewestFirst, readMinutes } from '@/lib/blog';
import { fadeUp, fadeUpAt } from '@/lib/motion';

const URL_PATTERN = /(https?:\/\/[^\s)]+)/g;

/** Renders text with any bare URLs turned into links. */
const Linkified = ({ text }: { text: string }) => (
  <>
    {text.split(URL_PATTERN).map((part, i) =>
      i % 2 === 1 ? (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all font-medium text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
        >
          {part}
        </a>
      ) : (
        part
      )
    )}
  </>
);

/** Renders one blank-line separated block: heading, rule, bullet list, or paragraph. */
const renderBlock = (block: string, i: number): ReactNode => {
  const text = block.trim();
  if (!text) return null;

  if (text.startsWith('###') || text.startsWith('##')) {
    const titleText = text.replace(/^#+\s*/, '').trim();
    return text.startsWith('###') ? (
      <h3 key={i} className="pt-4 text-xl font-bold tracking-tight text-foreground md:text-2xl">
        {titleText}
      </h3>
    ) : (
      <h2 key={i} className="pt-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {titleText}
      </h2>
    );
  }

  if (text.startsWith('---')) {
    return <hr key={i} className="border-border" />;
  }

  const lines = text.split('\n');
  const intro = lines.filter((l) => !l.startsWith('- '));
  const bullets = lines.filter((l) => l.startsWith('- ')).map((l) => l.slice(2));

  return (
    <div key={i} className="space-y-4">
      {intro.map((line, j) => (
        <p key={j}>
          <Linkified text={line} />
        </p>
      ))}
      {bullets.length > 0 && (
        <ul className="space-y-2.5 rounded-2xl border border-border bg-secondary/40 p-5">
          {bullets.map((item, j) => (
            <li key={j} className="flex items-start gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />
              <span>
                <Linkified text={item} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const MetaPill = ({ icon: Icon, children }: { icon: typeof User; children: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-foreground/80">
    <Icon size={12} />
    {children}
  </span>
);

export const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => String(p.id) === id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  if (!post) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-20">
        <SEO title="Article Not Found" description="This article could not be found." />
        <div className="max-w-md space-y-6 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-secondary">
            <FileX size={28} />
          </div>
          <h1 className="text-2xl font-bold">Article not found</h1>
          <p className="text-muted-foreground">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/blog"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <ArrowLeft size={15} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const pageUrl = typeof window === 'undefined' ? '' : window.location.href;
  const morePosts = postsNewestFirst.filter((p) => p.id !== post.id).slice(0, 3);

  const copyLink = () =>
    navigator.clipboard
      .writeText(pageUrl)
      .then(() => setCopied(true))
      .catch(() => {});

  return (
    <div className="min-h-screen">
      <SEO title={`${post.title} | BrAIN Labs Blog`} description={post.description ?? post.title} />

      {/* ── Header ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="from-primary/6 pointer-events-none absolute inset-0 bg-gradient-to-br via-background to-background" />
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="container relative mx-auto px-4 pb-12 pt-12 md:pt-20"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Back to Blog
          </Link>

          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <MetaPill icon={Calendar}>{formatPostDate(post.created_at, 'long')}</MetaPill>
              <MetaPill icon={Clock}>{`${readMinutes(post)} min read`}</MetaPill>
              <MetaPill icon={User}>{post.author}</MetaPill>
            </div>
            <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            {post.description && (
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {post.description}
              </p>
            )}
          </div>
        </motion.div>
      </section>

      {/* ── Cover ────────────────────────────────────────────── */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="flex items-center justify-center rounded-2xl border border-border bg-secondary/60 p-4 sm:p-8"
        >
          <img
            src={post.imageUrl}
            alt={post.title}
            className="max-h-[32rem] w-full rounded-lg object-contain shadow-sm"
          />
        </motion.div>
      </div>

      {/* ── Article ──────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-12 lg:gap-14">
          <motion.article
            {...fadeUp}
            className="min-w-0 space-y-6 text-base leading-relaxed text-foreground/80 md:text-lg lg:col-span-8"
          >
            {post.content.split('\n\n').map(renderBlock)}
          </motion.article>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Share
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?${new URLSearchParams({ url: pageUrl })}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  <Linkedin size={15} />
                  Share on LinkedIn
                </a>
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-foreground/20 px-5 text-sm font-medium transition-colors hover:border-foreground/40"
                >
                  {copied ? <Check size={15} /> : <Link2 size={15} />}
                  {copied ? 'Link copied' : 'Copy link'}
                </button>
              </div>
            </div>

            {post.keywords.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Topics
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-foreground/80"
                    >
                      <Tag size={11} />
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* ── More posts ───────────────────────────────────────── */}
      {morePosts.length > 0 && (
        <section className="border-t border-border/60 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              {...fadeUp}
              className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
            >
              <div>
                <SectionLabel icon={Newspaper}>Keep Reading</SectionLabel>
                <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  More from the lab.
                </h2>
              </div>
              <Link
                to="/blog"
                className="inline-flex h-10 w-fit items-center gap-2 rounded-full border border-foreground/20 px-5 text-sm font-medium transition-colors hover:border-foreground/40"
              >
                All posts
              </Link>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {morePosts.map((p, idx) => (
                <motion.article key={p.id} {...fadeUpAt(idx)}>
                  <Link
                    to={postPath(p)}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/25"
                  >
                    <div className="flex aspect-[16/10] items-center justify-center border-b border-border bg-secondary/60 p-4">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        loading="lazy"
                        className="max-h-full w-full rounded-md object-contain"
                      />
                    </div>
                    <div className="flex flex-1 items-start justify-between gap-4 p-6">
                      <div>
                        <div className="text-xs text-muted-foreground">
                          {formatPostDate(p.created_at)}
                        </div>
                        <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug">
                          {p.title}
                        </h3>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                      />
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
