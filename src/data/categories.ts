import { db } from "@/db";
import { categoriesTable } from "@/db/schema/categories";
import { cache } from "react";
import { getSelectedGroup } from "./groups";
import { eq } from "drizzle-orm";

export const getCategories = cache(async () => {
  const group = await getSelectedGroup();
  if (!group) return [];

  const categories = await db
    .select({
      id: categoriesTable.id,
      name: categoriesTable.name,
      description: categoriesTable.description,
      icon: categoriesTable.icon,
    })
    .from(categoriesTable)
    .where(eq(categoriesTable.groupId, group.id));

  return categories;
});

export const getCategory = cache(async (id: number) => {
  const [category] = await db
    .select({
      id: categoriesTable.id,
      name: categoriesTable.name,
      description: categoriesTable.description,
      icon: categoriesTable.icon,
    })
    .from(categoriesTable)
    .where(eq(categoriesTable.id, id));

  return category;
});
