// web/src/lib/api.ts
// Public-only read-only API client pointing to production API.

const API_URL = import.meta.env.VITE_API_URL || 'https://api.brainlabsinc.org/api/v1';

async function request<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`);
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error((err as any).error || response.statusText || 'API Request failed');
  }
  return response.json() as Promise<T>;
}

// ── Type definitions ─────────────────────────────────────────────────────────

export interface PublicMember {
  id: number;
  first_name: string;
  second_name: string;
  slug: string;
  contact_email: string;
}

export interface PublicResearcher {
  member_id: number;
  country: string | null;
  image_url: string | null;
  bio: string | null;
  occupation: string | null;
  workplace: string | null;
  member: PublicMember;
  educational_background?: { id: number; degree: string }[];
  ongoing_research?: { id: number; title: string }[];
}

export interface PublicBlog {
  id: number;
  title: string;
  description: string | null;
  content?: string;
  created_at: string;
  updated_at: string;
  member: PublicMember | null;
  former_member: { member_id: number; former_role: string } | null;
  blog_keyword: { keyword: string }[];
  blog_image: { image_url: string }[];
}

export interface PublicProject {
  id: number;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  member: PublicMember | null;
  project_diagram: { diagram_url: string }[];
}

export interface PublicEvent {
  id: number;
  title: string;
  description: string | null;
  event_datetime: string;
  premises: string | null;
  host: string | null;
  created_at: string;
  researcher: {
    member_id: number;
    member: { first_name: string; second_name: string; slug: string };
  } | null;
  event_image: { image_url: string }[];
}

export interface PublicPublication {
  id: number;
  title: string;
  created_at: string;
  member: PublicMember | null;
  conference_paper: {
    paper_id: string | null;
    link: string | null;
    description: string | null;
  } | null;
  book: { isbn: string | null; link: string | null; description: string | null } | null;
  journal: { issn: string | null; link: string | null; description: string | null } | null;
  article: { doi: string | null; link: string | null; description: string | null } | null;
}

export interface PublicGrant {
  id: number;
  title: string;
  description: string | null;
  passed_date: string | null;
  expire_date: string | null;
  member: PublicMember | null;
  grant_document: { id: number; doc_url: string; doc_label: string | null }[];
}

export interface PublicStats {
  researchers: number;
  projects: number;
  publications: number;
}

// ── API surface ───────────────────────────────────────────────────────────────

export const api = {
  researchers: {
    list: () => request<PublicResearcher[]>('/researchers'),
    get: (slug: string) => request<PublicResearcher>(`/researchers/${slug}`),
  },
  blogs: {
    list: () => request<PublicBlog[]>('/blogs'),
    get: (id: string | number) => request<PublicBlog>(`/blogs/${id}`),
  },
  projects: {
    list: () => request<PublicProject[]>('/projects'),
    get: (id: string | number) => request<PublicProject>(`/projects/${id}`),
  },
  events: {
    list: () => request<PublicEvent[]>('/events'),
    get: (id: string | number) => request<PublicEvent>(`/events/${id}`),
  },
  publications: {
    list: () => request<PublicPublication[]>('/publications'),
    get: (id: string | number) => request<PublicPublication>(`/publications/${id}`),
  },
  grants: {
    list: () => request<PublicGrant[]>('/grants'),
  },
  stats: {
    get: () => request<PublicStats>('/stats'),
  },
};
