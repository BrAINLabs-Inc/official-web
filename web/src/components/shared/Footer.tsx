import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Mail, Linkedin } from 'lucide-react';
import { contact } from '@/data/general';
import { BrainLabsLogoIcon } from '@/components/ui/BrainLabsLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border/50 bg-card/30 backdrop-blur-sm">
      {/* Subtle decorative gradient */}
      <div className="absolute bottom-0 left-0 h-80 w-80 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="bg-primary/3 absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* About */}
          <div className="md:col-span-2">
            <Link to="/" className="group mb-4 inline-flex items-center gap-2.5">
              <BrainLabsLogoIcon
                width={32}
                height={32}
                className="transition-transform group-hover:scale-105"
              />
              <span className="text-lg font-bold transition-colors group-hover:text-primary">
                BrAIN Labs
              </span>
            </Link>
            <p className="mb-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Research laboratory dedicated to exploring the intersection of AI, ML, and
              Neuroscience. Developing intelligent systems through brain-inspired approaches.
            </p>
            <div className="flex gap-2">
              <a
                href={contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border/50 p-2.5 text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border/50 p-2.5 text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border/50 p-2.5 text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={contact.email}
                className="rounded-lg border border-border/50 p-2.5 text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/70">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2.5">
              <Link
                to="/"
                className="text-sm text-muted-foreground transition-all duration-200 hover:translate-x-0.5 hover:text-primary"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-sm text-muted-foreground transition-all duration-200 hover:translate-x-0.5 hover:text-primary"
              >
                About
              </Link>
              <Link
                to="/projects"
                className="text-sm text-muted-foreground transition-all duration-200 hover:translate-x-0.5 hover:text-primary"
              >
                Projects
              </Link>
              <Link
                to="/team"
                className="text-sm text-muted-foreground transition-all duration-200 hover:translate-x-0.5 hover:text-primary"
              >
                Team
              </Link>
              <Link
                to="/publications"
                className="text-sm text-muted-foreground transition-all duration-200 hover:translate-x-0.5 hover:text-primary"
              >
                Publications
              </Link>
              <Link
                to="/events"
                className="text-sm text-muted-foreground transition-all duration-200 hover:translate-x-0.5 hover:text-primary"
              >
                Events
              </Link>
              <Link
                to="/blog"
                className="text-sm text-muted-foreground transition-all duration-200 hover:translate-x-0.5 hover:text-primary"
              >
                Blog
              </Link>
              <Link
                to="/careers"
                className="text-sm text-muted-foreground transition-all duration-200 hover:translate-x-0.5 hover:text-primary"
              >
                Careers
              </Link>
            </div>
          </div>

          {/* More */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/70">
              More
            </h3>
            <div className="flex flex-col gap-2.5">
              <Link
                to="/contact"
                className="text-sm text-muted-foreground transition-all duration-200 hover:translate-x-0.5 hover:text-primary"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} BrAIN Labs. All rights reserved.
          </p>
          {/* <div className="flex items-center gap-3">
                        <img
                            src="/assets/images/sliit-uni-logo-black.jpg"
                            alt="SLIIT"
                            className="h-8 opacity-80 hover:opacity-100 transition-opacity mix-blend-multiply dark:mix-blend-screen"
                        />
                    </div> */}
        </div>
      </div>
    </footer>
  );
};
