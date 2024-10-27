import { getUser } from "@/data/users";
import { db } from "@/db";
import { groupsTable } from "@/db/schema/groups";
import { membersTable } from "@/db/schema/members";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getGroups = cache(async () => {
  const user = await getUser();
  if (!user) return [];

  const groups = await db
    .select({
      id: groupsTable.id,
      name: groupsTable.name,
      description: groupsTable.description,
    })
    .from(membersTable)
    .innerJoin(groupsTable, eq(groupsTable.id, membersTable.groupId))
    .where(eq(membersTable.userId, user.id));

  return groups;
});
