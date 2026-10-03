import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Team', path: '/team' },
  { label: 'Publications', path: '/publications' },
  { label: 'Events', path: '/events' },
  { label: 'Blog', path: '/blog' },
  { label: 'Careers', path: '/careers' },
];

/** Active for the exact path and its sub-pages (e.g. /team/:slug), except Home. */
const isActivePath = (current: string, path: string) =>
  path === '/' ? current === '/' : current === path || current.startsWith(`${path}/`);

export const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu whenever the route changes
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background transition-shadow duration-200',
        scrolled ? 'border-border shadow-sm' : 'border-border/60'
      )}
    >
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* ── Logo ─────────────────────────────────────────────── */}
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="BrAIN Labs Home">
          <img src="/icon.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="text-base font-bold tracking-tight text-foreground">BrAIN Labs</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              AI &amp; Neuroinformatics
            </span>
          </div>
        </Link>

        {/* ── Desktop Links ─────────────────────────────────────── */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150',
                  active
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            className="ml-3 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity duration-150 hover:opacity-85"
          >
            <Send size={15} />
            Get in Touch
          </Link>
        </div>

        {/* ── Mobile Toggle ─────────────────────────────────────── */}
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-secondary lg:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* ── Mobile Menu ───────────────────────────────────────── */}
      {isOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/contact"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background"
            >
              <Send size={15} />
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
