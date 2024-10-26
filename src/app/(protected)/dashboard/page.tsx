import { action } from "./action";

export default async function DashboardPage() {
  return (
    <form action={action}>
      <button type="submit">Logout</button>
    </form>
  );
}
