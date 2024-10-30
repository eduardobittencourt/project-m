import { readSession, updateSession } from "@/lib/session";
import { getUser } from "./users";
import { cache } from "react";

export async function selectDate(date: Date) {
  const user = await getUser();
  if (!user) return null;

  await updateSession({ date });
}

export const getSelectedDate = cache(async () => {
  const session = await readSession();
  if (!session) return null;

  const date = session?.date ? new Date(session.date) : new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return { year, month };
});
