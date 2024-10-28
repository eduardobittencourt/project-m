import { pgTable } from "@/db/schema";
import { groupsTable } from "@/db/schema/groups";
import { relations } from "drizzle-orm";
import { integer, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const categoriesTable = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  icon: varchar({ length: 255 }),
  groupId: integer()
    .notNull()
    .references(() => groupsTable.id),
});

export const categoriesRelations = relations(categoriesTable, ({ one }) => ({
  group: one(groupsTable, {
    fields: [categoriesTable.groupId],
    references: [groupsTable.id],
  }),
}));

export const insertCategorySchema = createInsertSchema(categoriesTable);
export const selectCategorySchema = createSelectSchema(categoriesTable);

export type NewCategory = typeof categoriesTable.$inferInsert;
export type Category = typeof categoriesTable.$inferSelect;
