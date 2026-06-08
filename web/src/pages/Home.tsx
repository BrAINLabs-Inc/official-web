import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { intro } from '@/data/general';
import { ArrowRight, Brain, Sparkles, Award, BookOpen, Users, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataUnavailable } from '@/components/ui/DataUnavailable';
import { BrainNetwork } from '@/components/ui/BrainNetwork';
import { SEO } from '@/components/shared/SEO';
import { api, type PublicGrant, type PublicStats } from '@/lib/api';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const Home = () => {
  const [stats, setStats] = useState<PublicStats | null>(null);
  const [grants, setGrants] = useState<PublicGrant[]>([]);
  const [loadingGrants, setLoadingGrants] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [grantsError, setGrantsError] = useState<string | null>(null);

  useEffect(() => {
    api.stats
      .get()
      .then(setStats)
      .catch((e) => setStatsError(e.message));

    api.grants
      .list()
      .then(setGrants)
      .catch((e) => setGrantsError(e.message))
      .finally(() => setLoadingGrants(false));
  }, []);

  return (
    <div className="relative">
      <SEO />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden py-10 md:py-0">
        {/* layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/[0.03]" />

        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="bg-primary/8 absolute right-10 top-1/4 h-[36rem] w-[36rem] rounded-full opacity-60 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -25, 15, 0],
            y: [0, 25, -15, 0],
            scale: [1, 0.9, 1.05, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="bg-foreground/4 absolute bottom-1/4 left-10 h-[44rem] w-[44rem] rounded-full opacity-40 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 15, -30, 0],
            y: [0, -15, 20, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 opacity-50 blur-[80px]"
        />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:32px_32px] opacity-40" />
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.h1
                variants={itemVariants}
                className="overflow-visible text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-7xl"
              >
                <span className="block text-foreground">Brain-Inspired</span>
                <span className="block text-muted-foreground">Intelligence.</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
              >
                {intro.description}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col gap-4 pt-2 sm:flex-row">
                <Link to="/projects">
                  <Button
                    size="lg"
                    className="h-12 rounded-full bg-foreground px-8 text-sm font-medium text-background shadow-lg transition-shadow hover:bg-foreground/90 hover:shadow-xl"
                  >
                    Explore Research
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
                <Link to="/publications">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-full border-border px-8 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-secondary"
                  >
                    View Publications
                  </Button>
                </Link>
              </motion.div>

              {/* Quick stats row */}
              <motion.div
                variants={itemVariants}
                className="flex min-h-[60px] flex-wrap gap-6 border-t border-border/40 pt-4"
              >
                {statsError ? (
                  <p className="text-sm text-destructive">Unable to load stats.</p>
                ) : stats ? (
                  [
                    { value: stats.researchers, label: 'Researchers' },
                    { value: stats.projects, label: 'Active Projects' },
                    { value: stats.publications, label: 'Publications' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">{s.value}</span>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">
                        {s.label}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm">Loading stats...</span>
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Hero graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative hidden h-full w-full items-center justify-center lg:flex"
            >
              <div className="relative flex h-[520px] w-full max-w-lg items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-3xl" />
                <div className="absolute inset-8 rounded-full border border-border/30" />
                <div className="absolute inset-16 rounded-full border border-border/20" />
                <div className="relative z-10 h-full w-full">
                  <BrainNetwork />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="h-12 w-px bg-gradient-to-b from-primary/50 to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="border-y border-border/50 bg-card/60 py-20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
            {[
              {
                value: stats ? String(stats.researchers) : '-',
                label: 'Researchers',
                icon: Users,
                description: 'Multidisciplinary experts',
              },
              {
                value: stats ? String(stats.projects) : '-',
                label: 'Active Projects',
                icon: Sparkles,
                description: 'Ongoing research',
              },
              {
                value: stats ? String(stats.publications) : '-',
                label: 'Publications',
                icon: BookOpen,
                description: 'Peer-reviewed papers',
              },
              {
                value: '2+',
                label: 'Research Areas',
                icon: Brain,
                description: 'LLMs & Neuromorphic',
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <Card className="group h-full border-border/40 bg-background/60 transition-all duration-300 hover:border-primary/30 hover:bg-background/80 hover:shadow-md">
                  <CardContent className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                    <div className="bg-primary/8 group-hover:bg-primary/12 rounded-xl p-3 transition-colors">
                      <stat.icon className="text-primary" size={22} />
                    </div>
                    <div>
                      <div className="mb-0.5 text-4xl font-bold tracking-tight text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-widest text-foreground/80">
                        {stat.label}
                      </div>
                      <div className="mt-1 text-[11px] text-muted-foreground/70">
                        {stat.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grants ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background py-24">
        {/* background accent */}
        <div className="bg-primary/4 absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-primary">
              <Award size={15} />
              <span className="text-xs font-medium uppercase tracking-wide">
                Funding & Recognition
              </span>
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Research Grants</h2>
            <p className="mx-auto max-w-xl leading-relaxed text-muted-foreground">
              Supported by leading funding agencies to pioneer the next generation of AI.
            </p>
          </motion.div>

          {loadingGrants ? (
            <div className="flex justify-center py-10">
              <Loader2 size={24} className="animate-spin text-primary" />
            </div>
          ) : grantsError ? (
            <div className="mx-auto max-w-2xl">
              <DataUnavailable title="Unable to load grants" />
            </div>
          ) : grants.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              No grants publicly available yet.
            </div>
          ) : (
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {grants.map((grant, idx) => (
                <motion.div
                  key={grant.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12, duration: 0.5 }}
                  whileHover={{ y: -3 }}
                >
                  <Card className="group h-full border-border/50 bg-card/80 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-xl leading-snug transition-colors duration-300 group-hover:text-primary">
                          {grant.title}
                        </CardTitle>
                        {grant.passed_date && (
                          <span className="bg-primary/8 shrink-0 whitespace-nowrap rounded-full border border-primary/20 px-2.5 py-1 font-mono text-xs text-primary">
                            {new Date(grant.passed_date).getFullYear()}
                          </span>
                        )}
                      </div>
                      {grant.member && (
                        <div className="flex items-center gap-2 pt-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span className="text-sm font-semibold text-primary">
                            {grant.member.first_name} {grant.member.second_name}
                          </span>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {grant.description || 'No description provided.'}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="from-primary/8 to-primary/4 absolute inset-0 bg-gradient-to-br via-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl space-y-8 text-center"
          >
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Get involved
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              Ready to explore the
              <br />
              <span className="text-muted-foreground">future of AI?</span>
            </h2>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">
              Discover our cutting-edge research and join us in pushing the boundaries of artificial
              intelligence.
            </p>
            <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
              <Link to="/team">
                <Button
                  size="lg"
                  className="h-12 rounded-full bg-foreground px-8 text-sm font-medium text-background shadow-lg transition-all hover:bg-foreground/90 hover:shadow-xl"
                >
                  Meet the Team
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-border px-8 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-secondary"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
