"use server";

import { signup } from "@/auth";
import { insertUserSchema } from "@/db/schema/users";
import { redirect } from "next/navigation";

export async function action(
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

  await signup(name, email, password);

  redirect("/dashboard");
}
