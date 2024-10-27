import { action } from "./action";

export default function NewGroupPage() {
  return (
    <form
      action={action}
      className="flex flex-1 flex-col items-center justify-center gap-2"
    >
      <input type="text" name="name" placeholder="Nome" />
      <input type="text" name="description" placeholder="Descrição" />

      <button type="submit">Salvar</button>
    </form>
  );
}
