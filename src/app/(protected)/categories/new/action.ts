"use server";

import { db } from "@/db";
import { categoriesTable, insertCategorySchema } from "@/db/schema/categories";
import { redirect } from "next/navigation";

export async function action(formData: FormData) {
  const validationResult = insertCategorySchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    icon: "",
    groupId: Number(formData.get("groupId")),
  });

  if (!validationResult.success) return;

  const { name, description, icon, groupId } = validationResult.data;

  const [category] = await db
    .insert(categoriesTable)
    .values({
      name,
      description,
      icon,
      groupId,
    })
    .returning({ id: categoriesTable.id });

  redirect(`/groups/${category.id}`);
}
