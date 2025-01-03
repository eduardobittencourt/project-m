import { integer, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { membersTable } from "@/db/schema/members";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 72 }).notNull(),
});

export const membersRelations = relations(usersTable, ({ many }) => ({
  members: many(membersTable),
}));

export const insertUserSchema = createInsertSchema(usersTable);
export const selectUserSchema = createSelectSchema(usersTable);

export type NewUser = typeof usersTable.$inferInsert;
export type User = typeof usersTable.$inferSelect;
