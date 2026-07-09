export default function StatusBadge({ value }) {
  const positive = ['published', 'active', 'upcoming', 'converted', true].includes(value);
  return (
    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${positive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
      {String(value)}
    </span>
  );
}
