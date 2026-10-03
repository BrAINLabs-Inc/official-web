// Shared badge helpers, used by both the app and the build-time badge generator
// (vite.config.ts). Keep this file free of `@/` imports and browser-only APIs.

import {
  badgeDesigns,
  badgeEvents,
  badgeRecipients,
  type BadgeDesign,
  type BadgeEvent,
  type BadgeLevel,
  type BadgeRecipient,
} from '../data/badges';

/**
 * Launch switch for badge verification. While false, /badges and /badges/:id show the
 * Coming Soon page and the build skips the per-badge share pages and images.
 */
export const BADGES_LIVE = true;

export const SITE_URL = 'https://brainlabsinc.org';
export const ISSUER_NAME = 'BrAIN Labs';

/**
 * Optional numeric LinkedIn company ID (from the company admin URL). When set, the
 * "Add to profile" flow links the certification to the BrAIN Labs company page
 * instead of using a plain-text organisation name.
 */
export const LINKEDIN_ORGANIZATION_ID = '';

export interface Badge extends BadgeRecipient {
  design: BadgeDesign;
  event: BadgeEvent;
  issuedOn: string;
}

const LEVEL_LABEL: Record<BadgeLevel, string | null> = {
  gold: 'Gold',
  silver: 'Silver',
  bronze: 'Bronze',
  standard: null,
};

/** "Gold", "Silver", "Bronze", or null for single-level badges. */
export const levelLabel = (level: BadgeLevel) => LEVEL_LABEL[level];

/** Sort order within an event: gold, silver, bronze, then the rest. */
export const levelRank = (level: BadgeLevel) =>
  ({ gold: 1, silver: 2, bronze: 3, standard: 4 })[level];

/** e.g. "Contribution to Community Research (Gold)" */
export const badgeTitle = (b: Pick<Badge, 'design'>) => {
  const level = levelLabel(b.design.level);
  return level ? `${b.design.title} (${level})` : b.design.title;
};

/** Credential IDs are matched case-insensitively. */
export const normalizeCredentialId = (id: string) => id.trim().toUpperCase();

export const badgePath = (b: Pick<BadgeRecipient, 'credentialId'>) =>
  `/badges/${b.credentialId.toLowerCase()}`;
export const badgeUrl = (b: Pick<BadgeRecipient, 'credentialId'>) => `${SITE_URL}${badgePath(b)}`;
/** LinkedIn preview image (badge artwork, 1200x627) generated at build time. */
export const badgeCardPath = (b: Pick<BadgeRecipient, 'credentialId'>) => `${badgePath(b)}.png`;
/** The badge artwork itself, served from public/. */
export const designImagePath = (design: Pick<BadgeDesign, 'id'>) =>
  `/badges/designs/${design.id}.webp`;
/** Full-resolution badge artwork (transparent PNG) for downloading. */
export const designDownloadPath = (design: Pick<BadgeDesign, 'id'>) =>
  `/badges/designs/${design.id}.png`;

export const formatBadgeDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

const designsById = new Map(badgeDesigns.map((d) => [d.id, d]));
const eventsById = new Map(badgeEvents.map((e) => [e.id, e]));

/** All badges with their design and event attached, validated once at load. */
export const badges: Badge[] = badgeRecipients.map((r) => {
  const design = designsById.get(r.designId);
  const event = eventsById.get(r.eventId);
  if (!design) throw new Error(`Badge ${r.credentialId} references unknown design "${r.designId}"`);
  if (!event) throw new Error(`Badge ${r.credentialId} references unknown event "${r.eventId}"`);
  if (!/^[A-Za-z0-9-]+$/.test(r.credentialId)) {
    throw new Error(
      `Badge credentialId "${r.credentialId}" may only contain letters, digits and dashes`
    );
  }
  return { ...r, design, event, issuedOn: r.issuedOn ?? event.date };
});

const badgesById = new Map<string, Badge>();
for (const b of badges) {
  const key = normalizeCredentialId(b.credentialId);
  if (badgesById.has(key)) throw new Error(`Duplicate badge credentialId "${b.credentialId}"`);
  badgesById.set(key, b);
}

export const findBadge = (credentialId: string) =>
  badgesById.get(normalizeCredentialId(credentialId));

// ── LinkedIn ─────────────────────────────────────────────────────────────────

/** Opens LinkedIn's "Add license or certification" form, pre-filled. */
export const linkedInAddToProfileUrl = (b: Badge) => {
  const [year, month] = b.issuedOn.split('-');
  const params = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME',
    name: badgeTitle(b),
    issueYear: year,
    issueMonth: String(Number(month)),
    certUrl: badgeUrl(b),
    certId: b.credentialId,
  });
  if (LINKEDIN_ORGANIZATION_ID) params.set('organizationId', LINKEDIN_ORGANIZATION_ID);
  else params.set('organizationName', ISSUER_NAME);
  return `https://www.linkedin.com/profile/add?${params}`;
};

/** Opens LinkedIn's share dialog for the verification page (preview comes from its OG tags). */
export const linkedInShareUrl = (b: Badge) =>
  `https://www.linkedin.com/sharing/share-offsite/?${new URLSearchParams({ url: badgeUrl(b) })}`;

/** Suggested text for a LinkedIn post. */
export const linkedInPostText = (b: Badge) =>
  [
    `I'm proud to share that I've earned the ${badgeTitle(b)} badge from ${b.design.issuers.join(' and ')}!`,
    '',
    b.design.description,
    '',
    `Verify this credential: ${badgeUrl(b)}`,
    '',
    '#BrAINLabs #SLIIT #AI #Research',
  ].join('\n');
