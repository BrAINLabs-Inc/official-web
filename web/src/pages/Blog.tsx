import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/shared/SEO';
import { Badge } from '@/components/ui/badge';
import { DataUnavailable } from '@/components/ui/DataUnavailable';
import { api, type PublicBlog } from '@/lib/api';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=640&q=80';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const Blog = () => {
  const [posts, setPosts] = useState<PublicBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.blogs
      .list()
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="Blog | BrAIN Labs"
        description="Explore our latest research perspectives and insights at the intersection of AI and Neuroscience."
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
              <BookOpen size={14} />
              Research Blog
            </div>

            <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Latest{' '}
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Perspectives
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Insights and deep dives into the frontiers of Brain-Inspired Intelligence and
              Neuromorphic systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Blog Cards ───────────────────────────────────────── */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 lg:pl-8">
          {loading && (
            <div className="flex items-center justify-center gap-3 py-20 text-muted-foreground">
              <Loader2 size={20} className="animate-spin text-primary" />
              <span className="text-sm">Loading articles…</span>
            </div>
          )}

          {error && (
            <div className="mx-auto max-w-2xl">
              <DataUnavailable />
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="py-20 text-center">
              <BookOpen size={40} className="mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No blog posts available yet.</p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {posts.map((post) => {
                const imageUrl = post.blog_image[0]?.image_url || FALLBACK_IMAGE;
                const tags = post.blog_keyword.map((k) => k.keyword);
                return (
                  <motion.div key={post.id} variants={itemVariants}>
                    <Card className="group flex h-full flex-col overflow-hidden border-border/50 bg-card/80 transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                      {/* Card Image */}
                      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                        <img
                          src={imageUrl}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.src = FALLBACK_IMAGE;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>

                      <CardContent className="flex flex-1 flex-col gap-4 p-6">
                        <div className="flex flex-wrap gap-2">
                          {tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="border-primary/10 bg-primary/5 px-2 py-0 text-[10px] uppercase tracking-wider text-primary"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex-1 space-y-3">
                          <h3 className="line-clamp-2 text-xl font-bold leading-tight transition-colors group-hover:text-primary">
                            {post.title}
                          </h3>
                          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                            {post.description || 'Read more to explore this research perspective.'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-border/40 pt-4">
                          <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={12} className="text-primary/60" />
                              {new Date(post.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </div>
                          </div>

                          <Link to={`/blog/${post.id}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="group/btn hover:bg-primary/8 h-8 rounded-full px-4 text-xs font-semibold text-primary transition-all hover:text-primary"
                            >
                              Read More
                              <ArrowRight
                                className="ml-1.5 transition-transform group-hover/btn:translate-x-1"
                                size={14}
                              />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};
