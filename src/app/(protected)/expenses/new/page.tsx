import { getCategories } from "@/data/categories";
import { action } from "./action";

export default async function NewExpensePage() {
  const categories = await getCategories();

  return (
    <form
      action={action}
      className="flex flex-1 flex-col items-center justify-center gap-2"
    >
      <input type="number" name="amount" placeholder="Valor" />
      <select name="categoryId">
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <button type="submit">Salvar</button>
    </form>
  );
}
