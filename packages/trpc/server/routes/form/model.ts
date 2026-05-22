import { z } from "zod"

export const createFormInput = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  visibility: z.enum(["PUBLIC", "UNLISTED"])
})

export const createFormOutput = z.object({
  id: z.string()
})