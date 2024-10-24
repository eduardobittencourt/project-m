import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: ".env.local" });

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL is missing");
}

export default defineConfig({
  out: "./src/db/drizzle",
  schema: "./src/db/schema/*",
  dialect: "postgresql",
  tablesFilter: ["project_m_*"],
  dbCredentials: {
    url: process.env.POSTGRES_URL,
  },
});
