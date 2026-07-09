import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

export default function LoginPage() {
  const { login, isAuthed } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthed) return <Navigate to="/" replace />;

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">Use your CMS account to manage website content.</p>
        <label className="mt-6 block">
          <span className="label">Email</span>
          <input className="field" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        </label>
        <label className="mt-4 block">
          <span className="label">Password</span>
          <input className="field" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        </label>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="btn-primary mt-6 w-full">{loading ? 'Signing in...' : 'Login'}</button>
        <p className="mt-4 text-xs text-slate-500">Use the admin account created by the seed script.</p>
      </form>
    </div>
  );
}
