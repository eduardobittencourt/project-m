import { getExpenses } from "@/data/expenses";
import Link from "next/link";

export default async function ExpensesPage() {
  const expenses = await getExpenses();

  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      {expenses.map((expense) => (
        <div key={expense.id}>
          <Link href={`/categories/${expense.id}`}>
            {expense.category} - {expense.amount}
          </Link>
        </div>
      ))}
    </main>
  );
}
