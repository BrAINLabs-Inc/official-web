import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCcw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/shared/SEO';

export const ServerError = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <SEO
        title="Something Went Wrong | BrAIN Labs"
        description="We encountered an unexpected error. Please try again later."
        keywords={['Error', 'BrAIN Labs', 'Server Error']}
      />

      {/* Background */}
      <div className="from-primary/6 absolute inset-0 bg-gradient-to-br via-background to-background" />
      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 20, -30, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="absolute right-10 top-1/4 h-[30rem] w-[30rem] rounded-full bg-destructive/5 opacity-40 blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, 25, -15, 0],
          y: [0, -25, 15, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-1/4 left-10 h-[36rem] w-[36rem] rounded-full bg-primary/5 opacity-40 blur-[120px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="container relative z-10 mx-auto px-4"
      >
        <div className="mx-auto max-w-2xl text-center">
          {/* Animated SVG */}
          <motion.div
            className="relative mb-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              viewBox="0 0 200 160"
              className="mx-auto h-36 w-48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Broken gear / warning shape */}
              <motion.g
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path
                  d="M100 30L130 50V80C130 95 115 105 100 110C85 105 70 95 70 80V50L100 30Z"
                  fill="currentColor"
                  className="text-destructive/10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle
                  cx="100"
                  cy="70"
                  r="15"
                  fill="currentColor"
                  className="text-destructive/5"
                />
                <path
                  d="M100 55V85M85 70H115"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-destructive/40"
                />
              </motion.g>
              {/* Spark */}
              <motion.circle
                cx="65"
                cy="45"
                r="3"
                fill="currentColor"
                className="text-destructive/30"
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.circle
                cx="135"
                cy="55"
                r="2"
                fill="currentColor"
                className="text-destructive/20"
                animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.8, delay: 0.5, repeat: Infinity }}
              />
            </svg>
          </motion.div>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-destructive">
            <AlertTriangle size={12} />
            Error
          </div>

          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-foreground">Oops!</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Currently, data cannot be fetched or is unavailable. Please try again later.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-border px-8 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-secondary"
              onClick={() => window.location.reload()}
            >
              <RefreshCcw className="mr-2" size={16} />
              Try Again
            </Button>
            <Link to="/">
              <Button
                size="lg"
                className="h-12 rounded-full bg-foreground px-8 text-sm font-medium text-background shadow-lg transition-all hover:bg-foreground/90 hover:shadow-xl"
              >
                Back to Home
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
