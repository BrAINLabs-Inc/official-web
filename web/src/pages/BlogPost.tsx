import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { SEO } from '@/components/shared/SEO';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, User, Tag, Share2, Clock, ChevronDown, Quote } from 'lucide-react';
import { AcademicPaperIcon } from '@/components/ui/PageIcons';
import { api, type PublicBlog } from '@/lib/api';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1280&q=80';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PublicBlog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;

    setIsLoading(true);
    setNotFound(false);
    api.blogs
      .get(id)
      .then(setPost)
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  const scrollToContent = () => {
    document.getElementById('article-content')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getAuthorName = (p: PublicBlog) => {
    if (p.member) return `${p.member.first_name} ${p.member.second_name}`;
    if (p.former_member)
      return `Former ${p.former_member.former_role.replace('_', ' ').toLowerCase()}`;
    return 'BrAIN Labs';
  };

  if (!isLoading && notFound) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md space-y-6 text-center">
          <div className="mb-2 inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
            <span className="text-4xl">📝</span>
          </div>
          <h2 className="text-2xl font-bold">Article not found</h2>
          <p className="text-muted-foreground">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/blog">
            <Button variant="outline" className="rounded-full px-6">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const featuredImage = post?.blog_image[0]?.image_url || FALLBACK_IMAGE;

  return (
    <div className="relative min-h-screen bg-background">
      {post && (
        <SEO
          title={`${post.title} | BrAIN Labs Blog`}
          description={post.description ?? post.title}
        />
      )}

      {/* ── Hero Section ──────────────────────────────────────── */}
      <section className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden pb-16 pt-24 md:pt-32">
        <div className="from-primary/6 absolute inset-0 bg-gradient-to-br via-background to-background" />
        <div className="absolute left-1/3 top-0 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-7xl"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <Link to="/blog">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 rounded-full bg-primary/5 px-4 text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowLeft size={16} />
                  Back to Blog
                </Button>
              </Link>
            </motion.div>

            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              {/* Left Column: Title & Meta */}
              <motion.div variants={itemVariants} className="space-y-6">
                {isLoading ? (
                  <>
                    <Skeleton className="h-6 w-32 rounded-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-3/4" />
                    <div className="flex gap-4 pt-4">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </>
                ) : (
                  post && (
                    <>
                      <div className="bg-primary/8 mb-2 inline-flex items-center gap-2 rounded-full border border-primary/15 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-primary">
                        <AcademicPaperIcon size={14} />
                        Research Perspective
                      </div>

                      <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
                        {post.title}
                      </h1>

                      <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-1">
                            <User size={14} className="text-primary" />
                          </div>
                          <span className="font-semibold text-foreground/80">
                            {getAuthorName(post)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-1">
                            <Calendar size={14} className="text-primary" />
                          </div>
                          <span>
                            {new Date(post.created_at).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-1">
                            <Clock size={14} className="text-primary" />
                          </div>
                          <span>
                            ~{Math.max(1, Math.ceil((post.content?.split(' ').length ?? 0) / 200))}{' '}
                            min read
                          </span>
                        </div>
                      </div>
                    </>
                  )
                )}
              </motion.div>

              {/* Right Column: Featured Image */}
              <motion.div variants={itemVariants} className="group relative">
                {isLoading ? (
                  <Skeleton className="aspect-video w-full rounded-2xl shadow-2xl md:rounded-3xl" />
                ) : (
                  post && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-primary/10 bg-muted shadow-2xl md:rounded-3xl">
                      <img
                        src={featuredImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                        }}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                    </div>
                  )
                )}
                <div className="absolute -right-6 -top-6 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
                <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 cursor-pointer md:block"
          onClick={scrollToContent}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="rounded-full border border-primary/10 p-2 text-primary/40 transition-colors hover:text-primary"
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Main Content ──────────────────────────────────────── */}
      <section id="article-content" className="relative px-4 py-12 md:px-8 md:py-20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_300px]">
            {/* Article Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-10"
            >
              {isLoading ? (
                <div className="space-y-6">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="space-y-4 pt-8">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ) : (
                post && (
                  <div className="prose prose-invert prose-lg max-w-none">
                    {/* Abstract / description */}
                    {post.description && (
                      <div className="relative mb-12 rounded-2xl border border-primary/10 bg-primary/[0.03] p-6 md:p-8">
                        <Quote
                          size={24}
                          className="absolute -left-3 -top-3 rotate-180 text-primary/20"
                        />
                        <p className="text-lg font-medium italic leading-relaxed text-foreground/90 md:text-xl">
                          {post.description}
                        </p>
                      </div>
                    )}

                    {/* Body content */}
                    {post.content ? (
                      <div className="space-y-8 leading-relaxed text-muted-foreground">
                        {post.content.split('\n\n').map((paragraph, i) => {
                          const cleanText = paragraph.trim();
                          if (!cleanText) return null;

                          if (cleanText.startsWith('###') || cleanText.startsWith('##')) {
                            const level = cleanText.startsWith('###') ? 3 : 2;
                            const titleText = cleanText.replace(/^#+\s*/, '').trim();
                            return level === 3 ? (
                              <h3
                                key={i}
                                className="mb-6 mt-12 flex items-center gap-3 text-xl font-bold text-foreground md:text-2xl"
                              >
                                <div className="h-6 w-1.5 rounded-full bg-primary/40" />
                                {titleText}
                              </h3>
                            ) : (
                              <h2
                                key={i}
                                className="mb-8 mt-16 text-2xl font-bold text-foreground md:text-3xl"
                              >
                                {titleText}
                              </h2>
                            );
                          }

                          if (cleanText.startsWith('---')) {
                            return <hr key={i} className="my-12 border-border/40" />;
                          }

                          return (
                            <p key={i} className="text-base md:text-lg">
                              {cleanText}
                            </p>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="italic text-muted-foreground">
                        No content available for this article.
                      </p>
                    )}
                  </div>
                )
              )}
            </motion.div>

            {/* Sidebar */}
            <aside className="sticky top-32 hidden space-y-10 lg:block">
              <div className="space-y-8 rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm">
                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Share
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 rounded-xl border-primary/10 hover:bg-primary/5"
                    onClick={() =>
                      navigator
                        .share?.({ title: post?.title, url: window.location.href })
                        .catch(() => {})
                    }
                  >
                    <Share2 size={14} />
                    Share Article
                  </Button>
                </div>

                {post?.blog_keyword && post.blog_keyword.length > 0 && (
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                      Key Topics
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.blog_keyword.map((k) => (
                        <span
                          key={k.keyword}
                          className="flex items-center gap-1.5 rounded-full border border-border/50 bg-background/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                          <Tag size={10} className="text-primary" />
                          {k.keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 rounded-2xl border border-primary/10 bg-primary/[0.02] p-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
                  Lab Perspective
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  This article presents the current BrAIN Labs research perspective on the evolving
                  landscape of brain-inspired intelligence.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Footer Link ───────────────────────────────────────── */}
      <section className="border-t border-border/40 py-20">
        <div className="container mx-auto px-4 text-center">
          <Link to="/blog">
            <Button
              variant="ghost"
              className="group gap-2 rounded-full px-8 text-primary hover:bg-primary/5"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Return to Blog Feed
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
