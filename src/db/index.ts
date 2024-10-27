import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as groups from "@/db/schema/groups";
import * as members from "@/db/schema/members";
import * as users from "@/db/schema/users";

export const db = drizzle({
  client: sql,
  schema: {
    ...groups,
    ...members,
    ...users,
  },
});
