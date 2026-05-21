import { createHmac, randomBytes } from "node:crypto";
import { type CreateUserWithEmailAndPasswordInputType, createUserWithEmailAndPasswordInput, type GenerateUserTokenPayloadType, generateUserTokenPayload} from "./model";

import { db, eq } from "@repo/database";

import { usersTable} from "@repo/database/models/user";
import * as JWT from "jsonwebtoken"
import { env } from "process";
import { id } from "zod/v4/locales";


class UserService {

    private async getUserByEmail(email: string){
        const result = await db.select().from(usersTable).where(eq(usersTable.email, email))
        if (!result || result.length === 0) return null
        
        return result[0]
        
    }


    private async genrateUserToken(payload: GenerateUserTokenPayloadType){
        const { id } = await generateUserTokenPayload.parseAsync(payload)

        const token = JWT.sign({id}, env.JWT_SECRET)

        return { token }
    }

    public async createUserWithEmailAndPassword(payload : CreateUserWithEmailAndPasswordInputType){
        const { fullName, email, password } = await createUserWithEmailAndPasswordInput.parseAsync(payload)

        const existingUserWithEmail = await this.getUserByEmail(email)
        if (existingUserWithEmail) {
            throw new Error(`user with email ${email} already exists`);
        }
        const salt = randomBytes(16).toString('hex')
        const hash = createHmac('sha256',salt).update(password).digest('hex')

        const userInserResult = await db.insert(usersTable).values({email, fullName, password: hash, salt}).returning({
            id: usersTable.id
        })

        if (!userInserResult || userInserResult.length === 0 || userInserResult[0]?.id) {
            throw new Error("something went wrong while creating user");
            
        }

        const userId = userInserResult[0].id
        const { token } = await this.genrateUserToken({id: userId})

        return{
            id: userId,
            token
        }

    }

}

export const userService = new UserService();