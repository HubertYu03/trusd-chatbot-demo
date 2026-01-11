CREATE TABLE "schoolDocuments" (
	"documentId" varchar(191),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resourceId" varchar(191),
	"documentType" text NOT NULL,
	"content" text NOT NULL,
	"schoolId" varchar(191) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schoolPhones" (
	"phoneId" varchar(191),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"phoneType" text NOT NULL,
	"phoneNumber" text NOT NULL,
	"schoolId" varchar(191)
);
--> statement-breakpoint
CREATE TABLE "schoolResources" (
	"schoolId" varchar(191),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"resourceType" text NOT NULL,
	"resourceName" text NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "schoolDocuments" ADD CONSTRAINT "schoolDocuments_resourceId_schoolResources_schoolId_fk" FOREIGN KEY ("resourceId") REFERENCES "public"."schoolResources"("schoolId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schoolDocuments" ADD CONSTRAINT "schoolDocuments_schoolId_schools_schoolId_fk" FOREIGN KEY ("schoolId") REFERENCES "public"."schools"("schoolId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schoolPhones" ADD CONSTRAINT "schoolPhones_schoolId_schools_schoolId_fk" FOREIGN KEY ("schoolId") REFERENCES "public"."schools"("schoolId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schoolResources" ADD CONSTRAINT "schoolResources_schoolId_schools_schoolId_fk" FOREIGN KEY ("schoolId") REFERENCES "public"."schools"("schoolId") ON DELETE cascade ON UPDATE no action;