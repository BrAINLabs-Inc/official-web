import { AlertTriangle, RefreshCcw, ArrowRight } from 'lucide-react';
import { StatusPage } from '@/components/shared/StatusPage';
import { LinkButton } from '@/components/ui/LinkButton';

export const ServerError = () => (
  <StatusPage
    seoTitle="Something Went Wrong"
    seoDescription="We encountered an unexpected error. Please try again later."
    icon={<AlertTriangle size={26} />}
    accent="rose"
    eyebrow="SERVER ERROR"
    title="Something went wrong"
    description="We couldn't load this page right now. Please try again in a moment."
    actions={
      <>
        <LinkButton
          variant="outline"
          icon={<RefreshCcw size={14} />}
          onClick={() => window.location.reload()}
        >
          Try Again
        </LinkButton>
        <LinkButton to="/" icon={<ArrowRight size={14} />}>
          Back to Home
        </LinkButton>
      </>
    }
  />
);
