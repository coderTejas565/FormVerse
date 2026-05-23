'use client'

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { trpc } from "~/trpc/client"
import ResponsesChart from "~/components/ResponsesChart"

export default function DashboardPage() {

  const router = useRouter()

  const {
    data: forms,
    isLoading: formsLoading,
    error: formsError
  } =
  trpc.form.getMyForms.useQuery()


  const analytics =
  trpc.form.analytics.useQuery()


  useEffect(() => {

    if (
      formsError ||
      analytics.error
    ) {

      router.push(
        "/sign-in"
      )

    }

  }, [
    formsError,
    analytics.error,
    router
  ])


  if (
    formsLoading ||
    analytics.isLoading
  ) {

    return (
      <p>
        Loading...
      </p>
    )

  }


  return (

<div
className="
min-h-screen
bg-slate-50
p-8
space-y-10
"
>

{/* HEADER */}

<div
className="
flex
justify-between
items-center
"
>

<div>

<h1
className="
text-4xl
font-bold
tracking-tight
text-slate-900
"
>

Dashboard

</h1>

<p
className="
text-slate-500
mt-2
"
>

Manage forms, responses and analytics

</p>

</div>


<Link

href="/create-form"

className="
bg-black
text-white
px-5
py-3
rounded-xl
font-medium
hover:opacity-90
transition
shadow-sm
"

>

+ Create Form

</Link>


</div>



{/* STATS */}

<div
className="
grid
grid-cols-1
md:grid-cols-3
gap-6
"
>

<div
className="
bg-white
rounded-2xl
shadow-sm
border
p-6
"
>

<p
className="
text-sm
text-slate-500
"
>

Total Forms

</p>


<h2
className="
text-4xl
font-bold
mt-4
"
>

{
analytics.data?.totalForms
}

</h2>

</div>



<div
className="
bg-white
rounded-2xl
shadow-sm
border
p-6
"
>

<p
className="
text-sm
text-slate-500
"
>

Total Responses

</p>


<h2
className="
text-4xl
font-bold
mt-4
"
>

{
analytics.data?.totalResponses
}

</h2>

</div>



<div
className="
bg-white
rounded-2xl
shadow-sm
border
p-6
"
>

<p
className="
text-sm
text-slate-500
"
>

Recent Forms

</p>


<h2
className="
text-4xl
font-bold
mt-4
"
>

{
analytics.data
?.recentForms
?.length

??

0
}

</h2>

</div>


</div>



{/* CHART */}

<div
className="
bg-white
rounded-2xl
shadow-sm
border
p-8
"
>

<h2
className="
text-2xl
font-bold
mb-6
"
>

Responses Over Time

</h2>


<ResponsesChart

data={
analytics.data
?.responsesOverTime

??

[]

}

/>


</div>



{/* MY FORMS */}

<div
className="
bg-white
rounded-2xl
shadow-sm
border
p-8
"
>

<h2
className="
text-2xl
font-bold
mb-6
"
>

My Forms

</h2>



<div
className="
grid
gap-4
"
>

{

forms?.map(

(form)=>(

<div

key={
form.id
}

className="
border
rounded-xl
p-5
hover:shadow-md
transition
bg-slate-50
"

>

<div
className="
flex
justify-between
items-start
"
>

<div>

<h3
className="
text-lg
font-semibold
"
>

{
form.title
}

</h3>


<p
className="
text-sm
text-slate-500
mt-1
"
>

Visibility:

{
form.visibility
}

</p>

</div>



<div>

<span
className={`

px-3
py-1
rounded-full
text-sm

${
form.isPublished

?

"bg-green-100 text-green-700"

:

"bg-red-100 text-red-700"

}

`}
>

{

form.isPublished

?

"Published"

:

"Draft"

}

</span>

</div>

</div>


</div>

)

)

}


</div>


</div>



{/* RECENT RESPONSES */}

<div
className="
bg-white
rounded-2xl
shadow-sm
border
p-8
"
>

<h2
className="
text-2xl
font-bold
mb-6
"
>

Recent Responses

</h2>



<div
className="
space-y-3
"
>

{

analytics.data
?.recentResponses
?.map(

(response:any)=>(

<div

key={
response.responseId
}

className="
flex
justify-between
items-center
border-b
pb-3
"

>

<div>

<p
className="
font-medium
"
>

{
response.formTitle
}

</p>


<p
className="
text-sm
text-slate-500
"
>

New response submitted

</p>


</div>



<span
className="
text-sm
text-slate-400
"
>

{

new Date(
response.submittedAt
)

.toLocaleString()

}

</span>


</div>

)

)

}


</div>


</div>


</div>

)

}