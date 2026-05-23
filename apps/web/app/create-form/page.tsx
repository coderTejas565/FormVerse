'use client'

import { useState } from "react"
import { trpc } from "~/trpc/client"
import { useRouter } from "next/navigation"

export default function CreateFormPage() {

  const router = useRouter()

  const [title, setTitle] =
    useState("")

  const [description, setDescription] =
    useState("")

  const [visibility, setVisibility] =
    useState<"PUBLIC" | "UNLISTED">(
      "PUBLIC"
    )

  const createForm =
    trpc.form.createForm.useMutation({

      onSuccess(data){

        // redirect directly to builder
        router.push(
          `/form/${data.id}/builder`
        )

      }

    })
    
    function handleSubmit(e:React.FormEvent){e.preventDefault()
        createForm.mutate({
            title,
            description,
            visibility
        })
    }
    
    return(
    <form onSubmit={handleSubmit}className="max-w-xl mx-auto p-8 flex flex-col gap-4 ">
        <h1 className="text-2xl font-bold">Create Form</h1>
        <input placeholder="Form  title" value={title} onChange={e=>setTitle(e.target.value)}className="border p-2 rounded"/>
        <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="border p-2 rounded"/>
            <select value={visibility}onChange={(e) =>setVisibility(e.target.value as ("PUBLIC" | "UNLISTED"))}className="border p-2 rounded" >
                <option value="PUBLIC">Public</option>
                <option value="UNLISTED">Unlisted</option></select>
                <button disabled={createForm.isPending}className="border p-2 rounded">{createForm.isPending?"Creating...":"Create Form"}

                </button>
                </form>
                )
            }