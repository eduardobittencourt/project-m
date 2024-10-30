import { db } from "@/db";
import { expensesTable } from "@/db/schema/expenses";
import { cache } from "react";
import { getSelectedGroup } from "./groups";
import { categoriesTable } from "@/db/schema/categories";
import { eq } from "drizzle-orm";
import { getSelectedDate } from "./date";

export const getExpenses = cache(async () => {
  const group = await getSelectedGroup();
  const date = await getSelectedDate();
  if (!group || !date) return [];

  const expenses = await db
    .select({
      id: expensesTable.id,
      amount: expensesTable.amount,
      category: categoriesTable.name,
    })
    .from(expensesTable)
    .innerJoin(
      categoriesTable,
      eq(expensesTable.categoryId, categoriesTable.id),
    )
    .where(eq(expensesTable.date, `${date.year}-${date.month}-01`));

  return expenses;
});
