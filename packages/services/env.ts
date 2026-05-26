import { z } from "zod";
import { en } from "zod/v4/locales";

const envSchema = z.object({
  JWT_SECRET: z.string().describe("Secret key of JWT payload"),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);
  if (!safeParseResult.success) {
    throw new Error(safeParseResult.error.message);
  }
  return safeParseResult.data;
}

export const env = createEnv(process.env);
