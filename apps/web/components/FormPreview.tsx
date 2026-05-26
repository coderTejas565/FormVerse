"use client";

interface Props {
  fields: any[];
  values: Record<string, string>;
  setValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export function FormPreview({ fields, values, setValues }: Props) {
  function update(fieldId: string, value: string) {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  }

  return (
    <div className="flex flex-col gap-4">
      {fields.map((field) => {
        if (field.type === "TEXT") {
          return (
            <input
              key={field.id}
              placeholder={field.label}
              value={values[field.id] ?? ""}
              onChange={(e) => update(field.id, e.target.value)}
            />
          );
        }
        if (field.type === "EMAIL") {
          return (
            <input
              type="email"
              key={field.id}
              placeholder={field.label}
              value={values[field.id] ?? ""}
              onChange={(e) => update(field.id, e.target.value)}
            />
          );
        }
        if (field.type === "TEXTAREA") {
          return (
            <textarea
              key={field.id}
              placeholder={field.label}
              value={values[field.id] ?? ""}
              onChange={(e) => update(field.id, e.target.value)}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
