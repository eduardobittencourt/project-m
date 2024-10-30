import { getGroups } from "@/data/groups";
import Link from "next/link";
import { action } from "./action";

export default async function GroupsPage() {
  const groups = await getGroups();

  return (
    <main className="flex flex-1 items-center justify-center gap-2">
      {groups.map((group) => (
        <div key={group.id}>
          <Link href={`/groups/${group.id}`}>{group.name}</Link>

          <form action={action}>
            <input type="hidden" name="id" defaultValue={group.id} />
            <button type="submit">Selecionar</button>
          </form>
        </div>
      ))}
    </main>
  );
}
