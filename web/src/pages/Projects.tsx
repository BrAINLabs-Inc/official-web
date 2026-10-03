import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResearchLabIcon } from '@/components/ui/PageIcons';
import {
  BrainCircuit,
  Cpu,
  ExternalLink,
  Github,
  Layers,
  Radio,
  Smartphone,
  X,
} from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { PageHero } from '@/components/shared/PageHero';
import { projects, projectCategories, type Project } from '@/data/projects';

type Filter = 'All' | Project['category'];

interface SelectedImage {
  url: string;
  title: string;
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

const ProjectCard = ({
  project,
  idx,
  onOpenImage,
}: {
  project: Project;
  idx: number;
  onOpenImage: (img: SelectedImage) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: idx * 0.08, duration: 0.5 }}
  >
    <Card className="group flex h-full flex-col border-border/50 bg-card/80 transition-all duration-300 hover:border-primary/40 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-primary/8 rounded-full border border-primary/15 px-2.5 text-[10px] font-semibold uppercase tracking-wide text-primary"
            >
              {project.badge || project.category}
            </Badge>
            {project.logoUrl && (
              <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-white px-2.5 py-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-700">
                  Partner
                </span>
                <img
                  src={project.logoUrl}
                  alt="Partner logo"
                  className="h-4 w-auto object-contain"
                />
              </div>
            )}
          </div>
          <span className="text-[11px] font-medium text-muted-foreground/50">
            #{String(project.id).padStart(2, '0')}
          </span>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary transition-transform group-hover:scale-150" />
          <CardTitle className="text-base font-semibold leading-snug transition-colors group-hover:text-primary">
            {project.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <CardDescription className="pl-4 text-sm leading-relaxed">
          {project.description}
        </CardDescription>

        {project.notice && (
          <div className="bg-primary/6 ml-4 mt-4 rounded-lg border border-primary/15 px-3 py-2 text-xs font-medium text-primary">
            {project.notice}
          </div>
        )}

        {project.videoUrl && (
          <div className="ml-4 mt-4 overflow-hidden rounded-lg border border-border/50 bg-muted">
            <MutedVideo src={project.videoUrl} className="max-h-72 w-full object-contain" />
          </div>
        )}

        {project.images && project.images.length > 0 && (
          <div
            className={`ml-4 mt-4 grid gap-3 ${
              project.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
            }`}
          >
            {project.images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() =>
                  onOpenImage({
                    url: img,
                    title: `${project.title} (${i + 1}/${project.images?.length})`,
                  })
                }
                className="flex cursor-zoom-in items-center justify-center overflow-hidden rounded-lg border border-border/50 bg-muted"
              >
                <img
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="max-h-72 w-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pl-4 pt-5 text-[11px] text-muted-foreground/60">
          <span>{project.author || 'BrAIN Labs Research Group'}</span>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-primary transition-opacity hover:opacity-70"
            >
              <Github size={13} />
              GitHub Repo
              <ExternalLink size={11} />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  useEffect(() => {
    if (!selectedImage) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedImage(null);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedImage]);

  const visibleCategories =
    activeFilter === 'All'
      ? projectCategories
      : projectCategories.filter((cat) => cat.id === activeFilter);

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

      {/* ── Filters + Projects ────────────────────────────────── */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-wrap gap-2">
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
                  onClick={() => setActiveFilter(filter.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 ${
                    active
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  <filter.icon size={13} />
                  {filter.label}
                  <span className={active ? 'opacity-70' : 'opacity-50'}>({count})</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-16">
            {visibleCategories.map((category) => {
              const categoryProjects = projects.filter((p) => p.category === category.id);
              const hasMedia = categoryProjects.some((p) => p.images?.length || p.videoUrl);
              const Icon = categoryIcon(category.id);

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mx-auto mb-8 max-w-7xl">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <div className="rounded-xl border border-primary/15 bg-primary/10 p-2">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <h2 className="text-xl font-bold tracking-tight md:text-2xl">
                        {titleCase(category.name)}
                      </h2>
                      <Badge
                        variant="secondary"
                        className="bg-primary/8 rounded-full border border-primary/15 px-2.5 text-[10px] font-semibold uppercase tracking-wide text-primary"
                      >
                        {categoryProjects.length}{' '}
                        {categoryProjects.length === 1 ? 'project' : 'projects'}
                      </Badge>
                    </div>
                    <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>
                  </div>

                  <div
                    className={`mx-auto grid max-w-7xl gap-5 md:grid-cols-2 ${
                      hasMedia ? '' : 'lg:grid-cols-3'
                    }`}
                  >
                    {categoryProjects.map((project, idx) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        idx={idx}
                        onOpenImage={setSelectedImage}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Image lightbox ───────────────────────────────────── */}
      {selectedImage &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/85 p-4 sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative flex max-h-[92vh] w-full max-w-6xl cursor-default flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <h4 className="truncate text-sm font-semibold text-white">{selectedImage.title}</h4>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close"
                  className="rounded-full border border-white/15 p-1.5 text-neutral-300 transition-colors hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex flex-1 items-center justify-center overflow-auto p-2">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="max-h-[78vh] w-auto rounded-lg object-contain"
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
