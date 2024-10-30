import { pgTable } from "@/db/schema";
import { relations } from "drizzle-orm";
import { date, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { categoriesTable } from "./categories";

export const expensesTable = pgTable("expenses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  amount: integer().notNull(),
  date: date().notNull(),
  categoryId: integer()
    .notNull()
    .references(() => categoriesTable.id),
});

export const expensesRelations = relations(expensesTable, ({ one }) => ({
  category: one(categoriesTable, {
    fields: [expensesTable.categoryId],
    references: [categoriesTable.id],
  }),
}));

export const insertExpenseSchema = createInsertSchema(expensesTable);
export const selectExpenseSchema = createSelectSchema(expensesTable);

export type NewExpense = typeof expensesTable.$inferInsert;
export type Expense = typeof expensesTable.$inferSelect;
