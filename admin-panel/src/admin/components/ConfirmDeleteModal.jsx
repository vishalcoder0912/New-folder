export default function ConfirmDeleteModal({ open, title = 'Delete item?', onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">This action cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onCancel} className="btn-secondary">Cancel</button>
          <button onClick={onConfirm} className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white">Delete</button>
        </div>
      </div>
    </div>
  );
}
