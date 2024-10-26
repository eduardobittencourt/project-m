import { deleteSession } from "@/auth/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  async function logout() {
    "use server";

    await deleteSession();

    redirect("/");
  }

  return (
    <form action={logout}>
      <button type="submit">Logout</button>
    </form>
  );
}
