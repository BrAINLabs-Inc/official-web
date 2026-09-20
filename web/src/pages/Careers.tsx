import { Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getLucideIcon } from '@/lib/icons';
import { SEO } from '@/components/shared/SEO';
import { Section } from '@/components/sections/Section';
import { PageHero } from '@/components/sections/PageHero';
import { SectionIntro } from '@/components/sections/SectionIntro';
import { MatrixGrid, MatrixCard } from '@/components/sections/MatrixGrid';
import { CTASection } from '@/components/sections/CTASection';
import { IconBox } from '@/components/ui/IconBox';
import { accentOrder } from '@/lib/accents';
import { careersBenefits, careersFaqs } from '@/data/general';

export const Careers = () => (
  <div className="bg-transparent transition-colors">
    <SEO
      title="Careers at BrAIN Labs"
      description="Join BrAIN Labs and contribute to cutting-edge AI and neuroscience research. Explore open positions and opportunities."
      keywords={[
        'BrAIN Labs Careers',
        'AI Research Jobs',
        'Neuroscience Jobs',
        'Research Positions',
        'Internships',
      ]}
    />

    <PageHero
      eyebrow="CAREERS & OPPORTUNITIES"
      icon={<Briefcase size={13} className="text-indigo-600 dark:text-indigo-400" />}
      title="Build the future of AI research."
      description="Join a world-class team of researchers and engineers working at the intersection of artificial intelligence and neuroscience."
      stats={[
        { value: '100%', label: 'Research Autonomy' },
        { value: 'Global', label: 'Remote & Hybrid Options', accent: true },
      ]}
    />

    <Section>
      <SectionIntro
        accent
        eyebrow="OPPORTUNITIES & CULTURE"
        title="Why Join BrAIN Labs"
        description="We offer an environment where curiosity meets impact. Here is what makes our group special."
        className="mb-12"
      />
      <MatrixGrid cols={2}>
        {careersBenefits.map((benefit, idx) => {
          const BenefitIcon = getLucideIcon(benefit.iconName, CheckCircle2);
          const accent = accentOrder[idx % accentOrder.length];
          return (
            <MatrixCard key={idx}>
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-neutral-400">0{idx + 1}</span>
                <IconBox icon={<BenefitIcon size={20} />} accent={accent} />
              </div>
              <h3 className="font-display text-lg font-bold text-neutral-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {benefit.description}
              </p>
            </MatrixCard>
          );
        })}
      </MatrixGrid>
    </Section>

    <Section>
      <SectionIntro eyebrow="OPEN POSITIONS" title="Current Openings" className="mb-12" />
      <div className="border-l border-t border-neutral-200 dark:border-neutral-800">
        <div className="border-b border-r border-neutral-200 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-white p-8 text-center dark:border-neutral-800 dark:from-neutral-900/60 dark:via-neutral-900/40 dark:to-indigo-950/20 md:p-14">
          <IconBox icon={<Briefcase size={22} />} size="lg" className="mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
            No active listings at the moment
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            We are always looking for exceptional researchers, PhD students, and engineers. Send us
            your CV for future consideration.
          </p>
          <div className="mt-6">
            <a
              href="mailto:mahima.w@sliit.lk"
              className="inline-flex items-center gap-2 bg-indigo-600 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-indigo-700"
            >
              <span>Send Your CV</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </Section>

    <CTASection
      eyebrow="JOIN OUR RESEARCH GROUP"
      title="Ready to Shape the Future?"
      description="Whether you're a PhD student, postdoc, or experienced researcher, we'd love to hear from you. Drop us a line and let's explore how you can contribute."
      actions={[{ label: 'Get in Touch', to: '/contact', icon: <ArrowRight size={14} /> }]}
    />

    <Section>
      <SectionIntro
        eyebrow="COMMON QUESTIONS"
        title="Frequently Asked Questions"
        className="mb-12"
      />
      <div className="border-l border-t border-neutral-200 dark:border-neutral-800">
        {careersFaqs.map((item, idx) => (
          <div
            key={idx}
            className="border-b border-r border-neutral-200 bg-slate-50/50 p-6 transition-colors hover:bg-indigo-50/20 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:bg-indigo-950/20 md:p-8"
          >
            <h3 className="flex items-center gap-3 text-base font-bold text-neutral-900 dark:text-white">
              <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400">
                Q.0{idx + 1}
              </span>
              {item.q}
            </h3>
            <p className="mt-3 pl-8 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </Section>
  </div>
);
