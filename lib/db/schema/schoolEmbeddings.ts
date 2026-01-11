import { index, pgTable, text, varchar, vector } from "drizzle-orm/pg-core";
import { schoolDocuments } from "./schoolDocuments";
import { nanoid } from "../../utils";
import { sql } from "drizzle-orm";

export const schoolEmbeddings = pgTable(
  "schoolEmbeddings",
  {
    embeddingId: varchar("embeddingId", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),

    // References the document that it was embedded from
    documentId: varchar("documentId", { length: 191 }).references(
      () => schoolDocuments.documentId,
      { onDelete: "cascade" }
    ),

    content: text("content").notNull(),
    embedding: vector("embedding", { dimensions: 1536 }).notNull(),
  },
  (table) => [
    index("embeddingIndex").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops")
    ),
  ]
);
