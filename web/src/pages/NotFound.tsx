import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Ghost, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/shared/SEO';

export const NotFound = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <SEO
        title="Page Not Found | BrAIN Labs"
        description="The page you're looking for doesn't exist or has been moved."
        keywords={['404', 'Not Found', 'BrAIN Labs']}
      />

      {/* Background */}
      <div className="from-primary/6 absolute inset-0 bg-gradient-to-br via-background to-background" />
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="bg-primary/6 absolute right-10 top-1/4 h-[30rem] w-[30rem] rounded-full opacity-50 blur-[100px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="container relative z-10 mx-auto px-4"
      >
        <div className="mx-auto max-w-2xl text-center">
          {/* Animated 404 SVG */}
          <motion.div
            className="relative mb-8"
            animate={{
              y: [0, -8, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              viewBox="0 0 200 160"
              className="mx-auto h-36 w-48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Floating ghost shape */}
              <motion.g
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path
                  d="M100 20C130 20 150 45 150 70V110C150 115 145 120 140 120C135 120 130 115 130 110V90C130 85 125 80 120 80H80C75 80 70 85 70 90V110C70 115 65 120 60 120C55 120 50 115 50 110V70C50 45 70 20 100 20Z"
                  fill="currentColor"
                  className="text-muted-foreground/10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="85" cy="65" r="6" fill="currentColor" className="text-foreground/20" />
                <circle cx="115" cy="65" r="6" fill="currentColor" className="text-foreground/20" />
                <ellipse
                  cx="100"
                  cy="85"
                  rx="8"
                  ry="5"
                  fill="currentColor"
                  className="text-foreground/10"
                />
              </motion.g>
              {/* Question mark */}
              <motion.text
                x="100"
                y="145"
                textAnchor="middle"
                className="fill-foreground/20 text-6xl font-bold"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ?
              </motion.text>
              {/* Dotted trail */}
              {[0, 1, 2, 3].map((i) => (
                <motion.circle
                  key={i}
                  cx={100 + (i - 1.5) * 12}
                  cy={130 - i * 6}
                  r="2"
                  fill="currentColor"
                  className="text-primary/40"
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                />
              ))}
            </svg>
          </motion.div>

          <div className="bg-primary/8 mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-primary">
            <Ghost size={12} />
            Oops! Page not found
          </div>

          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-foreground">404</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            The page you're looking for doesn't exist or has been moved to a different dimension.
          </p>

          <Link to="/">
            <Button
              size="lg"
              className="h-12 rounded-full bg-foreground px-8 text-sm font-medium text-background shadow-lg transition-all hover:bg-foreground/90 hover:shadow-xl"
            >
              <Home className="mr-2" size={16} />
              Back to Home
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
