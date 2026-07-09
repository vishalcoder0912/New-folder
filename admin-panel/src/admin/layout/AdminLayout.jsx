import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import Topbar from '../components/Topbar.jsx';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Topbar />
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
