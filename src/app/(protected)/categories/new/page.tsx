import { getSelectedGroup } from "@/data/groups";
import { action } from "./action";

export default async function NewCategoryPage() {
  const group = await getSelectedGroup();

  return (
    <form
      action={action}
      className="flex flex-1 flex-col items-center justify-center gap-2"
    >
      <input type="hidden" name="groupId" defaultValue={group?.id} />
      <input type="text" name="name" placeholder="Nome" />
      <input type="text" name="description" placeholder="Descrição" />

      <button type="submit">Salvar</button>
    </form>
  );
}
