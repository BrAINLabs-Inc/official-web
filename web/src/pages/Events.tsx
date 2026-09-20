import { Calendar, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { Section } from '@/components/sections/Section';
import { PageHero } from '@/components/sections/PageHero';
import { MatrixGrid, MatrixCard } from '@/components/sections/MatrixGrid';
import { LinkButton } from '@/components/ui/LinkButton';
import { eventsData, tinyMLWorkshopInfo } from '@/data/events';

export const Events = () => (
  <div className="bg-transparent transition-colors">
    <SEO
      title="Events & Workshops"
      description="Join us for workshops, seminars, and collaborative events exploring the latest in AI research."
      keywords={[
        'AI Workshops',
        'Research Seminars',
        'BrAIN Labs Events',
        'TinyML Workshops',
        'Neuroscience Conferences',
      ]}
    />

    <PageHero
      eyebrow="EVENTS & WORKSHOPS"
      icon={<Calendar size={13} className="text-indigo-600 dark:text-indigo-400" />}
      title="Workshops, seminars & collaborative events."
      description="Join us for workshops, seminars, and collaborative events exploring the latest in AI research."
      stats={[{ value: eventsData.length, label: 'Past Events', accent: true }]}
    />

    <Section className="py-12 md:py-16">
      <div className="mb-8 flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
        <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Past Events
        </h2>
      </div>

      <MatrixGrid cols={2}>
        {eventsData.map((event) => (
          <MatrixCard key={event.id} className="justify-between">
            <div>
              <span className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                {event.type}
              </span>
              <h3 className="font-display text-lg font-bold leading-snug text-neutral-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                {event.title}
              </h3>
              <div className="mt-4 flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-400"
                />
                <span>{event.conference}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-4 dark:border-neutral-800">
              <span className="font-mono text-xs font-semibold text-neutral-500">{event.date}</span>
              {event.detailsUrl && (
                <a
                  href={event.detailsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-900 transition-colors hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                >
                  <span>View Details</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </MatrixCard>
        ))}
      </MatrixGrid>

      <div className="relative mt-14 overflow-hidden border border-neutral-800 bg-gradient-to-br from-neutral-950 via-neutral-900 to-indigo-950/40 p-8 text-white md:p-12">
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <Sparkles size={14} />
              <span>{tinyMLWorkshopInfo.title}</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              Workshop Materials &amp; Open Resources
            </h3>
            <p className="text-sm leading-relaxed text-neutral-400">
              {tinyMLWorkshopInfo.description}
            </p>
          </div>
          <div className="shrink-0">
            <LinkButton
              href={tinyMLWorkshopInfo.resourcesUrl}
              variant="onDark"
              icon={<ExternalLink size={14} />}
            >
              {tinyMLWorkshopInfo.buttonText}
            </LinkButton>
          </div>
        </div>
      </div>
    </Section>
  </div>
);
