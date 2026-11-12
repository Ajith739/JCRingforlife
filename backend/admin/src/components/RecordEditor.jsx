import { useState } from "react";
import { FormError, Modal, SubmitButton } from "./UI.jsx";
export function RecordEditor({ title, fields, record, onClose, onSave, pending = false, }) {
    const [values, setValues] = useState(() => Object.fromEntries(fields.map((f) => [
        f.key,
        record?.[f.key] ??
            f.default ??
            (f.type === "number" ? 0 : f.options?.[0]?.value || ""),
    ])));
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    return (<Modal title={title} onClose={onClose} wide>
      <form className="ad-form" onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            setSaving(true);
            try {
                await onSave({
                    ...values,
                    ...(record?.id ? { id: record.id } : {}),
                });
                onClose();
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setSaving(false);
            }
        }}>
        <div className="ad-form-grid">
          {fields.map((field) => (<label className={field.wide ? "ad-full-field" : ""} key={field.key}>
              <span>
                {field.label}
                {field.required && <b> *</b>}
              </span>
              {field.type === "textarea" ? (<textarea aria-label={field.label} rows={4} required={field.required} maxLength={5000} value={values[field.key]} onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}/>) : field.options ? (<select aria-label={field.label} required={field.required} value={values[field.key]} onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}>
                  {field.options.map((o) => (<option key={o.value} value={o.value}>
                      {o.label}
                    </option>))}
                </select>) : (<input aria-label={field.label} type={field.type || "text"} required={field.required} min={field.min} max={field.max} step={field.step} readOnly={field.readOnly} maxLength={field.type === "number" ? undefined : 1000} value={values[field.key]} onChange={(e) => setValues({
                    ...values,
                    [field.key]: field.type === "number" && e.target.value !== ""
                        ? Number(e.target.value)
                        : e.target.value,
                })}/>)}
              {field.hint && <small>{field.hint}</small>}
            </label>))}
        </div>
        <FormError error={error}/>
        <div className="ad-modal-actions">
          <button type="button" className="ad-btn" onClick={onClose}>
            Cancel
          </button>
          <SubmitButton pending={saving || pending} label={record ? "Save changes" : "Create record"}/>
        </div>
      </form>
    </Modal>);
}
export const options = (values) => values.map((v) => ({
    value: v,
    label: v[0].toUpperCase() + v.slice(1).replaceAll("_", " "),
}));
