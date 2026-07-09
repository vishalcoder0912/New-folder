import { useEffect, useState } from 'react';
import { api } from '../../services/api.js';
import DataTable from '../components/DataTable.jsx';

export default function LeadsPage() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const load = async () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    const res = await api.get(`/leads?${params.toString()}`);
    setRows(res.data || []);
  };
  useEffect(() => { load(); }, [search, status]);
  const updateStatus = async (row, nextStatus) => { await api.patch(`/leads/${row._id}/status`, { status: nextStatus }); await load(); };
  const exportCsv = async () => {
    const token = localStorage.getItem('edtech_admin_token');
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/leads/export/csv`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'leads.csv';
    link.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-2xl font-bold">Contact Leads</h1><button onClick={exportCsv} className="btn-secondary">Export CSV</button></div>
      <div className="admin-card grid gap-3 md:grid-cols-3"><input className="field" placeholder="Search leads" value={search} onChange={(e) => setSearch(e.target.value)} /><select className="field" value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All statuses</option><option value="pending">Pending</option><option value="contacted">Contacted</option><option value="converted">Converted</option></select></div>
      <DataTable columns={[{ key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'phone', label: 'Phone' }, { key: 'interestedCourse', label: 'Course' }, { key: 'status', label: 'Status', badge: true }, { key: 'createdAt', label: 'Date', render: (row) => new Date(row.createdAt).toLocaleString() }]} rows={rows} onEdit={(row) => updateStatus(row, row.status === 'pending' ? 'contacted' : 'converted')} onDelete={async (row) => { await api.delete(`/leads/${row._id}`); await load(); }} />
    </div>
  );
}
