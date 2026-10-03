import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WorkshopCalendarIcon } from '@/components/ui/PageIcons';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Code2,
  ExternalLink,
  FileText,
  FolderGit2,
  MapPin,
  Sparkles,
  Users,
} from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { PageHero } from '@/components/shared/PageHero';
import { eventsData, tinyMLWorkshopInfo, type EventItem } from '@/data/events';

const upcomingEvents = eventsData.filter((e) => e.upcoming);
const pastEvents = eventsData.filter((e) => !e.upcoming);

export const Events = () => (
  <div className="min-h-screen">
    <SEO
      title="Events & Workshops"
      description="Explore workshop materials, Google Colab notebooks, session slides, and GitHub repositories from BrAIN Labs research workshops."
      keywords={[
        'AI Workshops',
        'TinyML Workshop',
        'Spiking Neural Networks Workshop',
        'Curriculum Learning Workshop',
        'ICAC 2024',
        'MERCon 2026',
        'SICET 2025',
      ]}
    />

    <PageHero
      icon={<WorkshopCalendarIcon size={14} />}
      eyebrow="Events & Workshops"
      title="Events &"
      highlight="Workshops"
      description="Hands-on workshop materials, Google Colab notebooks, presentation slides, and open-source code from BrAIN Labs conference workshops."
      stats={[
        ...(upcomingEvents.length > 0 ? [{ value: upcomingEvents.length, label: 'Upcoming' }] : []),
        { value: eventsData.length, label: 'Workshops & Events' },
        { value: '100%', label: 'Open Source Code & Colabs' },
      ]}
    />

    {/* ── Upcoming Events ───────────────────────────────────── */}
    {upcomingEvents.length > 0 && (
      <EventGroup
        title="Upcoming Events"
        subtitle="Don't miss our upcoming workshops and seminars."
        events={upcomingEvents}
        upcoming
      />
    )}

    {/* ── Past Events ───────────────────────────────────────── */}
    {pastEvents.length > 0 && (
      <EventGroup
        title="Past Events"
        subtitle="Explore our previous workshops and their open resources."
        events={pastEvents}
        className={upcomingEvents.length > 0 ? 'border-t border-border/40 bg-muted/20' : ''}
      />
    )}

    {/* ── Resources banner ──────────────────────────────────── */}
    <section className="pb-20 pt-6">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12"
        >
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary">
                <Sparkles size={14} />
                {tinyMLWorkshopInfo.title}
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                Open Source Workshop Materials & Repositories
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {tinyMLWorkshopInfo.description}
              </p>
            </div>
            <a
              href={tinyMLWorkshopInfo.resourcesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Button className="gap-2 rounded-full px-6">
                {tinyMLWorkshopInfo.buttonText}
                <ExternalLink size={14} />
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

// ── Event group ────────────────────────────────────────────────────────────────

const EventGroup = ({
  title,
  subtitle,
  events,
  upcoming = false,
  className = '',
}: {
  title: string;
  subtitle: string;
  events: EventItem[];
  upcoming?: boolean;
  className?: string;
}) => (
  <section className={`py-10 md:py-14 ${className}`}>
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="mb-1 flex items-center gap-3">
          <div
            className={`h-2 w-2 rounded-full ${upcoming ? 'animate-pulse bg-primary' : 'bg-muted-foreground/40'}`}
          />
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
        </div>
        <p className="ml-5 text-sm text-muted-foreground">{subtitle}</p>
      </motion.div>

      <div className="mx-auto max-w-5xl space-y-8">
        {events.map((event, idx) => (
          <EventCard key={event.id} event={event} index={idx} upcoming={upcoming} />
        ))}
      </div>
    </div>
  </section>
);

// ── Event card ─────────────────────────────────────────────────────────────────

const SubHeading = ({ icon: Icon, children }: { icon: typeof Users; children: string }) => (
  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground/80">
    <Icon size={14} className="text-primary/70" />
    {children}
  </div>
);

const ResourceTable = ({
  heading,
  rows,
}: {
  heading: [string, string, string];
  rows: { key: string; first: string; second: string; href?: string; label: string }[];
}) => (
  <div className="overflow-x-auto rounded-xl border border-border/50">
    <table className="w-full text-left text-xs">
      <thead className="bg-muted/50 text-muted-foreground">
        <tr>
          <th className="p-3 font-semibold">{heading[0]}</th>
          <th className="p-3 font-semibold">{heading[1]}</th>
          <th className="p-3 text-right font-semibold">{heading[2]}</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border/50">
        {rows.map((row) => (
          <tr key={row.key} className="transition-colors hover:bg-muted/30">
            <td className="whitespace-nowrap p-3 font-semibold text-foreground">{row.first}</td>
            <td className="p-3 text-muted-foreground">{row.second}</td>
            <td className="p-3 text-right">
              {row.href && (
                <a
                  href={row.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/8 inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-primary/15 px-2.5 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {row.label}
                  <ExternalLink size={10} />
                </a>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const PeopleList = ({ names, highlight = false }: { names: string[]; highlight?: boolean }) => (
  <div className="flex flex-wrap gap-2">
    {names.map((name) => (
      <span
        key={name}
        className={`rounded-full border px-3 py-1 text-[11px] font-medium ${
          highlight
            ? 'bg-primary/8 border-primary/15 text-primary'
            : 'border-border/60 bg-muted/40 text-muted-foreground'
        }`}
      >
        {name}
      </span>
    ))}
  </div>
);

const EventCard = ({
  event,
  index,
  upcoming,
}: {
  event: EventItem;
  index: number;
  upcoming: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.09, duration: 0.5 }}
  >
    <Card
      className={`group overflow-hidden transition-all duration-300 hover:shadow-md ${
        upcoming
          ? 'bg-primary/4 border-primary/30 hover:border-primary/50'
          : 'border-border/50 bg-card/80 hover:border-primary/30'
      }`}
    >
      <CardHeader className="space-y-4 border-b border-border/50 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className="rounded-full border border-primary/25 bg-primary/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary"
            >
              {event.type}
            </Badge>
            {upcoming && (
              <Badge className="rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">
                Upcoming
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-primary/60" />
              {event.date}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-primary/60" />
              {event.conference}
            </span>
          </div>
        </div>
        <CardTitle className="text-xl font-bold leading-snug transition-colors group-hover:text-primary md:text-2xl">
          {event.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="space-y-6 lg:col-span-7">
            {event.description && (
              <p className="text-sm leading-relaxed text-muted-foreground">{event.description}</p>
            )}

            {event.grantInfo && (
              <div className="flex items-start gap-2.5 rounded-xl border border-amber-300/50 bg-amber-50/60 p-3 text-xs font-medium text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
                <Award size={15} className="mt-0.5 shrink-0" />
                <span>{event.grantInfo}</span>
              </div>
            )}

            {event.highlights && event.highlights.length > 0 && (
              <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
                <SubHeading icon={CheckCircle2}>Key Topics & Highlights</SubHeading>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {event.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {event.facilitators && event.facilitators.length > 0 && (
              <div>
                <SubHeading icon={Users}>Facilitators</SubHeading>
                <PeopleList names={event.facilitators} />
              </div>
            )}

            {event.organizers && event.organizers.length > 0 && (
              <div>
                <SubHeading icon={BookOpen}>Organizers</SubHeading>
                <PeopleList names={event.organizers} highlight />
              </div>
            )}
          </div>

          <div className="space-y-5 lg:col-span-5">
            {event.imageUrl && (
              <div className="overflow-hidden rounded-xl border border-border/50 bg-muted shadow-sm">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            )}
            <a href={event.repoUrl || event.detailsUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full gap-2 rounded-full">
                <FolderGit2 size={15} />
                Explore GitHub Repository
              </Button>
            </a>
            {event.license && (
              <p className="text-center text-[11px] text-muted-foreground/70">
                License: {event.license}
              </p>
            )}
          </div>
        </div>

        {event.sessions && event.sessions.length > 0 && (
          <div className="mt-8 border-t border-border/50 pt-6">
            <SubHeading icon={Code2}>Hands-On Notebook Sessions</SubHeading>
            <ResourceTable
              heading={['Session', 'Description', 'Notebook']}
              rows={event.sessions.map((s) => ({
                key: s.session,
                first: s.session,
                second: s.description,
                href: s.notebookUrl,
                label: s.notebookLabel || 'Open Colab',
              }))}
            />
          </div>
        )}

        {event.resources && event.resources.length > 0 && (
          <div className="mt-8 border-t border-border/50 pt-6">
            <SubHeading icon={FileText}>Tutorial Resources & Slides</SubHeading>
            <ResourceTable
              heading={['Type', 'Description', 'Link']}
              rows={event.resources.map((r) => ({
                key: r.description,
                first: r.type,
                second: r.description,
                href: r.link,
                label: 'View',
              }))}
            />
          </div>
        )}

        {event.documentation && event.documentation.length > 0 && (
          <div className="mt-8 border-t border-border/50 pt-6">
            <SubHeading icon={FileText}>Documentation</SubHeading>
            <ul className="grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
              {event.documentation.map((doc) => (
                <li key={doc} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary/60" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        )}

        {event.references && event.references.length > 0 && (
          <div className="mt-8 border-t border-border/50 pt-6">
            <SubHeading icon={BookOpen}>References</SubHeading>
            <ol className="list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground marker:text-primary/60">
              {event.references.map((ref) => (
                <li key={ref}>{ref}</li>
              ))}
            </ol>
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);
