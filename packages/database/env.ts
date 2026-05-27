import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().optional(),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  BASE_URL: z.string().default("http://localhost:8000"),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);
  if (!safeParseResult.success) {
    throw new Error(JSON.stringify(safeParseResult.error.flatten()));
  }
  return safeParseResult.data;
}

export const env = createEnv(process.env);