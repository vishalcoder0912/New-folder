import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api.js';
import DashboardCard from '../components/DashboardCard.jsx';

export default function DashboardPage() {
  const [data, setData] = useState({ courses: [], blogs: [], events: [], leads: [] });

  useEffect(() => {
    Promise.all([
      api.get('/courses?all=true'),
      api.get('/blogs?all=true'),
      api.get('/events?all=true'),
      api.get('/leads')
    ]).then(([courses, blogs, events, leads]) => setData({ courses: courses.data, blogs: blogs.data, events: events.data, leads: leads.data }));
  }, []);

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <DashboardCard label="Total courses" value={data.courses.length} />
        <DashboardCard label="Total leads" value={data.leads.length} />
        <DashboardCard label="Total blogs" value={data.blogs.length} />
        <DashboardCard label="Total events" value={data.events.length} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="admin-card">
          <h2 className="text-lg font-semibold">Recent contact submissions</h2>
          <div className="mt-4 grid gap-3">
            {data.leads.slice(0, 5).map((lead) => (
              <div key={lead._id} className="rounded-md border border-slate-200 p-3">
                <p className="font-semibold">{lead.name}</p>
                <p className="text-sm text-slate-600">{lead.email}</p>
                <p className="text-sm text-slate-600">{lead.phone || 'No phone number'} · {lead.interestedCourse || 'No course selected'}</p>
              </div>
            ))}
            {!data.leads.length && <p className="text-sm text-slate-500">No submissions yet.</p>}
          </div>
        </div>
        <div className="admin-card">
          <h2 className="text-lg font-semibold">Quick actions</h2>
          <div className="mt-4 grid gap-2">
            <Link to="/page-builder" className="btn-primary">Edit Page Sections</Link>
            <Link to="/courses" className="btn-secondary">Add Course</Link>
            <Link to="/media" className="btn-secondary">Upload Media</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
