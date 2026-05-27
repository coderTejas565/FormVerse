"use client";

interface Field {
  id: string;
  type: "TEXT" | "EMAIL" | "NUMBER" | "TEXTAREA" | "SELECT";
  label: string;
  required?: boolean;
  options?: any; // Kept as any because it might arrive as string, string[], or null
}

interface Props {
  fields: Field[];
  values: Record<string, string>;
  setValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onSubmitAction?: (data: Record<string, string>) => void;
  isPublicView?: boolean;
}

export function FormPreview({ fields, values, setValues, onSubmitAction, isPublicView = false }: Props) {
  function update(fieldId: string, value: string) {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); 
    if (onSubmitAction) {
      onSubmitAction(values);
    } else {
      alert("Form preview validation passed! Data: " + JSON.stringify(values, null, 2));
    }
  }

  // Safely parse options into a string array regardless of how the database saves it
  function getSafeOptions(options: any): string[] {
    if (!options) return [];
    
    // Case 1: It is already a clean array
    if (Array.isArray(options)) return options;
    
    // Case 2: It is a string
    if (typeof options === "string") {
      const trimmed = options.trim();
      // Check if it's a stringified JSON array: e.g. '["a", "b"]'
      if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) return parsed;
        } catch (e) {
          // Fall through if JSON parsing fails
        }
      }
      // Otherwise, treat it as a standard comma-separated string
      return trimmed.split(",").map(o => o.trim()).filter(Boolean);
    }
    
    return [];
  }

  if (!fields || fields.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-brand-border/60 rounded-xl bg-workspace/10">
        <p className="text-xs text-brand-muted font-medium">No layout elements mapped onto the active preview canvas yet.</p>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        .preview-input-element {
          width: 100% !important;
          background-color: rgba(3, 79, 70, 0.06) !important;
          border: 1px solid rgba(3, 79, 70, 0.2) !important;
          border-radius: 0.75rem !important;
          padding: 0.75rem 1rem !important;
          font-size: 0.8125rem !important;
          /* CHANGED: Text color forced to dark slate for crystal clear contrast */
          color: #111827 !important; 
          font-weight: 500 !important;
          outline: none !important;
          transition: all 0.2s ease !important;
        }
        .preview-input-element:hover {
          background-color: rgba(3, 79, 70, 0.09) !important;
          border-color: rgba(3, 79, 70, 0.35) !important;
        }
        .preview-input-element:focus {
          background-color: #ffffff !important;
          border-color: #034F46 !important;
          box-shadow: 0 0 0 3px rgba(3, 79, 70, 0.15) !important;
        }
        .preview-input-element::placeholder {
          color: rgba(17, 24, 39, 0.4) !important;
        }
        /* Style the actual list items inside the dropdown dropdown */
        .preview-select-option {
          color: #111827 !important;
          background-color: #ffffff !important;
        }
      `}</style>

      <form onSubmit={handleSubmit} className="space-y-5 w-full">
        <div className="flex flex-col gap-4">
          {fields.map((field) => {
            return (
              <div key={field.id} className="space-y-1.5 w-full">
                <label className="block text-xs font-semibold tracking-wide text-brand-text opacity-90">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {field.type === "TEXT" && (
                  <input
                    type="text"
                    required={field.required}
                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                    value={values[field.id] ?? ""}
                    onChange={(e) => update(field.id, e.target.value)}
                    className="preview-input-element font-sans"
                  />
                )}

                {field.type === "EMAIL" && (
                  <input
                    type="email"
                    required={field.required}
                    placeholder="name@domain.com"
                    value={values[field.id] ?? ""}
                    onChange={(e) => update(field.id, e.target.value)}
                    className="preview-input-element font-sans"
                  />
                )}

                {field.type === "NUMBER" && (
                  <input
                    type="number"
                    required={field.required}
                    placeholder="0"
                    value={values[field.id] ?? ""}
                    onChange={(e) => update(field.id, e.target.value)}
                    className="preview-input-element font-sans"
                  />
                )}

                {field.type === "TEXTAREA" && (
                  <textarea
                    required={field.required}
                    placeholder="Type your response summary..."
                    rows={4}
                    value={values[field.id] ?? ""}
                    onChange={(e) => update(field.id, e.target.value)}
                    className="preview-input-element font-sans resize-none"
                  />
                )}

                {field.type === "SELECT" && (
                  <div className="relative w-full">
                    <select
                      required={field.required}
                      value={values[field.id] ?? ""}
                      onChange={(e) => update(field.id, e.target.value)}
                      className="preview-input-element font-sans appearance-none cursor-pointer pr-10"
                    >
                      <option value="" disabled className="preview-select-option text-brand-muted">
                        Choose an item choice...
                      </option>
                      {getSafeOptions(field.options).map((option, index) => (
                        <option key={index} value={option} className="preview-select-option">
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-muted text-[10px]">
                      ▼
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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