// Renders a personalised badge card to SVG, then to PNG with resvg. Runs in Node at
// dev/build time only. Output is 1200x627, LinkedIn's recommended share-image size,
// and is also the downloadable card on the verification page.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import type { BadgeLevel } from '../src/data/badges';
import { badgeUrl, formatBadgeDate, levelLabel, type Badge } from '../src/lib/badges';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const FONT_FILES = ['Inter-400.ttf', 'Inter-600.ttf', 'Inter-800.ttf'].map((f) =>
  path.join(ROOT, 'assets', 'fonts', f)
);

export const BADGE_WIDTH = 1200;
export const BADGE_HEIGHT = 627;

const LEVEL_COLORS: Record<BadgeLevel, { accent: string; glow: string }> = {
  gold: { accent: '#F2CF74', glow: '#D9A93F' },
  silver: { accent: '#E4E7EC', glow: '#AEB6C2' },
  bronze: { accent: '#E7A979', glow: '#C47B45' },
  standard: { accent: '#E4E4E7', glow: '#8B8B94' },
};

const artworkCache = new Map<string, { href: string; width: number; height: number }>();

/** Badge artwork as a data URI plus its pixel size (read from the PNG header). */
function artwork(designId: string) {
  let art = artworkCache.get(designId);
  if (!art) {
    const file = readFileSync(path.join(ROOT, 'designs', `${designId}.png`));
    art = {
      href: `data:image/png;base64,${file.toString('base64')}`,
      width: file.readUInt32BE(16),
      height: file.readUInt32BE(20),
    };
    artworkCache.set(designId, art);
  }
  return art;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Greedy word wrap using an average Inter glyph width; good enough for short titles. */
function wrap(text: string, fontSize: number, maxWidth: number, maxLines: number): string[] {
  const maxChars = Math.floor(maxWidth / (fontSize * 0.56));
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${kept[maxLines - 1].replace(/\s+\S*$/, '')}…`;
    return kept;
  }
  return lines;
}

const textLines = (lines: string[], x: number, y: number, lineHeight: number, attrs: string) =>
  lines
    .map((l, i) => `<text x="${x}" y="${y + i * lineHeight}" ${attrs}>${esc(l)}</text>`)
    .join('');

export function renderBadgeSvg(b: Badge): string {
  const colors = LEVEL_COLORS[b.design.level];
  const level = levelLabel(b.design.level);

  // Artwork, fitted into the left panel
  const art = artwork(b.design.id);
  const artBox = 500;
  const scale = Math.min(artBox / art.width, artBox / art.height);
  const artW = Math.round(art.width * scale);
  const artH = Math.round(art.height * scale);
  const artCx = 310;
  const artX = artCx - artW / 2;
  const artY = (BADGE_HEIGHT - artH) / 2;

  // Right column, laid out top-down
  const x = 620;
  const colWidth = BADGE_WIDTH - x - 70;
  const titleLines = wrap(b.design.title, 44, colWidth, 2);
  const nameLines = wrap(b.name, 40, colWidth, 2);
  const detail = [b.event.name, b.team, b.project].filter(Boolean).join(' · ');

  let y = 132;
  const parts: string[] = [
    `<g transform="translate(${x} ${y - 20})"><circle cx="11" cy="11" r="11" fill="${colors.glow}"/><path d="M6 11.5l3.2 3.2L16 8" stroke="#0B0B0F" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`,
    `<text x="${x + 34}" y="${y - 2}" font-size="16" font-weight="600" letter-spacing="3" fill="${colors.accent}">VERIFIED CREDENTIAL</text>`,
  ];
  y += 66;
  parts.push(
    textLines(
      titleLines,
      x,
      y,
      52,
      'font-size="44" font-weight="800" fill="#FFFFFF" letter-spacing="-1"'
    )
  );
  y += (titleLines.length - 1) * 52;
  if (level) {
    y += 46;
    parts.push(
      `<rect x="${x}" y="${y - 26}" width="${level.length * 13 + 44}" height="36" rx="18" fill="${colors.glow}" fill-opacity="0.18" stroke="${colors.accent}" stroke-opacity="0.5"/>`,
      `<text x="${x + 22}" y="${y - 2}" font-size="16" font-weight="600" letter-spacing="2.5" fill="${colors.accent}">${esc(level.toUpperCase())}</text>`
    );
  }
  y += 70;
  parts.push(
    `<text x="${x}" y="${y}" font-size="15" font-weight="600" letter-spacing="2.5" fill="#71717A">AWARDED TO</text>`
  );
  y += 46;
  parts.push(textLines(nameLines, x, y, 48, 'font-size="40" font-weight="800" fill="#FFFFFF"'));
  y += (nameLines.length - 1) * 48;
  if (detail) {
    y += 36;
    parts.push(
      textLines(
        wrap(detail, 20, colWidth, 1),
        x,
        y,
        26,
        'font-size="20" font-weight="400" fill="#A1A1AA"'
      )
    );
  }

  const footerY = BADGE_HEIGHT - 84;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${BADGE_WIDTH}" height="${BADGE_HEIGHT}" viewBox="0 0 ${BADGE_WIDTH} ${BADGE_HEIGHT}" font-family="Inter">
  <defs>
    <radialGradient id="glow" cx="${artCx}" cy="${BADGE_HEIGHT / 2}" r="380" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${colors.glow}" stop-opacity="0.38"/>
      <stop offset="1" stop-color="${colors.glow}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.3" fill="#FFFFFF" fill-opacity="0.06"/>
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="#0B0B0F"/>
  <rect width="100%" height="100%" fill="url(#dots)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect x="18" y="18" width="${BADGE_WIDTH - 36}" height="${BADGE_HEIGHT - 36}" rx="26" fill="none" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>

  <image href="${art.href}" x="${artX}" y="${artY}" width="${artW}" height="${artH}"/>

  ${parts.join('\n  ')}

  <line x1="${x}" y1="${footerY - 36}" x2="${BADGE_WIDTH - 70}" y2="${footerY - 36}" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="2"/>
  <text x="${x}" y="${footerY}" font-size="18" font-weight="600" fill="#E4E4E7">${esc(b.design.issuers.join(' × '))}<tspan dx="10" fill="#52525B" font-weight="400">·</tspan><tspan dx="10" fill="#71717A" font-weight="400">${esc(formatBadgeDate(b.issuedOn))}</tspan></text>
  <text x="${BADGE_WIDTH - 70}" y="${footerY}" text-anchor="end" font-size="16" font-weight="400" fill="#71717A">ID <tspan fill="#D4D4D8" font-weight="600">${esc(b.credentialId)}</tspan></text>
  <text x="${x}" y="${footerY + 30}" font-size="15" font-weight="400" fill="#71717A">Verify at ${esc(badgeUrl(b).replace(/^https?:\/\//, ''))}</text>
</svg>`;
}

export function renderBadgePng(b: Badge): Buffer {
  const resvg = new Resvg(renderBadgeSvg(b), {
    font: { fontFiles: FONT_FILES, loadSystemFonts: false, defaultFontFamily: 'Inter' },
    fitTo: { mode: 'width', value: BADGE_WIDTH },
  });
  return resvg.render().asPng();
}
