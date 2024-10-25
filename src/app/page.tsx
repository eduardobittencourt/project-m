"use client";

import { useActionState } from "react";
import { login, signup } from "./server";

export default function HomePage() {
  const [signUpState, signUpAction] = useActionState(signup, {
    errors: {},
    success: false,
  });

  const [loginState, loginAction] = useActionState(login, {
    errors: {},
    success: false,
  });

  return (
    <>
      <form action={signUpAction}>
        <input type="text" name="name" placeholder="Nome" />
        {signUpState?.errors?.name && <p>{signUpState.errors.name}</p>}
        <input type="email" name="email" placeholder="E-mail" />
        {signUpState?.errors?.email && <p>{signUpState.errors.email}</p>}
        <input type="password" name="password" placeholder="Senha" />
        {signUpState?.errors?.password && <p>{signUpState.errors.password}</p>}

        <button type="submit">Signup</button>
      </form>

      <form action={loginAction}>
        <input type="email" name="email" placeholder="E-mail" />
        {loginState?.errors?.email && <p>{loginState.errors.email}</p>}
        <input type="password" name="password" placeholder="Senha" />
        {loginState?.errors?.password && <p>{loginState.errors.password}</p>}

        <button type="submit">Login</button>
      </form>
    </>
  );
}
