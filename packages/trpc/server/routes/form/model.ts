import { z } from "zod"

export const createFormInput = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  visibility: z.enum(["PUBLIC", "UNLISTED"])
})

export const createFormOutput = z.object({
  id: z.string()
})

export const formFieldTypeEnum = z.enum([
  "TEXT",
  "EMAIL",
  "NUMBER",
  "TEXTAREA",
  "SELECT",
  "MULTISELECT"
])

export const addFormFieldInput = z.object({
  formId: z.string(),
  label: z.string().min(1),
  type: formFieldTypeEnum,
  required: z.boolean().optional(),

  // store as JSON string in DB but use array in API
  options: z.array(z.string()).optional(),

  order: z.number().optional()
})

export const addFormFieldOutput = z.object({
  id: z.string()
})

export const getFormInput = z.object({
  formId: z.string()
})

export const getFormOutput = z.object({
  form: z.any(),
  fields: z.array(z.any())
})

export const submitFormInput = z.object({

 formId: z.string(),

 answers: z.array(
    z.object({

   fieldId: z.string(),

   value: z.string()
})
)
})


export const submitFormOutput = z.object({
    responseId: z.string()
})