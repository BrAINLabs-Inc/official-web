// Renders the LinkedIn preview image for a badge: the badge artwork alone, centred on a
// plain background at 1200x627 (LinkedIn's recommended share-image size). Runs in Node
// at dev/build time only.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import type { Badge } from '../src/lib/badges';

const DESIGNS_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'badges',
  'designs'
);

export const BADGE_WIDTH = 1200;
export const BADGE_HEIGHT = 627;

const artworkCache = new Map<string, { href: string; width: number; height: number }>();

/** Badge artwork as a data URI plus its pixel size (read from the PNG header). */
function artwork(designId: string) {
  let art = artworkCache.get(designId);
  if (!art) {
    const file = readFileSync(path.join(DESIGNS_DIR, `${designId}.png`));
    art = {
      href: `data:image/png;base64,${file.toString('base64')}`,
      width: file.readUInt32BE(16),
      height: file.readUInt32BE(20),
    };
    artworkCache.set(designId, art);
  }
  return art;
}

export function renderBadgeSvg(b: Badge): string {
  const art = artwork(b.design.id);
  const box = BADGE_HEIGHT - 60;
  const scale = Math.min(box / art.width, box / art.height);
  const w = Math.round(art.width * scale);
  const h = Math.round(art.height * scale);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${BADGE_WIDTH}" height="${BADGE_HEIGHT}" viewBox="0 0 ${BADGE_WIDTH} ${BADGE_HEIGHT}">
  <rect width="100%" height="100%" fill="#F4F4F5"/>
  <image href="${art.href}" x="${(BADGE_WIDTH - w) / 2}" y="${(BADGE_HEIGHT - h) / 2}" width="${w}" height="${h}"/>
</svg>`;
}

export function renderBadgePng(b: Badge): Buffer {
  return new Resvg(renderBadgeSvg(b), {
    font: { loadSystemFonts: false },
    fitTo: { mode: 'width', value: BADGE_WIDTH },
  })
    .render()
    .asPng();
}
