import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('edtech_admin_token')));

  useEffect(() => {
    const token = localStorage.getItem('edtech_admin_token');
    if (!token) return;
    api.get('/auth/me')
      .then((res) => setAdmin(res.data))
      .catch(() => localStorage.removeItem('edtech_admin_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('edtech_admin_token', res.data.token);
    setAdmin(res.data.admin);
    return res.data.admin;
  };

  const logout = () => {
    localStorage.removeItem('edtech_admin_token');
    setAdmin(null);
  };

  const value = useMemo(() => ({ admin, loading, login, logout, isAuthed: Boolean(admin) }), [admin, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
