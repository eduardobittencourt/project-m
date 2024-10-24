import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as users from "@/db/schema/users";

export const db = drizzle({
  client: sql,
  schema: {
    ...users,
  },
});
