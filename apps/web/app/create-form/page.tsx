'use client'

import { useState } from "react"
import { trpc } from "~/trpc/client"
import { useRouter } from "next/navigation"

export default function CreateFormPage() {

 const router = useRouter()

 const [title, setTitle] = useState("")
 const [description, setDescription] = useState("")

 const createForm =
 trpc.form.createForm.useMutation({
  onSuccess(data) {
    router.push("/dashboard")
  }
 })

 function handleSubmit(e: React.FormEvent) {
  e.preventDefault()

  createForm.mutate({
    title,
    description,
    visibility: "PUBLIC"
  })
 }

 return (
  <form
    onSubmit={handleSubmit}
    className="p-8 flex flex-col gap-4"
  >

    <input
      placeholder="Form title"
      value={title}
      onChange={(e) =>
        setTitle(e.target.value)
      }
    />

    <textarea
      placeholder="Description"
      value={description}
      onChange={(e) =>
        setDescription(e.target.value)
      }
    />

    <button>
      Create Form
    </button>

  </form>
 )
}