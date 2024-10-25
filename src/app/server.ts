"use server";

import { createSession } from "@/app/lib/session";
import { db } from "@/db";
import {
  insertUserSchema,
  selectUserSchema,
  usersTable,
} from "@/db/schema/users";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function signup(
  _state: { errors: unknown; success: boolean },
  formData: FormData,
) {
  const validationResult = insertUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { name, email, password } = validationResult.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await db
    .insert(usersTable)
    .values({ name, email, password: hashedPassword })
    .returning({ id: usersTable.id });

  const user = data[0];

  await createSession(user.id);

  redirect("/dashboard");
}

export async function login(
  _state: { errors: unknown; success: boolean },
  formData: FormData,
) {
  const validationResult = selectUserSchema
    .pick({ email: true, password: true })
    .safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { email, password } = validationResult.data;

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
    columns: {
      id: true,
      email: true,
      password: true,
    },
  });

  if (!user) {
    return { success: false, errors: { email: "Email ou senha inválidos" } };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { success: false, errors: { email: "Email ou senha inválidos" } };
  }

  await createSession(user.id);

  redirect("/dashboard");
}
