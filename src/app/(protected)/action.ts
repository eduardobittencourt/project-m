"use server";

import { logout } from "@/data/auth";
import { selectDate } from "@/data/date";
import { selectGroup } from "@/data/groups";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await logout();

  redirect("/");
}

export async function selectGroupAction(formData: FormData) {
  const groupId = Number(formData.get("id"));

  await selectGroup(groupId);
}

export async function selectDateAction(formData: FormData) {
  const month = Number(formData.get("month")) - 1;
  const year = Number(formData.get("year"));

  const date = new Date(year, month, 1);

  await selectDate(date);
}
