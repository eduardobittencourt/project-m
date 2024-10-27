import { action } from "./action";

export default function SignupPage() {
  return (
    <form
      action={action}
      className="flex flex-1 flex-col items-center justify-center gap-2"
    >
      <input type="text" name="name" placeholder="Nome" />
      <input type="email" name="email" placeholder="E-mail" />
      <input type="password" name="password" placeholder="Senha" />

      <button type="submit">Criar conta</button>
    </form>
  );
}
