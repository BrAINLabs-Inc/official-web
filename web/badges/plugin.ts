// Vite plugin that turns src/data/badges.ts into shareable files:
//   /badges/<id>.png   personalised badge card (LinkedIn preview + download)
//   /badges/<id>.html  copy of index.html with per-badge title / OpenGraph tags, so
//                      LinkedIn's crawler (which doesn't run JS) gets a rich preview.
//                      Cloudflare serves it at /badges/<id>; the SPA then takes over.
// In dev, PNGs are rendered on request so the verification page can display them.

import type { Plugin } from 'vite';
import {
  ISSUER_NAME,
  SITE_URL,
  badgeCardPath,
  badgePath,
  badgeTitle,
  badgeUrl,
  badges,
  findBadge,
  formatBadgeDate,
  type Badge,
} from '../src/lib/badges';
import { BADGE_HEIGHT, BADGE_WIDTH, renderBadgePng } from './render';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function setMeta(html: string, attr: 'name' | 'property', key: string, value: string) {
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  const existing = new RegExp(`<meta\\s+${attr}="${key}"[^>]*>`, 's');
  return existing.test(html)
    ? html.replace(existing, tag)
    : html.replace('</head>', `  ${tag}\n</head>`);
}

function badgeHtml(indexHtml: string, b: Badge) {
  const title = `${b.name} | ${badgeTitle(b)} | ${ISSUER_NAME}`;
  const description = `Verified credential: ${b.name} earned the ${badgeTitle(b)} badge from ${b.design.issuers.join(' and ')}, issued on ${formatBadgeDate(b.issuedOn)}. Credential ID ${b.credentialId}.`;
  const image = `${SITE_URL}${badgeCardPath(b)}`;

  let html = indexHtml.replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`);
  html = html.replace(/<link rel="canonical"[^>]*>\s*/g, '');
  html = html.replace('</head>', `  <link rel="canonical" href="${badgeUrl(b)}" />\n</head>`);
  for (const [key, value] of [
    ['description', description],
    ['twitter:card', 'summary_large_image'],
    ['twitter:title', title],
    ['twitter:description', description],
    ['twitter:image', image],
  ]) {
    html = setMeta(html, 'name', key, value);
  }
  for (const [key, value] of [
    ['og:type', 'website'],
    ['og:site_name', ISSUER_NAME],
    ['og:url', badgeUrl(b)],
    ['og:title', title],
    ['og:description', description],
    ['og:image', image],
    ['og:image:width', String(BADGE_WIDTH)],
    ['og:image:height', String(BADGE_HEIGHT)],
    ['og:image:alt', `${badgeTitle(b)} badge awarded to ${b.name}`],
  ]) {
    html = setMeta(html, 'property', key, value);
  }
  return html;
}

export function badgesPlugin(): Plugin {
  return {
    name: 'brainlabs-badges',
    enforce: 'post',

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = req.url?.match(/^\/badges\/([A-Za-z0-9-]+)\.png(?:\?.*)?$/);
        const badge = match && findBadge(match[1]);
        if (!badge) return next();
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'no-store');
        res.end(renderBadgePng(badge));
      });
    },

    generateBundle(_options, bundle) {
      const index = bundle['index.html'];
      const indexHtml = index?.type === 'asset' ? String(index.source) : null;

      for (const b of badges) {
        const base = badgePath(b).slice(1); // "badges/<id>"
        this.emitFile({ type: 'asset', fileName: `${base}.png`, source: renderBadgePng(b) });
        if (indexHtml) {
          this.emitFile({
            type: 'asset',
            fileName: `${base}.html`,
            source: badgeHtml(indexHtml, b),
          });
        }
      }
      if (!indexHtml) this.warn('index.html not found in bundle; badge share pages not generated');
    },
  };
}
