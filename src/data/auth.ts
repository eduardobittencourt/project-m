import { db } from "@/db";
import { User, usersTable } from "@/db/schema/users";
import { encrypt, match } from "@/lib/crypto";
import { createSession, deleteSession } from "@/lib/session";
import { eq } from "drizzle-orm";

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
