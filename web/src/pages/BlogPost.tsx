import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '@/components/shared/SEO';
import {
  ArrowLeft,
  Calendar,
  User,
  Tag as TagIcon,
  Clock,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { Section } from '@/components/sections/Section';
import { CTASection } from '@/components/sections/CTASection';
import { Tag } from '@/components/ui/Tag';
import { LinkButton } from '@/components/ui/LinkButton';
import { blogPosts, type BlogPostItem } from '@/data/blogs';

export const BlogPost = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  const post: BlogPostItem = blogPosts.find((p) => String(p.id) === id) || blogPosts[0];

  if (!post) {
    return (
      <div className="min-h-screen bg-white transition-colors dark:bg-neutral-950">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center">
          <h2 className="font-display text-3xl font-bold text-neutral-900 dark:text-white">
            Article not found
          </h2>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
            The blog post you are looking for does not exist or has been moved.
          </p>
          <div className="mt-6">
            <LinkButton to="/blog" icon={<ArrowLeft size={14} />}>
              Back to Blog
            </LinkButton>
          </div>
        </div>
      </div>
    );
  }

  const readTimeMinutes = Math.max(1, Math.ceil((post.content?.split(' ').length ?? 0) / 200));

  return (
    <div className="bg-transparent transition-colors">
      <SEO title={`${post.title} | BrAIN Labs Blog`} description={post.description ?? post.title} />

      <Section topBorder={false} corners className="pb-14 pt-12 md:pt-16">
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 border border-neutral-300 bg-neutral-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-700 transition-colors hover:border-indigo-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-indigo-400"
          >
            <ArrowLeft size={14} />
            <span>Back to Blog</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-7">
            <Tag tone="indigo" className="inline-flex items-center gap-2 py-1">
              <BookOpen size={12} />
              RESEARCH PERSPECTIVE
            </Tag>

            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 dark:text-white md:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 border-t border-neutral-200 pt-2 font-mono text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <User size={14} className="text-indigo-600 dark:text-indigo-400" />
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {post.author}
                </span>
              </div>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-indigo-600 dark:text-indigo-400" />
                <span>
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-indigo-600 dark:text-indigo-400" />
                <span>{readTimeMinutes} min read</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden border border-neutral-200 bg-slate-50 p-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950">
                <img src={post.imageUrl} alt={post.title} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl space-y-10">
          {post.description && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-l-4 border-indigo-600 bg-slate-50/70 p-6 dark:border-indigo-400 dark:bg-neutral-900/50 md:p-8"
            >
              <p className="text-lg font-medium italic leading-relaxed text-neutral-800 dark:text-neutral-200 md:text-xl">
                "{post.description}"
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6 text-base leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-lg"
          >
            <p className="whitespace-pre-line">{post.content}</p>
          </motion.div>

          {post.keywords && post.keywords.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-neutral-200 pt-8 dark:border-neutral-800">
              <div className="mr-3 flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <TagIcon size={13} />
                <span>Tags</span>
              </div>
              {post.keywords.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </div>
      </Section>

      <CTASection
        compact
        title="Explore more research perspectives."
        description="Read our latest articles on computational neuroscience, explainable AI, and neural network optimization."
        actions={[
          { label: 'All Articles', to: '/blog', icon: <BookOpen size={14} /> },
          { label: 'Our Projects', to: '/projects', icon: <ArrowRight size={14} /> },
        ]}
      />
    </div>
  );
};
