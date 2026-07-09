export default function RichTextEditor({ label, value, onChange }) {
  const wrap = (tag) => {
    const selected = window.getSelection()?.toString() || 'Text';
    onChange(`${value || ''}<${tag}>${selected}</${tag}>`);
  };

  return (
    <div>
      <span className="label">{label}</span>
      <div className="mb-2 flex flex-wrap gap-2">
        <button type="button" onClick={() => wrap('h2')} className="btn-secondary px-3 py-1.5">Heading</button>
        <button type="button" onClick={() => wrap('p')} className="btn-secondary px-3 py-1.5">Paragraph</button>
        <button type="button" onClick={() => wrap('strong')} className="btn-secondary px-3 py-1.5">Bold</button>
        <button type="button" onClick={() => wrap('em')} className="btn-secondary px-3 py-1.5">Italic</button>
        <button type="button" onClick={() => onChange(`${value || ''}<ul><li>List item</li></ul>`)} className="btn-secondary px-3 py-1.5">List</button>
        <button type="button" onClick={() => onChange(`${value || ''}<a href="https://example.com">Link text</a>`)} className="btn-secondary px-3 py-1.5">Link</button>
      </div>
      <textarea value={value || ''} onChange={(event) => onChange(event.target.value)} rows="8" className="field font-mono" />
    </div>
  );
}
