import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CollaborationIcon } from '@/components/ui/PageIcons';
import { Mail, Globe, UserPlus, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/shared/SEO';
import { DataUnavailable } from '@/components/ui/DataUnavailable';
import { api, type PublicResearcher } from '@/lib/api';

// ── Shared card component ─────────────────────────────────────────────────────
const MemberCard = ({ researcher, idx }: { researcher: PublicResearcher; idx: number }) => {
  const name = `${researcher.member.first_name} ${researcher.member.second_name}`;
  const initials = `${researcher.member.first_name[0]}${researcher.member.second_name[0]}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.07, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="group h-full border-border/50 bg-card/80 transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
        <CardHeader className="px-6 pb-3 pt-6">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="shrink-0">
              {researcher.image_url ? (
                <img
                  src={researcher.image_url}
                  alt={name}
                  className="h-16 w-16 rounded-2xl object-cover ring-2 ring-border transition-all duration-300 group-hover:ring-primary/40"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-border transition-all group-hover:ring-primary/30">
                  <span className="text-xl font-bold text-primary/80">{initials}</span>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 pt-0.5">
              <CardTitle className="mb-1 text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                {name}
              </CardTitle>
              {researcher.occupation && (
                <CardDescription className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-primary">
                  {researcher.occupation}
                </CardDescription>
              )}
              {researcher.workplace && (
                <p className="truncate text-xs text-muted-foreground/80">{researcher.workplace}</p>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 px-6 pb-6">
          {/* Bio */}
          {researcher.bio && (
            <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
              {researcher.bio}
            </p>
          )}

          {/* Education badges */}
          {researcher.educational_background && researcher.educational_background.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                Education
              </div>
              <div className="flex flex-wrap gap-1.5">
                {researcher.educational_background.slice(0, 2).map((ed) => (
                  <Badge
                    key={ed.id}
                    variant="secondary"
                    className="bg-primary/6 border border-primary/10 px-2 py-0.5 text-[10px] font-medium text-foreground/80"
                  >
                    {ed.degree}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-4 border-t border-border/40 pt-3">
            {researcher.member.contact_email && (
              <a
                href={`mailto:${researcher.member.contact_email}`}
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail size={13} />
                Email
              </a>
            )}
            {researcher.workplace && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                <Globe size={13} />
                {researcher.country || researcher.workplace}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
export const Team = () => {
  const [researchers, setResearchers] = useState<PublicResearcher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.researchers
      .list()
      .then(setResearchers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="Our Team"
        description="Meet the multidisciplinary team of experts pushing the boundaries of AI and neuroscience research at BrAIN Labs."
        keywords={['AI Researchers', 'Neuroscience Team', 'BrAIN Labs Team', 'Research Scientists']}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-16 pt-24 md:pt-32">
        <div className="from-primary/6 absolute inset-0 bg-gradient-to-br via-background to-background" />
        <div className="bg-primary/4 absolute left-0 top-20 h-96 w-96 rounded-full blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl lg:pl-4"
          >
            <div className="bg-primary/8 mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-primary">
              <CollaborationIcon size={14} />
              Our Team
            </div>

            <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Meet the{' '}
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Researchers
              </span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              A multidisciplinary team of experts pushing the boundaries of AI and neuroscience
              research.
            </p>

            {!loading && !error && (
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-base font-semibold text-foreground">
                  {researchers.length}
                </span>
                <span>active researchers across AI, ML, and neuroscience</span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Members Grid ──────────────────────────────────────── */}
      <section className="py-8 md:py-14">
        <div className="container mx-auto px-4 lg:pl-8">
          {loading && (
            <div className="flex items-center justify-center gap-3 py-20 text-muted-foreground">
              <Loader2 size={20} className="animate-spin text-primary" />
              <span className="text-sm">Loading team…</span>
            </div>
          )}

          {error && (
            <div className="mx-auto max-w-2xl">
              <DataUnavailable />
            </div>
          )}

          {!loading && !error && researchers.length === 0 && (
            <div className="py-20 text-center">
              <CollaborationIcon size={40} className="mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No researchers listed yet.</p>
            </div>
          )}

          {!loading && !error && researchers.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 flex items-center gap-3"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                <h2 className="text-xl font-bold tracking-tight md:text-2xl">Current Members</h2>
                <span className="bg-primary/8 ml-1 rounded-full border border-primary/15 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  {researchers.length}
                </span>
              </motion.div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {researchers.map((researcher, idx) => (
                  <Link
                    key={researcher.member_id}
                    to={`/team/${researcher.member.slug}`}
                    className="block h-full"
                  >
                    <MemberCard researcher={researcher} idx={idx} />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="border-t border-border/40 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl space-y-6 text-center"
          >
            <div className="mb-2 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <UserPlus size={24} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Join Our Team</h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground">
              We regularly accept interns and PhD candidates. Check out our open positions or get in
              touch regarding opportunities.
            </p>
            <Link to="/contact">
              <Button className="h-10 rounded-full bg-foreground px-7 text-sm text-background shadow-md transition-all hover:bg-foreground/90 hover:shadow-lg">
                <Mail className="mr-2" size={14} />
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
