export default function DashboardCard({ label, value }) {
  return (
    <div className="admin-card">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
    </div>
  );
}
