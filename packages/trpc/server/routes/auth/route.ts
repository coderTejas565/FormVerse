import {
  createUserWithEmailAndPasswordInputModel,
  createUserWithEmailAndPasswordOutputModel,
  signUserWithEmailAndPasswordInputModel,
  signUserWithEmailAndPasswordOutputModel,
} from "./model";
import { publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { userService } from "@repo/services/user";
import { setAuthenticationCookie } from "../../utils/cookie";
import { protectedProcedure } from "../../trpc";

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

export const authRouter = router({
  createUserWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createUserWithEmailAndPassword"),
        tags: TAGS,
      },
    })
    .input(createUserWithEmailAndPasswordInputModel)
    .output(createUserWithEmailAndPasswordOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { fullName, email, password } = input;
      const { id, token } = await userService.createUserWithEmailAndPassword({
        fullName,
        email,
        password,
      });

      setAuthenticationCookie(ctx, token);

      return {
        id,
      };
    }),
  me: protectedProcedure.query(async ({ ctx }) => {
    return {
      id: ctx.user?.id,
    };
  }),

  signInUserWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/signInUserWithEmailAndPassword"),
        tags: TAGS,
      },
    })
    .input(signUserWithEmailAndPasswordInputModel)
    .output(signUserWithEmailAndPasswordOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const { id, token } = await userService.signInUserWithEmailAndPassword({
        email,
        password,
      });

      setAuthenticationCookie(ctx, token);

      return {
        id,
      };
    }),
});
