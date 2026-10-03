import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { SEO } from '@/components/shared/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Briefcase,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Search,
  UserX,
  Zap,
} from 'lucide-react';
import { researchers } from '@/data/team';
import { memberInitials } from '@/lib/utils';

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

const InsightHeading = ({ icon: Icon, children }: { icon: typeof Zap; children: string }) => (
  <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
    <Icon size={14} strokeWidth={3} />
    {children}
  </h3>
);

export const TeamMemberProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const researcher = researchers.find((r) => r.member.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!researcher) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md space-y-6 text-center">
          <div className="mb-2 inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
            <UserX size={36} className="text-muted-foreground" />
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

  const name = `${researcher.member.first_name} ${researcher.member.second_name}`;
  const isFormer = researcher.status === 'former';
  const links = [
    researcher.member.contact_email && {
      href: `mailto:${researcher.member.contact_email}`,
      label: 'Email',
      icon: Mail,
    },
    researcher.member.linkedin && {
      href: researcher.member.linkedin,
      label: 'LinkedIn',
      icon: Linkedin,
    },
    researcher.member.website && {
      href: researcher.member.website,
      label: 'Website',
      icon: Globe,
    },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Mail }[];

  return (
    <div className="relative min-h-screen bg-background">
      <SEO
        title={`${name} | BrAIN Labs Team`}
        description={`${researcher.occupation ?? 'Researcher'} at BrAIN Labs, ${researcher.workplace ?? ''}`}
      />

      {/* ── Hero Section ──────────────────────────────────────── */}
      <section className="relative flex min-h-[60vh] flex-col justify-center overflow-hidden border-b border-border/40 pb-16 pt-24 md:pt-32">
        <div className="from-primary/6 absolute inset-0 bg-gradient-to-br via-background to-background" />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            key={slug}
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
                  {isFormer ? 'Alumni' : 'Team Member'}
                </div>
                <div className="relative h-40 w-40 overflow-hidden rounded-3xl shadow-2xl ring-4 ring-primary/10 md:h-56 md:w-56">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                    <span className="text-5xl font-bold text-primary/40">
                      {memberInitials(researcher)}
                    </span>
                  </div>
                  {researcher.image_url && (
                    <img
                      src={researcher.image_url}
                      alt={name}
                      className="relative h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                </div>
              </motion.div>

              {/* Column 2: Core Info */}
              <motion.div variants={itemVariants} className="space-y-6 lg:pt-10">
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

                <div className="flex flex-wrap gap-3 pt-6">
                  {links.map(({ href, label, icon: Icon }) => (
                    <Button
                      key={label}
                      size="sm"
                      variant="outline"
                      className="h-10 gap-2 rounded-full border-primary/20 px-6 hover:bg-primary/5"
                      asChild
                    >
                      <a
                        href={href}
                        {...(href.startsWith('mailto:')
                          ? {}
                          : { target: '_blank', rel: 'noopener noreferrer' })}
                      >
                        <Icon size={14} />
                        {label}
                      </a>
                    </Button>
                  ))}
                </div>
              </motion.div>

              {/* Column 3: Quick Insights */}
              <motion.div
                variants={itemVariants}
                className="space-y-8 self-start rounded-3xl border border-primary/10 bg-primary/[0.02] p-6 md:p-8"
              >
                {researcher.research_areas.length > 0 && (
                  <div className="space-y-4">
                    <InsightHeading icon={Zap}>Research Areas</InsightHeading>
                    <div className="space-y-3">
                      {researcher.research_areas.map((area) => (
                        <div key={area} className="flex gap-3">
                          <div className="h-auto w-1 shrink-0 rounded-full bg-primary/20" />
                          <p className="text-[12px] leading-relaxed text-foreground/80">{area}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {researcher.educational_background &&
                  researcher.educational_background.length > 0 && (
                    <div className="space-y-4 border-t border-primary/5 pt-4">
                      <InsightHeading icon={GraduationCap}>Education</InsightHeading>
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

                {researcher.ongoing_research && researcher.ongoing_research.length > 0 && (
                  <div className="space-y-4 border-t border-primary/5 pt-4">
                    <InsightHeading icon={Zap}>Ongoing Research</InsightHeading>
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
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Bio Section ───────────────────────────────────────── */}
      {researcher.bio && (
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
                <h2 className="text-2xl font-bold">Biography & Research Statement</h2>
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
