import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge as Pill } from '@/components/ui/badge';
import { ArrowRight, Award, Calendar, MapPin, Search, ShieldCheck } from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { PageHero } from '@/components/shared/PageHero';
import { TierDot } from '@/components/ui/TierDot';
import { badgeEvents } from '@/data/badges';
import {
  badgePath,
  badges,
  designImagePath,
  findBadge,
  formatBadgeDate,
  levelLabel,
  levelRank,
} from '@/lib/badges';

const eventsNewestFirst = [...badgeEvents].sort((a, b) => b.date.localeCompare(a.date));

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
        stats={[
          { value: badges.length, label: 'Badges Issued' },
          {
            value: badgeEvents.length,
            label: badgeEvents.length === 1 ? 'Programme' : 'Programmes',
          },
        ]}
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
              placeholder="Credential ID, e.g. BL-TEST26-001"
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

      {/* ── Recipients by programme ───────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          {eventsNewestFirst.length === 0 && (
            <div className="py-20 text-center">
              <Award size={40} className="mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No badges issued yet.</p>
            </div>
          )}

          <div className="mx-auto max-w-5xl space-y-10">
            {eventsNewestFirst.map((event) => {
              const recipients = badges
                .filter((b) => b.eventId === event.id)
                .sort((a, b) => levelRank(a.design.level) - levelRank(b.design.level));
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="overflow-hidden border-border/60 bg-card">
                    <CardHeader className="space-y-3 border-b border-border/60 pb-5">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          {formatBadgeDate(event.date)}
                        </span>
                        {event.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} />
                            {event.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Award size={13} />
                          {recipients.length} {recipients.length === 1 ? 'badge' : 'badges'}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-bold leading-snug md:text-2xl">
                        {event.name}
                      </CardTitle>
                      {event.description && (
                        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                          {event.description}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent className="p-0">
                      <ul className="divide-y divide-border/60">
                        {recipients.map((b) => {
                          const level = levelLabel(b.design.level);
                          return (
                            <li key={b.credentialId}>
                              <Link
                                to={badgePath(b)}
                                className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/50"
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
                                      <Pill
                                        variant="secondary"
                                        className="gap-1.5 rounded-full px-2 py-0 text-[10px] font-semibold uppercase tracking-wider"
                                      >
                                        <TierDot level={b.design.level} />
                                        {level}
                                      </Pill>
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
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
