import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ResearchLabIcon } from '@/components/ui/PageIcons';
import {
  ArrowRight,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  Cpu,
  ExternalLink,
  Github,
  Info,
  Layers,
  Maximize2,
  Play,
  Radio,
  Smartphone,
  Users,
  X,
} from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { PageHero } from '@/components/shared/PageHero';
import { cn } from '@/lib/utils';
import { projects, projectCategories, type Project } from '@/data/projects';

type Filter = 'All' | Project['category'];

type MediaItem = { type: 'video' | 'image'; src: string };

interface Lightbox {
  title: string;
  images: string[];
  index: number;
}

const filters: { id: Filter; label: string; icon: typeof Cpu }[] = [
  { id: 'All', label: 'All Projects', icon: Layers },
  { id: 'LLMs', label: 'LLMs', icon: Cpu },
  { id: 'Neuromorphic', label: 'Neuromorphic', icon: BrainCircuit },
  { id: 'Platforms & Apps', label: 'Platforms & Apps', icon: Smartphone },
  { id: 'Hardware & BCI', label: 'Hardware & BCI', icon: Radio },
];

const ACRONYMS: Record<string, string> = {
  SNNS: 'SNNs',
  EEG: 'EEG',
  LLMS: 'LLMs',
  BCI: 'BCI',
  CMR: 'CMR',
};

/** "NEUROMORPHIC COMPUTING & SNNS" -> "Neuromorphic Computing & SNNs" */
const titleCase = (s: string) =>
  s
    .split(' ')
    .map((w) => ACRONYMS[w.toUpperCase()] ?? w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ');

const categoryIcon = (id: Filter) => filters.find((f) => f.id === id)?.icon ?? Cpu;

const mediaOf = (p: Project): MediaItem[] => [
  ...(p.videoUrl ? [{ type: 'video' as const, src: p.videoUrl }] : []),
  ...(p.images ?? []).map((src) => ({ type: 'image' as const, src })),
];

/** Video that always stays muted, even if the user un-mutes it via the controls. */
const MutedVideo = ({ src, className }: { src: string; className?: string }) => (
  <video
    ref={(el) => {
      if (el) {
        el.muted = true;
        el.volume = 0;
      }
    }}
    src={src}
    controls
    muted
    loop
    playsInline
    preload="metadata"
    onVolumeChange={(e) => {
      e.currentTarget.muted = true;
      e.currentTarget.volume = 0;
    }}
    className={className}
  />
);

// ── Media gallery (main view + thumbnails) ────────────────────────────────────

const ProjectGallery = ({
  project,
  onOpenImage,
}: {
  project: Project;
  onOpenImage: (lightbox: Lightbox) => void;
}) => {
  const media = mediaOf(project);
  const images = project.images ?? [];
  const [active, setActive] = useState(0);
  const current = media[active];

  return (
    <div className="flex flex-col gap-3 bg-muted/40 p-4 md:w-1/2 md:shrink-0">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-neutral-950">
        {current.type === 'video' ? (
          <MutedVideo src={current.src} className="h-full w-full object-contain" />
        ) : (
          <button
            type="button"
            onClick={() =>
              onOpenImage({
                title: project.title,
                images,
                index: images.indexOf(current.src),
              })
            }
            className="group/zoom relative h-full w-full cursor-zoom-in bg-muted"
            aria-label="View image full screen"
          >
            <img
              src={current.src}
              alt={`${project.title} screenshot`}
              loading="lazy"
              className="h-full w-full object-contain"
            />
            <span className="absolute right-3 top-3 rounded-lg bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover/zoom:opacity-100">
              <Maximize2 size={14} />
            </span>
          </button>
        )}
      </div>

      {media.length > 1 && (
        <div className="flex gap-2">
          {media.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={item.type === 'video' ? 'Show video' : `Show image ${i + 1}`}
              aria-pressed={i === active}
              className={cn(
                'relative h-14 w-20 overflow-hidden rounded-lg border-2 bg-muted transition-colors',
                i === active
                  ? 'border-foreground'
                  : 'border-transparent opacity-70 hover:opacity-100'
              )}
            >
              {item.type === 'video' ? (
                <span className="flex h-full w-full items-center justify-center bg-neutral-900 text-white">
                  <Play size={16} />
                </span>
              ) : (
                <img src={item.src} alt="" loading="lazy" className="h-full w-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Project card ──────────────────────────────────────────────────────────────

const ProjectCard = ({
  project,
  onOpenImage,
}: {
  project: Project;
  onOpenImage: (lightbox: Lightbox) => void;
}) => {
  const hasMedia = mediaOf(project).length > 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-colors hover:border-foreground/25',
        hasMedia && 'md:col-span-2 md:flex-row'
      )}
    >
      {hasMedia && <ProjectGallery project={project} onOpenImage={onOpenImage} />}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground/80">
              {project.badge || project.category}
            </span>
            {project.logoUrl && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-700">
                  Partner
                </span>
                <img src={project.logoUrl} alt="Partner logo" className="h-4 w-auto" />
              </span>
            )}
          </div>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="shrink-0 rounded-lg border border-border p-1.5 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <Github size={15} />
            </a>
          )}
        </div>

        <h3 className="text-lg font-semibold leading-snug tracking-tight">{project.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {project.notice && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-border bg-secondary/60 px-3 py-2.5 text-xs font-medium text-foreground/80">
            <Info size={14} className="mt-px shrink-0" />
            {project.notice}
          </div>
        )}

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Users size={13} />
              {project.author || 'BrAIN Labs Research Group'}
            </span>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-foreground transition-opacity hover:opacity-70"
              >
                View repository
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// ── Lightbox ──────────────────────────────────────────────────────────────────

const ImageLightbox = ({
  lightbox,
  onChange,
  onClose,
}: {
  lightbox: Lightbox;
  onChange: (index: number) => void;
  onClose: () => void;
}) => {
  const { images, index, title } = lightbox;
  const count = images.length;
  const go = useCallback(
    (delta: number) => onChange((index + delta + count) % count),
    [index, count, onChange]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [go, onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[100] flex flex-col bg-black/90 p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 pb-4 text-white">
        <p className="truncate text-sm font-medium">
          {title}
          {count > 1 && (
            <span className="ml-2 text-white/50">
              {index + 1} / {count}
            </span>
          )}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-lg border border-white/20 p-2 transition-colors hover:bg-white/10"
        >
          <X size={18} />
        </button>
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-center justify-center overflow-hidden">
        <img
          src={images[index]}
          alt={`${title} (${index + 1} of ${count})`}
          className="max-h-full max-w-full rounded-lg object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const changeImage = useCallback(
    (index: number) => setLightbox((lb) => (lb ? { ...lb, index } : lb)),
    []
  );

  const visibleCategories =
    activeFilter === 'All'
      ? projectCategories
      : projectCategories.filter((cat) => cat.id === activeFilter);

  const selectFilter = (id: Filter) => {
    setActiveFilter(id);
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Research Projects"
        description="Exploring the frontiers of AI, mindfulness platforms, transfer teacher curriculum frameworks, and neuroinformatics hardware."
        keywords={[
          'AI Research',
          'BrAIN Labs Projects',
          'Neuromorphic Computing',
          'LLM Research',
          'OpenBCI EEG',
          'MindFlow App',
        ]}
      />

      <PageHero
        icon={<ResearchLabIcon size={14} />}
        eyebrow="Research Projects"
        title="Our"
        highlight="Research"
        description="Exploring the frontiers of AI through curriculum learning, spiking neural networks, mindfulness platforms, and BCI EEG hardware setups."
        stats={[
          { value: projects.length, label: 'Active Projects' },
          { value: projectCategories.length, label: 'Research Areas' },
        ]}
      />

      {/* ── Sticky filter bar ─────────────────────────────────── */}
      <div
        id="projects"
        className="sticky top-20 z-30 scroll-mt-20 border-y border-border/70 bg-background"
      >
        <div className="container mx-auto px-4">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none]">
            {filters.map((filter) => {
              const active = activeFilter === filter.id;
              const count =
                filter.id === 'All'
                  ? projects.length
                  : projects.filter((p) => p.category === filter.id).length;
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectFilter(filter.id)}
                  className={cn(
                    'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150',
                    active
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                  )}
                >
                  <filter.icon size={14} />
                  {filter.label}
                  <span
                    className={cn(
                      'rounded-full px-1.5 text-[11px]',
                      active ? 'bg-background/20' : 'bg-secondary'
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Categories ────────────────────────────────────────── */}
      <div className="container mx-auto px-4">
        {visibleCategories.map((category) => {
          const categoryProjects = projects.filter((p) => p.category === category.id);
          const Icon = categoryIcon(category.id);
          return (
            <section
              key={category.id}
              className="grid gap-8 border-b border-border/60 py-14 last:border-b-0 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-44">
                  <div className="mb-4 inline-flex rounded-xl border border-border bg-secondary p-2.5">
                    <Icon size={20} />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">{titleCase(category.name)}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {categoryProjects.length}{' '}
                    {categoryProjects.length === 1 ? 'project' : 'projects'}
                  </p>
                </div>
              </div>

              <div className="grid content-start gap-5 md:grid-cols-2 lg:col-span-8">
                {categoryProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} onOpenImage={setLightbox} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-foreground py-20 text-background md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(hsl(var(--background)/0.07)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="container relative mx-auto flex flex-col items-start justify-between gap-8 px-4 md:flex-row md:items-center">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Interested in our research projects?
            </h2>
            <p className="text-base leading-relaxed text-background/70">
              Get in touch with our research team or explore opportunities to collaborate.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-background px-7 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
          >
            Contact Researchers
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {lightbox && (
        <ImageLightbox lightbox={lightbox} onChange={changeImage} onClose={closeLightbox} />
      )}
    </div>
  );
};
