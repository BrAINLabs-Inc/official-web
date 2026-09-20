import { Mail, Globe, Linkedin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/shared/SEO';
import { Section } from '@/components/sections/Section';
import { PageHero } from '@/components/sections/PageHero';
import { MatrixGrid, MatrixCard } from '@/components/sections/MatrixGrid';
import { CTASection } from '@/components/sections/CTASection';
import { Tag } from '@/components/ui/Tag';
import { researchers, type Researcher } from '@/data/team';

const MemberCard = ({ researcher }: { researcher: Researcher }) => {
  const name = `${researcher.member.first_name} ${researcher.member.second_name}`;
  const initials = `${researcher.member.first_name.replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s*/, '')[0] || ''}${researcher.member.second_name[0] || ''}`;

  return (
    <MatrixCard className="h-full justify-between">
      <div>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-none border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
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
              className="flex h-full w-full items-center justify-center font-bold text-indigo-600 dark:text-indigo-400"
            >
              {initials}
            </div>
          </div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            {researcher.status === 'former' ? 'Alumni' : 'Active'}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold text-neutral-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
          {name}
        </h3>
        {researcher.occupation && (
          <p className="mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            {researcher.occupation}
          </p>
        )}
        {researcher.workplace && (
          <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
            {researcher.workplace}
          </p>
        )}

        {researcher.research_areas && researcher.research_areas.length > 0 && (
          <div className="mt-4 border-t border-neutral-200 pt-4 dark:border-neutral-800/60">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              Research Areas
            </p>
            <div className="flex flex-wrap gap-1.5">
              {researcher.research_areas.map((area, idx) => (
                <Tag key={idx}>{area}</Tag>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center gap-4 border-t border-neutral-200 pt-4 text-xs text-neutral-500 dark:border-neutral-800">
        {researcher.member.contact_email && (
          <a
            href={`mailto:${researcher.member.contact_email}`}
            className="flex items-center gap-1 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <Mail size={13} />
            <span>Email</span>
          </a>
        )}
        {researcher.member.linkedin && (
          <a
            href={researcher.member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <Linkedin size={13} />
            <span>LinkedIn</span>
          </a>
        )}
        {researcher.member.website && (
          <a
            href={researcher.member.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <Globe size={13} />
            <span>Website</span>
          </a>
        )}
      </div>
    </MatrixCard>
  );
};

export const Team = () => {
  const currentMembers = researchers.filter((r) => r.status === 'current');
  const formerMembers = researchers.filter((r) => r.status === 'former');

  return (
    <div className="bg-transparent transition-colors">
      <SEO
        title="Our Team"
        description="Meet the multidisciplinary team of experts pushing the boundaries of AI and neuroscience research at BrAIN Labs."
        keywords={['AI Researchers', 'Neuroscience Team', 'BrAIN Labs Team', 'Research Scientists']}
      />

      <PageHero
        eyebrow="RESEARCH TEAM"
        icon={<Users size={13} className="text-indigo-600 dark:text-indigo-400" />}
        title="Meet the researchers & scientists."
        description="A multidisciplinary team of experts pushing the boundaries of AI and neuroscience research."
        stats={[
          { value: currentMembers.length, label: 'Current Members' },
          { value: formerMembers.length, label: 'Former Members', accent: true },
        ]}
      />

      <Section className="py-12 md:py-16">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Current Members
          </h2>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-500">
            ({currentMembers.length})
          </span>
        </div>
        <MatrixGrid>
          {currentMembers.map((researcher) => (
            <Link
              key={researcher.member_id}
              to={`/team/${researcher.member.slug}`}
              className="block h-full"
            >
              <MemberCard researcher={researcher} />
            </Link>
          ))}
        </MatrixGrid>
      </Section>

      {formerMembers.length > 0 && (
        <Section tone="sunken" className="py-12 md:py-16">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-400" />
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Former Members
            </h2>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-500">
              ({formerMembers.length})
            </span>
          </div>
          <MatrixGrid>
            {formerMembers.map((researcher) => (
              <Link
                key={researcher.member_id}
                to={`/team/${researcher.member.slug}`}
                className="block h-full"
              >
                <MemberCard researcher={researcher} />
              </Link>
            ))}
          </MatrixGrid>
        </Section>
      )}

      <CTASection
        compact
        title="Join Our Team"
        description="We regularly accept interns and PhD candidates. Check out our open positions or get in touch regarding opportunities."
        actions={[{ label: 'Contact Us', to: '/contact', icon: <Mail size={14} /> }]}
      />
    </div>
  );
};
