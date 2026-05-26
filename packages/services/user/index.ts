import { createHmac, randomBytes } from "node:crypto";
import {
  type CreateUserWithEmailAndPasswordInputType,
  createUserWithEmailAndPasswordInput,
  type GenerateUserTokenPayloadType,
  generateUserTokenPayload,
  type SignInUserEmailAndPasswordInputType,
  signInUserEmailAndPasswordInput,
} from "./model";

import { db, eq } from "@repo/database";

import { usersTable } from "@repo/database/models/user";
import * as JWT from "jsonwebtoken";
import { env } from "process";
import { id } from "zod/locales";

class UserService {
  private async getUserByEmail(email: string) {
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (!result || result.length === 0) return null;

    return result[0];
  }

  private async genrateUserToken(payload: GenerateUserTokenPayloadType) {
    const { id } = await generateUserTokenPayload.parseAsync(payload);

    const token = JWT.sign({ id }, env.JWT_SECRET!);

    return { token };
  }

  private async generateHash(salt: string, password: string) {
    return createHmac("sha256", salt).update(password).digest("hex");
  }

  public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPasswordInputType) {
    const { fullName, email, password } =
      await createUserWithEmailAndPasswordInput.parseAsync(payload);

    const existingUserWithEmail = await this.getUserByEmail(email);
    if (existingUserWithEmail) {
      throw new Error(`user with email ${email} already exists`);
    }
    const salt = randomBytes(16).toString("hex");
    const hash = await this.generateHash(salt, password);

    const userInserResult = await db
      .insert(usersTable)
      .values({ email, fullName, password: hash, salt })
      .returning({
        id: usersTable.id,
      });

    if (!userInserResult || userInserResult.length === 0 || !userInserResult[0]?.id) {
      throw new Error("something went wrong while creating user");
    }

    const userId = userInserResult[0].id;
    const { token } = await this.genrateUserToken({ id: userId });

    return {
      id: userId,
      token,
    };
  }

  public async signInUserWithEmailAndPassword(payload: SignInUserEmailAndPasswordInputType) {
    const { email, password } = await signInUserEmailAndPasswordInput.parseAsync(payload);

    const existingUser = await this.getUserByEmail(email);
    if (!existingUser) {
      throw new Error(`User with email ${email} does not exists`);
    }

    if (!existingUser.password || !existingUser.salt) {
      throw new Error(`Invalid authentication method`);
    }

    const hash = await this.generateHash(existingUser.salt, password);

    if (hash !== existingUser.password) {
      throw new Error(`Invalid email address or password`);
    }

    const { token } = await this.genrateUserToken({ id: existingUser.id });

    return {
      id: existingUser.id,
      token,
    };
  }
}

export const userService = new UserService();
