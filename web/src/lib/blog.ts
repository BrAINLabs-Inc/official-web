import { blogPosts, type BlogPostItem } from '@/data/blogs';

/** All posts, newest first. */
export const postsNewestFirst = [...blogPosts].sort((a, b) =>
  b.created_at.localeCompare(a.created_at)
);

export const postPath = (post: Pick<BlogPostItem, 'id'>) => `/blog/${post.id}`;

/** Estimated reading time at ~200 words per minute. */
export const readMinutes = (post: Pick<BlogPostItem, 'content'>) =>
  Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200));

export const formatPostDate = (iso: string, month: 'short' | 'long' = 'short') =>
  new Date(iso).toLocaleDateString('en-US', { month, day: 'numeric', year: 'numeric' });
