"use client";

import { useActionState } from "react";
import { action } from "./action";

export default function HomePage() {
  const [formState, formAction] = useActionState(action, {
    errors: {},
    success: false,
  });

  return (
    <form action={formAction}>
      <input type="text" name="name" placeholder="Nome" />
      {formState?.errors?.name && <p>{formState.errors.name}</p>}
      <input type="text" name="description" placeholder="Descrição" />
      {formState?.errors?.description && <p>{formState.errors.description}</p>}

      <button type="submit">Signup</button>
    </form>
  );
}
