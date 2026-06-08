import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Bell, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/shared/SEO';

export const ComingSoon = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <SEO
        title="Coming Soon | BrAIN Labs"
        description="Something exciting is on the horizon. Stay tuned for updates from BrAIN Labs."
        keywords={['Coming Soon', 'BrAIN Labs', 'Upcoming']}
      />

      {/* Animated background */}
      <div className="from-primary/6 absolute inset-0 bg-gradient-to-br via-background to-background" />
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="bg-primary/8 absolute right-10 top-1/4 h-[30rem] w-[30rem] rounded-full opacity-60 blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 25, -15, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="bg-foreground/4 absolute bottom-1/4 left-10 h-[36rem] w-[36rem] rounded-full opacity-40 blur-[120px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="container relative z-10 mx-auto px-4"
      >
        <div className="mx-auto max-w-2xl text-center">
          {/* Live SVG Rocket */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl border border-primary/20 bg-primary/10"
          >
            <Rocket size={40} className="text-primary" />
          </motion.div>

          <div className="bg-primary/8 mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-primary">
            <Bell size={12} />
            Coming Soon
          </div>

          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Something{' '}
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Amazing
            </span>
            <br />
            is on the Way
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            We're working hard to bring you new features and experiences. Stay tuned for updates
            from BrAIN Labs.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/">
              <Button
                size="lg"
                className="h-12 rounded-full bg-foreground px-8 text-sm font-medium text-background shadow-lg transition-all hover:bg-foreground/90 hover:shadow-xl"
              >
                Back to Home
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border px-8 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-secondary"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
