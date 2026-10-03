import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NeuralBackground } from '@/components/ui/NeuralBackground';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const PageLayout = () => {
  const { pathname } = useLocation();

  const previousPath = useRef(pathname);

  useEffect(() => {
    // Opening / closing a team member (/team <-> /team/:slug) keeps the scroll position
    const withinTeam = previousPath.current.startsWith('/team') && pathname.startsWith('/team');
    previousPath.current = pathname;
    if (!withinTeam) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};
