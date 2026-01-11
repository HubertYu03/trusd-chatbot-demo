ALTER TABLE "schoolPhones" ADD PRIMARY KEY ("phoneId");--> statement-breakpoint
ALTER TABLE "schoolPhones" ALTER COLUMN "phoneId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "schools" ADD PRIMARY KEY ("schoolId");--> statement-breakpoint
ALTER TABLE "schools" ALTER COLUMN "schoolId" SET NOT NULL;