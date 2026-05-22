'use client'

import { trpc } from "~/trpc/client"
import Link from "next/link"

export default function DashboardPage() {

 const { data, isLoading } =
 trpc.form.getMyForms.useQuery()

 if (isLoading) {
  return <p>Loading...</p>
 }

 return (
  <div className="p-8">

    <h1 className="text-2xl font-bold">
      My Forms
    </h1>

    <Link
      href="/create-form"
      className="text-blue-500"
    >
      + Create Form
    </Link>

    <div className="mt-6 space-y-3">

      {data?.map((form) => (
        <div
          key={form.id}
          className="border p-4 rounded"
        >

          <h2>{form.title}</h2>

          <p>{form.visibility}</p>

        </div>
      ))}

    </div>

  </div>
 )
}