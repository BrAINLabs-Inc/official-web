import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
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
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md transition-colors dark:border-neutral-800 dark:bg-neutral-950/95">
      <nav
        className="mx-auto grid h-24 max-w-[1280px] grid-cols-[1fr_auto] items-center px-6 md:grid-cols-[auto_1fr_auto]"
        aria-label="Primary"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center justify-self-start pr-8"
          aria-label="BrAIN Labs Home"
        >
          <img
            src="/brainlabs-logo.webp"
            alt="BrAIN Labs"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center justify-center gap-7 md:flex lg:gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-[14px] font-medium transition-colors ${
                    active
                      ? 'font-semibold text-indigo-600 dark:text-indigo-400'
                      : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right CTA */}
        <div className="flex items-center gap-3 justify-self-end">
          <Link
            to="/contact"
            className="hidden items-center gap-1.5 bg-indigo-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-indigo-700 md:inline-flex"
          >
            <span>Contact Us</span>
            <ArrowRight size={13} />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center text-neutral-800 dark:text-neutral-200 md:hidden"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Dashed line under header */}
      <div className="border-t border-dashed border-neutral-300 dark:border-neutral-800" />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden border-b border-dashed border-neutral-300 bg-white dark:border-neutral-800 dark:bg-neutral-950 md:hidden"
          >
            <ul className="mx-auto flex max-w-[1280px] flex-col space-y-1 px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 text-[15px] font-medium transition-colors ${
                      isActive(link.path)
                        ? 'font-bold text-indigo-600 dark:text-indigo-400'
                        : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex w-full justify-center bg-indigo-600 px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
