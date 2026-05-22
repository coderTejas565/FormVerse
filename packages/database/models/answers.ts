import { pgTable, uuid, text } from "drizzle-orm/pg-core"

import { responsesTable } from "./responses"

import { formFieldsTable } from "./formFields"


export const answersTable = pgTable("answers",{

 id: uuid("id").primaryKey().defaultRandom(),

 responseId: uuid("response_id").notNull().references(
()=>responsesTable.id
 ),

 fieldId: uuid("field_id").notNull().references(
    ()=>formFieldsTable.id
 ),

 value: text("value").notNull()

})