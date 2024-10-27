"use client";

import { useActionState } from "react";
import { action } from "./action";

export default function NewGroupPage() {
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
      <input type="text" name="description" placeholder="Descrição" />
      {formState?.errors?.description && <p>{formState.errors.description}</p>}

      <button type="submit">Salvar</button>
    </form>
  );
}
