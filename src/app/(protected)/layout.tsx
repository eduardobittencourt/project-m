import { getGroups, getSelectedGroup } from "@/data/groups";
import Link from "next/link";
import { logoutAction, selectGroupAction, selectDateAction } from "./action";
import { getSelectedDate } from "@/data/date";

type ProtectedLayoutProps = { children: React.ReactNode };

export default async function ProtectedLayout({
  children,
}: Readonly<ProtectedLayoutProps>) {
  const groups = await getGroups();
  const selectedGroup = await getSelectedGroup();
  const selectedDate = await getSelectedDate();

  return (
    <>
      <header className="flex items-center justify-between gap-2 px-4 py-2">
        <form action={selectGroupAction} className="flex items-center gap-2">
          <select name="id" defaultValue={selectedGroup?.id}>
            {groups.map((group) => (
              <option
                key={group.id}
                value={group.id}
                defaultChecked={selectedGroup?.id === group?.id}
              >
                {group.name}
              </option>
            ))}
          </select>

          <button type="submit">Selecionar</button>
        </form>

        <form action={selectDateAction} className="flex items-center gap-2">
          <input
            type="number"
            name="month"
            placeholder="Mês"
            className="max-w-20"
            defaultValue={selectedDate?.month}
          />
          <input
            type="number"
            name="year"
            placeholder="Ano"
            className="max-w-20"
            defaultValue={selectedDate?.year}
          />
          <button type="submit">Filtrar</button>
        </form>

        <form action={logoutAction}>
          <button>Sair</button>
        </form>
      </header>

      <nav className="flex items-center justify-start gap-2 px-4 py-2">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/groups">Grupos</Link>
        <Link href="/categories">Categorias</Link>
        <Link href="/expenses">Gastos</Link>
      </nav>

      {children}
    </>
  );
}
