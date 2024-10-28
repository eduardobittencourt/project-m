"use server";

import { selectGroup } from "@/data/groups";

export async function action(formData: FormData) {
  const groupId = Number(formData.get("id"));

  await selectGroup(groupId);
}
