import { pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const schoolResource = pgTable("schoolResource", {
	id: varchar({ length: 191 }),
	content: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	schoolName: text().notNull(),
});
