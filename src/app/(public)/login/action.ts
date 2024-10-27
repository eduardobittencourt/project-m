"use server";

import { login } from "@/data/auth";
import { selectUserSchema } from "@/db/schema/users";
import { redirect } from "next/navigation";

export async function action(
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

  await login(email, password);

  redirect("/dashboard");
}
