CREATE TABLE "schools" (
	"id" varchar(191),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"schoolName" text NOT NULL,
	"schoolType" text NOT NULL,
	"address" text NOT NULL,
	"schoolLink" text NOT NULL,
	"sarc" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "schoolResource" CASCADE;