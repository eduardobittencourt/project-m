"use server";

import { getUser } from "@/data/users";
import { db } from "@/db";
import { groupsTable, selectGroupSchema } from "@/db/schema/groups";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function action(formData: FormData) {
  const validationResult = selectGroupSchema.safeParse({
    id: Number(formData.get("id")),
    name: formData.get("name"),
    description: formData.get("description"),
    image: "",
  });

  if (!validationResult.success) return;

  const user = await getUser();
  if (!user) return;

  const { id, name, description } = validationResult.data;

  await db
    .update(groupsTable)
    .set({
      name,
      description,
    })
    .where(eq(groupsTable.id, id))
    .returning({ id: groupsTable.id });

  redirect("/groups");
}
