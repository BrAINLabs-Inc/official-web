import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WorkshopCalendarIcon } from '@/components/ui/PageIcons';
import { MapPin, Clock, Calendar, Loader2 } from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { DataUnavailable } from '@/components/ui/DataUnavailable';
import { api, type PublicEvent } from '@/lib/api';

export const Events = () => {
  const [events, setEvents] = useState<PublicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.events
      .list()
      .then(setEvents)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();

  // Split by event_datetime — backend orders ascending
  const upcomingEvents = events.filter((e) => {
    if (!e.event_datetime) return false;
    return new Date(e.event_datetime) >= now;
  });
  const pastEvents = events.filter((e) => {
    if (!e.event_datetime) return true; // no date → treat as past
    return new Date(e.event_datetime) < now;
  });

  const formatEventDate = (datetime: string | null) => {
    if (!datetime) return 'Date TBD';
    const d = new Date(datetime);
    const dateStr = d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const timeStr = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    return `${dateStr} · ${timeStr}`;
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Events & Workshops"
        description="Join BrAIN Labs for workshops, seminars, and collaborative events exploring the latest in AI and neuroscience."
        keywords={[
          'AI Workshops',
          'Research Seminars',
          'BrAIN Labs Events',
          'Neuroscience Conferences',
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-16 pt-24 md:pt-32">
        <div className="from-primary/6 absolute inset-0 bg-gradient-to-br via-background to-background" />
        <div className="absolute right-10 top-1/3 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl lg:pl-4"
          >
            <div className="bg-primary/8 mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-primary">
              <WorkshopCalendarIcon size={14} />
              Events & Workshops
            </div>

            <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Events &{' '}
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Workshops
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Join us for workshops, seminars, and collaborative events exploring the latest in AI
              research.
            </p>

            {!loading && !error && (
              <div className="mt-6 flex items-center gap-6">
                {upcomingEvents.length > 0 && (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {upcomingEvents.length}
                      </span>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">
                        Upcoming
                      </span>
                    </div>
                    <div className="h-6 w-px bg-border" />
                  </>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">{pastEvents.length}</span>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    Past Events
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Loading / Error states ────────────────────────────── */}
      {loading && (
        <div className="flex items-center justify-center gap-3 py-20 text-muted-foreground">
          <Loader2 size={20} className="animate-spin text-primary" />
          <span className="text-sm">Loading events…</span>
        </div>
      )}

      {error && (
        <div className="mx-auto max-w-2xl">
          <DataUnavailable />
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <div className="py-20 text-center">
          <WorkshopCalendarIcon size={40} className="mx-auto mb-4 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">No events available yet.</p>
        </div>
      )}

      {/* ── Upcoming Events ───────────────────────────────────── */}
      {!loading && !error && upcomingEvents.length > 0 && (
        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4 lg:pl-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="mb-1 flex items-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                <h2 className="text-xl font-bold tracking-tight md:text-2xl">Upcoming Events</h2>
              </div>
              <p className="ml-5 text-sm text-muted-foreground">
                Don't miss our upcoming workshops and seminars.
              </p>
            </motion.div>

            <div className="grid max-w-5xl gap-6 md:grid-cols-2">
              {upcomingEvents.map((event, idx) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={idx}
                  upcoming
                  formatDate={formatEventDate}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Past Events ───────────────────────────────────────── */}
      {!loading && !error && pastEvents.length > 0 && (
        <section
          className={`py-10 md:py-14 ${upcomingEvents.length > 0 ? 'border-t border-border/40 bg-muted/20' : ''}`}
        >
          <div className="container mx-auto px-4 lg:pl-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="mb-1 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                <h2 className="text-xl font-bold tracking-tight md:text-2xl">Past Events</h2>
              </div>
              <p className="ml-5 text-sm text-muted-foreground">
                Explore our previous workshops and events.
              </p>
            </motion.div>

            <div className="grid max-w-5xl gap-5 md:grid-cols-2">
              {pastEvents.map((event, idx) => (
                <EventCard key={event.id} event={event} index={idx} formatDate={formatEventDate} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

// ── Event Card ─────────────────────────────────────────────────────────────────

const EventCard = ({
  event,
  index,
  upcoming = false,
  formatDate,
}: {
  event: PublicEvent;
  index: number;
  upcoming?: boolean;
  formatDate: (datetime: string | null) => string;
}) => {
  const hostName = event.researcher
    ? `${event.researcher.member.first_name} ${event.researcher.member.second_name}`
    : (event.host ?? 'BrAIN Labs');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.09, duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <Card
        className={`group flex h-full flex-col transition-all duration-300 hover:shadow-md ${
          upcoming
            ? 'bg-primary/4 border-primary/30 hover:border-primary/50'
            : 'border-border/50 bg-card/80 hover:border-primary/30'
        }`}
      >
        <CardHeader className="space-y-3 pb-3">
          <div className="flex items-start justify-between gap-3">
            <Badge
              variant="secondary"
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                upcoming
                  ? 'border border-primary/25 bg-primary/15 text-primary'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              Event
            </Badge>
            {upcoming && (
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                <Badge className="rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">
                  Upcoming
                </Badge>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <CardTitle className="text-lg font-bold leading-snug transition-colors group-hover:text-primary">
              {event.title}
            </CardTitle>
            {event.description && (
              <CardDescription className="flex items-start gap-2 text-sm">
                <MapPin size={13} className="mt-0.5 shrink-0 text-muted-foreground" />
                <span className="line-clamp-2">{event.description}</span>
              </CardDescription>
            )}
          </div>
        </CardHeader>

        <CardContent className="mt-auto pt-0">
          <div className="space-y-2 border-t border-border/50 pt-4">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Clock size={13} className="text-primary/60" />
              {formatDate(event.event_datetime)}
            </div>
            {event.premises && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin size={13} className="text-primary/60" />
                {event.premises}
              </div>
            )}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar size={13} className="text-primary/60" />
              Hosted by {hostName}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
