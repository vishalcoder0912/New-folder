import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import ImageUploader from '../components/ImageUploader.jsx';

export default function MediaLibraryPage() {
  const [items, setItems] = useState([]);
  const [lastUrl, setLastUrl] = useState('');
  const load = async () => { const res = await api.get('/media'); setItems(res.data || []); };
  useEffect(() => { load(); }, [lastUrl]);
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Media Library</h1>
      <div className="admin-card"><ImageUploader value={lastUrl} onChange={setLastUrl} /></div>
      <div className="grid gap-4 md:grid-cols-4">
        {items.map((item) => (
          <div key={item._id} className="rounded-lg border bg-white p-3">
            <img src={item.url} alt={item.title} loading="lazy" className="aspect-square w-full rounded-md object-cover" />
            <p className="mt-2 truncate text-sm font-semibold">{item.title || item.fileName}</p>
            <button onClick={() => navigator.clipboard.writeText(item.url)} className="mt-2 text-sm font-semibold text-brand">Copy URL</button>
            <button onClick={async () => { await api.delete(`/media/${item._id}`); await load(); }} className="ml-3 text-sm font-semibold text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
