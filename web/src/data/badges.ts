// Verified achievement badges, shareable on LinkedIn.
//
// To issue badges:
//   1. Make sure the badge artwork exists in `badgeDesigns` (artwork files live in
//      web/badges/designs/<id>.png and web/public/badges/designs/<id>.webp).
//   2. Add the event or programme to `badgeEvents`.
//   3. Add one entry per person to `badgeRecipients`. Give every recipient a unique
//      `credentialId` and never change or reuse it: it is the permanent verification URL
//      https://brainlabsinc.org/badges/<credentialId>
//
// Each recipient automatically gets a verification page, a downloadable badge card,
// and "Add to LinkedIn profile" / "Share on LinkedIn" buttons.

export type BadgeLevel = 'gold' | 'silver' | 'bronze' | 'standard';

export interface BadgeDesign {
  /** Slug; also the artwork file name. */
  id: string;
  /** Badge name as printed on the artwork. */
  title: string;
  level: BadgeLevel;
  /** What the badge certifies (shown on the verification page and in LinkedIn previews). */
  description: string;
  /** Organisations named on the artwork. */
  issuers: string[];
}

export interface BadgeEvent {
  /** Short slug, referenced by recipients. */
  id: string;
  /** Event or programme name. */
  name: string;
  /** Who organised the event. */
  organizer: string;
  /** Date the badges were awarded, YYYY-MM-DD. */
  date: string;
  location?: string;
  description?: string;
  /** Optional link to the event page or announcement. */
  url?: string;
}

export interface BadgeRecipient {
  /** Permanent, unique ID used in the verification URL. Letters, digits and dashes only. */
  credentialId: string;
  designId: string;
  eventId: string;
  /** Recipient's full name exactly as it should appear on the badge. */
  name: string;
  /** Optional team name. */
  team?: string;
  /** Optional project / submission title. */
  project?: string;
  /** Optional recipient LinkedIn profile URL (shown on the verification page). */
  linkedin?: string;
  /** Issue date, YYYY-MM-DD. Defaults to the event date. */
  issuedOn?: string;
}

const COMMUNITY_RESEARCH =
  'Recognizes significant involvement in community research initiatives, validating the contribution to collective knowledge.';

export const badgeDesigns: BadgeDesign[] = [
  {
    id: 'community-research-gold',
    title: 'Contribution to Community Research',
    level: 'gold',
    description: COMMUNITY_RESEARCH,
    issuers: ['BrAIN Labs', 'SLIIT'],
  },
  {
    id: 'community-research-silver',
    title: 'Contribution to Community Research',
    level: 'silver',
    description: COMMUNITY_RESEARCH,
    issuers: ['BrAIN Labs', 'SLIIT'],
  },
  {
    id: 'community-research-bronze',
    title: 'Contribution to Community Research',
    level: 'bronze',
    description: COMMUNITY_RESEARCH,
    issuers: ['BrAIN Labs', 'SLIIT'],
  },
  {
    id: 'ai-native-engineering',
    title: 'AI Native Engineering',
    level: 'standard',
    description:
      'Recognizes the successful completion of a comprehensive, zero-to-hero journey in AI, validating practical, hands-on engineering skills in building autonomous agentic systems.',
    issuers: ['BrAIN Labs', 'SLIIT'],
  },
];

export const badgeEvents: BadgeEvent[] = [];

export const badgeRecipients: BadgeRecipient[] = [];
