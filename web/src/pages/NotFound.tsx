import { Ghost, ArrowRight } from 'lucide-react';
import { StatusPage } from '@/components/shared/StatusPage';
import { LinkButton } from '@/components/ui/LinkButton';

export const NotFound = () => (
  <StatusPage
    seoTitle="Page Not Found"
    seoDescription="The page you're looking for doesn't exist or has been moved."
    icon={<Ghost size={26} />}
    accent="violet"
    eyebrow="404 ERROR"
    title="Page not found"
    description="The page you're looking for doesn't exist or has been moved somewhere else."
    actions={
      <LinkButton to="/" icon={<ArrowRight size={14} />}>
        Back to Home
      </LinkButton>
    }
  />
);
