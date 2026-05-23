'use client'

import Link from "next/link"
import { trpc } from "~/trpc/client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {

    const router = useRouter()
const {
 data: forms,
 isLoading: formsLoading,
 error: formsError
}
=
trpc.form.getMyForms.useQuery()


const analytics =
trpc.form.analytics.useQuery()


console.log(
 "formsError",
 formsError
)

console.log(
 "analyticsError",
 analytics.error
)

useEffect(()=>{

 if(
   formsError ||
   analytics.error
 ){

   router.push(
    "/sign-in"
   )

 }

},[
 formsError,
 analytics.error,
 router
])
  


  if ( formsLoading || analytics.isLoading) {
    return <p>Loading...</p>
  }


  


  return (
  <div className="p-8">
    <h1 className="text-3xl font-bold">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="border rounded p-6">
            <h2 className="text-sm text-gray-500">Total Forms</h2>
            <p className="text-3xl font-bold mt-2">{analytics.data?.totalForms}</p>
            </div>
            <div className="border rounded p-6">
                <h2 className="text-sm text-gray-500">Total Responses
                </h2>
                <p className="text-3xl font-bold mt-2">{analytics.data?.totalResponses}
                </p>
                </div>
                <div className="border rounded p-6">
                    <h2 className="text-sm text-gray-500">Recent Forms</h2>
                    <p className="text-3xl font-bold mt-2">{analytics.data?.recentForms.length}</p>
                    </div>
                    </div>
                    <div className="mt-8">
                        <Link href="/create-form" className="text-blue-500">+ Create Form</Link></div>
                        <div className="mt-8 space-y-4">
                            <h2 className="text-xl font-semibold">My Forms</h2>{forms?.map((form)=>(<div key={form.id}className="border rounded p-4 ">
                                <h3 className="font-semibold">{form.title}</h3>
                                <p>Visibility:{form.visibility}</p>
                                <p>Published:{form.isPublished? "Yes": "No"}

                                </p>
                                </div>))}
                                </div>
                                <div className="mt-8 border rounded p-4">
                                    <h2 className="text-lg font-bold mb-4">Recent Responses</h2>{analytics.data?.recentResponses.map((response:any)=>(<div key={response.responseId} className="flex justify-between py-2 border-b ">
                                        <span>{response.formTitle}

                                        </span>
                                        <span>{new Date(response.submittedAt).toLocaleString()}

                                        </span>
                                        </div>
                                        )
                                    )
                                    }
                                    </div>
                                    </div>)
                                    }