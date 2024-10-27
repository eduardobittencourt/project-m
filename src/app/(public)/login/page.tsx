import { action } from "./action";

export default function LoginPage() {
  return (
    <form
      action={action}
      className="flex flex-1 flex-col items-center justify-center gap-2"
    >
      <input type="email" name="email" placeholder="E-mail" />

      <input type="password" name="password" placeholder="Senha" />

      <button type="submit">Login</button>
    </form>
  );
}
