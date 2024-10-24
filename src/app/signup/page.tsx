"use client";

import { useActionState } from "react";
import { signup } from "./server";

export default function SignUpPage() {
  const [state, action] = useActionState(signup, {
    errors: {},
    success: false,
  });

  return (
    <form action={action}>
      <input type="text" name="name" />
      {state?.errors?.name && <p>{state.errors.name}</p>}
      <input type="email" name="email" />
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <input type="password" name="password" />
      {state?.errors?.password && <p>{state.errors.password}</p>}

      <button type="submit">Signup</button>
    </form>
  );
}
