import { pgTable, uuid, varchar, text, boolean, integer } from "drizzle-orm/pg-core"

import { formsTable } from "./forms"

export const formFieldsTable = pgTable("form_fields", {

 id: uuid("id").primaryKey().defaultRandom(),

 formId: uuid("form_id").notNull().references(() => formsTable.id),

 label: varchar("label", { length: 255 }).notNull(),

 type: varchar("type", { length: 50 }).notNull().$type<"TEXT" |"EMAIL" | "NUMBER" | "TEXTAREA" | "SELECT" | "MULTISELECT" >(),

 required: boolean("required").default(false),

 options: text("options"), // store JSON string for select options

 order: integer("order").default(0)

})