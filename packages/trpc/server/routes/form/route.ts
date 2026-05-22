import { router } from "../../trpc"
import { protectedProcedure } from "../../trpc"
import { createFormInput, createFormOutput } from "./model"
import { db } from "@repo/database"
import { formsTable } from "@repo/database/models/forms"

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
    })

})