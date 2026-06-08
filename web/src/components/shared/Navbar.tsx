import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Team', path: '/team' },
  { label: 'Publications', path: '/publications' },
  { label: 'Events', path: '/events' },
  { label: 'Blog', path: '/blog' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* ── Floating Pill Nav ─────────────────────────────────────── */}
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`pointer-events-auto w-full max-w-5xl transition-all duration-500 ${
            scrolled ? 'liquid-glass-scrolled' : 'liquid-glass'
          }`}
          style={{ borderRadius: '1.25rem' }}
        >
          <div className="flex h-[60px] items-center justify-between px-4 md:px-6">
            {/* ── Logo ─────────────────────────────────────────────── */}
            <Link
              to="/"
              className="group flex shrink-0 items-center gap-2.5"
              aria-label="BrAIN Labs Home"
            >
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                <img
                  src="/icon.png"
                  alt="BrAIN Labs icon"
                  className="h-8 w-8 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="hidden flex-col leading-none sm:flex">
                <span className="text-[13px] font-bold tracking-tight text-foreground">
                  BrAIN Labs
                </span>
                <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70">
                  AI &amp; Neuroinformatics
                </span>
              </div>
            </Link>

            {/* ── Desktop Links ─────────────────────────────────────── */}
            <div className="hidden items-center gap-0.5 md:flex">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative rounded-xl px-3 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                      active
                        ? 'nav-pill-active text-foreground'
                        : 'text-foreground/60 hover:bg-white/10 hover:text-foreground'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-foreground"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ── Mobile Toggle ─────────────────────────────────────── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="glass-btn flex h-8 w-8 items-center justify-center rounded-xl text-foreground/80 transition-all md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="flex"
                >
                  {isOpen ? (
                    <X size={17} strokeWidth={2.5} />
                  ) : (
                    <Menu size={17} strokeWidth={2.5} />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          {/* ── Mobile Drawer ─────────────────────────────────────── */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden md:hidden"
              >
                <div className="flex flex-col gap-1 border-t border-white/10 px-4 py-3">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.035, duration: 0.22 }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                          isActive(link.path)
                            ? 'bg-white/15 text-foreground'
                            : 'text-foreground/65 hover:bg-white/10 hover:text-foreground'
                        }`}
                      >
                        {isActive(link.path) && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                        )}
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

      {/* Spacer so page content starts below the floating nav */}
      <div className="h-[76px]" />
    </>
  );
};
