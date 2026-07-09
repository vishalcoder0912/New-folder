import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import AdminLayout from './admin/layout/AdminLayout.jsx';
import DashboardPage from './admin/pages/DashboardPage.jsx';
import PageBuilderPage from './admin/pages/PageBuilderPage.jsx';
import ManageCoursesPage from './admin/pages/ManageCoursesPage.jsx';
import ManageEventsPage from './admin/pages/ManageEventsPage.jsx';
import ManageBlogsPage from './admin/pages/ManageBlogsPage.jsx';
import ManageMentorsPage from './admin/pages/ManageMentorsPage.jsx';
import ManageTestimonialsPage from './admin/pages/ManageTestimonialsPage.jsx';
import ManageFAQsPage from './admin/pages/ManageFAQsPage.jsx';
import LeadsPage from './admin/pages/LeadsPage.jsx';
import MediaLibraryPage from './admin/pages/MediaLibraryPage.jsx';
import SettingsPage from './admin/pages/SettingsPage.jsx';
import AdminUsersPage from './admin/pages/AdminUsersPage.jsx';
import LoginPage from './admin/pages/LoginPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="page-builder" element={<PageBuilderPage />} />
          <Route path="sections" element={<PageBuilderPage fixedPage="home" />} />
          <Route path="courses" element={<ManageCoursesPage />} />
          <Route path="events" element={<ManageEventsPage />} />
          <Route path="blogs" element={<ManageBlogsPage />} />
          <Route path="mentors" element={<ManageMentorsPage />} />
          <Route path="testimonials" element={<ManageTestimonialsPage />} />
          <Route path="faqs" element={<ManageFAQsPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="media" element={<MediaLibraryPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
