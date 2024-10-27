import { pgTable } from "@/db/schema";
import { relations } from "drizzle-orm";
import { integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { usersTable } from "@/db/schema/users";
import { groupsTable } from "@/db/schema/groups";

export const membersTable = pgTable("members", {
  groupId: integer().notNull(),
  userId: integer().notNull(),
});

export const membersRelations = relations(membersTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [membersTable.userId],
    references: [usersTable.id],
  }),
  group: one(groupsTable, {
    fields: [membersTable.groupId],
    references: [groupsTable.id],
  }),
}));

export const insertMemberSchema = createInsertSchema(membersTable);
export const selectMemberSchema = createSelectSchema(membersTable);

export type NewMember = typeof membersTable.$inferInsert;
export type Member = typeof membersTable.$inferSelect;
