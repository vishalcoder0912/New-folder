import { useState } from 'react';
import { api } from '../services/api.js';

const initial = { name: '', email: '', phone: '', interestedCourse: '', message: '' };

export default function ContactForm({ sourcePage = 'contact', courses = [] }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      await api.post('/leads', { ...form, sourcePage });
      setForm(initial);
      setStatus('Your request has been submitted.');
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="admin-card">
      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="label">Name</span>
          <input required name="name" value={form.name} onChange={update} className="field" />
        </label>
        <label>
          <span className="label">Email</span>
          <input required type="email" name="email" value={form.email} onChange={update} className="field" />
        </label>
        <label>
          <span className="label">Phone</span>
          <input required name="phone" value={form.phone} onChange={update} className="field" />
        </label>
        <label>
          <span className="label">Interested course</span>
          <select name="interestedCourse" value={form.interestedCourse} onChange={update} className="field">
            <option value="">Select a course</option>
            {courses.map((course) => <option key={course._id} value={course.title}>{course.title}</option>)}
          </select>
        </label>
      </div>
      <label className="mt-4 block">
        <span className="label">Message</span>
        <textarea name="message" value={form.message} onChange={update} rows="4" className="field" />
      </label>
      <button disabled={loading} className="btn-primary mt-5">{loading ? 'Submitting...' : 'Submit Request'}</button>
      {status && <p className="mt-3 text-sm text-slate-600">{status}</p>}
    </form>
  );
}
