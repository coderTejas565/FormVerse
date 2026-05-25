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

        router.push(
          `/form/${data.id}/builder`
        )

      }

    })

  function handleSubmit(
    e: React.FormEvent
  ){
    e.preventDefault()

    createForm.mutate({
      title,
      description,
      visibility
    })
  }

  return (

<div className="
min-h-screen
bg-slate-50
flex
items-center
justify-center
p-6
">

<form

onSubmit={handleSubmit}

className="
w-full
max-w-xl
bg-white
rounded-2xl
shadow-lg
border
p-8
flex
flex-col
gap-6
"

>

<div>

<h1 className="
text-3xl
font-bold
text-slate-900
">

Create New Form

</h1>


<p className="
text-slate-500
mt-2
">

Build a custom form and start collecting responses

</p>

</div>



<div>

<label className="
block
text-sm
font-medium
mb-2
">

Form Title

</label>

<input

placeholder="
e.g Developer Survey
"

value={title}

onChange={
e=>

setTitle(
e.target.value
)

}

className="
w-full
border
rounded-lg
px-4
py-3
outline-none
focus:ring-2
focus:ring-blue-500
"

/>

</div>



<div>

<label className="
block
text-sm
font-medium
mb-2
">

Description

</label>


<textarea

placeholder="
Describe your form
"

value={
description
}

onChange={
e=>

setDescription(
e.target.value
)

}

rows={4}

className="
w-full
border
rounded-lg
px-4
py-3
outline-none
focus:ring-2
focus:ring-blue-500
resize-none
"

/>

</div>



<div>

<label className="
block
text-sm
font-medium
mb-2
">

Visibility

</label>


<select

value={
visibility
}

onChange={
e=>

setVisibility(

e.target.value as
"PUBLIC"
|
"UNLISTED"

)

}

className="
w-full
border
rounded-lg
px-4
py-3
outline-none
focus:ring-2
focus:ring-blue-500
"

>

<option
value="PUBLIC"
>

🌍 Public

</option>


<option
value="UNLISTED"
>

🔗 Unlisted

</option>

</select>

</div>



<button

disabled={
createForm.isPending
}

className="
bg-black
text-white
rounded-lg
py-3
font-medium
hover:opacity-90
transition
disabled:opacity-50
"

>

{

createForm.isPending

?

"Creating..."

:

"Create Form →"

}

</button>

</form>

</div>

)

}