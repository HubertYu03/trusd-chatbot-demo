import { sql } from "drizzle-orm";
import { text, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { nanoid } from "../../utils";

export const schools = pgTable("schools", {
  // Omitted
  schoolId: varchar("schoolId", { length: 191 })
    .primaryKey()
    .$default(() => nanoid()),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

  schoolName: text("schoolName").notNull(),
  schoolType: text("schoolType").notNull(),
  address: text("address").notNull(),
  schoolLink: text("schoolLink").notNull(),
  sarc: text("sarc").notNull(),
});

export const insertSchoolSchema = createSelectSchema(schools).extend({}).omit({
  schoolId: true,
  createdAt: true,
  updatedAt: true,
});

export type NewSchoolParams = z.infer<typeof insertSchoolSchema>;
