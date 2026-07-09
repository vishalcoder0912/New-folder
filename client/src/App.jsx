import { Route, Routes } from 'react-router-dom';
import PublicLayout from './components/PublicLayout.jsx';
import BlogDetailPage from './pages/BlogDetailPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import CourseDetailPage from './pages/CourseDetailPage.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import DynamicPage from './pages/DynamicPage.jsx';
import EventDetailPage from './pages/EventDetailPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import HomePage from './pages/HomePage.jsx';
import MentorsPage from './pages/MentorsPage.jsx';
import TestimonialsPage from './pages/TestimonialsPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<DynamicPage pageName="about" title="About" />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:slug" element={<CourseDetailPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:slug" element={<EventDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/mentors" element={<MentorsPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
