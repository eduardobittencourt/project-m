"use server";

import { login } from "@/data/auth";
import { selectUserSchema } from "@/db/schema/users";
import { redirect } from "next/navigation";

export async function action(formData: FormData) {
  const validationResult = selectUserSchema
    .pick({ email: true, password: true })
    .safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

  if (!validationResult.success) return;

  const { email, password } = validationResult.data;

  await login(email, password);

  redirect("/dashboard");
}
