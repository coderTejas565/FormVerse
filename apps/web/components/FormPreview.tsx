export function FormPreview({ fields }: any) {
  return (
    <div className="flex flex-col gap-4">

      {fields.map((field: any) => {

        if (field.type === "TEXT") {
          return (
            <input
              key={field.id}
              placeholder={field.label}
              className="border p-2"
            />
          )
        }

        if (field.type === "EMAIL") {
          return (
            <input
              key={field.id}
              type="email"
              placeholder={field.label}
              className="border p-2"
            />
          )
        }

        if (field.type === "NUMBER") {
          return (
            <input
              key={field.id}
              type="number"
              placeholder={field.label}
              className="border p-2"
            />
          )
        }

        if (field.type === "TEXTAREA") {
          return (
            <textarea
              key={field.id}
              placeholder={field.label}
              className="border p-2"
            />
          )
        }

        if (field.type === "SELECT") {
            const options = field.options? JSON.parse(field.options) : []
            
            return (
            <select key={field.id} className="border p-2">
                <option value="">{field.label}</option>
                {options.map((opt: string, idx: number) => (
                    <option key={idx} value={opt}>
                        {opt}
                        </option>
                    ))}
                    </select>
                    )
                }
                return null
                })}
                </div>
                )
            }