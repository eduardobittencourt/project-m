type PublicLayoutProps = { children: React.ReactNode };

export default async function PublicLayout({
  children,
}: Readonly<PublicLayoutProps>) {
  return children;
}
