import { Rocket, Bell, ArrowRight } from 'lucide-react';
import { StatusPage } from '@/components/shared/StatusPage';
import { LinkButton } from '@/components/ui/LinkButton';

export const ComingSoon = () => (
  <StatusPage
    seoTitle="Coming Soon"
    seoDescription="Something exciting is on the horizon. Stay tuned for updates from BrAIN Labs."
    icon={<Rocket size={26} />}
    accent="cyan"
    eyebrow="COMING SOON"
    title="Something amazing is on the way"
    description="We're working hard to bring you new features and experiences. Stay tuned for updates."
    actions={
      <>
        <LinkButton to="/" icon={<ArrowRight size={14} />}>
          Back to Home
        </LinkButton>
        <LinkButton to="/contact" variant="outline" icon={<Bell size={14} />}>
          Get in Touch
        </LinkButton>
      </>
    }
  />
);
