import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import FormInput from '../components/FormInput.jsx';

function Row({ item, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item._id });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className="flex items-center gap-3 rounded-lg border bg-white p-4">
      <button className="cursor-grab text-slate-400" {...attributes} {...listeners}><GripVertical size={18} /></button>
      <div className="flex-1"><p className="font-semibold">{item.question}</p><p className="text-sm text-slate-500">{item.isVisible ? 'Visible' : 'Hidden'}</p></div>
      <button onClick={() => onEdit(item)} className="btn-primary">Edit</button>
      <button onClick={() => onDelete(item)} className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white">Delete</button>
    </div>
  );
}

export default function ManageFAQsPage() {
  const [items, setItems] = useState([]);
  const [draft, setDraft] = useState(null);
  const empty = { question: '', answer: '', order: items.length + 1, isVisible: true };
  const load = async () => { const res = await api.get('/faqs?all=true'); setItems((res.data || []).sort((a, b) => a.order - b.order)); };
  useEffect(() => { load(); }, []);
  const save = async (event) => {
    event.preventDefault();
    if (draft._id) await api.put(`/faqs/${draft._id}`, draft);
    else await api.post('/faqs', draft);
    setDraft(null); await load();
  };
  const reorder = async ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const next = arrayMove(items, items.findIndex((i) => i._id === active.id), items.findIndex((i) => i._id === over.id)).map((item, index) => ({ ...item, order: index + 1 }));
    setItems(next);
    await api.patch('/faqs/reorder', { items: next.map((item) => ({ id: item._id, order: item.order })) });
  };
  return (
    <div className="grid gap-6">
      <div className="flex justify-between"><h1 className="text-2xl font-bold">FAQs</h1><button onClick={() => setDraft(empty)} className="btn-primary">Add FAQ</button></div>
      {draft && <form onSubmit={save} className="admin-card grid gap-4"><FormInput label="Question" value={draft.question} onChange={(v) => setDraft({ ...draft, question: v })} /><FormInput label="Answer" textarea value={draft.answer} onChange={(v) => setDraft({ ...draft, answer: v })} /><label className="flex gap-2"><input type="checkbox" checked={draft.isVisible} onChange={(e) => setDraft({ ...draft, isVisible: e.target.checked })} /> Visible</label><div className="flex gap-2"><button className="btn-primary">Save</button><button type="button" onClick={() => setDraft(null)} className="btn-secondary">Close</button></div></form>}
      <DndContext collisionDetection={closestCenter} onDragEnd={reorder}><SortableContext items={items.map((item) => item._id)} strategy={verticalListSortingStrategy}><div className="grid gap-3">{items.map((item) => <Row key={item._id} item={item} onEdit={setDraft} onDelete={async (target) => { await api.delete(`/faqs/${target._id}`); await load(); }} />)}</div></SortableContext></DndContext>
    </div>
  );
}
