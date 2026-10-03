import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Calendar,
  Clock,
  Linkedin,
  ListChecks,
  MapPin,
  Search,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { PageHero } from '@/components/shared/PageHero';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { TierDot } from '@/components/ui/TierDot';
import { badgeDesigns, badgeEvents } from '@/data/badges';
import {
  badgePath,
  badges,
  designImagePath,
  findBadge,
  formatBadgeDate,
  levelLabel,
  levelRank,
} from '@/lib/badges';
import { fadeUp, fadeUpAt } from '@/lib/motion';

/** Number of badges issued per design id. */
const issuedCount = badges.reduce(
  (m, b) => m.set(b.design.id, (m.get(b.design.id) ?? 0) + 1),
  new Map<string, number>()
);

const eventsNewestFirst = [...badgeEvents].sort((a, b) => b.date.localeCompare(a.date));

const steps: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Earn a badge',
    description:
      'Badges are awarded for completing BrAIN Labs programmes and contributing to our research.',
    icon: Award,
  },
  {
    title: 'Get a permanent page',
    description:
      'Every badge has its own verification page and credential ID that anyone can check here.',
    icon: ShieldCheck,
  },
  {
    title: 'Share it on LinkedIn',
    description:
      'Add the credential to your LinkedIn profile or share a post with a rich preview in one click.',
    icon: Linkedin,
  },
];

export const Badges = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [notFound, setNotFound] = useState(false);

  const verify = (e: FormEvent) => {
    e.preventDefault();
    const badge = findBadge(query);
    if (badge) navigate(badgePath(badge));
    else setNotFound(true);
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Verified Achievements"
        description="Verify achievement badges issued by BrAIN Labs and SLIIT, and add them to LinkedIn."
        keywords={['BrAIN Labs badges', 'Credential verification', 'SLIIT', 'LinkedIn badge']}
      />

      <PageHero
        icon={<ShieldCheck size={14} />}
        eyebrow="Credential Verification"
        title="Verified"
        highlight="Achievements"
        description="Every BrAIN Labs badge comes with a permanent verification page that can be added to LinkedIn. Enter a credential ID to confirm it was issued by us."
        stats={
          badges.length > 0
            ? [
                { value: badges.length, label: 'Badges Issued' },
                {
                  value: badgeEvents.length,
                  label: badgeEvents.length === 1 ? 'Programme' : 'Programmes',
                },
              ]
            : undefined
        }
      >
        <form onSubmit={verify} className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setNotFound(false);
              }}
              placeholder="Enter a credential ID"
              aria-label="Credential ID"
              className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm uppercase tracking-wide outline-none transition-colors placeholder:normal-case placeholder:tracking-normal placeholder:text-muted-foreground/70 focus:border-foreground/40"
            />
          </div>
          <button
            type="submit"
            disabled={!query.trim()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-7 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            Verify
            <ArrowRight size={15} />
          </button>
        </form>
        {notFound && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            No credential found with ID "{query.trim()}". Check the ID and try again.
          </p>
        )}
      </PageHero>

      {/* ── Badge designs ────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-3xl">
            <SectionLabel icon={BadgeCheck}>Our Badges</SectionLabel>
            <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              Recognition for research and learning.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Badges are issued jointly by BrAIN Labs and SLIIT. Each one certifies a specific
              achievement and can be verified here at any time.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {badgeDesigns.map((design, idx) => {
              const level = levelLabel(design.level);
              const issued = issuedCount.get(design.id) ?? 0;
              return (
                <motion.div
                  key={design.id}
                  {...fadeUpAt(idx)}
                  className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/25"
                >
                  <div className="relative mb-5 flex items-center justify-center rounded-xl bg-secondary/60 p-6 pt-10">
                    <span
                      className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                        issued > 0
                          ? 'bg-foreground text-background'
                          : 'border border-dashed border-foreground/25 bg-background text-muted-foreground'
                      }`}
                    >
                      {issued > 0 ? <BadgeCheck size={12} /> : <Clock size={12} />}
                      {issued > 0 ? `${issued} issued` : 'Not issued yet'}
                    </span>
                    <img
                      src={designImagePath(design)}
                      alt={`${design.title} badge`}
                      width={128}
                      height={128}
                      loading="lazy"
                      className={`h-32 w-32 object-contain ${issued > 0 ? '' : 'opacity-60'}`}
                    />
                  </div>
                  {level && (
                    <div className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/80">
                      <TierDot level={design.level} />
                      {level}
                    </div>
                  )}
                  <h3 className="text-base font-semibold leading-snug">{design.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {design.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="border-t border-border/60 py-16 md:py-20">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-12 lg:gap-14">
          <motion.div {...fadeUp} className="lg:col-span-5">
            <SectionLabel icon={ListChecks}>How It Works</SectionLabel>
            <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              Credentials anyone can check.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Recruiters, collaborators and friends can confirm a badge is genuine with its
              credential ID or link. No sign-up needed.
            </p>
          </motion.div>

          <div className="grid gap-4 lg:col-span-7">
            {steps.map(({ title, description, icon: Icon }, idx) => (
              <motion.div
                key={title}
                {...fadeUpAt(idx)}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/25 sm:p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Step {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-1 text-base font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recipients by programme ──────────────────────────── */}
      <section className="border-t border-border/60 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="mb-10 max-w-3xl">
            <SectionLabel icon={Users}>Recipients</SectionLabel>
            <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              Badges issued by programme.
            </h2>
          </motion.div>

          {eventsNewestFirst.length === 0 ? (
            <motion.div
              {...fadeUp}
              className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary">
                <Award size={22} />
              </div>
              <p className="font-semibold">No badges issued yet</p>
              <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                Recipients will be listed here once the first badges are awarded.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {eventsNewestFirst.map((event) => {
                const recipients = badges
                  .filter((b) => b.eventId === event.id)
                  .sort((a, b) => levelRank(a.design.level) - levelRank(b.design.level));
                return (
                  <motion.article
                    key={event.id}
                    {...fadeUp}
                    className="overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    <div className="border-b border-border p-6 sm:p-8">
                      <div className="flex flex-wrap items-center gap-2">
                        <MetaPill icon={Calendar}>{formatBadgeDate(event.date)}</MetaPill>
                        {event.location && <MetaPill icon={MapPin}>{event.location}</MetaPill>}
                        <MetaPill icon={Award}>
                          {`${recipients.length} ${recipients.length === 1 ? 'badge' : 'badges'}`}
                        </MetaPill>
                      </div>
                      <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight md:text-2xl">
                        {event.name}
                      </h3>
                      {event.description && (
                        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                          {event.description}
                        </p>
                      )}
                    </div>

                    <ul className="divide-y divide-border">
                      {recipients.map((b) => {
                        const level = levelLabel(b.design.level);
                        return (
                          <li key={b.credentialId}>
                            <Link
                              to={badgePath(b)}
                              className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-secondary/50 sm:px-8"
                            >
                              <img
                                src={designImagePath(b.design)}
                                alt=""
                                width={48}
                                height={48}
                                loading="lazy"
                                className="h-12 w-12 shrink-0 object-contain"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold">{b.name}</p>
                                <p className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                                  {b.design.title}
                                  {level && (
                                    <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                                      <TierDot level={b.design.level} />
                                      {level}
                                    </span>
                                  )}
                                </p>
                              </div>
                              <span className="hidden font-mono text-[11px] text-muted-foreground sm:block">
                                {b.credentialId}
                              </span>
                              <ArrowRight
                                size={15}
                                className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                              />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const MetaPill = ({ icon: Icon, children }: { icon: LucideIcon; children: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-foreground/80">
    <Icon size={12} />
    {children}
  </span>
);
