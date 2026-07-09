export default function FormInput({ label, type = 'text', value, onChange, textarea, options, ...props }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {options ? (
        <select value={value ?? ''} onChange={(event) => onChange(event.target.value)} className="field" {...props}>
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      ) : textarea ? (
        <textarea value={value ?? ''} onChange={(event) => onChange(event.target.value)} className="field" rows={props.rows || 4} {...props} />
      ) : (
        <input type={type} value={value ?? ''} onChange={(event) => onChange(type === 'number' ? Number(event.target.value) : event.target.value)} className="field" {...props} />
      )}
    </label>
  );
}
