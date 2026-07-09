import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import FormInput from '../components/FormInput.jsx';
import ImageUploader from '../components/ImageUploader.jsx';

export default function SettingsPage() {
  const [settings, setSettings] = useState(null);
  useEffect(() => { api.get('/settings').then((res) => setSettings(res.data)); }, []);
  if (!settings) return null;
  const set = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }));
  const save = async (event) => { event.preventDefault(); const res = await api.put('/settings', settings); setSettings(res.data); };
  return (
    <form onSubmit={save} className="grid gap-6">
      <h1 className="text-2xl font-bold">Website Settings</h1>
      <div className="admin-card grid gap-4 md:grid-cols-2">
        <FormInput label="Site name" value={settings.siteName} onChange={(v) => set('siteName', v)} />
        <ImageUploader value={settings.logoUrl} onChange={(v) => set('logoUrl', v)} />
        <FormInput label="CTA text" value={settings.ctaText} onChange={(v) => set('ctaText', v)} />
        <FormInput label="CTA link" value={settings.ctaLink} onChange={(v) => set('ctaLink', v)} />
        <FormInput label="Contact email" value={settings.contactEmail} onChange={(v) => set('contactEmail', v)} />
        <FormInput label="Contact phone" value={settings.contactPhone} onChange={(v) => set('contactPhone', v)} />
        <FormInput label="Address" value={settings.address} onChange={(v) => set('address', v)} />
        <FormInput label="Footer text" textarea value={settings.footerText} onChange={(v) => set('footerText', v)} />
        <div className="md:col-span-2"><FormInput label="Navigation links JSON" textarea rows={8} value={JSON.stringify(settings.navLinks || [], null, 2)} onChange={(value) => { try { set('navLinks', JSON.parse(value || '[]')); } catch (_error) {} }} /></div>
      </div>
      <button className="btn-primary w-fit">Save Settings</button>
    </form>
  );
}
