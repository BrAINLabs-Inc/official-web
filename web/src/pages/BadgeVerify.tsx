import { useEffect, useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  Copy,
  Download,
  ExternalLink,
  Linkedin,
  Plus,
  Share2,
  ShieldAlert,
} from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import { TierDot } from '@/components/ui/TierDot';
import {
  ISSUER_NAME,
  badgeCardPath,
  badgeTitle,
  badgeUrl,
  designImagePath,
  findBadge,
  formatBadgeDate,
  levelLabel,
  linkedInAddToProfileUrl,
  linkedInPostText,
  linkedInShareUrl,
} from '@/lib/badges';

type Copied = 'link' | 'post' | null;

export const BadgeVerify = () => {
  const { id = '' } = useParams<{ id: string }>();
  const badge = findBadge(id);
  const [copied, setCopied] = useState<Copied>(null);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(null), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = (what: Exclude<Copied, null>, text: string) =>
    navigator.clipboard
      .writeText(text)
      .then(() => setCopied(what))
      .catch(() => {});

  if (!badge) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-20">
        <SEO title="Credential Not Found" description="This credential could not be verified." />
        <div className="max-w-md space-y-6 text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-destructive/20 bg-destructive/10">
            <ShieldAlert size={36} className="text-destructive" />
          </div>
          <h1 className="text-2xl font-bold">Credential not verified</h1>
          <p className="text-muted-foreground">
            No badge with ID <span className="font-mono text-foreground">{id.toUpperCase()}</span>{' '}
            was issued by {ISSUER_NAME}. Check the link or ID and try again.
          </p>
          <Link to="/badges">
            <Button variant="outline" className="rounded-full px-6">
              Search Credentials
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const level = levelLabel(badge.design.level);
  const details: [string, ReactNode][] = [
    ['Recipient', badge.name],
    ['Badge', badge.design.title],
    ...(level
      ? [
          [
            'Level',
            <span className="inline-flex items-center gap-2">
              <TierDot level={badge.design.level} className="h-2.5 w-2.5" />
              {level}
            </span>,
          ] as [string, ReactNode],
        ]
      : []),
    [
      'Programme',
      badge.event.url ? (
        <a
          href={badge.event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
        >
          {badge.event.name}
          <ExternalLink size={12} />
        </a>
      ) : (
        badge.event.name
      ),
    ],
    ...(badge.team ? [['Team', badge.team] as [string, ReactNode]] : []),
    ...(badge.project ? [['Project', badge.project] as [string, ReactNode]] : []),
    ['Issued by', badge.design.issuers.join(' & ')],
    ['Issued on', formatBadgeDate(badge.issuedOn)],
    ['Credential ID', <span className="font-mono">{badge.credentialId}</span>],
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={`${badge.name} | ${badgeTitle(badge)}`}
        description={`Verified credential: ${badge.name} earned the ${badgeTitle(badge)} badge from ${badge.design.issuers.join(' and ')}.`}
      />

      {/* ── Credential ────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="from-primary/6 pointer-events-none absolute inset-0 bg-gradient-to-br via-background to-background" />
        <div className="container relative mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <Link
              to="/badges"
              className="mb-10 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <ArrowLeft size={14} />
              All Badges
            </Link>

            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <motion.img
                key={badge.credentialId}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                src={designImagePath(badge.design)}
                alt={`${badgeTitle(badge)} badge`}
                width={720}
                height={714}
                className="mx-auto h-auto w-full max-w-md drop-shadow-xl"
              />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  <BadgeCheck size={15} />
                  Verified Credential
                </div>

                <div>
                  <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                    {badge.name}
                  </h1>
                  <p className="mt-3 text-lg text-muted-foreground">{badgeTitle(badge)}</p>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {badge.design.description}
                </p>

                <dl className="divide-y divide-border/60 rounded-2xl border border-border/60 bg-card text-sm">
                  {details.map(([label, value]) => (
                    <div key={label} className="flex gap-4 px-5 py-3">
                      <dt className="w-28 shrink-0 text-muted-foreground">{label}</dt>
                      <dd className="min-w-0 font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Share ─────────────────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
                <Linkedin size={20} />
                Show it on LinkedIn
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                <strong className="font-medium text-foreground">Add to profile</strong> opens
                LinkedIn's Licenses &amp; Certifications form, pre-filled with this credential and
                its verification link.{' '}
                <strong className="font-medium text-foreground">Share as post</strong> shares this
                page with your badge card as the preview image. Paste the copied text as your
                caption.
              </p>
              <Button
                asChild
                className="h-11 w-full gap-2 rounded-full bg-brand-linkedin text-white hover:bg-brand-linkedin/90"
              >
                <a href={linkedInAddToProfileUrl(badge)} target="_blank" rel="noopener noreferrer">
                  <Plus size={16} />
                  Add to LinkedIn Profile
                </a>
              </Button>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button asChild variant="outline" className="h-10 gap-2 rounded-full">
                  <a href={linkedInShareUrl(badge)} target="_blank" rel="noopener noreferrer">
                    <Share2 size={14} />
                    Share as Post
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-10 gap-2 rounded-full"
                  onClick={() => copy('post', linkedInPostText(badge))}
                >
                  {copied === 'post' ? <Check size={14} /> : <Copy size={14} />}
                  {copied === 'post' ? 'Text Copied' : 'Copy Post Text'}
                </Button>
              </div>
              <Button
                variant="ghost"
                className="h-10 w-full gap-2 rounded-full"
                onClick={() => copy('link', badgeUrl(badge))}
              >
                {copied === 'link' ? <Check size={14} /> : <Copy size={14} />}
                {copied === 'link' ? 'Link Copied' : 'Copy Verification Link'}
              </Button>
              {badge.linkedin && (
                <a
                  href={badge.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Linkedin size={14} />
                  View {badge.name.split(' ')[0]}'s LinkedIn profile
                </a>
              )}
            </div>

            <div className="space-y-3">
              <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
                <img
                  src={badgeCardPath(badge)}
                  alt={`Badge card for ${badge.name}`}
                  width={1200}
                  height={627}
                  loading="lazy"
                  className="h-auto w-full"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  Share card used as the LinkedIn preview.
                </p>
                <Button variant="outline" size="sm" className="gap-2 rounded-full" asChild>
                  <a href={badgeCardPath(badge)} download={`${badge.credentialId}.png`}>
                    <Download size={14} />
                    Download
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
