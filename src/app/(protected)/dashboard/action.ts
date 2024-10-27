"use server";

import { logout } from "@/data/auth";
import { redirect } from "next/navigation";

export async function action() {
  await logout();

  redirect("/");
}
