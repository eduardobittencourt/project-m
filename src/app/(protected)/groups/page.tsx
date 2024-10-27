import { getGroups } from "@/data/groups";
import Link from "next/link";

export default async function GroupsPage() {
  const groups = await getGroups();

  return (
    <main className="flex flex-1 flex-col items-center justify-center">
      {groups.map((group) => (
        <Link key={group.id} href={`/groups/${group.id}`}>
          {group.name}
        </Link>
      ))}
    </main>
  );
}
