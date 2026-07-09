import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import FormInput from '../components/FormInput.jsx';
import ImageUploader from '../components/ImageUploader.jsx';

const empty = {
  pageName: 'home',
  sectionType: 'textImage',
  title: '',
  subtitle: '',
  description: '',
  imageUrl: '',
  buttonText: '',
  buttonLink: '',
  layoutType: 'default',
  backgroundColor: '#ffffff',
  textColor: '#111827',
  order: 0,
  isVisible: true,
  cards: []
};

const sectionTypes = ['hero', 'textImage', 'courseGrid', 'featureCards', 'statistics', 'testimonials', 'faq', 'cta', 'eventGrid', 'mentorGrid', 'customContent'];

function SortableSection({ section, onEdit, onToggle }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: section._id });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
      <button className="cursor-grab text-slate-400" {...attributes} {...listeners}><GripVertical size={18} /></button>
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{section.title || section.sectionType}</p>
        <p className="text-sm text-slate-500">{section.sectionType} · order {section.order}</p>
      </div>
      <button onClick={() => onToggle(section)} className="btn-secondary">{section.isVisible ? 'Hide' : 'Show'}</button>
      <button onClick={() => onEdit(section)} className="btn-primary">Edit</button>
    </div>
  );
}

export default function PageBuilderPage({ fixedPage }) {
  const [pageName, setPageName] = useState(fixedPage || 'home');
  const [sections, setSections] = useState([]);
  const [draft, setDraft] = useState(null);
  const [message, setMessage] = useState('');

  const load = async () => {
    const res = await api.get(`/sections/${pageName}?all=true`);
    setSections((res.data || []).sort((a, b) => a.order - b.order));
  };

  useEffect(() => { load(); }, [pageName]);

  const reorder = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sections.findIndex((item) => item._id === active.id);
    const newIndex = sections.findIndex((item) => item._id === over.id);
    const next = arrayMove(sections, oldIndex, newIndex).map((item, index) => ({ ...item, order: index + 1 }));
    setSections(next);
    await api.patch('/sections/reorder', { items: next.map((item) => ({ id: item._id, order: item.order })) });
    setMessage('Section order saved');
  };

  const save = async (event) => {
    event.preventDefault();
    const body = { ...draft, pageName, order: draft.order || sections.length + 1 };
    if (draft._id) await api.put(`/sections/${draft._id}`, body);
    else await api.post('/sections', body);
    setDraft(null);
    setMessage('Section saved');
    await load();
  };

  const remove = async () => {
    await api.delete(`/sections/${draft._id}`);
    setDraft(null);
    await load();
  };

  const set = (key, value) => setDraft((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{fixedPage ? 'Manage Home Page Sections' : 'Page Builder'}</h1>
          <p className="text-sm text-slate-600">Drag sections to reorder. Edit section content and media from the form.</p>
        </div>
        <button onClick={() => setDraft({ ...empty, pageName, order: sections.length + 1 })} className="btn-primary gap-2"><Plus size={16} /> Add Section</button>
      </div>
      {!fixedPage && (
        <div className="admin-card max-w-sm">
          <FormInput label="Page" value={pageName} onChange={setPageName} options={[
            { label: 'Home', value: 'home' }, { label: 'About', value: 'about' }, { label: 'Courses', value: 'courses' }, { label: 'Contact', value: 'contact' }
          ]} />
        </div>
      )}
      {message && <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
      <DndContext collisionDetection={closestCenter} onDragEnd={reorder}>
        <SortableContext items={sections.map((item) => item._id)} strategy={verticalListSortingStrategy}>
          <div className="grid gap-3">
            {sections.map((section) => <SortableSection key={section._id} section={section} onEdit={setDraft} onToggle={async (item) => { await api.patch(`/sections/${item._id}/toggle-visibility`, { isVisible: !item.isVisible }); await load(); }} />)}
          </div>
        </SortableContext>
      </DndContext>
      {draft && (
        <form onSubmit={save} className="admin-card grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{draft._id ? 'Edit section' : 'Add section'}</h2>
            <button type="button" onClick={() => setDraft(null)} className="btn-secondary">Close</button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput label="Section type" value={draft.sectionType} onChange={(value) => set('sectionType', value)} options={sectionTypes.map((type) => ({ label: type, value: type }))} />
            <FormInput label="Order" type="number" value={draft.order} onChange={(value) => set('order', value)} />
            <FormInput label="Title" value={draft.title} onChange={(value) => set('title', value)} />
            <FormInput label="Subtitle" value={draft.subtitle} onChange={(value) => set('subtitle', value)} />
            <div className="md:col-span-2"><FormInput label="Description / HTML" textarea rows={5} value={draft.description} onChange={(value) => set('description', value)} /></div>
            <ImageUploader value={draft.imageUrl} onChange={(value) => set('imageUrl', value)} />
            <FormInput label="Button text" value={draft.buttonText} onChange={(value) => set('buttonText', value)} />
            <FormInput label="Button link" value={draft.buttonLink} onChange={(value) => set('buttonLink', value)} />
            <FormInput label="Layout type" value={draft.layoutType} onChange={(value) => set('layoutType', value)} />
            <FormInput label="Background color" value={draft.backgroundColor} onChange={(value) => set('backgroundColor', value)} />
            <FormInput label="Text color" value={draft.textColor} onChange={(value) => set('textColor', value)} />
            <label className="flex items-center gap-2 pt-7"><input type="checkbox" checked={draft.isVisible} onChange={(event) => set('isVisible', event.target.checked)} /> Visible</label>
            <div className="md:col-span-2"><FormInput label="Cards JSON" textarea rows={7} value={JSON.stringify(draft.cards || [], null, 2)} onChange={(value) => { try { set('cards', JSON.parse(value || '[]')); } catch (_error) {} }} /></div>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary">Save Section</button>
            {draft._id && <button type="button" onClick={remove} className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white">Delete Section</button>}
          </div>
        </form>
      )}
    </div>
  );
}
