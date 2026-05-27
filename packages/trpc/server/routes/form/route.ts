import { router, protectedProcedure, publicProcedure } from "../../trpc";
import { db, eq, desc, count, and } from "@repo/database";
import { TRPCError } from "@trpc/server";

import { formsTable } from "@repo/database/models/forms";
import { formFieldsTable } from "@repo/database/models/formFields";
import { responsesTable } from "@repo/database/models/responses";
import { answersTable } from "@repo/database/models/answers";

import {
  createFormInput,
  createFormOutput,
  addFormFieldInput,
  addFormFieldOutput,
  getFormInput,
  getFormOutput,
  analyticsOutput,
  publishFormInput,
  publishFormOutput,
  exploreFormsOutput,
  getMyFormInput,
  getMyFormOutput,
  getMyFormsOutput,
  getResponsesOutput,
  submitFormInput,
  submitFormOutput,
} from "./model";

import { checkRateLimit } from "../../utils/rate-limit";

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
          isPublished: false,
        })
        .returning({
          id: formsTable.id,
        });

      if (!result.length || !result[0]) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed creating form",
        });
      }

      return {
        id: result[0].id,
      };
    }),

  addField: protectedProcedure
    .input(addFormFieldInput)
    .output(addFormFieldOutput)
    .mutation(async ({ ctx, input }) => {
      const form = await db
        .select()
        .from(formsTable)
        .where(eq(formsTable.id, input.formId))
        .limit(1);

      const currentForm = form[0];

      if (!currentForm || currentForm.creatorId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Unauthorized",
        });
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

      if (!result.length || !result[0]) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed adding field",
        });
      }

      return {
        id: result[0].id,
      };
    }),

  getForm: publicProcedure
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
        });
      }

      if (!currentForm.isPublished) {
        throw new TRPCError({
          code: "FORBIDDEN",
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

  getMyForms: protectedProcedure.output(getMyFormsOutput).query(async ({ ctx }) => {
    return await db.select().from(formsTable).where(eq(formsTable.creatorId, ctx.user.id));
  }),

  submitForm: publicProcedure
    .input(submitFormInput)
    .output(submitFormOutput)
    .mutation(async ({ input, ctx }) => {
      const allowed = checkRateLimit(ctx.ip);

      if (!allowed) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
        });
      }

      const form = await db
        .select()
        .from(formsTable)
        .where(eq(formsTable.id, input.formId))
        .limit(1);

      const currentForm = form[0];

      if (!currentForm) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      if (!currentForm.isPublished) {
        throw new TRPCError({
          code: "FORBIDDEN",
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

      if (!response.length || !response[0]) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      const responseId = response[0].id;

      await db.insert(answersTable).values(
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

  analytics: protectedProcedure.output(analyticsOutput).query(async ({ ctx }) => {
    const forms = await db.select().from(formsTable).where(eq(formsTable.creatorId, ctx.user.id));

    const totalResponses = await db
      .select({
        count: count(),
      })
      .from(responsesTable)
      .innerJoin(formsTable, eq(responsesTable.formId, formsTable.id))
      .where(eq(formsTable.creatorId, ctx.user.id));

    return {
      totalForms: forms.length,

      totalResponses: Number(totalResponses[0]?.count ?? 0),

      recentForms: [],

      recentResponses: [],

      responsesOverTime: [],
    };
  }),

  publishForm: protectedProcedure
    .input(publishFormInput)
    .output(publishFormOutput)
    .mutation(async ({ ctx, input }) => {
      const form = await db
        .select()
        .from(formsTable)
        .where(and(eq(formsTable.id, input.formId), eq(formsTable.creatorId, ctx.user.id)))
        .limit(1);

      if (!form[0]) {
        throw new TRPCError({
          code: "FORBIDDEN",
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
    .input(publishFormInput)
    .output(publishFormOutput)
    .mutation(async ({ ctx, input }) => {
      const form = await db
        .select()
        .from(formsTable)
        .where(and(eq(formsTable.id, input.formId), eq(formsTable.creatorId, ctx.user.id)));

      if (!form[0]) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      await db
        .update(formsTable)
        .set({
          isPublished: false,
        })
        .where(eq(formsTable.id, input.formId));

      return {
        success: true,
      };
    }),

  exploreForms: publicProcedure.query(async () => {
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

  getResponses: protectedProcedure.output(getResponsesOutput).query(async ({ ctx }) => {
    // Step 1: Get all forms created by user
    const forms = await db
      .select({ id: formsTable.id })
      .from(formsTable)
      .where(eq(formsTable.creatorId, ctx.user.id));

    const formIds = forms.map((f) => f.id);

    if (formIds.length === 0) return [];

    // Step 2: Get responses
    const responses = await db
      .select({
        responseId: responsesTable.id,
        formId: responsesTable.formId,
        submittedAt: responsesTable.createdAt,
        formTitle: formsTable.title,
      })
      .from(responsesTable)
      .innerJoin(formsTable, eq(responsesTable.formId, formsTable.id))
      .where(eq(formsTable.creatorId, ctx.user.id))
      .orderBy(desc(responsesTable.createdAt));

    // Step 3: Get all answers for these responses
    const responseIds = responses.map((r) => r.responseId);

    if (responseIds.length === 0) return [];

    const answers = await db
      .select({
        responseId: answersTable.responseId,
        fieldId: answersTable.fieldId,
        value: answersTable.value,
      })
      .from(answersTable)
      .where(
        // drizzle doesn't support IN nicely in all setups
        // so we do manual filter style
        eq(answersTable.responseId, answersTable.responseId),
      );

    // FIX: proper IN query
    const allAnswers = await db
      .select({
        responseId: answersTable.responseId,
        fieldId: answersTable.fieldId,
        value: answersTable.value,
      })
      .from(answersTable);

    const filteredAnswers = allAnswers.filter((a) => responseIds.includes(a.responseId));

    // Step 4: group answers by responseId
    const grouped = responses.map((r) => {
      return {
        responseId: r.responseId,
        formTitle: r.formTitle,
        submittedAt: r.submittedAt,
        answers: filteredAnswers
          .filter((a) => a.responseId === r.responseId)
          .map((a) => ({
            fieldId: a.fieldId,
            value: a.value,
          })),
      };
    });

    return grouped;
  }),
});
