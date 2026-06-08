import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { SEO } from '@/components/shared/SEO';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, GraduationCap, Search, Zap, MapPin, Briefcase } from 'lucide-react';
import { api, type PublicResearcher } from '@/lib/api';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const TeamMemberProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const [researcher, setResearcher] = useState<PublicResearcher | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (!slug) return;

    setIsLoading(true);
    setNotFound(false);
    api.researchers
      .get(slug)
      .then(setResearcher)
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (!isLoading && notFound) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md space-y-6 text-center">
          <div className="mb-2 inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
            <span className="text-4xl">👤</span>
          </div>
          <h2 className="text-2xl font-bold">Researcher not found</h2>
          <p className="text-muted-foreground">
            The profile you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/team">
            <Button variant="outline" className="rounded-full px-6">
              Back to Team
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const name = researcher ? `${researcher.member.first_name} ${researcher.member.second_name}` : '';
  const initials = researcher
    ? `${researcher.member.first_name[0]}${researcher.member.second_name[0]}`
    : '';

  return (
    <div className="relative min-h-screen bg-background">
      {researcher && (
        <SEO
          title={`${name} | BrAIN Labs Team`}
          description={`${researcher.occupation ?? 'Researcher'} at BrAIN Labs — ${researcher.workplace ?? ''}`}
        />
      )}

      {/* ── Hero Section ──────────────────────────────────────── */}
      <section className="relative flex min-h-[60vh] flex-col justify-center overflow-hidden border-b border-border/40 pb-16 pt-24 md:pt-32">
        <div className="from-primary/6 absolute inset-0 bg-gradient-to-br via-background to-background" />
        <div className="absolute left-1/3 top-0 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-7xl"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <Link to="/team">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 rounded-full bg-primary/5 px-4 text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowLeft size={16} />
                  Back to Team
                </Button>
              </Link>
            </motion.div>

            <div className="grid items-start gap-12 lg:grid-cols-[auto_1fr_400px] lg:gap-16">
              {/* Column 1: Avatar */}
              <motion.div
                variants={itemVariants}
                className="group relative flex shrink-0 flex-col items-start gap-3"
              >
                <div className="bg-primary/8 inline-flex items-center gap-2 rounded-full border border-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                  <Zap size={10} />
                  Team Member
                </div>
                {isLoading ? (
                  <Skeleton className="h-40 w-40 rounded-3xl md:h-56 md:w-56" />
                ) : (
                  <div className="relative h-40 w-40 overflow-hidden rounded-3xl shadow-2xl ring-4 ring-primary/10 md:h-56 md:w-56">
                    {researcher?.image_url ? (
                      <img
                        src={researcher.image_url}
                        alt={name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                        <span className="text-5xl font-bold text-primary/40">{initials}</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Column 2: Core Info */}
              <motion.div variants={itemVariants} className="space-y-6 lg:pt-10">
                {isLoading ? (
                  <>
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-6 w-2/3" />
                    <div className="flex gap-4 pt-4">
                      <Skeleton className="h-10 w-24 rounded-full" />
                    </div>
                  </>
                ) : (
                  researcher && (
                    <>
                      <div className="space-y-3">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                          {name}
                        </h1>
                        {researcher.occupation && (
                          <p className="text-xl font-semibold tracking-tight text-primary/90 md:text-2xl">
                            {researcher.occupation}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 text-sm text-muted-foreground/80 md:text-base">
                        {researcher.workplace && (
                          <div className="flex items-center gap-3">
                            <Briefcase size={18} className="shrink-0 text-primary/60" />
                            <span>{researcher.workplace}</span>
                          </div>
                        )}
                        {researcher.country && (
                          <div className="flex items-center gap-3">
                            <MapPin size={18} className="shrink-0 text-primary/60" />
                            <span>{researcher.country}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 pt-6">
                        {researcher.member.contact_email && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-10 gap-2 rounded-full border-primary/20 px-6 hover:bg-primary/5"
                            asChild
                          >
                            <a href={`mailto:${researcher.member.contact_email}`}>
                              <Mail size={14} />
                              Email
                            </a>
                          </Button>
                        )}
                      </div>
                    </>
                  )
                )}
              </motion.div>

              {/* Column 3: Quick Insights */}
              <motion.div
                variants={itemVariants}
                className="hidden space-y-8 self-start rounded-3xl border border-primary/10 bg-primary/[0.02] p-6 backdrop-blur-sm md:p-8 lg:block"
              >
                {isLoading ? (
                  <div className="space-y-6">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                ) : (
                  researcher && (
                    <>
                      {/* Education */}
                      {researcher.educational_background &&
                        researcher.educational_background.length > 0 && (
                          <div className="space-y-4">
                            <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                              <GraduationCap size={14} strokeWidth={3} />
                              Education
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                              {researcher.educational_background.map((ed) => (
                                <Badge
                                  key={ed.id}
                                  variant="secondary"
                                  className="border-border/50 bg-background/80 px-2 py-0.5 text-[10px] hover:bg-primary/5"
                                >
                                  {ed.degree}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Ongoing Research */}
                      {researcher.ongoing_research && researcher.ongoing_research.length > 0 && (
                        <div className="space-y-4 border-t border-primary/5 pt-4">
                          <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                            <Zap size={14} strokeWidth={3} />
                            Ongoing Research
                          </h3>
                          <div className="space-y-3">
                            {researcher.ongoing_research.map((res) => (
                              <div key={res.id} className="flex gap-3">
                                <div className="h-auto w-1 shrink-0 rounded-full bg-primary/20" />
                                <p className="line-clamp-2 text-[11px] italic leading-relaxed text-foreground/80">
                                  {res.title}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Bio Section ───────────────────────────────────────── */}
      {!isLoading && researcher?.bio && (
        <section className="relative px-4 py-12 md:px-8 md:py-20">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-8 flex items-center gap-3 border-b border-border/40 pb-4">
                <div className="rounded-xl bg-primary/10 p-2">
                  <Search size={20} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold">About</h2>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {researcher.bio}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Footer Link ───────────────────────────────────────── */}
      <section className="border-t border-border/40 py-20">
        <div className="container mx-auto px-4 text-center">
          <Link to="/team">
            <Button
              variant="ghost"
              className="group gap-2 rounded-full px-8 text-primary hover:bg-primary/5"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Meet More Researchers
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
