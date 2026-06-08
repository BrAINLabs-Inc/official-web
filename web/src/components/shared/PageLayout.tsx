import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CursorEffect } from '@/components/ui/CursorEffect';
import { ProfessionalBackground } from '@/components/ui/ProfessionalBackground';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const PageLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <CursorEffect />
      <ProfessionalBackground />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
