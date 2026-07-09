import StatusBadge from './StatusBadge.jsx';

export default function DataTable({ columns, rows, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>{columns.map((col) => <th key={col.key} className="px-4 py-3 text-left font-semibold text-slate-700">{col.label}</th>)}<th className="px-4 py-3 text-right">Actions</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row._id}>
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-slate-700">
                  {col.badge ? <StatusBadge value={row[col.key]} /> : col.render ? col.render(row) : String(row[col.key] ?? '')}
                </td>
              ))}
              <td className="px-4 py-3 text-right">
                <button onClick={() => onEdit(row)} className="mr-2 text-sm font-semibold text-brand">Edit</button>
                <button onClick={() => onDelete(row)} className="text-sm font-semibold text-red-600">Delete</button>
              </td>
            </tr>
          ))}
          {!rows.length && <tr><td colSpan={columns.length + 1} className="px-4 py-10 text-center text-slate-500">No records found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
