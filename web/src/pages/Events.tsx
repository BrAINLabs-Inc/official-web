import {
  Calendar,
  MapPin,
  ExternalLink,
  Sparkles,
  FolderGit2,
  CheckCircle2,
  Users,
  BookOpen,
  Code2,
  Award,
  FileText,
} from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { Section } from '@/components/sections/Section';
import { PageHero } from '@/components/sections/PageHero';
import { LinkButton } from '@/components/ui/LinkButton';
import { Tag } from '@/components/ui/Tag';
import { eventsData, tinyMLWorkshopInfo } from '@/data/events';

export const Events = () => {
  return (
    <div className="bg-transparent transition-colors">
      <SEO
        title="Events & Workshops | BrAIN Labs"
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
        eyebrow="EVENTS & WORKSHOPS"
        icon={<Calendar size={13} className="text-indigo-600 dark:text-indigo-400" />}
        title="Workshops, seminars & open research resources."
        description="Hands-on workshop materials, Google Colab notebooks, presentation slides, and open-source code from BrAIN Labs conference workshops."
        stats={[
          { value: eventsData.length, label: 'Workshops & Events', accent: true },
          { value: '100%', label: 'Open Source Code & Colabs' },
        ]}
      />

      <Section className="py-12 md:py-16">
        <div className="space-y-16">
          {eventsData.map((event) => (
            <div
              key={event.id}
              className="border border-neutral-200 bg-white/90 p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900/90 md:p-10"
            >
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4 dark:border-neutral-800">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag tone="indigo" className="py-1 font-mono text-[11px] font-bold uppercase tracking-wider">
                    {event.type}
                  </Tag>
                  <span className="text-xs font-semibold text-neutral-500">
                    {event.date}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                  <MapPin size={14} className="text-indigo-600 dark:text-indigo-400" />
                  <span>{event.conference}</span>
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                <div className="space-y-6 lg:col-span-7">
                  <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
                    {event.title}
                  </h2>

                  {event.description && (
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                      {event.description}
                    </p>
                  )}

                  {event.grantInfo && (
                    <div className="flex items-start gap-2.5 rounded-none border border-amber-200 bg-amber-50/70 p-3 text-xs font-medium text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300">
                      <Award size={16} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
                      <span>{event.grantInfo}</span>
                    </div>
                  )}

                  {event.highlights && event.highlights.length > 0 && (
                    <div className="space-y-3 rounded-none border border-neutral-200/80 bg-slate-50/70 p-4 dark:border-neutral-800/80 dark:bg-neutral-950/60">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Key Topics &amp; Highlights:
                      </h4>
                      <ul className="space-y-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        {event.highlights.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Hands-On Sessions Table if available (e.g. SNN24) */}
                  {event.sessions && event.sessions.length > 0 && (
                    <div className="space-y-3 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                        <Code2 size={14} className="text-indigo-600 dark:text-indigo-400" />
                        <span>Hands-On Notebook Sessions</span>
                      </div>
                      <div className="overflow-x-auto border border-neutral-200 dark:border-neutral-800">
                        <table className="w-full text-left font-mono text-xs">
                          <thead className="bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                            <tr>
                              <th className="p-2.5">Session</th>
                              <th className="p-2.5">Description</th>
                              <th className="p-2.5 text-right">Notebook</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                            {event.sessions.map((sess, idx) => (
                              <tr key={idx} className="hover:bg-indigo-50/20 dark:hover:bg-neutral-800/40">
                                <td className="p-2.5 font-bold text-indigo-600 dark:text-indigo-400">{sess.session}</td>
                                <td className="p-2.5 text-neutral-600 dark:text-neutral-300">{sess.description}</td>
                                <td className="p-2.5 text-right">
                                  {sess.notebookUrl && (
                                    <a
                                      href={sess.notebookUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 border border-indigo-600/40 bg-indigo-50/80 px-2 py-1 text-[11px] font-semibold text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white dark:border-indigo-400/40 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-500 dark:hover:text-white"
                                    >
                                      <span>{sess.notebookLabel || 'Open Colab'}</span>
                                      <ExternalLink size={10} />
                                    </a>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Tutorial Resources Table if available (e.g. MERCon26) */}
                  {event.resources && event.resources.length > 0 && (
                    <div className="space-y-3 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                        <FileText size={14} className="text-indigo-600 dark:text-indigo-400" />
                        <span>Tutorial Resources &amp; Slides</span>
                      </div>
                      <div className="overflow-x-auto border border-neutral-200 dark:border-neutral-800">
                        <table className="w-full text-left font-mono text-xs">
                          <thead className="bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                            <tr>
                              <th className="p-2.5">Type</th>
                              <th className="p-2.5">Description</th>
                              <th className="p-2.5 text-right">Link</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                            {event.resources.map((res, idx) => (
                              <tr key={idx} className="hover:bg-indigo-50/20 dark:hover:bg-neutral-800/40">
                                <td className="p-2.5 font-bold text-neutral-900 dark:text-white">{res.type}</td>
                                <td className="p-2.5 text-neutral-600 dark:text-neutral-300">{res.description}</td>
                                <td className="p-2.5 text-right">
                                  <a
                                    href={res.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 border border-neutral-300 px-2 py-1 text-[11px] font-semibold text-neutral-800 transition-colors hover:border-indigo-600 hover:text-indigo-600 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
                                  >
                                    <span>View</span>
                                    <ExternalLink size={10} />
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Facilitators */}
                  {event.facilitators && event.facilitators.length > 0 && (
                    <div className="space-y-2 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                        <Users size={14} className="text-indigo-600 dark:text-indigo-400" />
                        <span>Facilitators</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {event.facilitators.map((name, idx) => (
                          <span
                            key={idx}
                            className="rounded-none border border-neutral-300 bg-neutral-100/80 px-2.5 py-1 font-mono text-[11px] font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Organizers */}
                  {event.organizers && event.organizers.length > 0 && (
                    <div className="space-y-2 border-t border-neutral-200 pt-3 dark:border-neutral-800">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                        <BookOpen size={14} className="text-indigo-600 dark:text-indigo-400" />
                        <span>Organizers</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {event.organizers.map((name, idx) => (
                          <span
                            key={idx}
                            className="rounded-none border border-indigo-200 bg-indigo-50/50 px-2.5 py-1 font-mono text-[11px] font-medium text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300"
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {event.license && (
                    <div className="text-[11px] font-mono text-neutral-500 pt-1">
                      License: {event.license}
                    </div>
                  )}

                  <div className="pt-2">
                    <LinkButton
                      href={event.repoUrl || event.detailsUrl}
                      icon={<FolderGit2 size={15} />}
                    >
                      Explore GitHub Repository
                    </LinkButton>
                  </div>
                </div>

                {event.imageUrl && (
                  <div className="lg:col-span-5">
                    <div className="group relative overflow-hidden rounded-none border border-neutral-200 bg-neutral-950 shadow-lg dark:border-neutral-800">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-14 overflow-hidden border border-neutral-800 bg-gradient-to-br from-neutral-950 via-neutral-900 to-indigo-950/40 p-8 text-white md:p-12">
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                <Sparkles size={14} />
                <span>{tinyMLWorkshopInfo.title}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Open Source Workshop Materials &amp; Repositories
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
};
