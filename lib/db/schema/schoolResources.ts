import { sql } from "drizzle-orm";
import { text, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { schools } from "./schools";
import { z } from "zod";

import { nanoid } from "../../utils";

export const schoolResources = pgTable("schoolResources", {
  // Omitted
  resourceId: varchar("resourceId", { length: 191 })
    .primaryKey()
    .$default(() => nanoid()),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

  resourceType: text("resourceType", {
    enum: [
      "fact_sheet",
      "aeries_portal",
      "anon_reporting",
      "feedback",
      "trusd_apps",
    ],
  }).notNull(),
  resourceName: text("resourceName").notNull(),
  url: text("url").notNull(),

  // References schools bt school ID
  schoolId: varchar("schoolId", { length: 191 }).references(
    () => schools.schoolId,
    {
      onDelete: "cascade",
    }
  ),
});

export const insertSchoolResourceSchema = createSelectSchema(schoolResources)
  .extend({})
  .omit({
    resourceId: true,
    createdAt: true,
    updatedAt: true,
  });

export type NewSchoolResourceParams = z.infer<
  typeof insertSchoolResourceSchema
>;
