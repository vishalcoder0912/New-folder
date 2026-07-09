import { LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.jsx';

export default function Topbar() {
  const { admin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
      <div>
        <p className="text-sm text-slate-500">Signed in as</p>
        <p className="font-semibold">{admin?.name || 'Admin'}</p>
      </div>
      <button onClick={logout} className="btn-secondary gap-2"><LogOut size={16} /> Logout</button>
    </header>
  );
}
