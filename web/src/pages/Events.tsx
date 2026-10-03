import { motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Calendar,
  CalendarClock,
  CheckCircle2,
  Code2,
  FileText,
  FolderGit2,
  Github,
  History,
  Library,
  MapPin,
  Presentation,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { WorkshopCalendarIcon } from '@/components/ui/PageIcons';
import { SEO } from '@/components/shared/SEO';
import { PageHero } from '@/components/shared/PageHero';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { eventsData, tinyMLWorkshopInfo, type EventItem } from '@/data/events';
import { fadeUp, fadeUpAt } from '@/lib/motion';

const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

/** "August 2026" -> 202607, for newest-first sorting. Unparseable dates sort last. */
const dateKey = (date: string) => {
  const [month = '', year = ''] = date.toLowerCase().split(/\s+/);
  const m = MONTHS.indexOf(month);
  const y = Number(year);
  return Number.isFinite(y) && m >= 0 ? y * 100 + m : 0;
};

const byNewest = (a: EventItem, b: EventItem) => dateKey(b.date) - dateKey(a.date);

const upcomingEvents = eventsData.filter((e) => e.upcoming).sort(byNewest);
const pastEvents = eventsData.filter((e) => !e.upcoming).sort(byNewest);
const allEvents = [...upcomingEvents, ...pastEvents];

/** "SICET 2025 (SLIIT International ...)" -> "SICET 2025" */
const shortConference = (conference: string) => conference.split(' (')[0];

const isNotebook = (type: string) => /colab|notebook/i.test(type);

const glance: { value: number; label: string; icon: LucideIcon }[] = [
  { value: eventsData.length, label: 'Workshops', icon: Presentation },
  {
    value: eventsData.reduce(
      (n, e) =>
        n +
        (e.sessions?.length ?? 0) +
        (e.resources?.filter((r) => isNotebook(r.type)).length ?? 0),
      0
    ),
    label: 'Colab Notebooks',
    icon: Code2,
  },
  {
    value: eventsData.reduce(
      (n, e) => n + (e.resources?.filter((r) => !isNotebook(r.type)).length ?? 0),
      0
    ),
    label: 'Slide Decks',
    icon: FileText,
  },
  {
    value: new Set(eventsData.flatMap((e) => [...(e.facilitators ?? []), ...(e.organizers ?? [])]))
      .size,
    label: 'Facilitators',
    icon: Users,
  },
];

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
    />

    {/* ── Overview ─────────────────────────────────────────── */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-12 lg:gap-14">
        <motion.div {...fadeUp} className="min-w-0 lg:col-span-7">
          <SectionLabel icon={Sparkles}>Our Workshops</SectionLabel>
          <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
            Hands-on, open-source and free to reuse.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            We run workshops at leading conferences to share our research in practice. Every session
            ships with its slides, Colab notebooks and code, so anyone can learn from it long after
            the event.
          </p>

          <nav
            aria-label="Workshops"
            className="mt-8 divide-y divide-border border-y border-border"
          >
            {allEvents.map((event) => (
              <a
                key={event.id}
                href={`#event-${event.id}`}
                className="group flex items-center gap-4 py-3.5 transition-colors hover:text-foreground"
              >
                <span className="w-20 shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {event.date}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{event.title}</span>
                  <span className="block text-xs text-muted-foreground">
                    {shortConference(event.conference)}
                  </span>
                </span>
                <ArrowDownRight
                  size={16}
                  className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                />
              </a>
            ))}
          </nav>
        </motion.div>

        <motion.div {...fadeUp} className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-3 sm:gap-4 sm:p-4">
            {glance.map(({ value, label, icon: Icon }) => (
              <div key={label} className="rounded-xl bg-secondary/60 p-4 sm:p-5">
                <Icon size={18} className="mb-3 text-muted-foreground" />
                <div className="text-3xl font-bold tracking-tight">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {upcomingEvents.length > 0 && (
      <EventGroup
        icon={CalendarClock}
        label="Upcoming"
        title="Coming up next."
        description="Don't miss our upcoming workshops and seminars."
        events={upcomingEvents}
        upcoming
      />
    )}

    {pastEvents.length > 0 && (
      <EventGroup
        icon={History}
        label="Past Events"
        title="Previous workshops and their open resources."
        description="Slides, notebooks and code from every session, ready to explore."
        events={pastEvents}
      />
    )}

    {/* ── Resources banner ─────────────────────────────────── */}
    <section className="relative overflow-hidden bg-foreground py-16 text-background md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(hsl(var(--background)/0.07)_1px,transparent_1px)] [background-size:28px_28px]" />
      <motion.div
        {...fadeUp}
        className="container relative mx-auto flex flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between"
      >
        <div className="max-w-2xl">
          <SectionLabel icon={Github} inverted>
            {tinyMLWorkshopInfo.title}
          </SectionLabel>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Open source workshop materials & repositories
          </h2>
          <p className="mt-4 text-base leading-relaxed text-background/70">
            {tinyMLWorkshopInfo.description}
          </p>
        </div>
        <a
          href={tinyMLWorkshopInfo.resourcesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-background px-6 text-sm font-medium text-foreground transition-opacity hover:opacity-90 md:self-auto"
        >
          <Github size={15} />
          {tinyMLWorkshopInfo.buttonText}
          <ArrowUpRight size={15} />
        </a>
      </motion.div>
    </section>
  </div>
);

// ── Event group ────────────────────────────────────────────────────────────────

const EventGroup = ({
  icon,
  label,
  title,
  description,
  events,
  upcoming = false,
}: {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  events: EventItem[];
  upcoming?: boolean;
}) => (
  <section className="border-t border-border/60 py-16 md:py-20">
    <div className="container mx-auto px-4">
      <motion.div {...fadeUp} className="mb-10 max-w-3xl">
        <SectionLabel icon={icon}>{label}</SectionLabel>
        <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{title}</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      </motion.div>

      <div className="space-y-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} upcoming={upcoming} />
        ))}
      </div>
    </div>
  </section>
);

// ── Event card ─────────────────────────────────────────────────────────────────

const SubHeading = ({ icon: Icon, children }: { icon: LucideIcon; children: string }) => (
  <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
    <Icon size={14} />
    {children}
  </div>
);

const MetaPill = ({ icon: Icon, children }: { icon: LucideIcon; children: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-foreground/80">
    <Icon size={12} />
    {children}
  </span>
);

/** One row per material; stacks on mobile instead of scrolling a table sideways. */
const MaterialList = ({
  items,
}: {
  items: { key: string; tag: string; description: string; href?: string; label: string }[];
}) => (
  <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
    {items.map((item) => (
      <li
        key={item.key}
        className="flex flex-col gap-2 p-4 transition-colors hover:bg-secondary/50 sm:flex-row sm:items-center sm:gap-4"
      >
        <span className="w-fit shrink-0 rounded-md bg-secondary px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-foreground/80 sm:w-36">
          {item.tag}
        </span>
        <span className="flex-1 text-sm text-muted-foreground">{item.description}</span>
        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit shrink-0 items-center gap-1 rounded-full border border-foreground/15 px-3 py-1 text-xs font-medium transition-colors hover:bg-foreground hover:text-background"
          >
            {item.label}
            <ArrowUpRight size={12} />
          </a>
        )}
      </li>
    ))}
  </ul>
);

const PeopleList = ({ names }: { names: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {names.map((name) => (
      <span
        key={name}
        className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-foreground/80"
      >
        {name}
      </span>
    ))}
  </div>
);

const EventCard = ({ event, upcoming }: { event: EventItem; upcoming: boolean }) => {
  const hasPeople = Boolean(event.facilitators?.length || event.organizers?.length);
  const hasReading = Boolean(event.documentation?.length || event.references?.length);

  return (
    <motion.article
      id={`event-${event.id}`}
      {...fadeUp}
      className={`scroll-mt-24 overflow-hidden rounded-2xl border bg-card transition-colors hover:border-foreground/25 ${
        upcoming ? 'border-foreground/30' : 'border-border'
      }`}
    >
      {/* Header: image + summary */}
      <div className="grid lg:grid-cols-12">
        {event.imageUrl && (
          <div className="flex items-center justify-center border-b border-border bg-secondary/60 p-4 sm:p-6 lg:col-span-5 lg:border-b-0 lg:border-r">
            <img
              src={event.imageUrl}
              alt={event.title}
              loading="lazy"
              className="max-h-[28rem] w-full rounded-lg object-contain shadow-sm"
            />
          </div>
        )}

        <div className={`p-6 sm:p-8 ${event.imageUrl ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          <div className="flex flex-wrap items-center gap-2">
            {upcoming && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-background" />
                Upcoming
              </span>
            )}
            <MetaPill icon={Calendar}>{event.date}</MetaPill>
            <MetaPill icon={MapPin}>{shortConference(event.conference)}</MetaPill>
          </div>

          <div className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {event.type}
          </div>
          <h3 className="mt-1 text-xl font-bold leading-snug tracking-tight md:text-2xl">
            {event.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{event.conference}</p>

          {event.description && (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {event.description}
            </p>
          )}

          {event.grantInfo && (
            <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-border bg-secondary/60 p-3 text-xs font-medium text-foreground/80">
              <Award size={15} className="mt-0.5 shrink-0" />
              <span>{event.grantInfo}</span>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href={event.repoUrl || event.detailsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <FolderGit2 size={15} />
              GitHub Repository
              <ArrowUpRight size={14} />
            </a>
            {event.license && (
              <span className="text-xs text-muted-foreground">License: {event.license}</span>
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-10 border-t border-border p-6 sm:p-8">
        {event.highlights && event.highlights.length > 0 && (
          <div>
            <SubHeading icon={CheckCircle2}>Key Topics & Highlights</SubHeading>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {event.highlights.map((item, idx) => (
                <motion.div
                  key={item}
                  {...fadeUpAt(idx)}
                  className="rounded-xl border border-border bg-secondary/40 p-4"
                >
                  <div className="text-xs font-semibold text-muted-foreground">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {event.sessions && event.sessions.length > 0 && (
          <div>
            <SubHeading icon={Code2}>Hands-On Notebook Sessions</SubHeading>
            <MaterialList
              items={event.sessions.map((s) => ({
                key: s.session,
                tag: s.session,
                description: s.description,
                href: s.notebookUrl,
                label: s.notebookLabel || 'Open Colab',
              }))}
            />
          </div>
        )}

        {event.resources && event.resources.length > 0 && (
          <div>
            <SubHeading icon={FileText}>Tutorial Resources & Slides</SubHeading>
            <MaterialList
              items={event.resources.map((r) => ({
                key: r.description,
                tag: r.type,
                description: r.description,
                href: r.link,
                label: isNotebook(r.type) ? 'Open Colab' : 'View',
              }))}
            />
          </div>
        )}

        {hasReading && (
          <div className="grid gap-10 lg:grid-cols-2">
            {event.documentation && event.documentation.length > 0 && (
              <div>
                <SubHeading icon={Library}>Documentation</SubHeading>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {event.documentation.map((doc) => (
                    <li key={doc} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-foreground/60" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {event.references && event.references.length > 0 && (
              <div>
                <SubHeading icon={BookOpen}>References</SubHeading>
                <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground marker:text-foreground/50">
                  {event.references.map((ref) => (
                    <li key={ref}>{ref}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}

        {hasPeople && (
          <div className="grid gap-8 lg:grid-cols-2">
            {event.facilitators && event.facilitators.length > 0 && (
              <div>
                <SubHeading icon={Users}>Facilitators</SubHeading>
                <PeopleList names={event.facilitators} />
              </div>
            )}
            {event.organizers && event.organizers.length > 0 && (
              <div>
                <SubHeading icon={Award}>Organizers</SubHeading>
                <PeopleList names={event.organizers} />
              </div>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
};
