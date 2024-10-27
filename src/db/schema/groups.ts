import { integer, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { membersTable } from "@/db/schema/members";

export const groupsTable = pgTable("groups", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  image: varchar({ length: 255 }),
});

export const groupsRelations = relations(groupsTable, ({ many }) => ({
  members: many(membersTable),
}));

export const insertGroupSchema = createInsertSchema(groupsTable);
export const selectGroupSchema = createSelectSchema(groupsTable);

export type NewGroup = typeof groupsTable.$inferInsert;
export type Group = typeof groupsTable.$inferSelect;
