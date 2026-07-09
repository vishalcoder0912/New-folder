export default function LoadingState({ label = 'Loading content...' }) {
  return (
    <div className="container-page py-12">
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
        {label}
      </div>
    </div>
  );
}
