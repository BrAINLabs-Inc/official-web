import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CollaborationIcon } from '@/components/ui/PageIcons';
import { Globe, Linkedin, Mail, MapPin, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/shared/SEO';
import { PageHero } from '@/components/shared/PageHero';
import { researchers, type Researcher } from '@/data/team';
import { memberInitials } from '@/lib/utils';

const currentMembers = researchers.filter((r) => r.status === 'current');
const formerMembers = researchers.filter((r) => r.status === 'former');

// ── Shared card component ─────────────────────────────────────────────────────
const MemberCard = ({ researcher, idx }: { researcher: Researcher; idx: number }) => {
  const name = `${researcher.member.first_name} ${researcher.member.second_name}`;
  const isFormer = researcher.status === 'former';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.07, duration: 0.5 }}
      className="h-full"
    >
      <Card className="group relative flex h-full flex-col border-border/50 bg-card/80 transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
        {/* Whole-card link to the profile; action links below sit above it */}
        <Link
          to={`/team/${researcher.member.slug}`}
          className="absolute inset-0 z-0 rounded-[inherit]"
          aria-label={`View ${name}'s profile`}
        />

        <CardHeader className="px-6 pb-3 pt-6">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative h-16 w-16 shrink-0">
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-border">
                <span className="text-xl font-bold text-primary/80">
                  {memberInitials(researcher)}
                </span>
              </div>
              {researcher.image_url && (
                <img
                  src={researcher.image_url}
                  alt={name}
                  className={`relative h-16 w-16 rounded-2xl object-cover ring-2 ring-border transition-all duration-300 group-hover:ring-primary/40 ${isFormer ? 'grayscale-[40%]' : ''}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
            </div>

            <div className="min-w-0 flex-1 pt-0.5">
              <div className="mb-1 flex items-start justify-between gap-2">
                <CardTitle className="text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                  {name}
                </CardTitle>
                {isFormer && (
                  <Badge
                    variant="secondary"
                    className="shrink-0 rounded-full px-2 py-0 text-[9px] font-semibold uppercase tracking-wider"
                  >
                    Alumni
                  </Badge>
                )}
              </div>
              {researcher.occupation && (
                <CardDescription className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-primary">
                  {researcher.occupation}
                </CardDescription>
              )}
              {researcher.workplace && (
                <p className="text-xs text-muted-foreground/80">{researcher.workplace}</p>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col space-y-4 px-6 pb-6">
          {researcher.bio && (
            <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
              {researcher.bio}
            </p>
          )}

          {researcher.research_areas.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                Research Areas
              </div>
              <div className="flex flex-wrap gap-1.5">
                {researcher.research_areas.map((area) => (
                  <Badge
                    key={area}
                    variant="secondary"
                    className="bg-primary/6 border border-primary/10 px-2 py-0.5 text-[10px] font-medium text-foreground/80"
                  >
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          )}

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
          <div className="relative z-10 mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-border/40 pt-3">
            {researcher.member.contact_email && (
              <a
                href={`mailto:${researcher.member.contact_email}`}
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail size={13} />
                Email
              </a>
            )}
            {researcher.member.linkedin && (
              <a
                href={researcher.member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin size={13} />
                LinkedIn
              </a>
            )}
            {researcher.member.website && (
              <a
                href={researcher.member.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                <Globe size={13} />
                Website
              </a>
            )}
            {researcher.country && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                <MapPin size={13} />
                {researcher.country}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const GroupHeading = ({
  title,
  count,
  active,
}: {
  title: string;
  count: number;
  active?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-8 flex items-center gap-3"
  >
    <span
      className={`h-2 w-2 rounded-full ${active ? 'animate-pulse bg-primary' : 'bg-muted-foreground/40'}`}
    />
    <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
    <span className="bg-primary/8 ml-1 rounded-full border border-primary/15 px-2 py-0.5 text-xs font-medium text-muted-foreground">
      {count}
    </span>
  </motion.div>
);

// ── Page ──────────────────────────────────────────────────────────────────────
export const Team = () => (
  <div className="min-h-screen">
    <SEO
      title="Our Team"
      description="Meet the multidisciplinary team of experts pushing the boundaries of AI and neuroscience research at BrAIN Labs."
      keywords={['AI Researchers', 'Neuroscience Team', 'BrAIN Labs Team', 'Research Scientists']}
    />

    <PageHero
      icon={<CollaborationIcon size={14} />}
      eyebrow="Our Team"
      title="Meet the"
      highlight="Researchers"
      description="A multidisciplinary team of experts pushing the boundaries of AI and neuroscience research."
      stats={[
        { value: currentMembers.length, label: 'Current Members' },
        { value: formerMembers.length, label: 'Former Members' },
      ]}
    />

    {/* ── Current members ───────────────────────────────────── */}
    <section className="py-8 md:py-14">
      <div className="container mx-auto px-4">
        <GroupHeading title="Current Members" count={currentMembers.length} active />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {currentMembers.map((researcher, idx) => (
            <MemberCard key={researcher.member_id} researcher={researcher} idx={idx} />
          ))}
        </div>
      </div>
    </section>

    {/* ── Former members ────────────────────────────────────── */}
    {formerMembers.length > 0 && (
      <section className="border-t border-border/40 bg-muted/20 py-8 md:py-14">
        <div className="container mx-auto px-4">
          <GroupHeading title="Former Members" count={formerMembers.length} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {formerMembers.map((researcher, idx) => (
              <MemberCard key={researcher.member_id} researcher={researcher} idx={idx} />
            ))}
          </div>
        </div>
      </section>
    )}

    {/* ── CTA ──────────────────────────────────────────────── */}
    <section className="relative overflow-hidden bg-foreground py-20 text-background md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(hsl(var(--background)/0.07)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl space-y-6 text-center"
        >
          <div className="mb-2 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-background/20 bg-background/10">
            <UserPlus size={24} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Join Our Team</h2>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-background/70">
            We regularly accept interns and PhD candidates. Check out our open positions or get in
            touch regarding opportunities.
          </p>
          <Link to="/contact">
            <Button className="h-11 rounded-full bg-background px-7 text-sm text-foreground transition-opacity hover:bg-background hover:opacity-90">
              <Mail className="mr-2" size={15} />
              Contact Us
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  </div>
);
