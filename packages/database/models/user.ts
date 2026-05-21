import { pgTable, uuid, varchar, timestamp, boolean, text} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  fullName: varchar("full_name",{ length:80 }).notNull(),

  email: varchar("email",{ length:255 })
    .notNull()
    .unique(),

  passwordHash: varchar("password_hash",{ length:255 })
    .notNull(),

  refreshTokenHash: text("refresh_token_hash"),

  emailVerified: boolean("email_verified")
    .default(false),

  profileImageUrl: text("profile_image_url"),

  createdAt: timestamp("created_at", {
    withTimezone:true
  }).defaultNow(),

  updatedAt: timestamp("updated_at", {
    withTimezone:true
  })
  .defaultNow()
  .$onUpdate(() => new Date())
})

export type SelectUser = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;