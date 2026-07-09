import { Navigate, Outlet } from 'react-router-dom';
import LoadingState from '../components/LoadingState.jsx';
import { useAuth } from '../hooks/useAuth.jsx';

export default function ProtectedRoute() {
  const { isAuthed, loading } = useAuth();
  if (loading) return <LoadingState />;
  if (!isAuthed) return <Navigate to="/login" replace />;
  return <Outlet />;
}
