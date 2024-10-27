"use server";

import { getUser } from "@/data/users";
import { db } from "@/db";
import { groupsTable, insertGroupSchema } from "@/db/schema/groups";
import { membersTable } from "@/db/schema/members";
import { redirect } from "next/navigation";

export async function action(
  _state: { errors: unknown; success: boolean },
  formData: FormData,
) {
  const validationResult = insertGroupSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      success: false,
    };
  }

  const user = await getUser();
  if (!user) {
    return {
      errors: { name: "You must be logged in to create a group" },
      success: false,
    };
  }

  const { name, description } = validationResult.data;

  const group = await db.transaction(async (tx) => {
    const [group] = await tx
      .insert(groupsTable)
      .values({
        name,
        description,
      })
      .returning({ id: groupsTable.id });

    await tx.insert(membersTable).values({
      groupId: group.id,
      userId: user.id,
    });

    return group;
  });

  redirect(`/groups/${group.id}`);
}
