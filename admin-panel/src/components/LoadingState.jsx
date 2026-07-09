export default function LoadingState({ label = 'Loading...' }) {
  return (
    <div className="p-6">
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
        {label}
      </div>
    </div>
  );
}
