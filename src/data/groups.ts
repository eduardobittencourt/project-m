"use server";

import { getUser } from "@/data/users";
import { db } from "@/db";
import { groupsTable } from "@/db/schema/groups";
import { membersTable } from "@/db/schema/members";
import { readSession, updateSession } from "@/lib/session";
import { and, eq } from "drizzle-orm";
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

export const getGroup = cache(async (id: number) => {
  const user = await getUser();
  if (!user) return null;

  const [group] = await db
    .select({
      id: groupsTable.id,
      name: groupsTable.name,
      description: groupsTable.description,
    })
    .from(membersTable)
    .innerJoin(groupsTable, eq(groupsTable.id, membersTable.groupId))
    .where(and(eq(membersTable.userId, user.id), eq(groupsTable.id, id)));

  return group;
});

export const selectGroup = async (groupId: number) => {
  const user = await getUser();
  if (!user) return null;

  await updateSession({ groupId });
};

export const getSelectedGroup = cache(async () => {
  const session = await readSession();
  if (!session) return null;

  const [group] = await db
    .select({
      id: groupsTable.id,
      name: groupsTable.name,
      description: groupsTable.description,
    })
    .from(membersTable)
    .innerJoin(groupsTable, eq(groupsTable.id, membersTable.groupId))
    .where(
      and(
        eq(membersTable.userId, session.userId),
        eq(groupsTable.id, session.groupId ?? 0),
      ),
    );

  return group;
});
