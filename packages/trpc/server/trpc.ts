import { initTRPC, TRPCError } from "@trpc/server";
import { OpenApiMeta } from "trpc-to-openapi";
import * as JWT from "jsonwebtoken";

import { createContext } from "./context";
import { getAuthenticationCookie } from "./utils/cookie";

export const tRPCContext =
  initTRPC
    .meta<OpenApiMeta>()           // ← keep this
    .context<typeof createContext>()
    .create({});

export const router =
  tRPCContext.router;

export const publicProcedure =
  tRPCContext.procedure;


export const protectedProcedure =
  tRPCContext.procedure.use(
    async ({ ctx, next }) => {

      const token =
        getAuthenticationCookie(ctx);

      if (!token) {
        throw new TRPCError({
          code: "UNAUTHORIZED"
        });
      }

      try {

        const payload =
          JWT.verify(
            token,
            process.env.JWT_SECRET!
          ) as {
            id: string
          };


        return next({
          ctx: {
            ...ctx,
            user: {
              id: payload.id
            }
          }
        });

      } catch {

        throw new TRPCError({
          code: "UNAUTHORIZED"
        });

      }

    }
  );