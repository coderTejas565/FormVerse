'use client'

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { trpc } from "~/trpc/client"
import { FormPreview } from "~/components/FormPreview"

export default function FormBuilderPage() {

  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const utils = trpc.useUtils()

  const {
    data,
    isLoading,
    isFetching,
    error
  } =
    trpc.form.getMyForm.useQuery(
      {
        formId: id
      },
      {
        retry: false
      }
    )


  const addField =
    trpc.form.addField.useMutation({

      onSuccess() {

        utils.form.getMyForm.invalidate({
          formId: id
        })

        setLabel("")
        setType("TEXT")
        setOptions("")
        setRequired(false)

      }

    })


  const publish =
    trpc.form.publishForm.useMutation({

      onSuccess() {

        utils.form.getMyForm.invalidate({
          formId: id
        })

      }

    })


  const unpublish =
    trpc.form.unpublishForm.useMutation({

      onSuccess() {

        utils.form.getMyForm.invalidate({
          formId: id
        })

      }

    })


  const [label, setLabel] =
    useState("")

  const [type, setType] =
    useState("TEXT")

  const [options, setOptions] =
    useState("")

  const [required, setRequired] =
    useState(false)

  const [values, setValues] =
    useState<Record<string, string>>({})


  if (
    isLoading
    ||
    isFetching
  ) {

    return (

      <div className="p-8">

        Loading form...

      </div>

    )

  }


  if (
    error
  ) {

    return (

      <div className="p-8 text-center">

        <h1
          className="
          text-xl
          font-bold
        "
        >

          Something went wrong

        </h1>


        <p
          className="
          text-gray-500
          mt-2
        "
        >

          Unable to load form

        </p>


        <button

          onClick={() =>
            router.push(
              "/dashboard"
            )
          }

          className="
          mt-4
          border
          px-4
          py-2
          rounded
        "

        >

          Dashboard

        </button>


      </div>

    )

  }


  const form =
    data?.form

  const fields =
    data?.fields
    ??
    []


  if (
    !form
  ) {

    return (

      <div>

        Form not found

      </div>

    )

  }


  function handleAddField() {

    if (
      !label.trim()
    )
      return


    addField.mutate({

      formId:
        id,

      label,

      type:
        type as any,

      required,

      options:

        type ===
        "SELECT"

          ?

          options
            .split(",")

            .map(
              o =>
                o.trim()
            )

            .filter(
              Boolean
            )

          :

          undefined

    })

  }


  return (

    <div
      className="
      p-6
      max-w-7xl
      mx-auto
    "
    >


      {/* HEADER */}

      <div
        className="
        flex
        justify-between
        items-start
        mb-10
      "
      >

        <div>

          <h1
            className="
            text-3xl
            font-bold
          "
          >

            {
              form.title
            }

          </h1>


          <p
            className="
            text-gray-500
            mt-2
          "
          >

            {
              form.description
            }

          </p>



          <div
            className="
            mt-4
          "
          >

            <span
              className="
              border
              px-3
              py-1
              rounded-full
              text-sm
            "
            >

              {

                form.isPublished

                  ?

                  "🟢 Published"

                  :

                  "🟡 Draft"

              }

            </span>

          </div>



          {

            form.isPublished

            &&

            (

              <div
                className="
                mt-4
                text-sm
                text-gray-500
              "
              >

                Share URL:

                <br />

                <span
                  className="
                  font-medium
                "
                >

                  http://localhost:3000/f/{id}

                </span>


              </div>

            )

          }


        </div>



        <div
          className="
          flex
          gap-3
        "
        >


          <button

            onClick={() => {

              if (
                form.isPublished
              ) {

                unpublish
                  .mutate({

                    formId:
                      id

                  })

              }

              else {

                publish
                  .mutate({

                    formId:
                      id

                  })

              }

            }}

            className="
            border
            rounded
            px-4
            py-2
          "

          >

            {

              form.isPublished

                ?

                "Unpublish"

                :

                "Publish"

            }

          </button>



          <button

            onClick={() =>
              router.push(
                "/dashboard"
              )
            }

            className="
            border
            rounded
            px-4
            py-2
          "

          >

            Done Editing

          </button>


        </div>


      </div>



      <div
        className="
        grid
        md:grid-cols-[350px_1fr]
        gap-8
      "
      >


        {/* LEFT */}

        <div>


          <div
            className="
            border
            rounded
            p-4
            flex
            flex-col
            gap-4
          "
          >

            <h2
              className="
              font-semibold
            "
            >

              Add Field

            </h2>



            <input

              placeholder="
              Field label
            "

              value={
                label
              }

              onChange={
                e =>
                  setLabel(
                    e.target.value
                  )
              }

              className="
              border
              rounded
              p-2
            "

            />


            <select

              value={
                type
              }

              onChange={
                e =>
                  setType(
                    e.target.value
                  )
              }

              className="
              border
              rounded
              p-2
            "

            >

              <option value="TEXT">
                Text
              </option>

              <option value="EMAIL">
                Email
              </option>

              <option value="NUMBER">
                Number
              </option>

              <option value="TEXTAREA">
                Textarea
              </option>

              <option value="SELECT">
                Select
              </option>

            </select>



            {

              type
              ===
              "SELECT"

              &&

              (

                <textarea

                  placeholder="
                  Beginner,
                  Intermediate,
                  Advanced
                "

                  value={
                    options
                  }

                  onChange={
                    e =>
                      setOptions(
                        e.target.value
                      )
                  }

                  className="
                  border
                  rounded
                  p-2
                "

                />

              )

            }



            <label
              className="
              flex
              gap-2
            "
            >

              <input

                type="checkbox"

                checked={
                  required
                }

                onChange={
                  e =>
                    setRequired(
                      e.target.checked
                    )
                }

              />


              Required


            </label>



            <button

              onClick={
                handleAddField
              }

              disabled={
                addField.isPending
              }

              className="
              border
              rounded
              p-2
            "

            >

              {

                addField.isPending

                  ?

                  "Adding..."

                  :

                  "Add Field"

              }

            </button>


          </div>



          <div
            className="
            mt-6
          "
          >

            <h2
              className="
              font-semibold
              mb-4
            "
            >

              Fields

            </h2>


            {

              fields.map(
                (field: any) => (

                  <div

                    key={
                      field.id
                    }

                    className="
                    border
                    rounded
                    p-3
                    mb-2
                  "

                  >

                    <strong>

                      {
                        field.label
                      }

                    </strong>


                    {" "}
                    (
                    {
                      field.type
                    }
                    )


                    {

                      field.required

                      &&

                      <p
                        className="
                        text-red-500
                        text-sm
                      "
                      >

                        Required

                      </p>

                    }


                  </div>

                )

              )

            }

          </div>


        </div>



        {/* PREVIEW */}

        <div
          className="
          border
          rounded
          p-6
        "
        >

          <h2
            className="
            font-bold
            mb-6
          "
          >

            Live Preview

          </h2>


          <FormPreview

            fields={
              fields
            }

            values={
              values
            }

            setValues={
              setValues
            }

          />


        </div>


      </div>


    </div>

  )

}