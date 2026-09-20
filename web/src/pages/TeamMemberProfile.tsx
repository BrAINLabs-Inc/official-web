import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '@/components/shared/SEO';
import {
  ArrowLeft,
  Mail,
  GraduationCap,
  Zap,
  MapPin,
  Briefcase,
  User,
  Linkedin,
  Globe,
  Users,
} from 'lucide-react';
import { Section } from '@/components/sections/Section';
import { CTASection } from '@/components/sections/CTASection';
import { Tag } from '@/components/ui/Tag';
import { LinkButton } from '@/components/ui/LinkButton';
import { researchers, type Researcher } from '@/data/team';

export const TeamMemberProfile = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  const researcher: Researcher | undefined =
    researchers.find((r) => r.member.slug === slug) || researchers[0];

  if (!researcher) {
    return (
      <div className="min-h-screen bg-white transition-colors dark:bg-neutral-950">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center">
          <h2 className="font-display text-3xl font-bold text-neutral-900 dark:text-white">
            Researcher not found
          </h2>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
            The profile you're looking for doesn't exist or has been removed.
          </p>
          <div className="mt-6">
            <LinkButton to="/team" icon={<ArrowLeft size={14} />}>
              Back to Team
            </LinkButton>
          </div>
        </div>
      </div>
    );
  }

  const name = `${researcher.member.first_name} ${researcher.member.second_name}`;
  const initials = `${researcher.member.first_name.replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s*/, '')[0] || ''}${researcher.member.second_name[0] || ''}`;

  return (
    <div className="bg-transparent transition-colors">
      <SEO
        title={`${name} | BrAIN Labs Team`}
        description={`${researcher.occupation ?? 'Researcher'} at BrAIN Labs - ${researcher.workplace ?? ''}`}
      />

      <Section topBorder={false} corners className="pb-14 pt-12 md:pt-16">
        <div className="mb-8">
          <Link
            to="/team"
            className="inline-flex items-center gap-2 border border-neutral-300 bg-neutral-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-700 transition-colors hover:border-indigo-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-indigo-400"
          >
            <ArrowLeft size={14} />
            <span>Back to Team</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[auto_1fr_360px] lg:gap-14">
          <div className="flex shrink-0 flex-col items-start gap-3">
            <Tag tone="indigo" className="inline-flex items-center gap-2 py-1">
              <Zap size={11} />
              {researcher.status === 'former' ? 'ALUMNI' : 'ACTIVE RESEARCHER'}
            </Tag>
            <div className="relative h-44 w-44 overflow-hidden border border-neutral-200 bg-slate-50 p-2 dark:border-neutral-800 dark:bg-neutral-900 md:h-52 md:w-52">
              {researcher.image_url ? (
                <img
                  src={researcher.image_url}
                  alt={name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                    if (img.nextElementSibling)
                      (img.nextElementSibling as HTMLElement).style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                style={{ display: researcher.image_url ? 'none' : 'flex' }}
                className="flex h-full w-full items-center justify-center bg-indigo-50 text-4xl font-extrabold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
              >
                {initials}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white md:text-4xl lg:text-5xl">
                {name}
              </h1>
              {researcher.occupation && (
                <p className="mt-2 text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  {researcher.occupation}
                </p>
              )}
            </div>

            <div className="space-y-2.5 text-sm text-neutral-600 dark:text-neutral-400">
              {researcher.workplace && (
                <div className="flex items-center gap-2.5">
                  <Briefcase size={16} className="shrink-0 text-indigo-600 dark:text-indigo-400" />
                  <span>{researcher.workplace}</span>
                </div>
              )}
              {researcher.country && (
                <div className="flex items-center gap-2.5">
                  <MapPin size={16} className="shrink-0 text-indigo-600 dark:text-indigo-400" />
                  <span>{researcher.country}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {researcher.member.contact_email && (
                <a
                  href={`mailto:${researcher.member.contact_email}`}
                  className="inline-flex items-center gap-2 border border-neutral-300 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-900 transition-colors hover:border-indigo-600 dark:border-neutral-700 dark:text-white dark:hover:border-indigo-400"
                >
                  <Mail size={14} />
                  <span>Email</span>
                </a>
              )}
              {researcher.member.linkedin && (
                <a
                  href={researcher.member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-neutral-300 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-900 transition-colors hover:border-indigo-600 dark:border-neutral-700 dark:text-white dark:hover:border-indigo-400"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
              )}
              {researcher.member.website && (
                <a
                  href={researcher.member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-neutral-300 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-900 transition-colors hover:border-indigo-600 dark:border-neutral-700 dark:text-white dark:hover:border-indigo-400"
                >
                  <Globe size={14} />
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>

          <div className="space-y-6 border border-neutral-200 bg-slate-50/70 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
            {researcher.research_areas && researcher.research_areas.length > 0 && (
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
                  <Zap size={14} />
                  RESEARCH AREAS
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {researcher.research_areas.map((area, idx) => (
                    <Tag key={idx}>{area}</Tag>
                  ))}
                </div>
              </div>
            )}

            {researcher.educational_background && researcher.educational_background.length > 0 && (
              <div className="border-t border-neutral-200 pt-4 dark:border-neutral-800">
                <h3 className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
                  <GraduationCap size={14} />
                  EDUCATION
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {researcher.educational_background.map((ed) => (
                    <Tag key={ed.id}>{ed.degree}</Tag>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      {researcher.bio && (
        <Section className="py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="mb-6 flex items-center gap-3 border-b border-neutral-200 pb-3 dark:border-neutral-800">
              <User size={18} className="text-indigo-600 dark:text-indigo-400" />
              <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
                Biography &amp; Research Statement
              </h2>
            </div>
            <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              {researcher.bio}
            </p>
          </motion.div>
        </Section>
      )}

      <CTASection
        compact
        title="Explore the entire research group."
        actions={[{ label: 'Meet More Researchers', to: '/team', icon: <Users size={14} /> }]}
      />
    </div>
  );
};
