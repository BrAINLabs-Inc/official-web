import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Cpu,
  BrainCircuit,
  ArrowRight,
  Smartphone,
  Radio,
  Github,
  ExternalLink,
  X,
} from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { Section } from '@/components/sections/Section';
import { PageHero } from '@/components/sections/PageHero';
import { MatrixGrid, MatrixCard } from '@/components/sections/MatrixGrid';
import { CTASection } from '@/components/sections/CTASection';
import { IconBox } from '@/components/ui/IconBox';
import { accentOrder } from '@/lib/accents';
import { Tag } from '@/components/ui/Tag';
import { projects, projectCategories, type Project } from '@/data/projects';

type Filter = 'All' | 'LLMs' | 'Neuromorphic' | 'Platforms & Apps' | 'Hardware & BCI';

interface SelectedMedia {
  url: string;
  title: string;
  type: 'image' | 'video';
}

const filters: { id: Filter; label: string; icon?: typeof Cpu }[] = [
  { id: 'All', label: 'All Projects' },
  { id: 'LLMs', label: 'LLMs', icon: Cpu },
  { id: 'Neuromorphic', label: 'Neuromorphic', icon: BrainCircuit },
  { id: 'Platforms & Apps', label: 'Platforms & Apps', icon: Smartphone },
  { id: 'Hardware & BCI', label: 'Hardware & BCI', icon: Radio },
];

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'LLMs':
      return <Cpu size={18} />;
    case 'Neuromorphic':
      return <BrainCircuit size={18} />;
    case 'Platforms & Apps':
      return <Smartphone size={18} />;
    case 'Hardware & BCI':
      return <Radio size={18} />;
    default:
      return <Cpu size={18} />;
  }
};

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMedia(null);
      }
    };

    const headerEl = document.querySelector('header');

    if (selectedMedia) {
      document.body.style.overflow = 'hidden';
      if (headerEl) {
        headerEl.style.display = 'none';
      }
    } else {
      document.body.style.overflow = '';
      if (headerEl) {
        headerEl.style.display = '';
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      if (headerEl) {
        headerEl.style.display = '';
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMedia]);

  const filteredCategories =
    activeFilter === 'All'
      ? projectCategories
      : projectCategories.filter((cat) => cat.id === activeFilter);

  return (
    <div className="bg-transparent transition-colors">
      <SEO
        title="Our Research - Projects"
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
        eyebrow="OUR RESEARCH"
        icon={<Cpu size={13} className="text-indigo-600 dark:text-indigo-400" />}
        title="Innovative research in LLMs, Neuromorphic computing, Platforms & Hardware."
        description="Exploring the frontiers of AI through curriculum learning, spiking neural networks, mindfulness platforms, and BCI EEG hardware setups."
        stats={[
          { value: projects.length, label: 'Active Projects' },
          { value: projectCategories.length, label: 'Research Areas', accent: true },
        ]}
      />

      <Section className="py-12 md:py-16">
        <div className="mb-12 flex flex-wrap items-center gap-2">
          {filters.map((filter) => {
            const active = activeFilter === filter.id;
            const count =
              filter.id === 'All'
                ? projects.length
                : projects.filter((p) => p.category === filter.id).length;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`inline-flex items-center gap-2 border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors rounded-none ${
                  active
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-neutral-300 text-neutral-700 hover:border-indigo-600 hover:text-indigo-600 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-indigo-400 dark:hover:text-indigo-400'
                }`}
              >
                {filter.icon && <filter.icon size={14} />}
                {filter.label} ({count})
              </button>
            );
          })}
        </div>

        <div className="space-y-16">
          {filteredCategories.map((category, catIdx) => {
            const categoryProjects = projects.filter((p) => p.category === category.id);
            const accent = accentOrder[catIdx % accentOrder.length];
            const hasMedia = categoryProjects.some(
              (p) => (p.images && p.images.length > 0) || p.videoUrl
            );
            const gridCols = hasMedia ? 2 : 3;

            return (
              <div key={category.id} className="space-y-6">
                <div className="border-b border-neutral-200 pb-4 dark:border-neutral-800">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <IconBox icon={getCategoryIcon(category.id)} accent={accent} />
                      <h2 className="text-xl font-bold uppercase tracking-tight text-neutral-900 dark:text-white">
                        {category.name}
                      </h2>
                    </div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      {category.count} {category.count === 1 ? 'project' : 'projects'}
                    </span>
                  </div>
                  <p className="max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {category.description}
                  </p>
                </div>

                <MatrixGrid cols={gridCols}>
                  {categoryProjects.map((project: Project) => (
                    <MatrixCard key={project.id} className="justify-between">
                      <div>
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Tag tone="indigo">{project.badge || project.category}</Tag>
                            {project.logoUrl && (
                              <div className="flex items-center gap-1.5 border border-neutral-300 bg-white px-2 py-0.5 dark:border-neutral-700 dark:bg-white rounded-none">
                                <span className="font-mono text-[10px] font-bold text-neutral-800">
                                  PARTNER
                                </span>
                                <img
                                  src={project.logoUrl}
                                  alt="Partner Logo"
                                  className="h-5 w-auto object-contain rounded-none"
                                />
                              </div>
                            )}
                          </div>
                          <span className="font-mono text-[11px] text-neutral-400">
                            #0{project.id}
                          </span>
                        </div>

                        <h3 className="font-display text-lg font-bold leading-snug text-neutral-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                          {project.title}
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                          {project.description}
                        </p>

                        {project.notice && (
                          <div className="mt-4 border-l-2 border-indigo-500 bg-indigo-500/10 px-3 py-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300 rounded-none">
                            {project.notice}
                          </div>
                        )}

                        {project.videoUrl && (
                          <div className="mt-4 overflow-hidden border border-neutral-200 dark:border-neutral-800 rounded-none">
                            <video
                              ref={(el) => {
                                if (el) {
                                  el.muted = true;
                                  el.volume = 0;
                                }
                              }}
                              src={project.videoUrl}
                              controls
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              onVolumeChange={(e) => {
                                e.currentTarget.muted = true;
                                e.currentTarget.volume = 0;
                              }}
                              className="max-h-64 sm:max-h-72 w-full object-contain rounded-none"
                            />
                          </div>
                        )}

                        {project.images && project.images.length > 0 && (
                          <div
                            className={`mt-4 grid gap-3 ${
                              project.images.length === 1
                                ? 'grid-cols-1'
                                : 'grid-cols-1 sm:grid-cols-2'
                            }`}
                          >
                            {project.images.map((img, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() =>
                                  setSelectedMedia({
                                    url: img,
                                    title: `${project.title} (${idx + 1}/${project.images?.length})`,
                                    type: 'image',
                                  })
                                }
                                className="group/img flex items-center justify-center overflow-hidden border border-neutral-200 dark:border-neutral-800 rounded-none text-left cursor-pointer"
                              >
                                <img
                                  src={img}
                                  alt={`${project.title} screenshot ${idx + 1}`}
                                  className="max-h-64 sm:max-h-72 w-full object-contain rounded-none"
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-200/80 pt-4 text-[11px] font-semibold text-neutral-500 dark:border-neutral-800">
                        <span>{project.author || 'BrAIN Labs Research Group'}</span>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                          >
                            <Github size={13} />
                            <span>GitHub Repo</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </MatrixCard>
                  ))}
                </MatrixGrid>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Lightbox Media View Modal - Rendered outside stacking context via React Portal, header hidden */}
      {selectedMedia &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedMedia(null)}
          >
            <div
              className="relative flex max-h-[92vh] max-w-6xl flex-col overflow-hidden border border-neutral-800 bg-neutral-950 p-4 shadow-2xl rounded-none w-full cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between border-b border-neutral-800 pb-3">
                <h4 className="font-display text-xs sm:text-sm font-bold text-white uppercase tracking-wider truncate pr-4">
                  {selectedMedia.title}
                </h4>
                <button
                  type="button"
                  onClick={() => setSelectedMedia(null)}
                  className="flex items-center gap-1 border border-neutral-800 px-3 py-1.5 text-xs font-mono font-semibold text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors rounded-none bg-neutral-900 cursor-pointer"
                >
                  <X size={15} />
                  <span>CLOSE</span>
                </button>
              </div>
              <div className="flex flex-1 items-center justify-center overflow-auto p-2">
                {selectedMedia.type === 'video' ? (
                  <video
                    ref={(el) => {
                      if (el) {
                        el.muted = true;
                        el.volume = 0;
                      }
                    }}
                    src={selectedMedia.url}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    onVolumeChange={(e) => {
                      e.currentTarget.muted = true;
                      e.currentTarget.volume = 0;
                    }}
                    className="max-h-[78vh] w-full object-contain rounded-none"
                  />
                ) : (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.title}
                    className="max-h-[78vh] w-auto object-contain rounded-none"
                  />
                )}
              </div>
            </div>
          </div>,
          document.body
        )}

      <CTASection
        compact
        title="Interested in our research projects?"
        description="Get in touch with our research team or explore opportunities to collaborate."
        actions={[{ label: 'Contact Researchers', to: '/contact', icon: <ArrowRight size={14} /> }]}
      />
    </div>
  );
};




