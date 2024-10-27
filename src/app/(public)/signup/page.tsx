"use client";

import { useActionState } from "react";
import { action } from "./action";

export default function SignupPage() {
  const [formState, formAction] = useActionState(action, {
    errors: {},
    success: false,
  });

  return (
    <form
      action={formAction}
      className="flex flex-1 flex-col items-center justify-center gap-2"
    >
      <input type="text" name="name" placeholder="Nome" />
      {formState?.errors?.name && <p>{formState.errors.name}</p>}
      <input type="email" name="email" placeholder="E-mail" />
      {formState?.errors?.email && <p>{formState.errors.email}</p>}
      <input type="password" name="password" placeholder="Senha" />
      {formState?.errors?.password && <p>{formState.errors.password}</p>}

      <button type="submit">Criar conta</button>
    </form>
  );
}
