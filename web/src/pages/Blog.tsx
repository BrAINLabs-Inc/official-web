import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/shared/SEO';
import { Section } from '@/components/sections/Section';
import { PageHero } from '@/components/sections/PageHero';
import { MatrixGrid, MatrixCard } from '@/components/sections/MatrixGrid';
import { Tag } from '@/components/ui/Tag';
import { blogPosts } from '@/data/blogs';

export const Blog = () => (
  <div className="bg-transparent transition-colors">
    <SEO
      title="Blog | BrAIN Labs"
      description="Explore our latest research perspectives and insights at the intersection of AI and Neuroscience."
    />

    <PageHero
      eyebrow="RESEARCH BLOG"
      icon={<BookOpen size={13} className="text-indigo-600 dark:text-indigo-400" />}
      title="Perspectives & deep dives into Brain-AI."
      description="Insights and deep dives into the frontiers of Brain-Inspired Intelligence and Neuromorphic systems."
    />

    <Section className="py-12 md:py-16">
      <MatrixGrid>
        {blogPosts.map((post) => (
          <MatrixCard key={post.id} className="h-full justify-between">
            <div>
              <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mb-3 flex flex-wrap gap-1.5">
                {post.keywords.slice(0, 2).map((tag) => (
                  <Tag key={tag} tone="indigo">
                    {tag}
                  </Tag>
                ))}
              </div>

              <h2 className="font-display text-lg font-bold leading-snug text-neutral-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                {post.title}
              </h2>

              {post.description && (
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {post.description}
                </p>
              )}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-4 text-xs text-neutral-500 dark:border-neutral-800">
              <div className="flex items-center gap-1.5 font-mono">
                <Calendar size={13} />
                <span>
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <Link
                to={`/blog/${post.id}`}
                className="inline-flex items-center gap-1 font-semibold uppercase tracking-[0.08em] text-neutral-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400"
              >
                <span>Read</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </MatrixCard>
        ))}
      </MatrixGrid>
    </Section>
  </div>
);
