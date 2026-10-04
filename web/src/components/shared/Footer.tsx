import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, type LucideIcon } from 'lucide-react';
import { contact } from '@/data/general';

const linkGroups: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: 'Research',
    links: [
      { to: '/projects', label: 'Projects' },
      { to: '/publications', label: 'Publications' },
      { to: '/team', label: 'Team' },
    ],
  },
  {
    title: 'Community',
    links: [
      { to: '/events', label: 'Events & Workshops' },
      { to: '/blog', label: 'Blog' },
      { to: '/badges', label: 'Verify a Badge' },
    ],
  },
  {
    title: 'Lab',
    links: [
      { to: '/about', label: 'About' },
      { to: '/careers', label: 'Careers' },
      { to: '/contact', label: 'Contact' },
    ],
  },
];

const socials: { href: string; label: string; icon: LucideIcon }[] = [
  { href: contact.github, label: 'GitHub', icon: Github },
  { href: contact.linkedin, label: 'LinkedIn', icon: Linkedin },
  { href: contact.email, label: 'Email', icon: Mail },
];

// ── Static network behind the wordmark ───────────────────────────────────────
const NET_W = 1440;
const NET_H = 300;

/** Deterministic pseudo-random generator so the pattern is identical on every render. */
const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

/** Points on a jittered grid, each joined to its close neighbours. */
const network = (() => {
  const rand = seeded(42);
  const nodes: [number, number][] = [];
  for (let x = 40; x < NET_W; x += 110) {
    for (let y = 30; y < NET_H; y += 90) {
      nodes.push([x + (rand() - 0.5) * 80, y + (rand() - 0.5) * 60]);
    }
  }
  const edges: [number, number][] = [];
  nodes.forEach(([x1, y1], i) => {
    nodes.slice(i + 1).forEach(([x2, y2], k) => {
      if (Math.hypot(x2 - x1, y2 - y1) < 135 && rand() < 0.7) edges.push([i, i + 1 + k]);
    });
  });
  return { nodes, edges };
})();

const emails = [
  { label: 'General', href: contact.email },
  { label: 'Careers', href: contact.careersEmail },
];

export const Footer = () => (
  <footer className="relative z-10 mt-auto overflow-hidden border-t border-border bg-secondary">
    <div className="container mx-auto px-4 pt-14 md:pt-16">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* ── Brand ─────────────────────────────────────────── */}
        <div className="lg:col-span-4">
          <Link to="/" className="inline-flex items-center gap-2.5" aria-label="BrAIN Labs Home">
            <img
              src="/icon.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 object-contain mix-blend-multiply"
            />
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="text-base font-bold tracking-tight">BrAIN Labs</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                AI &amp; Neuroinformatics
              </span>
            </div>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A research lab exploring the intersection of AI, machine learning and neuroscience,
            building intelligent systems through brain-inspired approaches.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith('mailto:')
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' })}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* ── Links ─────────────────────────────────────────── */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/70">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* ── Contact ───────────────────────────────────────── */}
        <div className="lg:col-span-3">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/70">
            Get in Touch
          </h3>
          <ul className="space-y-3">
            {emails.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="group block">
                  <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">
                    {label}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 group-hover:underline">
                    {href.replace(/^mailto:/, '')}
                    <ArrowUpRight
                      size={13}
                      className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              </li>
            ))}
            <li className="flex items-start gap-2 pt-1 text-sm text-muted-foreground">
              <MapPin size={15} className="mt-0.5 shrink-0" />
              SLIIT, New Kandy Road, Malabe, Sri Lanka
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────── */}
      <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} BrAIN Labs. All rights reserved.</p>
        <p>In partnership with the Sri Lanka Institute of Information Technology.</p>
      </div>
    </div>

    {/* Oversized wordmark over a static neural network */}
    <div aria-hidden="true" className="pointer-events-none relative mt-4 select-none">
      <svg
        viewBox={`0 0 ${NET_W} ${NET_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-foreground/[0.12] [mask-image:linear-gradient(to_bottom,transparent,black_45%)]"
      >
        {network.edges.map(([a, b], i) => (
          <line
            key={i}
            x1={network.nodes[a][0]}
            y1={network.nodes[a][1]}
            x2={network.nodes[b][0]}
            y2={network.nodes[b][1]}
            stroke="currentColor"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {network.nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2.5} fill="currentColor" />
        ))}
      </svg>
      <div className="relative -mb-[0.22em] overflow-hidden whitespace-nowrap text-center text-[17vw] font-bold leading-none tracking-tighter text-[color-mix(in_srgb,hsl(var(--foreground))_7%,hsl(var(--secondary)))]">
        BrAIN Labs
      </div>
    </div>
  </footer>
);
