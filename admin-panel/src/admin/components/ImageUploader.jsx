import { useState } from 'react';
import { api } from '../../services/api.js';

export default function ImageUploader({ value, onChange }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/media/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      onChange(res.data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <span className="label">Image</span>
      <div className="flex items-center gap-4">
        {value && <img src={value} alt="" width="64" height="64" loading="lazy" className="h-16 w-16 rounded-md object-cover" />}
        <label className="btn-secondary cursor-pointer">
          {loading ? 'Uploading...' : 'Upload Image'}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} className="hidden" />
        </label>
      </div>
      <input value={value || ''} onChange={(event) => onChange(event.target.value)} placeholder="Or paste image URL" className="field mt-3" />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
