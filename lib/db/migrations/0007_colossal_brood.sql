ALTER TABLE "schoolDocuments" DROP CONSTRAINT "schoolDocuments_resourceId_schoolResources_schoolId_fk";
--> statement-breakpoint
ALTER TABLE "schoolDocuments" ADD PRIMARY KEY ("documentId");--> statement-breakpoint
ALTER TABLE "schoolDocuments" ALTER COLUMN "documentId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "schoolResources" ADD COLUMN "resourceId" varchar(191) PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "schoolDocuments" ADD CONSTRAINT "schoolDocuments_resourceId_schoolResources_resourceId_fk" FOREIGN KEY ("resourceId") REFERENCES "public"."schoolResources"("resourceId") ON DELETE cascade ON UPDATE no action;