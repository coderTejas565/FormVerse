import { router } from "../../trpc";
import { protectedProcedure, publicProcedure } from "../../trpc";
import { db, eq } from "@repo/database";
import { TRPCError } from "@trpc/server";
import { formsTable } from "@repo/database/models/forms";
import { formFieldsTable } from "@repo/database/models/formFields";
import {
  createFormInput,
  createFormOutput,
  addFormFieldInput,
  addFormFieldOutput,
  getFormInput,
  getFormOutput,
  analyticsInput,
  analyticsOutput,
  publishFormInput,
  publishFormOutput,
  exploreFormsOutput,
  getMyFormInput,
  getMyFormOutput,
  getMyFormsOutput,
  getResponsesOutput,
} from "./model";
import { responsesTable } from "@repo/database/models/responses";
import { answersTable } from "@repo/database/models/answers";
import { submitFormInput, submitFormOutput } from "./model";
import { desc, count, and } from "@repo/database";
import { checkRateLimit } from "../../utils/rate-limit";

export const formRouter = router({
  createForm: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/forms/create",
        tags: ["Forms"],
      },
    })
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
          isPublished: false,
        })
        .returning({
          id: formsTable.id,
        });

      return {
        id: result[0].id,
      };
    }),

  addField: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/forms/addField",
        tags: ["Forms"],
      },
    })
    .input(addFormFieldInput)
    .output(addFormFieldOutput)
    .mutation(async ({ ctx, input }) => {
      const form = await db
        .select()
        .from(formsTable)
        .where(eq(formsTable.id, input.formId))
        .limit(1);

      if (!form.length || form[0].creatorId !== ctx.user.id) {
        throw new Error("Unauthorized");
      }

      const result = await db
        .insert(formFieldsTable)
        .values({
          formId: input.formId,
          label: input.label,
          type: input.type,
          required: input.required ?? false,
          options: input.options ? JSON.stringify(input.options) : null,
          order: input.order ?? 0,
        })
        .returning({
          id: formFieldsTable.id,
        });

      return {
        id: result[0].id,
      };
    }),

  getForm: publicProcedure
    .meta({
      openapi: {
        method: "GET",

        path: "/forms/{formId}",

        tags: ["Public Forms"],
      },
    })
    .input(getFormInput)
    .output(getFormOutput)
    .query(async ({ input }) => {
      const form = await db
        .select()
        .from(formsTable)
        .where(eq(formsTable.id, input.formId))
        .limit(1);

      const currentForm = form[0];
      if (!currentForm) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Form not found",
        });
      }

      if (!currentForm.isPublished) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Form unavailable",
        });
      }

      const fields = await db
        .select()
        .from(formFieldsTable)
        .where(eq(formFieldsTable.formId, input.formId))
        .orderBy(formFieldsTable.order);

      return {
        form: currentForm,
        fields,
      };
    }),

  getMyForms: protectedProcedure
    .meta({
      openapi: {
        method: "GET",

        path: "/forms/my",

        tags: ["Forms"],
      },
    })
    .output(getMyFormsOutput)
    .query(async ({ ctx }) => {
      const forms = await db.select().from(formsTable).where(eq(formsTable.creatorId, ctx.user.id));

      return forms;
    }),

  submitForm: publicProcedure
    .meta({
      openapi: {
        method: "POST",

        path: "/forms/submit",

        tags: ["Responses"],
      },
    })

    .input(submitFormInput)
    .output(submitFormOutput)
    .mutation(async ({ input, ctx }) => {
      const allowed = checkRateLimit(ctx.ip);

      if (!allowed) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",

          message: "Too many submissions. Try again later.",
        });
      }

      const form = await db
        .select()
        .from(formsTable)
        .where(eq(formsTable.id, input.formId))
        .limit(1);

      if (!form.length) {
        throw new TRPCError({
          code: "NOT_FOUND",

          message: "Form not found",
        });
      }

      if (!form[0].isPublished) {
        throw new TRPCError({
          code: "FORBIDDEN",

          message: "Form unavailable",
        });
      }

      const response = await db
        .insert(responsesTable)
        .values({
          formId: input.formId,
        })

        .returning({
          id: responsesTable.id,
        });

      const responseId = response[0].id;

      await db
        .insert(answersTable)

        .values(
          input.answers.map((answer) => ({
            responseId,

            fieldId: answer.fieldId,

            value: answer.value,
          })),
        );

      return {
        responseId,
      };
    }),

  analytics: protectedProcedure
    .meta({
      openapi: {
        method: "GET",

        path: "/analytics",

        tags: ["Analytics"],
      },
    })
    .output(analyticsOutput)
    .query(async ({ ctx }) => {
      const forms = await db
        .select({
          id: formsTable.id,
          title: formsTable.title,
        })
        .from(formsTable)
        .where(eq(formsTable.creatorId, ctx.user.id));

      const totalResponses = await db
        .select({
          count: count(),
        })
        .from(responsesTable)
        .innerJoin(formsTable, eq(responsesTable.formId, formsTable.id))
        .where(eq(formsTable.creatorId, ctx.user.id));
      const recentForms = await db
        .select({
          id: formsTable.id,

          title: formsTable.title,
        })
        .from(formsTable)
        .where(eq(formsTable.creatorId, ctx.user.id))
        .orderBy(desc(formsTable.createdAt))
        .limit(5);

      const recentResponses = await db
        .select({
          responseId: responsesTable.id,

          submittedAt: responsesTable.createdAt,

          formTitle: formsTable.title,
        })
        .from(responsesTable)
        .innerJoin(formsTable, eq(responsesTable.formId, formsTable.id))
        .where(eq(formsTable.creatorId, ctx.user.id))
        .orderBy(desc(responsesTable.createdAt))
        .limit(10);
      const rawResponses = await db
        .select({
          submittedAt: responsesTable.createdAt,
        })
        .from(responsesTable)
        .innerJoin(
          formsTable,

          eq(responsesTable.formId, formsTable.id),
        )
        .where(eq(formsTable.creatorId, ctx.user.id));

      const grouped = rawResponses.reduce(
        (acc, response) => {
          if (!response.submittedAt) return acc;
          const date = new Date(response.submittedAt).toISOString().split("T")[0];

          acc[date] = (acc[date] ?? 0) + 1;

          return acc;
        },

        {} as Record<string, number>,
      );

      const responsesOverTime = Object.entries(grouped)

        .map(([date, count]) => ({
          date,

          count,
        }));

      return {
        totalForms: forms.length,

        totalResponses: Number(totalResponses[0]?.count ?? 0),

        recentForms,

        recentResponses,

        responsesOverTime,
      };
    }),

  publishForm: protectedProcedure
    .meta({
      openapi: {
        method: "POST",

        path: "/forms/publish",

        tags: ["Forms"],
      },
    })
    .input(publishFormInput)
    .output(publishFormOutput)
    .mutation(async ({ ctx, input }) => {
      const form = await db
        .select()
        .from(formsTable)
        .where(and(eq(formsTable.id, input.formId), eq(formsTable.creatorId, ctx.user.id)))
        .limit(1);
      if (!form.length) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Unauthorized",
        });
      }
      await db
        .update(formsTable)
        .set({
          isPublished: true,
        })
        .where(eq(formsTable.id, input.formId));
      return {
        success: true,
      };
    }),

  unpublishForm: protectedProcedure
    .meta({
      openapi: {
        method: "POST",

        path: "/forms/unpublish",

        tags: ["Forms"],
      },
    })
    .input(publishFormInput)
    .output(publishFormOutput)
    .mutation(async ({ ctx, input }) => {
      const form = await db
        .select()
        .from(formsTable)
        .where(and(eq(formsTable.id, input.formId), eq(formsTable.creatorId, ctx.user.id)))
        .limit(1);

      if (!form.length) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Unauthorized",
        });
      }

      await db
        .update(formsTable)
        .set({ isPublished: false })
        .where(eq(formsTable.id, input.formId));

      return {
        success: true,
      };
    }),

  exploreForms: publicProcedure
    .meta({
      openapi: {
        method: "GET",

        path: "/forms/explore",

        tags: ["Public"],
      },
    })
    .output(exploreFormsOutput)
    .query(async () => {
      return await db
        .select({
          id: formsTable.id,
          title: formsTable.title,
          description: formsTable.description,
          createdAt: formsTable.createdAt,
        })
        .from(formsTable)
        .where(and(eq(formsTable.isPublished, true), eq(formsTable.visibility, "PUBLIC")))
        .orderBy(desc(formsTable.createdAt));
    }),

  getMyForm: protectedProcedure
    .meta({
      openapi: {
        method: "GET",

        path: "/forms/me/{formId}",

        tags: ["Forms"],
      },
    })
    .input(getMyFormInput)

    .output(getMyFormOutput)

    .query(
      async ({
        ctx,

        input,
      }) => {
        const form = await db
          .select()
          .from(formsTable)
          .where(eq(formsTable.id, input.formId))
          .limit(1);

        const currentForm = form[0];

        if (!currentForm) {
          throw new TRPCError({
            code: "NOT_FOUND",

            message: "Form not found",
          });
        }

        if (currentForm.creatorId !== ctx.user.id) {
          throw new TRPCError({
            code: "FORBIDDEN",

            message: "Unauthorized",
          });
        }

        const fields = await db
          .select()
          .from(formFieldsTable)
          .where(
            eq(
              formFieldsTable.formId,

              input.formId,
            ),
          )
          .orderBy(formFieldsTable.order);

        return {
          form: currentForm,

          fields,
        };
      },
    ),

  getResponses: protectedProcedure

    .output(getResponsesOutput)

    .query(async ({ ctx }) => {
      const responses = await db

        .select({
          responseId: responsesTable.id,

          submittedAt: responsesTable.createdAt,

          formTitle: formsTable.title,
        })

        .from(responsesTable)

        .innerJoin(
          formsTable,

          eq(responsesTable.formId, formsTable.id),
        )

        .where(eq(formsTable.creatorId, ctx.user.id))

        .orderBy(desc(responsesTable.createdAt));

      const result = await Promise.all(
        responses.map(async (response) => {
          const answers = await db

            .select({
              fieldId: answersTable.fieldId,

              value: answersTable.value,
            })

            .from(answersTable)

            .where(
              eq(
                answersTable.responseId,

                response.responseId,
              ),
            );

          return {
            ...response,

            answers,
          };
        }),
      );

      return result;
    }),
});
