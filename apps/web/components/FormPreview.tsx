"use client";

interface Field {
  id: string;
  type:
    | "TEXT"
    | "EMAIL"
    | "NUMBER"
    | "TEXTAREA"
    | "SELECT"
    | "MULTISELECT";

  label: string;

  required?: boolean | null;

  options?: string[] | string | null;
}

interface Props {
  fields: Field[];
  values: Record<string, string>;
  setValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onSubmitAction?: (data: Record<string, string>) => void;
  isPublicView?: boolean;
}

export function FormPreview({
  fields,
  values,
  setValues,
  onSubmitAction,
  isPublicView = false,
}: Props) {
  function update(fieldId: string, value: string) {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (onSubmitAction) {
      onSubmitAction(values);
    } else {
      alert("Form preview validation passed!");
    }
  }

  function getSafeOptions(options: string[] | string | null | undefined): string[] {
    if (!options) return [];

    if (Array.isArray(options)) {
      return options;
    }

    if (typeof options === "string") {
      const trimmed = options.trim();

      if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        try {
          const parsed = JSON.parse(trimmed);

          if (Array.isArray(parsed)) {
            return parsed;
          }
        } catch (err) {
          console.error(err);
        }
      }

      return trimmed
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean);
    }

    return [];
  }

  if (!fields || fields.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-brand-border/60 rounded-xl bg-workspace/10">
        <p className="text-xs text-brand-muted font-medium">
          No layout elements mapped onto the active preview canvas yet.
        </p>
      </div>
    );
  }

  return (
    <>
<style jsx global>{`
  .preview-input-element {
    width: 100% !important;
    background-color: #ffffff !important;

    border: 1px solid rgba(3, 79, 70, 0.2) !important;
    border-radius: 0.75rem !important;

    padding: 0.75rem 1rem !important;

    font-size: 0.8125rem !important;
    font-weight: 500 !important;

    color: #111827 !important;
    caret-color: #111827 !important;

    outline: none !important;
    transition: all 0.2s ease !important;

    -webkit-text-fill-color: #111827 !important;
  }

  .preview-input-element:hover {
    border-color: rgba(3, 79, 70, 0.35) !important;
  }

  .preview-input-element:focus {
    background-color: #ffffff !important;

    border-color: #034f46 !important;

    box-shadow: 0 0 0 3px rgba(3, 79, 70, 0.15) !important;
  }

  .preview-input-element::placeholder {
    color: rgba(17, 24, 39, 0.45) !important;
  }

  .preview-input-element option {
    color: #111827 !important;
    background: #ffffff !important;
  }

  textarea.preview-input-element,
  input.preview-input-element,
  select.preview-input-element {
    color: #111827 !important;
    -webkit-text-fill-color: #111827 !important;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    -webkit-text-fill-color: #111827 !important;
    transition: background-color 9999s ease-in-out 0s;
  }
`}</style>

      <form onSubmit={handleSubmit} className="space-y-5 w-full">
        <div className="flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.id} className="space-y-1.5 w-full">
              <label className="block text-xs font-semibold tracking-wide text-brand-text opacity-90">
                {field.label}

                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === "TEXT" && (
                <input
                  type="text"
                  required={field.required ?? false}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                  value={values[field.id] ?? ""}
                  onChange={(e) => update(field.id, e.target.value)}
                  className="preview-input-element font-sans"
                />
              )}

              {field.type === "EMAIL" && (
                <input
                  type="email"
                  required={field.required ?? false}
                  placeholder="name@domain.com"
                  value={values[field.id] ?? ""}
                  onChange={(e) => update(field.id, e.target.value)}
                  className="preview-input-element font-sans"
                />
              )}

              {field.type === "NUMBER" && (
                <input
                  type="number"
                  required={field.required ?? false}
                  placeholder="0"
                  value={values[field.id] ?? ""}
                  onChange={(e) => update(field.id, e.target.value)}
                  className="preview-input-element font-sans"
                />
              )}

              {field.type === "TEXTAREA" && (
                <textarea
                  required={field.required ?? false}
                  placeholder="Type your response..."
                  rows={4}
                  value={values[field.id] ?? ""}
                  onChange={(e) => update(field.id, e.target.value)}
                  className="preview-input-element font-sans resize-none"
                />
              )}

              {field.type === "SELECT" && (
                <div className="relative w-full">
                  <select
                    required={field.required ?? false}
                    value={values[field.id] ?? ""}
                    onChange={(e) => update(field.id, e.target.value)}
                    className="preview-input-element font-sans appearance-none cursor-pointer pr-10"
                  >
                    <option value="" disabled className="preview-select-option">
                      Choose an option...
                    </option>

                    {getSafeOptions(field.options).map((option, index) => (
                      <option
                        key={index}
                        value={option}
                        className="preview-select-option"
                      >
                        {option}
                      </option>
                    ))}
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-muted text-[10px]">
                    ▼
                  </div>
                </div>
              )}

              {field.type === "MULTISELECT" && (
                <div className="space-y-2 pt-1">
{getSafeOptions(field.options).map((option, index) => {
  const currentValues = (values[field.id] ?? "")
    .split(",")
    .filter(Boolean);

  const checked = currentValues.includes(option);

  return (
    <label
      key={index}
      className="flex items-center gap-2 text-sm text-brand-text"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          let updatedValues = [...currentValues];

          if (e.target.checked) {
            updatedValues.push(option);
          } else {
            updatedValues = updatedValues.filter((v) => v !== option);
          }

          update(field.id, updatedValues.join(","));
        }}
        className="accent-[#034F46] h-4 w-4"
      />

      <span>{option}</span>
    </label>
  );
})}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-brand-border/20">
          <button
            type="submit"
            className="w-full bg-[#034F46] text-[#E6EEDB] rounded-xl py-3 text-xs font-semibold tracking-wide transition-all duration-200 hover:bg-[#023b34] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 shadow-sm font-sans"
          >
            {isPublicView ? "Submit Form Entry" : "Test Form Validations"}
          </button>
        </div>
      </form>
    </>
  );
}