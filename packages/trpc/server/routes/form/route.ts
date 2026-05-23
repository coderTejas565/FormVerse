import { router } from "../../trpc"
import { protectedProcedure, publicProcedure } from "../../trpc"
import { db, eq } from "@repo/database"
import { formsTable } from "@repo/database/models/forms"
import { formFieldsTable } from "@repo/database/models/formFields"
import { createFormInput, createFormOutput, addFormFieldInput, addFormFieldOutput, getFormInput, getFormOutput, analyticsInput, analyticsOutput } from "./model"
import { responsesTable } from "@repo/database/models/responses"
import { answersTable } from "@repo/database/models/answers"
import { submitFormInput, submitFormOutput } from "./model"
import { desc, count } from "@repo/database"

export const formRouter = router({

  createForm: protectedProcedure
    .input(createFormInput)
    .output(createFormOutput)
    .mutation(async ({ ctx, input }) => {

      const result = await db
        .insert(formsTable)
        .values({
          title: input.title,
          description: input.description,
          visibility: input.visibility,
          creatorId: ctx.user.id,
          isPublished: false
        })
        .returning({
          id: formsTable.id
        })

      return {
        id: result[0].id
      }
    }),

  addField: protectedProcedure
    .input(addFormFieldInput)
    .output(addFormFieldOutput)
    .mutation(async ({ ctx, input }) => {

      const form = await db
        .select()
        .from(formsTable)
        .where(eq(formsTable.id, input.formId))
        .limit(1)

      if (!form.length || form[0].creatorId !== ctx.user.id) {
        throw new Error("Unauthorized")
      }

      const result = await db
        .insert(formFieldsTable)
        .values({
          formId: input.formId,
          label: input.label,
          type: input.type,
          required: input.required ?? false,
          options: input.options
            ? JSON.stringify(input.options)
            : null,
          order: input.order ?? 0
        })
        .returning({
          id: formFieldsTable.id
        })

      return {
        id: result[0].id
      }
    }),

  getForm: publicProcedure
    .input(getFormInput)
    .output(getFormOutput)
    .query(async ({ input }) => {

      const form = await db
        .select()
        .from(formsTable)
        .where(eq(formsTable.id, input.formId))
        .limit(1)

      const fields = await db
        .select()
        .from(formFieldsTable)
        .where(eq(formFieldsTable.formId, input.formId))

      return {
        form: form[0] ?? null,
        fields
      }
    }),

  getMyForms: protectedProcedure.query(async ({ ctx }) => {

    const forms = await db
      .select()
      .from(formsTable)
      .where(eq(formsTable.creatorId, ctx.user.id))

    return forms
  }),
  
  submitForm: publicProcedure
  .input(submitFormInput)
  .output(submitFormOutput)
  .mutation(
    async({input})=>{
        const response = await db
        .insert(responsesTable)
        .values({
            formId: input.formId
        })
        .returning({
            id: responsesTable.id
        })
        const responseId = response[0].id 
        await db.insert(answersTable).values(input.answers.map(answer=>({responseId,
            fieldId: answer.fieldId,
            value: answer.value
        })
    )
)
    return{
        responseId
    }
  }),

  analytics: protectedProcedure
  .output(analyticsOutput)
  .query(async ({ ctx }) => {
    const forms = await db.select({
        id: formsTable.id,
        title: formsTable.title
    })
    .from(formsTable)
    .where(eq(
        formsTable.creatorId,
        ctx.user.id
    )
)


 const totalResponses = await db.select({
   count: count()
})
.from(responsesTable)
.innerJoin(formsTable,eq(responsesTable.formId,formsTable.id))
.where(eq(formsTable.creatorId,ctx.user.id))
 const recentForms = await db.select({
   id: formsTable.id,

   title: formsTable.title

})
 .from(formsTable)
 .where(eq(formsTable.creatorId,ctx.user.id))
 .orderBy(desc(formsTable.createdAt))
 .limit(5)


 const recentResponses = await db.select({

 responseId: responsesTable.id,

 submittedAt: responsesTable.createdAt,

 formTitle: formsTable.title

})
 .from(responsesTable)
 .innerJoin(formsTable,eq(responsesTable.formId,formsTable.id))
 .where(eq(formsTable.creatorId,ctx.user.id))
 .orderBy(desc(responsesTable.createdAt))
 .limit(10)
const rawResponses =
      await db
        .select({

          submittedAt:
            responsesTable.createdAt

        })
        .from(
          responsesTable
        )
        .innerJoin(

          formsTable,

          eq(
            responsesTable.formId,
            formsTable.id
          )

        )
        .where(

          eq(
            formsTable.creatorId,
            ctx.user.id
          )

        )


    const grouped =
      rawResponses.reduce(

        (acc, response) => {

          if (
            !response.submittedAt
          ) return acc


          const date =
            new Date(
              response.submittedAt
            )

              .toISOString()
              .split("T")[0]


          acc[date] =
            (
              acc[date]
              ??
              0
            )
            + 1


          return acc

        },

        {} as Record<
          string,
          number
        >

      )


    const responsesOverTime =
      Object
        .entries(
          grouped
        )

        .map(

          ([date, count]) => ({

            date,

            count

          })

        )


    return {

      totalForms:
        forms.length,

      totalResponses:
        Number(
          totalResponses[0]
            ?.count
          ??
          0
        ),

      recentForms,

      recentResponses,

      responsesOverTime

    }

  }),
})