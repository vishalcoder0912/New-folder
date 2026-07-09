import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api.js';

export const useFetch = (path, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get(path);
      setData(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    load();
  }, [load, ...deps]);

  return { data, loading, error, reload: load, setData };
};
