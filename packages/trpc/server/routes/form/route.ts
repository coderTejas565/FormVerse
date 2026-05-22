import { router } from "../../trpc"
import { protectedProcedure, publicProcedure } from "../../trpc"
import { db, eq } from "@repo/database"
import { formsTable } from "@repo/database/models/forms"
import { formFieldsTable } from "@repo/database/models/formFields"
import { createFormInput, createFormOutput, addFormFieldInput, addFormFieldOutput, getFormInput, getFormOutput } from "./model"
import { z } from "zod"

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
  })
})