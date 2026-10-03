import { lazy, Suspense, type ComponentType, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { PageLayout } from './components/shared/PageLayout';
import { Home } from './pages/Home';
import { BADGES_LIVE } from './lib/badges';

// Every page except Home is code-split so the landing page loads only what it needs.
const page = <K extends string, P extends object>(
  load: () => Promise<Record<K, ComponentType<P>>>,
  name: K
) => lazy(() => load().then((m) => ({ default: m[name] })));

const Projects = page(() => import('./pages/Projects'), 'Projects');
const Team = page(() => import('./pages/Team'), 'Team');
const Publications = page(() => import('./pages/Publications'), 'Publications');
const Events = page(() => import('./pages/Events'), 'Events');
const About = page(() => import('./pages/About'), 'About');
const Contact = page(() => import('./pages/Contact'), 'Contact');
const Blog = page(() => import('./pages/Blog'), 'Blog');
const BlogPost = page(() => import('./pages/BlogPost'), 'BlogPost');
const Careers = page(() => import('./pages/Careers'), 'Careers');
const Badges = page(() => import('./pages/Badges'), 'Badges');
const BadgeVerify = page(() => import('./pages/BadgeVerify'), 'BadgeVerify');
const ComingSoon = page(() => import('./pages/ComingSoon'), 'ComingSoon');
const NotFound = page(() => import('./pages/NotFound'), 'NotFound');
const ServerError = page(() => import('./pages/ServerError'), 'ServerError');

/** Full-screen status pages render outside PageLayout, so they need their own Suspense. */
const Standalone = ({ page }: { page: ReactNode }) => <Suspense fallback={null}>{page}</Suspense>;

function App() {
  return (
    // Honour the OS "reduce motion" setting for every framer-motion animation
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="team/:slug?" element={<Team />} />
            <Route path="publications" element={<Publications />} />
            <Route path="events" element={<Events />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogPost />} />
            <Route path="careers" element={<Careers />} />
            <Route
              path="badges"
              element={
                BADGES_LIVE ? (
                  <Badges />
                ) : (
                  <ComingSoon
                    feature="Badge Verification"
                    description="Verified achievement badges from BrAIN Labs, with one-click sharing to LinkedIn, are on the way."
                  />
                )
              }
            />
            <Route
              path="badges/:id"
              element={
                BADGES_LIVE ? (
                  <BadgeVerify />
                ) : (
                  <ComingSoon
                    feature="Badge Verification"
                    description="Verified achievement badges from BrAIN Labs, with one-click sharing to LinkedIn, are on the way."
                  />
                )
              }
            />
            <Route path="coming-soon" element={<ComingSoon />} />
          </Route>
          <Route path="/404" element={<Standalone page={<NotFound />} />} />
          <Route path="/error" element={<Standalone page={<ServerError />} />} />
          <Route path="*" element={<Standalone page={<NotFound />} />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
