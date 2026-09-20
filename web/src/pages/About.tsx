import { Target, ArrowRight } from 'lucide-react';
import { getLucideIcon } from '@/lib/icons';
import { SEO } from '@/components/shared/SEO';
import { Section } from '@/components/sections/Section';
import { PageHero } from '@/components/sections/PageHero';
import { SectionIntro } from '@/components/sections/SectionIntro';
import { MatrixGrid, MatrixCard } from '@/components/sections/MatrixGrid';
import { IconBox } from '@/components/ui/IconBox';
import { accentOrder } from '@/lib/accents';
import { LinkButton } from '@/components/ui/LinkButton';
import { mission, collaborations, futureDirections, faq } from '@/data/general';

export const About = () => (
  <div className="bg-transparent transition-colors">
    <SEO
      title="About BrAIN Labs"
      description="Learn about BrAIN Labs' mission to pioneer AI and neuroscience research, our collaborations, and future directions."
      keywords={['About BrAIN Labs', 'AI Mission', 'Neuroscience Research', 'AI Collaborations']}
    />

    <PageHero
      eyebrow="ABOUT BrAIN LABS"
      icon={<Target size={13} className="text-indigo-600 dark:text-indigo-400" />}
      title="Pioneering AI & Neuroscience research."
      description="Exploring the intersection of artificial intelligence and neuroscience to build the next generation of intelligent, interpretable, and energy-efficient systems."
      stats={[
        { value: 3, label: 'Core Pillars' },
        { value: '100%', label: 'Nature-Inspired AI Focus', accent: true },
      ]}
    />

    <Section>
      <SectionIntro
        accent
        eyebrow="OUR PURPOSE"
        title={mission.title}
        description={mission.description}
        className="mb-12"
      />
      <MatrixGrid>
        {mission.points.map((point, idx) => {
          const PointIcon = getLucideIcon(point.iconName, Target);
          const accent = accentOrder[idx % accentOrder.length];
          return (
            <MatrixCard key={idx} className="justify-between">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-neutral-400">0{idx + 1}</span>
                <IconBox icon={<PointIcon size={20} />} accent={accent} />
              </div>
              <p className="text-sm font-semibold leading-relaxed text-neutral-800 transition-colors group-hover:text-indigo-600 dark:text-neutral-200 dark:group-hover:text-indigo-400">
                {point.text}
              </p>
            </MatrixCard>
          );
        })}
      </MatrixGrid>
    </Section>

    <Section tone="dark" topBorder={false} id="collaborations">
      <SectionIntro
        dark
        accent
        eyebrow="PARTNERSHIPS & COLLABORATIONS"
        title={collaborations.title}
        description={collaborations.description}
      />
      <div className="mt-8">
        <LinkButton to="/contact" variant="onDark" icon={<ArrowRight size={14} />}>
          Partner with Us
        </LinkButton>
      </div>
    </Section>

    <Section>
      <SectionIntro
        accent
        eyebrow="ROADMAP & VISION"
        title={futureDirections.title}
        description={futureDirections.description}
        className="mb-12"
      />
      <MatrixGrid cols={2}>
        {futureDirections.points.map((point, idx) => (
          <MatrixCard key={idx}>
            <span className="mb-4 font-mono text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
              0{idx + 1}.
            </span>
            <p className="text-sm leading-relaxed text-neutral-700 transition-colors group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-white">
              {point}
            </p>
          </MatrixCard>
        ))}
      </MatrixGrid>
    </Section>

    <Section>
      <SectionIntro
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="Everything you need to know about BrAIN Labs."
        className="mb-12"
      />
      <div className="border-l border-t border-neutral-200 dark:border-neutral-800">
        {faq.map((item, idx) => (
          <div
            key={idx}
            className="border-b border-r border-neutral-200 bg-slate-50/50 p-6 transition-colors hover:bg-indigo-50/20 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:bg-indigo-950/20 md:p-8"
          >
            <h3 className="flex items-center gap-3 text-base font-bold text-neutral-900 dark:text-white">
              <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400">
                Q.0{idx + 1}
              </span>
              {item.question}
            </h3>
            <p className="mt-3 pl-8 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </Section>
  </div>
);
