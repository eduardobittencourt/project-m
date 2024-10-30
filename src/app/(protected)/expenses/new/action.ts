"use server";

import { getSelectedDate } from "@/data/date";
import { db } from "@/db";
import { expensesTable, insertExpenseSchema } from "@/db/schema/expenses";
import { redirect } from "next/navigation";

export async function action(formData: FormData) {
  const sessionDate = await getSelectedDate();
  if (!sessionDate) return;

  const validationResult = insertExpenseSchema.safeParse({
    amount: Number(formData.get("amount")),
    categoryId: Number(formData.get("categoryId")),
    date: `${sessionDate.year}-${sessionDate.month}-01`,
  });

  if (!validationResult.success) return;

  const { amount, categoryId, date } = validationResult.data;

  const [expense] = await db
    .insert(expensesTable)
    .values({
      amount,
      categoryId,
      date,
    })
    .returning({ id: expensesTable.id });

  redirect(`/expenses/${expense.id}`);
}
