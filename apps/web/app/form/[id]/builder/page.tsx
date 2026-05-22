'use client'

import { useState } from "react"
import { useParams } from "next/navigation"
import { trpc } from "~/trpc/client"
import { FormPreview } from "~/components/FormPreview"

export default function FormBuilderPage() {
    const { id } = useParams<{ id: string }>()
    const utils = trpc.useUtils()
    const { data,isLoading } = trpc.form.getForm.useQuery({
        formId: id
    })

  const addField = trpc.form.addField.useMutation({onSuccess: () => {
    utils.form.getForm.invalidate()
}
})


  const [label, setLabel] = useState("")

  const [type, setType] = useState("TEXT")
  const [values, setValues] = useState< Record<string,string>>({})
  
  if (isLoading) {
    return <p>Loading...</p>
  }


  const form = data?.form

  const fields = data?.fields || []


  function handleAddField(){
    addField.mutate({
        formId: id,
        label,
        type: type as any,
        required: false
    })
    setLabel("")
}

return (
<div className="grid grid-cols-2 gap-6 p-8">

<div>
    <h1 className="text-xl font-bold">{form?.title}</h1>
    <div className="mt-4 flex flex-col gap-2">
        <input placeholder="Field label" value={label} onChange={e=>setLabel(e.target.value)}/>
        <select value={type} onChange={e=> setType(e.target.value)}>
            <option value="TEXT">Text</option>
            <option value="EMAIL">Email</option>
            <option value="NUMBER">Number</option>
            <option value="TEXTAREA">Textarea</option>
            <option value="SELECT">Select</option>
            </select>
            <button onClick={handleAddField}>Add Field</button></div>
            <div className="mt-6">{fields.map((f:any)=>(<div key={ f.id } >{f.label}{" - "}{f.type} </div>
            )
        )
        }
        </div>
        </div>
        <div className="border p-4 rounded">
            <h2 className="font-bold mb-4">Live Preview</h2>
            <FormPreview fields={fields} values={values}setValues={ setValues }
            />
            </div>
            </div>
            )
        }