import { getGroup } from "@/data/groups";
import { action } from "./action";

type GroupParams = { params: Promise<{ groupId: string }> };

export default async function EditGroupPage({ params }: Readonly<GroupParams>) {
  const { groupId } = await params;
  const group = await getGroup(Number(groupId));

  return (
    <form
      className="flex flex-1 flex-col items-center justify-center gap-2"
      action={action}
    >
      <input type="hidden" name="id" defaultValue={groupId} />
      <input
        type="text"
        name="name"
        placeholder="Nome"
        defaultValue={group?.name}
      />
      <input
        type="text"
        name="description"
        placeholder="Descrição"
        defaultValue={group?.description ?? ""}
      />

      <button type="submit">Salvar</button>
    </form>
  );
}
