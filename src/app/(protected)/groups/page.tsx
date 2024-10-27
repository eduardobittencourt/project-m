import { getGroups } from "@/data/groups";

export default async function GroupsPage() {
  const groups = await getGroups();

  return (
    <div>
      <h1>Groups</h1>
      {groups.map((group) => (
        <div key={group.id}>
          <h2>{group.name}</h2>
          <p>{group.description}</p>
        </div>
      ))}
    </div>
  );
}
