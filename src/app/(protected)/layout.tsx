type ProtectedLayoutProps = { children: React.ReactNode };

export default async function ProtectedLayout({
  children,
}: Readonly<ProtectedLayoutProps>) {
  return children;
}
