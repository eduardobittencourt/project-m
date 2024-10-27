import { getUser } from "@/data/users";
import { action } from "./action";
import Link from "next/link";

type ProtectedLayoutProps = { children: React.ReactNode };

export default async function ProtectedLayout({
  children,
}: Readonly<ProtectedLayoutProps>) {
  const user = await getUser();

  return (
    <>
      <header className="flex items-center justify-between gap-2 px-4 py-2">
        <span>{user?.name}</span>

        <form action={action}>
          <button>Sair</button>
        </form>
      </header>

      <nav className="flex items-center justify-start gap-2 px-4 py-2">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/groups">Grupos</Link>
      </nav>

      {children}
    </>
  );
}
