import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicLayout from './components/PublicLayout.jsx';
import LoadingState from './components/LoadingState.jsx';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const DynamicPage = lazy(() => import('./pages/DynamicPage.jsx'));
const CoursesPage = lazy(() => import('./pages/CoursesPage.jsx'));
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage.jsx'));
const EventsPage = lazy(() => import('./pages/EventsPage.jsx'));
const EventDetailPage = lazy(() => import('./pages/EventDetailPage.jsx'));
const BlogPage = lazy(() => import('./pages/BlogPage.jsx'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage.jsx'));
const MentorsPage = lazy(() => import('./pages/MentorsPage.jsx'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<LoadingState />}>{children}</Suspense>
);

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<SuspenseWrapper><HomePage /></SuspenseWrapper>} />
        <Route path="/about" element={<SuspenseWrapper><DynamicPage pageName="about" title="About" /></SuspenseWrapper>} />
        <Route path="/courses" element={<SuspenseWrapper><CoursesPage /></SuspenseWrapper>} />
        <Route path="/courses/:slug" element={<SuspenseWrapper><CourseDetailPage /></SuspenseWrapper>} />
        <Route path="/events" element={<SuspenseWrapper><EventsPage /></SuspenseWrapper>} />
        <Route path="/events/:slug" element={<SuspenseWrapper><EventDetailPage /></SuspenseWrapper>} />
        <Route path="/blog" element={<SuspenseWrapper><BlogPage /></SuspenseWrapper>} />
        <Route path="/blog/:slug" element={<SuspenseWrapper><BlogDetailPage /></SuspenseWrapper>} />
        <Route path="/mentors" element={<SuspenseWrapper><MentorsPage /></SuspenseWrapper>} />
        <Route path="/testimonials" element={<SuspenseWrapper><TestimonialsPage /></SuspenseWrapper>} />
        <Route path="/contact" element={<SuspenseWrapper><ContactPage /></SuspenseWrapper>} />
      </Route>
    </Routes>
  );
}
