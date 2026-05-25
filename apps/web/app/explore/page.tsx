'use client'

import Link from "next/link"
import { trpc } from "~/trpc/client"

export default function ExplorePage() {
  const {
    data,
    isLoading,
    error
  } = trpc.form.exploreForms.useQuery()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Loading public forms...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">

        <h1 className="text-2xl font-bold">
          Something went wrong
        </h1>

        <p className="text-gray-500">
          Could not load public forms
        </p>

      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">

        <h1 className="text-3xl font-bold">
          No Public Forms Yet
        </h1>

        <p className="text-gray-500">
          Publish forms to show them here
        </p>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="mb-12">

          <h1 className="text-5xl font-bold mb-4">
            Explore Forms
          </h1>

          <p className="text-gray-500 text-lg">
            Discover public forms shared by creators
          </p>

        </div>


        <div className="
          grid
          sm:grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        ">

          {data.map((form) => (

            <Link
              key={form.id}
              href={`/f/${form.id}`}
            >

              <div className="
                border
                rounded-2xl
                p-6
                h-full
                flex
                flex-col
                justify-between
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-200
                cursor-pointer
              ">

                <div>

                  <h2 className="
                    text-2xl
                    font-semibold
                    mb-3
                    line-clamp-2
                  ">
                    {form.title}
                  </h2>


                  <p className="
                    text-gray-500
                    mb-6
                    line-clamp-3
                  ">

                    {
                      form.description
                      ??
                      "No description provided"
                    }

                  </p>

                </div>


                <div className="
                  flex
                  justify-between
                  items-center
                  text-sm
                  text-gray-400
                ">

                  <span>

                    {
                      form.createdAt
                        ? new Date(
                            form.createdAt
                          ).toLocaleDateString()
                        : "-"
                    }

                  </span>


                  <span className="font-medium">
                    Open →
                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>
  )
}