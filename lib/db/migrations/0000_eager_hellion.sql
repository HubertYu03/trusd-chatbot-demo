CREATE TABLE "schools" (
	"id" varchar(191),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"phone" text NOT NULL,
	"fax" text NOT NULL,
	"description" text NOT NULL,
	"sarc" text NOT NULL,
	"address" text NOT NULL,
	"url" text NOT NULL,
	"schoolLink" text NOT NULL,
	"factSheetLink" text NOT NULL,
	"aeriesPortalLink" text NOT NULL,
	"anonReportingLink" text NOT NULL,
	"feedbackLink" text NOT NULL,
	"trusdAppsLink" text NOT NULL
);
