import { sql } from "drizzle-orm";
import { text, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { schools } from "./schools";
import { z } from "zod";

import { nanoid } from "../../utils";

export const schoolPhones = pgTable("schoolPhones", {
  // Omitted
  phoneId: varchar("phoneId", { length: 191 })
    .primaryKey()
    .$default(() => nanoid()),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

  phoneType: text("phoneType", { enum: ["K-6", "7-12", "General"] }).notNull(),
  phoneNumber: text("phoneNumber").notNull(),

  // References schools bt school ID
  schoolId: varchar("schoolId", { length: 191 }).references(
    () => schools.schoolId,
    {
      onDelete: "cascade",
    }
  ),
});

export const insertSchoolPhoneSchema = createSelectSchema(schoolPhones)
  .extend({})
  .omit({
    phoneId: true,
    createdAt: true,
    updatedAt: true,
  });

export type NewSchoolResourceParams = z.infer<typeof insertSchoolPhoneSchema>;
