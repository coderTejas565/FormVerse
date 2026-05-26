import { z } from "zod";

export const createFormInput = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  visibility: z.enum(["PUBLIC", "UNLISTED"]),
});

export const createFormOutput = z.object({
  id: z.string(),
});

export const formFieldTypeEnum = z.enum([
  "TEXT",
  "EMAIL",
  "NUMBER",
  "TEXTAREA",
  "SELECT",
  "MULTISELECT",
]);

export const addFormFieldInput = z.object({
  formId: z.string(),
  label: z.string().min(1),
  type: formFieldTypeEnum,
  required: z.boolean().optional(),

  // store as JSON string in DB but use array in API
  options: z.array(z.string()).optional(),

  order: z.number().optional(),
});

export const addFormFieldOutput = z.object({
  id: z.string(),
});

export const getFormInput = z.object({
  formId: z.string(),
});

export const getFormOutput = z.object({
  form: z.any(),
  fields: z.array(z.any()),
});

export const submitFormInput = z.object({
  formId: z.string(),

  answers: z.array(
    z.object({
      fieldId: z.string(),

      value: z.string(),
    }),
  ),
});

export const submitFormOutput = z.object({
  responseId: z.string(),
});

export const analyticsInput = z.object({});

export const analyticsOutput = z.object({
  totalForms: z.number(),

  totalResponses: z.number(),

  recentForms: z.array(
    z.object({
      id: z.string(),

      title: z.string(),
    }),
  ),

  recentResponses: z.array(
    z.object({
      responseId: z.string(),

      submittedAt: z.coerce.date(),

      formTitle: z.string(),
    }),
  ),

  responsesOverTime: z.array(
    z.object({
      date: z.string(),

      count: z.number(),
    }),
  ),
});

export const publishFormInput = z.object({
  formId: z.string(),
});

export const publishFormOutput = z.object({
  success: z.boolean(),
});

export const exploreFormsOutput = z.array(
  z.object({
    id: z.string(),

    title: z.string(),

    description: z.string().nullable(),

    createdAt: z.date().nullable(),
  }),
);

export const getMyFormInput = getFormInput;

export const getMyFormOutput = getFormOutput;

export const getMyFormsOutput = z.array(
  z.object({
    id: z.string(),

    title: z.string(),

    description: z.string().nullable().optional(),

    visibility: z.enum(["PUBLIC", "UNLISTED"]),

    isPublished: z.boolean().nullable(),

    creatorId: z.string(),

    createdAt: z.date().nullable(),

    updatedAt: z.date().nullable(),
  }),
);
