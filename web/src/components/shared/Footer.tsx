import { Link } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';
import { contact } from '@/data/general';

const footerLinks = [
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Team', path: '/team' },
  { label: 'Publications', path: '/publications' },
  { label: 'Events', path: '/events' },
  { label: 'Blog', path: '/blog' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

export const Footer = () => (
  <footer className="bg-white dark:bg-neutral-950">
    <div className="mx-auto max-w-[1280px] px-6">
      <div className="border-x border-t border-dashed border-neutral-300 px-6 dark:border-neutral-800 sm:px-10 md:px-14">
        <div className="flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md space-y-3">
            <Link to="/" className="inline-flex items-center" aria-label="BrAIN Labs home">
              <img src="/brainlabs-logo.webp" alt="BrAIN Labs" className="h-[32px] w-auto" />
            </Link>
            <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              Brain-Inspired AI &amp; Neuroinformatics Research Laboratory pushing the frontiers of
              intelligence.
            </p>
            <a
              href={contact.email}
              className="inline-block text-sm font-semibold text-neutral-800 transition-colors hover:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400"
            >
              contact@brainlabs.inc
            </a>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3" aria-label="Footer">
            {footerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[14px] font-medium text-neutral-600 transition-colors hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center border border-neutral-300 text-neutral-600 transition-colors hover:border-indigo-600 hover:text-indigo-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center border border-neutral-300 text-neutral-600 transition-colors hover:border-indigo-600 hover:text-indigo-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-dashed border-neutral-300 py-6 text-xs text-neutral-500 dark:border-neutral-800 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} BrAIN Labs Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              to="/about"
              className="transition-colors hover:text-neutral-900 dark:hover:text-white"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="transition-colors hover:text-neutral-900 dark:hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
