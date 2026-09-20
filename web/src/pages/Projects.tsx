import { useState } from 'react';
import { Cpu, BrainCircuit, ArrowRight } from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { Section } from '@/components/sections/Section';
import { PageHero } from '@/components/sections/PageHero';
import { MatrixGrid, MatrixCard } from '@/components/sections/MatrixGrid';
import { CTASection } from '@/components/sections/CTASection';
import { IconBox } from '@/components/ui/IconBox';
import { accentOrder } from '@/lib/accents';
import { Tag } from '@/components/ui/Tag';
import { projects, projectCategories } from '@/data/projects';

type Filter = 'All' | 'LLMs' | 'Neuromorphic';

const filters: { id: Filter; label: string; icon?: typeof Cpu }[] = [
  { id: 'All', label: 'All Projects' },
  { id: 'LLMs', label: 'LLMs', icon: Cpu },
  { id: 'Neuromorphic', label: 'Neuromorphic', icon: BrainCircuit },
];

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filteredCategories =
    activeFilter === 'All'
      ? projectCategories
      : projectCategories.filter((cat) => cat.id === activeFilter);

  return (
    <div className="bg-transparent transition-colors">
      <SEO
        title="Our Research - Projects"
        description="Exploring the frontiers of AI through innovative research in large language models and neuromorphic computing."
        keywords={['AI Research', 'BrAIN Labs Projects', 'Neuromorphic Computing', 'LLM Research']}
      />

      <PageHero
        eyebrow="OUR RESEARCH"
        icon={<Cpu size={13} className="text-indigo-600 dark:text-indigo-400" />}
        title="Innovative research in LLMs & Neuromorphic computing."
        description="Exploring the frontiers of AI through innovative research in large language models and neuromorphic computing."
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
                className={`inline-flex items-center gap-2 border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
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
            return (
              <div key={category.id} className="space-y-6">
                <div className="border-b border-neutral-200 pb-4 dark:border-neutral-800">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <IconBox
                        icon={
                          category.id === 'LLMs' ? <Cpu size={18} /> : <BrainCircuit size={18} />
                        }
                        accent={accent}
                      />
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

                <MatrixGrid>
                  {categoryProjects.map((project) => (
                    <MatrixCard key={project.id} className="justify-between">
                      <div>
                        <div className="mb-4 flex items-center justify-between">
                          <Tag tone="indigo">{project.category}</Tag>
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
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-neutral-200/80 pt-4 text-[11px] font-semibold text-neutral-500 dark:border-neutral-800">
                        <span>{project.author || 'BrAIN Labs Research Group'}</span>
                      </div>
                    </MatrixCard>
                  ))}
                </MatrixGrid>
              </div>
            );
          })}
        </div>
      </Section>

      <CTASection
        compact
        title="Interested in our research projects?"
        description="Get in touch with our research team or explore opportunities to collaborate."
        actions={[{ label: 'Contact Researchers', to: '/contact', icon: <ArrowRight size={14} /> }]}
      />
    </div>
  );
};
