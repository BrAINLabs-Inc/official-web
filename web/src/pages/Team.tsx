import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  FlaskConical,
  GraduationCap,
  History,
  Mail,
  MapPin,
  Search,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { CollaborationIcon } from '@/components/ui/PageIcons';
import { MemberModal } from '@/components/team/MemberModal';
import { SEO } from '@/components/shared/SEO';
import { PageHero } from '@/components/shared/PageHero';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { researchers, type Researcher } from '@/data/team';
import { fadeUp, fadeUpAt } from '@/lib/motion';
import { memberInitials } from '@/lib/utils';

const fullName = (r: Researcher) => `${r.member.first_name} ${r.member.second_name}`;

/** Assistants are anyone whose role is an assistant position; everyone else leads research. */
const isAssistant = (r: Researcher) => /assistant/i.test(r.occupation ?? '');

const currentMembers = researchers.filter((r) => r.status === 'current');
const formerMembers = researchers.filter((r) => r.status === 'former');
const leads = currentMembers.filter((r) => !isAssistant(r));
const assistants = currentMembers.filter(isAssistant);

/** Members in display order, used for next / previous in the modal. */
const orderedMembers = [...leads, ...assistants, ...formerMembers];

/** Research areas shared by at least two members, most common first. */
const areaCounts = researchers
  .flatMap((r) => r.research_areas)
  .reduce((m, a) => m.set(a, (m.get(a) ?? 0) + 1), new Map<string, number>());
const filterAreas = [...areaCounts]
  .filter(([, n]) => n > 1)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([a]) => a);

const matches = (r: Researcher, query: string, area: string | null) => {
  if (area && !r.research_areas.includes(area)) return false;
  if (!query) return true;
  const haystack = [fullName(r), r.occupation, r.workplace, ...r.research_areas]
    .join(' ')
    .toLowerCase();
  return haystack.includes(query);
};

// ── Avatar ────────────────────────────────────────────────────────────────────
const Avatar = ({ researcher, className }: { researcher: Researcher; className: string }) => {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-secondary ${className}`}>
      {researcher.image_url && !failed ? (
        <img
          src={researcher.image_url}
          alt={fullName(researcher)}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-muted-foreground">
          {memberInitials(researcher)}
        </div>
      )}
    </div>
  );
};

// ── Cards ─────────────────────────────────────────────────────────────────────
const MemberCard = ({
  researcher,
  idx,
  activeArea,
}: {
  researcher: Researcher;
  idx: number;
  activeArea: string | null;
}) => {
  const areas = researcher.research_areas;
  return (
    <motion.div {...fadeUpAt(idx % 8)} className="h-full">
      <Link
        to={`/team/${researcher.member.slug}`}
        aria-haspopup="dialog"
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/25"
      >
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start gap-4">
            <Avatar
              researcher={researcher}
              className="h-16 w-16 shrink-0 rounded-xl ring-1 ring-border [&_div]:text-lg"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold leading-snug">{fullName(researcher)}</h3>
                <ArrowUpRight
                  size={16}
                  className="mt-0.5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                />
              </div>
              {researcher.occupation && (
                <p className="mt-1 text-sm leading-snug text-foreground/80">
                  {researcher.occupation}
                </p>
              )}
            </div>
          </div>
          {researcher.workplace && (
            <p className="mt-3 text-xs text-muted-foreground">{researcher.workplace}</p>
          )}
          {areas.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {areas.slice(0, 3).map((area) => (
                <span
                  key={area}
                  className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                    area === activeArea
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-secondary text-foreground/80'
                  }`}
                >
                  {area}
                </span>
              ))}
              {areas.length > 3 && (
                <span className="rounded-full px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                  +{areas.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

const AlumniCard = ({ researcher, idx }: { researcher: Researcher; idx: number }) => (
  <motion.div {...fadeUpAt(idx)}>
    <Link
      to={`/team/${researcher.member.slug}`}
      aria-haspopup="dialog"
      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-foreground/25"
    >
      <Avatar
        researcher={researcher}
        className="h-14 w-14 shrink-0 rounded-xl grayscale-[40%] [&_div]:text-base"
      />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold">{fullName(researcher)}</h3>
        {researcher.occupation && (
          <p className="truncate text-xs text-muted-foreground">{researcher.occupation}</p>
        )}
        {researcher.country && (
          <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground/80">
            <MapPin size={11} />
            {researcher.country}
          </p>
        )}
      </div>
      <ArrowUpRight
        size={16}
        className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
      />
    </Link>
  </motion.div>
);

const Group = ({
  icon,
  label,
  title,
  members,
  activeArea,
}: {
  icon: typeof Users;
  label: string;
  title: string;
  members: Researcher[];
  activeArea: string | null;
}) =>
  members.length === 0 ? null : (
    <div>
      <motion.div {...fadeUp} className="mb-6 flex items-end justify-between gap-4">
        <div>
          <SectionLabel icon={icon}>{label}</SectionLabel>
          <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{title}</h2>
        </div>
        <span className="pb-1 text-sm tabular-nums text-muted-foreground">
          {members.length} {members.length === 1 ? 'member' : 'members'}
        </span>
      </motion.div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {members.map((r, idx) => (
          <MemberCard key={r.member_id} researcher={r} idx={idx} activeArea={activeArea} />
        ))}
      </div>
    </div>
  );

// ── Page ──────────────────────────────────────────────────────────────────────
export const Team = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [area, setArea] = useState<string | null>(null);

  const index = slug ? orderedMembers.findIndex((r) => r.member.slug === slug) : -1;
  const selected = index >= 0 ? orderedMembers[index] : undefined;

  const closeModal = useCallback(() => navigate('/team'), [navigate]);
  const showMember = useCallback(
    (i: number) => navigate(`/team/${orderedMembers[i].member.slug}`, { replace: true }),
    [navigate]
  );

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () => ({
      leads: leads.filter((r) => matches(r, q, area)),
      assistants: assistants.filter((r) => matches(r, q, area)),
      former: formerMembers.filter((r) => matches(r, q, area)),
    }),
    [q, area]
  );
  const isFiltering = q !== '' || area !== null;
  const resultCount = filtered.leads.length + filtered.assistants.length + filtered.former.length;
  const clearFilters = () => {
    setQuery('');
    setArea(null);
  };

  // Unknown member in the URL: fall back to the team list
  if (slug && !selected) return <Navigate to="/team" replace />;

  return (
    <div className="min-h-screen">
      <SEO
        title="Our Team"
        description="Meet the multidisciplinary team of experts pushing the boundaries of AI and neuroscience research at BrAIN Labs."
        keywords={['AI Researchers', 'Neuroscience Team', 'BrAIN Labs Team', 'Research Scientists']}
      />

      <PageHero
        icon={<CollaborationIcon size={14} />}
        eyebrow="Our Team"
        title="Meet the"
        highlight="Researchers"
        description="A multidisciplinary team of experts pushing the boundaries of AI and neuroscience research."
        stats={[
          { value: leads.length, label: 'Researchers' },
          { value: assistants.length, label: 'Research Assistants' },
          { value: formerMembers.length, label: 'Alumni' },
        ]}
      />

      {/* ── Filters ──────────────────────────────────────────── */}
      <section className="border-y border-border/60 bg-secondary/40 py-5">
        <div className="container mx-auto flex flex-col gap-4 px-4 lg:flex-row lg:items-center">
          <div className="relative w-full lg:max-w-xs">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, role or area"
              aria-label="Search team members"
              className="h-11 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground/40"
            />
          </div>
          <div
            role="group"
            aria-label="Filter by research area"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0"
          >
            <button
              type="button"
              onClick={() => setArea(null)}
              aria-pressed={area === null}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                area === null
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-background text-foreground/80 hover:border-foreground/40'
              }`}
            >
              All areas
            </button>
            {filterAreas.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setArea(area === a ? null : a)}
                aria-pressed={area === a}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  area === a
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border bg-background text-foreground/80 hover:border-foreground/40'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
        {isFiltering && (
          <div className="container mx-auto mt-3 flex items-center gap-3 px-4 text-sm text-muted-foreground">
            <span aria-live="polite">
              {resultCount} {resultCount === 1 ? 'member' : 'members'} found
            </span>
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline"
            >
              <X size={13} />
              Clear
            </button>
          </div>
        )}
      </section>

      {/* ── Current members ───────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto space-y-16 px-4 md:space-y-20">
          <Group
            icon={FlaskConical}
            label="Research Leads"
            title="Researchers & mentors."
            members={filtered.leads}
            activeArea={area}
          />
          <Group
            icon={GraduationCap}
            label="Research Assistants"
            title="The people running the experiments."
            members={filtered.assistants}
            activeArea={area}
          />

          {resultCount === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary">
                <Users size={22} />
              </div>
              <p className="font-semibold">No members match your search</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different name or research area.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 inline-flex h-10 items-center rounded-full border border-border px-5 text-sm font-medium transition-colors hover:border-foreground/40"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Alumni ───────────────────────────────────────────── */}
      {filtered.former.length > 0 && (
        <section className="border-t border-border/60 py-14 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div {...fadeUp} className="mb-6 max-w-3xl">
              <SectionLabel icon={History}>Alumni</SectionLabel>
              <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                Former members.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Researchers who have been part of BrAIN Labs and moved on to new chapters.
              </p>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.former.map((r, idx) => (
                <AlumniCard key={r.member_id} researcher={r} idx={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-foreground py-16 text-background md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(hsl(var(--background)/0.07)_1px,transparent_1px)] [background-size:28px_28px]" />
        <motion.div
          {...fadeUp}
          className="container relative mx-auto flex flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between"
        >
          <div className="max-w-2xl">
            <SectionLabel icon={UserPlus} inverted>
              Join Us
            </SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Join our team.</h2>
            <p className="mt-4 text-base leading-relaxed text-background/70">
              We regularly accept interns, research assistants and postgraduate candidates. See our
              open positions or get in touch about opportunities.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              to="/careers"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-background px-6 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
            >
              Open Positions
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-background/25 px-6 text-sm font-medium transition-colors hover:border-background/50"
            >
              <Mail size={15} />
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>

      {selected && (
        <MemberModal
          researcher={selected}
          onClose={closeModal}
          onPrev={index > 0 ? () => showMember(index - 1) : undefined}
          onNext={index < orderedMembers.length - 1 ? () => showMember(index + 1) : undefined}
        />
      )}
    </div>
  );
};
