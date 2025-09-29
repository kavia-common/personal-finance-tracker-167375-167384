import { theme } from "../theme";
import "./shared.css";

// PUBLIC_INTERFACE
export function Card({ title, subtitle, children, loading }) {
  return (
    <div className="card">
      {(title || subtitle) && (
        <div className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
          </div>
          {loading && <div className="loader" aria-label="Loading" />}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function Stat({ label, value, trend, type = "neutral", loading }) {
  return (
    <div className={`stat ${type}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{loading ? "—" : value}</div>
      {trend && <div className="stat-trend">{trend}</div>}
    </div>
  );
}

// PUBLIC_INTERFACE
export function Table({ columns, data, loading, emptyText }) {
  return (
    <div className="table">
      <div className="table-head">
        {columns.map((c) => (
          <div key={c.key} className={`th ${c.align || ""}`}>{c.header}</div>
        ))}
      </div>
      <div className="table-body">
        {loading ? (
          <div className="table-row"><div className="td">Loading...</div></div>
        ) : data?.length ? (
          data.map((row) => (
            <div className="table-row" key={row.id || JSON.stringify(row)}>
              {columns.map((c) => {
                const val = row[c.key];
                return (
                  <div key={c.key} className={`td ${c.align || ""}`}>
                    {c.render ? c.render(val, row) : String(val ?? "")}
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <div className="table-row"><div className="td muted">{emptyText || "No data."}</div></div>
        )}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <input className="input" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} type={type} />
    </div>
  );
}

// PUBLIC_INTERFACE
export function NumberInput(props) {
  return <Input {...props} type="number" />;
}

// PUBLIC_INTERFACE
export function DateInput({ label, value, onChange }) {
  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <input className="input" value={value} onChange={(e) => onChange(e.target.value)} type="date" />
    </div>
  );
}

// PUBLIC_INTERFACE
export function Select({ label, value, onChange, options = [], placeholder }) {
  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

// PUBLIC_INTERFACE
export function Button({ children, className = "", loading, size = "md", ...rest }) {
  return (
    <button className={`btn ${className} ${size}`} disabled={loading} {...rest}>
      {loading ? "Saving..." : children}
    </button>
  );
}

// PUBLIC_INTERFACE
export function Tag({ type = "neutral", children }) {
  return <span className={`tag ${type}`}>{children}</span>;
}

// PUBLIC_INTERFACE
export function Legend({ items }) {
  return (
    <div className="legend">
      {items.map((it) => (
        <div key={it.label} className="legend-item">
          <span className="legend-dot" style={{ background: it.color }} />
          <span>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
export function Notice({ type = "info", text }) {
  return <div className={`notice ${type}`}>{text}</div>;
}

// PUBLIC_INTERFACE
export function Switch({ checked, onChange }) {
  return (
    <button
      className={`switch ${checked ? "on" : ""}`}
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
    >
      <span className="knob" />
    </button>
  );
}

// PUBLIC_INTERFACE
export function Confirm({ open, title, message, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{title}</h3>
        <p className="muted">{message}</p>
        <div className="modal-actions">
          <button className="btn ghost" onClick={onCancel}>Cancel</button>
          <button className="btn danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export { theme };
