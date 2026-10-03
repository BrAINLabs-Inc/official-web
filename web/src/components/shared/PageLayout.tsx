import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NeuralBackground } from '@/components/ui/NeuralBackground';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const PageLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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
    </div>
  );
};
