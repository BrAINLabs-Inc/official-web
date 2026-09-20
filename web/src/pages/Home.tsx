import {
  ArrowRight,
  Brain,
  Cpu,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Users,
  Award,
  Zap,
  Activity,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BrainNetwork } from '@/components/ui/BrainNetwork';
import { SEO } from '@/components/shared/SEO';
import { Section } from '@/components/sections/Section';
import { PageHero } from '@/components/sections/PageHero';
import { SectionIntro } from '@/components/sections/SectionIntro';
import { MatrixGrid, MatrixCard } from '@/components/sections/MatrixGrid';
import { CTASection } from '@/components/sections/CTASection';
import { IconBox } from '@/components/ui/IconBox';
import { accentOrder, accentHoverText } from '@/lib/accents';
import { statsData, grants } from '@/data/grants';

const metrics = [
  {
    label: 'Researchers',
    value: statsData.researchers,
    desc: 'Across AI & Neuroscience',
    icon: Users,
  },
  { label: 'Active Projects', value: statsData.projects, desc: 'LLMs & Neuromorphic', icon: Cpu },
  {
    label: 'Publications',
    value: statsData.publications,
    desc: 'Peer-Reviewed Output',
    icon: BookOpen,
  },
  { label: 'Research Areas', value: '2', desc: 'LLMs & Spiking Neural Networks', icon: Brain },
];

const paradigm = [
  {
    title: 'Event-Driven Computing',
    desc: 'Spiking Neural Networks that process information sparsely only when spikes occur, reducing energy consumption by orders of magnitude.',
    icon: Zap,
  },
  {
    title: 'Security & Explainability',
    desc: 'Mitigating vulnerabilities in Large Language Models to prevent data leakage, adversarial attacks, and opaque decision making.',
    icon: ShieldCheck,
  },
  {
    title: 'Neuroinformatics & EEG',
    desc: 'Decoding brain activity through machine learning models tailored for mental health diagnostics and cognitive wellbeing.',
    icon: Activity,
  },
];

const researchAreas = [
  {
    title: 'Large Language Models (LLMs)',
    desc: 'Developing deep learning models that simulate brain activity to understand complex neural dynamics.',
    icon: Cpu,
  },
  {
    title: 'Neuromorphic Computing & SNNs',
    desc: 'Building Spiking Neural Network algorithms for real-time, low-power processing on edge devices.',
    icon: Brain,
  },
  {
    title: 'Model Pruning & Quantization',
    desc: 'Efficient compression techniques to run transformer architectures on resource-constrained hardware.',
    icon: Zap,
  },
  {
    title: 'LLM Security & Privacy',
    desc: 'Investigating model vulnerabilities, data leakage, and adversarial resilience for sensitive domains.',
    icon: ShieldCheck,
  },
  {
    title: 'EEG & Neuroimaging AI',
    desc: 'Applying machine learning to analyze neuroimaging data for early detection of neurological disorders.',
    icon: Activity,
  },
  {
    title: 'Cybersecurity Applications',
    desc: 'Leveraging LLM reasoning for automated threat intelligence, phishing detection, and secure coding.',
    icon: Sparkles,
  },
];

const methodology = [
  {
    num: '01',
    title: 'Biological Abstraction & Modeling',
    desc: 'Extracting key mechanics from cortical computation, event-driven dynamics, and structural plasticity.',
  },
  {
    num: '02',
    title: 'Algorithmic Formulation & Pruning',
    desc: 'Developing specialized learning algorithms, quantization frameworks, and SNN paradigms.',
  },
  {
    num: '03',
    title: 'Empirical Edge Benchmarking',
    desc: 'Testing models across real-world datasets, EEG hardware setups, and edge AI microcontrollers.',
  },
  {
    num: '04',
    title: 'Open Science & Peer Review',
    desc: 'Publishing research findings in leading journals (Nature Scientific Reports, IEEE Access, ArXiv) and open repos.',
  },
];

export const Home = () => (
  <div className="bg-transparent transition-colors">
    <SEO />

    <PageHero
      eyebrow="BrAIN-INSPIRED AI & NEUROINFORMATICS LAB"
      icon={<Brain size={13} className="text-indigo-600 dark:text-indigo-400" />}
      title="Intelligence designed from neural dynamics."
      description="BrAIN Labs is a research laboratory exploring the intersection of Artificial Intelligence, Machine Learning, and Neuroscience to build explainable, resilient, and energy-efficient AI systems."
      graphicPosition="bottom"
      actions={
        <>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-indigo-600 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-indigo-700"
          >
            <span>Our Research</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/team"
            className="inline-flex items-center border border-neutral-300 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-900 transition-colors hover:border-indigo-600 dark:border-neutral-700 dark:text-white dark:hover:border-indigo-400"
          >
            Meet The Team
          </Link>
        </>
      }
      graphic={
        <div className="relative overflow-hidden rounded-none border border-neutral-200/80 bg-neutral-950 shadow-2xl transition-all duration-300 dark:border-neutral-800">
          <img
            src="/assets/hero.png"
            alt="BrAIN Labs Neural Dynamics Artwork"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/40 to-neutral-950/20" />
          <div className="absolute inset-0 bg-indigo-950/20 mix-blend-overlay" />

          {/* Interactive 3D Canvas */}
          <div className="relative z-10 h-[280px] w-full sm:h-[360px] md:h-[440px]">
            <BrainNetwork />
          </div>
        </div>
      }
    />

    <Section className="py-12 md:py-12">
      <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
        RESEARCH OUTPUT &amp; GROUP IMPACT
      </p>
      <MatrixGrid cols={4}>
        {metrics.map((stat, idx) => {
          const accent = accentOrder[idx % accentOrder.length];
          return (
            <MatrixCard key={stat.label}>
              <div className="mb-3 flex items-center gap-2">
                <IconBox icon={<stat.icon size={16} />} accent={accent} size="sm" />
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  {stat.label}
                </span>
              </div>
              <div className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                {stat.desc}
              </div>
            </MatrixCard>
          );
        })}
      </MatrixGrid>
    </Section>

    <Section tone="dark" topBorder={false} id="the-vision">
      <SectionIntro
        accent
        center
        dark
        eyebrow="THE PARADIGM SHIFT"
        maxWidth="max-w-[820px] mx-auto"
        title={
          <>
            Traditional AI scales compute.
            <br className="hidden md:inline" /> Brain-inspired AI scales efficiency.
          </>
        }
      />

      <div className="mt-14 grid grid-cols-1 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/60 sm:grid-cols-3">
        {paradigm.map((item) => (
          <div
            key={item.title}
            className="flex min-h-[240px] flex-col border-b border-neutral-800 p-8 transition-colors last:border-b-0 hover:bg-neutral-900 sm:border-b-0 sm:border-r sm:last:border-r-0"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
              <item.icon size={22} />
            </span>
            <div className="mt-auto pt-10">
              <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>

    <Section topBorder={false} id="research-areas">
      <SectionIntro
        center
        eyebrow="RESEARCH AREAS"
        title="One unified group pushing the frontiers of machine intelligence."
        className="mb-14"
      />
      <MatrixGrid>
        {researchAreas.map((area, idx) => {
          const accent = accentOrder[idx % accentOrder.length];
          return (
            <MatrixCard key={area.title}>
              <IconBox icon={<area.icon size={22} />} accent={accent} size="lg" className="mb-6" />
              <h3
                className={`font-display text-lg font-bold text-neutral-900 transition-colors dark:text-white ${accentHoverText[accent]}`}
              >
                {area.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {area.desc}
              </p>
            </MatrixCard>
          );
        })}
      </MatrixGrid>
    </Section>

    <Section topBorder={false} id="methodology">
      <SectionIntro
        eyebrow="METHODOLOGY"
        title="From biological inspiration to peer-reviewed deployment."
        maxWidth="max-w-[680px]"
      />
      <div className="mt-14 border-t border-neutral-200 dark:border-neutral-800">
        {methodology.map((step) => (
          <div
            key={step.num}
            className="group grid grid-cols-[auto_1fr] items-start gap-6 border-b border-neutral-200 p-6 transition-colors hover:bg-slate-50/60 dark:border-neutral-800 dark:hover:bg-neutral-900/40 md:p-8"
          >
            <span className="font-display text-4xl font-extrabold leading-none text-neutral-300 transition-colors duration-300 group-hover:text-indigo-600 dark:text-neutral-700 dark:group-hover:text-indigo-400 md:text-5xl">
              {step.num}
            </span>
            <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:items-baseline md:gap-12">
              <h3 className="font-display text-xl font-bold text-neutral-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400 md:mt-0">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>

    {grants.length > 0 && (
      <Section className="py-12 md:py-16">
        <div className="mb-8 flex items-center gap-3">
          <IconBox icon={<Award size={18} />} accent="amber" />
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
            Research Grants &amp; Funding
          </h3>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {grants.map((grant) => (
            <div
              key={grant.id}
              className="rounded-xl border border-indigo-100 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-white p-6 dark:border-indigo-950/60 dark:from-neutral-900/70 dark:via-neutral-900/40 dark:to-indigo-950/20"
            >
              <div className="flex items-start justify-between gap-4">
                <h4 className="font-bold text-neutral-900 dark:text-white">{grant.title}</h4>
                {grant.passed_date && (
                  <span className="rounded bg-amber-100 px-2 py-1 font-mono text-xs font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    {new Date(grant.passed_date).getFullYear()}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                {grant.description}
              </p>
            </div>
          ))}
        </div>
      </Section>
    )}

    <CTASection
      title="Collaborate with BrAIN Labs."
      description="We regularly accept interns, PhD candidates, and institutional research partners. Get in touch regarding opportunities and research collaborations."
      actions={[
        { label: 'Get In Touch', to: '/contact', icon: <ArrowRight size={14} /> },
        { label: 'View Research Projects', to: '/projects' },
      ]}
    />
  </div>
);
