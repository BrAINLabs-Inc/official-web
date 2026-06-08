import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResearchLabIcon } from '@/components/ui/PageIcons';
import { Layers, Loader2 } from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { api, type PublicProject } from '@/lib/api';
import { DataUnavailable } from '@/components/ui/DataUnavailable';

export const Projects = () => {
  const [projects, setProjects] = useState<PublicProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.projects
      .list()
      .then(setProjects)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const getAuthorName = (p: PublicProject) =>
    p.member ? `${p.member.first_name} ${p.member.second_name}` : 'BrAIN Labs';

  return (
    <div className="min-h-screen">
      <SEO
        title="Research Projects"
        description="Explore our cutting-edge research projects at BrAIN Labs."
        keywords={['AI Research', 'BrAIN Labs Projects', 'Neuromorphic Computing', 'LLM Research']}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-16 pt-24 md:pt-32">
        <div className="from-primary/6 absolute inset-0 bg-gradient-to-br via-background to-background" />
        <div className="bg-primary/4 absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl lg:pl-4"
          >
            <div className="bg-primary/8 mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-primary">
              <ResearchLabIcon size={14} />
              Research Projects
            </div>

            <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Our{' '}
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Research
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Exploring the frontiers of AI through innovative research in large language models and
              neuromorphic computing.
            </p>

            {!loading && !error && (
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">{projects.length}</span>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Active Projects
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Projects Grid ─────────────────────────────────────── */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 lg:pl-8">
          {loading && (
            <div className="flex items-center justify-center gap-3 py-20 text-muted-foreground">
              <Loader2 size={20} className="animate-spin text-primary" />
              <span className="text-sm">Loading projects…</span>
            </div>
          )}

          {error && (
            <div className="mx-auto max-w-2xl">
              <DataUnavailable />
            </div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="py-20 text-center">
              <ResearchLabIcon size={40} className="mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No projects available yet.</p>
            </div>
          )}

          {!loading && !error && projects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-xl border border-primary/15 bg-primary/10 p-2">
                  <Layers size={18} className="text-primary" />
                </div>
                <h2 className="text-xl font-bold tracking-tight md:text-2xl">All Projects</h2>
                <Badge
                  variant="secondary"
                  className="bg-primary/8 rounded-full border border-primary/15 px-2.5 text-[10px] font-semibold uppercase tracking-wide text-primary"
                >
                  {projects.length} projects
                </Badge>
              </div>

              <div className="grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card className="group h-full border-border/50 bg-card/80 transition-all duration-300 hover:border-primary/40 hover:shadow-md">
                      {/* Diagram image if available */}
                      {project.project_diagram[0]?.diagram_url && (
                        <div className="aspect-video overflow-hidden rounded-t-lg bg-muted">
                          <img
                            src={project.project_diagram[0].diagram_url}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <CardHeader className="pb-2">
                        <div className="flex items-start gap-3">
                          <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary transition-transform group-hover:scale-150" />
                          <CardTitle className="text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                            {project.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="pl-4 text-sm leading-relaxed">
                          {project.description || 'No description available.'}
                        </CardDescription>
                        <div className="mt-3 pl-4 text-[11px] text-muted-foreground/60">
                          {getAuthorName(project)}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};
