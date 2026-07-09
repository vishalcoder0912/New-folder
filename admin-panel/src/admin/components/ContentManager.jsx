import { useEffect, useMemo, useState } from 'react';
import { api } from '../../services/api.js';
import ConfirmDeleteModal from './ConfirmDeleteModal.jsx';
import DataTable from './DataTable.jsx';
import FormInput from './FormInput.jsx';
import ImageUploader from './ImageUploader.jsx';
import RichTextEditor from './RichTextEditor.jsx';

export default function ContentManager({ title, endpoint, emptyItem, columns, fields, transformBeforeSave = (value) => value }) {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(emptyItem);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [message, setMessage] = useState('');

  const load = async () => {
    const res = await api.get(`${endpoint}${endpoint.includes('?') ? '&' : '?'}all=true`);
    setRows(res.data || []);
  };

  useEffect(() => { load(); }, [endpoint]);

  const isEditing = useMemo(() => Boolean(editing?._id), [editing]);

  const startEdit = (row) => {
    setEditing(row);
    setDraft({ ...emptyItem, ...row });
  };

  const save = async (event) => {
    event.preventDefault();
    const body = transformBeforeSave(draft);
    if (isEditing) await api.put(`${endpoint.replace('?all=true', '')}/${editing._id}`, body);
    else await api.post(endpoint.replace('?all=true', ''), body);
    setDraft(emptyItem);
    setEditing(null);
    setMessage('Saved successfully');
    await load();
  };

  const remove = async () => {
    await api.delete(`${endpoint.replace('?all=true', '')}/${deleteTarget._id}`);
    setDeleteTarget(null);
    await load();
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button onClick={() => { setEditing({}); setDraft(emptyItem); }} className="btn-primary">Add New</button>
      </div>
      {message && <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
      {editing && (
        <form onSubmit={save} className="admin-card grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{isEditing ? 'Edit' : 'Create'} {title}</h2>
            <button type="button" onClick={() => setEditing(null)} className="btn-secondary">Close</button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => {
              const set = (value) => setDraft((prev) => ({ ...prev, [field.key]: value }));
              if (field.type === 'image') return <ImageUploader key={field.key} value={draft[field.key]} onChange={set} />;
              if (field.type === 'richtext') return <div key={field.key} className="md:col-span-2"><RichTextEditor label={field.label} value={draft[field.key]} onChange={set} /></div>;
              if (field.type === 'array') return <FormInput key={field.key} label={field.label} textarea rows={3} value={(draft[field.key] || []).join('\n')} onChange={(value) => set(value.split('\n').filter(Boolean))} />;
              if (field.type === 'json') return <FormInput key={field.key} label={field.label} textarea rows={5} value={JSON.stringify(draft[field.key] || [], null, 2)} onChange={(value) => { try { set(JSON.parse(value || '[]')); } catch (_error) { set(draft[field.key]); } }} />;
              if (field.type === 'boolean') return <label key={field.key} className="flex items-center gap-2 pt-7"><input type="checkbox" checked={Boolean(draft[field.key])} onChange={(event) => set(event.target.checked)} /> {field.label}</label>;
              return <FormInput key={field.key} label={field.label} type={field.type} textarea={field.textarea} options={field.options} value={draft[field.key]} onChange={set} />;
            })}
          </div>
          <button className="btn-primary w-fit">Save</button>
        </form>
      )}
      <DataTable columns={columns} rows={rows} onEdit={startEdit} onDelete={setDeleteTarget} />
      <ConfirmDeleteModal open={Boolean(deleteTarget)} onConfirm={remove} onCancel={() => setDeleteTarget(null)} />
    </div>
  );
}
