import Link from "next/link";

type PublicLayoutProps = { children: React.ReactNode };

export default async function PublicLayout({
  children,
}: Readonly<PublicLayoutProps>) {
  return (
    <>
      <header className="flex items-center justify-end gap-2 px-4 py-2">
        <Link href="/login">Login</Link>
        <Link href="/signup">Criar conta</Link>
      </header>

      {children}
    </>
  );
}
