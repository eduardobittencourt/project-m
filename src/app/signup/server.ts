"use server";

import { db } from "@/db";
import { insertUserSchema, usersTable } from "@/db/schema/users";
import * as bcrypt from "bcrypt";
import { createSession } from "../lib/session";

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

  return { success: true, errors: {} };
}
