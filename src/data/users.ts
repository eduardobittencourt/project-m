"use server";

import { db } from "@/db";
import { usersTable } from "@/db/schema/users";
import { readSession } from "@/lib/session";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getUser = cache(async () => {
  const session = await readSession();

  if (!session) return null;

  const data = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(usersTable)
    .where(eq(usersTable.id, session.userId));

  const user = data[0];

  return user;
});

export const isAuthenticated = cache(async () => {
  const session = await readSession();

  return !!session;
});
