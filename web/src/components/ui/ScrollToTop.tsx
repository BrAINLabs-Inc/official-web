import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const SHOW_AFTER = 400; // px scrolled before the button appears

/** Floating "back to top" button, shown once the user has scrolled down. */
export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        'fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background shadow-lg transition-all duration-200 hover:opacity-85 focus-visible:opacity-100',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      )}
    >
      <ArrowUp size={18} />
    </button>
  );
};
