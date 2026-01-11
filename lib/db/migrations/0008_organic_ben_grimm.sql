CREATE TABLE "schoolEmbeddings" (
	"embeddingId" varchar(191) PRIMARY KEY NOT NULL,
	"documentId" varchar(191),
	"content" text NOT NULL,
	"embedding" vector(1536) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "schoolEmbeddings" ADD CONSTRAINT "schoolEmbeddings_documentId_schoolDocuments_documentId_fk" FOREIGN KEY ("documentId") REFERENCES "public"."schoolDocuments"("documentId") ON DELETE cascade ON UPDATE no action;