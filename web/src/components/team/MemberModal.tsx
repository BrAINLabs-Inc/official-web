import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  X,
} from 'lucide-react';
import { SEO } from '@/components/shared/SEO';
import type { Researcher } from '@/data/team';
import { memberInitials } from '@/lib/utils';

interface MemberModalProps {
  researcher: Researcher;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

/** Profile of a team member shown over the Team page. */
export const MemberModal = ({ researcher, onClose, onPrev, onNext }: MemberModalProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const name = `${researcher.member.first_name} ${researcher.member.second_name}`;
  const isFormer = researcher.status === 'former';

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev?.();
      else if (e.key === 'ArrowRight') onNext?.();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, onPrev, onNext]);

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

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <SEO
        title={`${name} | Our Team`}
        description={`${researcher.occupation ?? 'Researcher'} at BrAIN Labs, ${researcher.workplace ?? ''}`}
      />

      <motion.div
        key={researcher.member.slug}
        role="dialog"
        aria-modal="true"
        aria-labelledby="member-modal-title"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-background shadow-2xl sm:rounded-3xl"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3 sm:px-6">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onPrev}
              disabled={!onPrev}
              aria-label="Previous member"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!onNext}
              aria-label="Next member"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-5 pb-8 pt-6 sm:px-8">
          {/* Identity */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-secondary sm:h-32 sm:w-32">
              <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-muted-foreground">
                {memberInitials(researcher)}
              </span>
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
            <div className="min-w-0">
              {isFormer && (
                <span className="mb-2 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Alumni
                </span>
              )}
              <h2
                id="member-modal-title"
                className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl"
              >
                {name}
              </h2>
              {researcher.occupation && (
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-foreground/70">
                  {researcher.occupation}
                </p>
              )}
              <div className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
                {researcher.workplace && (
                  <span className="flex items-center gap-2">
                    <Briefcase size={14} className="shrink-0" />
                    {researcher.workplace}
                  </span>
                )}
                {researcher.country && (
                  <span className="flex items-center gap-2">
                    <MapPin size={14} className="shrink-0" />
                    {researcher.country}
                  </span>
                )}
              </div>
            </div>
          </div>

          {links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {links.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith('mailto:')
                    ? {}
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/30 hover:bg-secondary"
                >
                  <Icon size={14} />
                  {label}
                </a>
              ))}
            </div>
          )}

          {researcher.bio && (
            <div className="mt-8">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Biography
              </h3>
              <p className="text-base leading-relaxed text-foreground/85">{researcher.bio}</p>
            </div>
          )}

          {researcher.research_areas.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <Sparkles size={13} />
                Research Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {researcher.research_areas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}

          {researcher.educational_background && researcher.educational_background.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <GraduationCap size={14} />
                Education
              </h3>
              <ul className="space-y-1.5 text-sm">
                {researcher.educational_background.map((ed) => (
                  <li key={ed.id}>{ed.degree}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
};
