import { pgTable, uuid, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const formsTable = pgTable("forms", {
  id: uuid("id").primaryKey().defaultRandom(),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description"),

  creatorId: uuid("creator_id")
    .notNull()
    .references(() => usersTable.id),

  isPublished: boolean("is_published").default(false),

  visibility: varchar("visibility", { length: 20 }).notNull().$type<"PUBLIC" | "UNLISTED">(),

  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at").defaultNow(),
});
