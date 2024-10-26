"use server";

import { createSession, deleteSession, readSession } from "@/auth/session";
import { db } from "@/db";
import { User, usersTable } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { cache } from "react";
import { encrypt, match } from "./crypto";

export async function signup(
  name: User["name"],
  email: User["email"],
  password: User["password"],
) {
  const hashedPassword = await encrypt(password);

  const data = await db
    .insert(usersTable)
    .values({ name, email, password: hashedPassword })
    .returning({ id: usersTable.id });

  const user = data[0];

  await createSession(user.id);
}

export async function login(email: User["email"], password: User["password"]) {
  const data = await db
    .select({
      id: usersTable.id,
      password: usersTable.password,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!data.length) {
    throw new Error("Usuário não encontrado");
  }

  const user = data[0];

  const passwordMatch = await match(password, user.password);

  if (!passwordMatch) {
    throw new Error("Senha inválida");
  }

  await createSession(user.id);
}

export async function logout() {
  await deleteSession();
}

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
