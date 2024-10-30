"use server";

import { db } from "@/db";
import { categoriesTable, selectCategorySchema } from "@/db/schema/categories";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function action(formData: FormData) {
  const validationResult = selectCategorySchema
    .pick({
      id: true,
      name: true,
      description: true,
      icon: true,
    })
    .safeParse({
      id: Number(formData.get("id")),
      name: formData.get("name"),
      description: formData.get("description"),
      icon: "",
    });

  console.log(JSON.stringify(validationResult));

  if (!validationResult.success) return;

  const { id, name, description } = validationResult.data;

  await db
    .update(categoriesTable)
    .set({
      name,
      description,
    })
    .where(eq(categoriesTable.id, id))
    .returning({ id: categoriesTable.id });

  redirect("/categories");
}
