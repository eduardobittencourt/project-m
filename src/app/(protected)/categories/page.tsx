import { getCategories } from "@/data/categories";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      {categories.map((category) => (
        <div key={category.id}>
          <Link href={`/categories/${category.id}`}>{category.name}</Link>
        </div>
      ))}
    </main>
  );
}
