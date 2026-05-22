'use client'

import { useParams } from "next/navigation"
import { trpc } from "~/trpc/client"
import { FormPreview } from "~/components/FormPreview"

export default function PublicFormPage() {

  const { id } = useParams<{ id: string }>()

  const { data, isLoading } =
    trpc.form.getForm.useQuery({
      formId: id
    })

  if (isLoading) return <p>Loading...</p>

  if (!data?.form) {
    return <p>Form not found</p>
  }

  return (
    <div className="p-8 max-w-xl mx-auto">

      <h1 className="text-2xl font-bold">
        {data.form.title}
      </h1>

      <p className="text-gray-500">
        {data.form.description}
      </p>

      <div className="mt-6">

        <FormPreview
          fields={data.fields}
        />

      </div>

      <button className="mt-6">
        Submit (next step)
      </button>

    </div>
  )
}