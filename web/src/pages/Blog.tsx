import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BookOpen, Calendar, Clock, Newspaper, Star } from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { PageHero } from '@/components/shared/PageHero';
import { SectionLabel } from '@/components/shared/SectionLabel';
import type { BlogPostItem } from '@/data/blogs';
import { formatPostDate, postPath, postsNewestFirst, readMinutes } from '@/lib/blog';
import { fadeUp, fadeUpAt } from '@/lib/motion';

const [featured, ...rest] = postsNewestFirst;

const PostMeta = ({ post }: { post: BlogPostItem }) => (
  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
    <span className="inline-flex items-center gap-1.5">
      <Calendar size={12} />
      {formatPostDate(post.created_at)}
    </span>
    <span className="inline-flex items-center gap-1.5">
      <Clock size={12} />
      {readMinutes(post)} min read
    </span>
  </div>
);

const Tags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <span
        key={tag}
        className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-foreground/80"
      >
        {tag}
      </span>
    ))}
  </div>
);

export const Blog = () => (
  <div className="min-h-screen">
    <SEO
      title="Blog | BrAIN Labs"
      description="Explore our latest research perspectives and insights at the intersection of AI and Neuroscience."
    />

    <PageHero
      icon={<BookOpen size={14} />}
      eyebrow="Research Blog"
      title="Latest"
      highlight="Perspectives"
      description="Insights and deep dives into the frontiers of Brain-Inspired Intelligence and Neuromorphic systems."
    />

    {!featured && (
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary">
              <BookOpen size={22} />
            </div>
            <p className="font-semibold">No posts yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Check back soon for new articles.</p>
          </div>
        </div>
      </section>
    )}

    {/* ── Featured post ────────────────────────────────────── */}
    {featured && (
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp}>
            <SectionLabel icon={Star}>Latest Post</SectionLabel>
          </motion.div>

          <motion.article {...fadeUp} className="mt-2">
            <Link
              to={postPath(featured)}
              className="group grid overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/25 lg:grid-cols-12"
            >
              <div className="flex items-center justify-center border-b border-border bg-secondary/60 p-4 sm:p-5 lg:col-span-5 lg:border-b-0 lg:border-r">
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="max-h-56 w-full rounded-lg object-contain shadow-sm transition-transform duration-500 group-hover:scale-[1.02] sm:max-h-64"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-7 lg:col-span-7">
                <PostMeta post={featured} />
                <h2 className="mt-3 text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                  {featured.title}
                </h2>
                {featured.description && (
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {featured.description}
                  </p>
                )}
                <div className="mt-4">
                  <Tags tags={featured.keywords.slice(0, 4)} />
                </div>
                <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
                  <span className="text-sm font-medium text-foreground/80">{featured.author}</span>
                  <span className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-opacity group-hover:opacity-90">
                    Read Article
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        </div>
      </section>
    )}

    {/* ── More posts ───────────────────────────────────────── */}
    {rest.length > 0 && (
      <section className="border-t border-border/60 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="mb-10 max-w-3xl">
            <SectionLabel icon={Newspaper}>More Posts</SectionLabel>
            <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              From the lab.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Workshop recaps, open resources and research notes from the BrAIN Labs team.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, idx) => (
              <motion.article key={post.id} {...fadeUpAt(idx)}>
                <Link
                  to={postPath(post)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/25"
                >
                  <div className="flex aspect-[16/10] items-center justify-center border-b border-border bg-secondary/60 p-4">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      loading="lazy"
                      className="max-h-full w-full rounded-md object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <PostMeta post={post} />
                    <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug">
                      {post.title}
                    </h3>
                    {post.description && (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {post.description}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                      <Tags tags={post.keywords.slice(0, 2)} />
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                      />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    )}

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
            Go deeper into our research.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-background/70">
            Browse our publications, or pick up the open slides and Colab notebooks from our
            workshops.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            to="/publications"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-background px-6 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
          >
            Publications
            <ArrowRight size={15} />
          </Link>
          <Link
            to="/events"
            className="inline-flex h-11 items-center justify-center rounded-full border border-background/25 px-6 text-sm font-medium transition-colors hover:border-background/50"
          >
            Workshops
          </Link>
        </div>
      </motion.div>
    </section>
  </div>
);
