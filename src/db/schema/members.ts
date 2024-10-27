import { pgTable } from "@/db/schema";
import { integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const membersTable = pgTable("members", {
  groupId: integer().notNull(),
  userId: integer().notNull(),
});

export const insertMemberSchema = createInsertSchema(membersTable);
export const selectMemberSchema = createSelectSchema(membersTable);

export type NewMember = typeof membersTable.$inferInsert;
export type Member = typeof membersTable.$inferSelect;
