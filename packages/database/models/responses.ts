import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";

import { formsTable } from "./forms";

export const responsesTable = pgTable("responses", {
  id: uuid("id").primaryKey().defaultRandom(),

  formId: uuid("form_id")
    .notNull()
    .references(() => formsTable.id),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
