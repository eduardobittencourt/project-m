"use server";

import { signup } from "@/data/auth";
import { insertUserSchema } from "@/db/schema/users";
import { redirect } from "next/navigation";

export async function action(formData: FormData) {
  const validationResult = insertUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResult.success) return;

  const { name, email, password } = validationResult.data;

  await signup(name, email, password);

  redirect("/dashboard");
}
