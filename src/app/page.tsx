import Link from "next/link";

export default async function HomePage() {
  return (
    <>
      <Link href="/signup">Signup</Link>
      <Link href="/login">Login</Link>
    </>
  );
}
