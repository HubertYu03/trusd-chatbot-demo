import { sql } from "drizzle-orm";
import { text, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { schools } from "./schools";
import { string, z } from "zod";

import { nanoid } from "../../utils";
import { schoolResources } from "./schoolResources";

export const schoolDocuments = pgTable("schoolDocuments", {
  // Omitted
  documentId: varchar("documentId", { length: 191 })
    .primaryKey()
    .$default(() => nanoid()),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

  // Reference the resource id if needed
  resourceId: varchar("resourceId", { length: 191 }).references(
    () => schoolResources.resourceId,
    { onDelete: "cascade" }
  ),

  documentType: text("documentType").notNull(),
  content: text("content").notNull(),

  // References schools bt school ID
  schoolId: varchar("schoolId", { length: 191 })
    .references(() => schools.schoolId, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const insertSchoolDocumentSchema = createSelectSchema(schoolDocuments)
  .omit({
    documentId: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    resourceId: string().optional(),
  });

export type NewSchoolResourceParams = z.infer<
  typeof insertSchoolDocumentSchema
>;
