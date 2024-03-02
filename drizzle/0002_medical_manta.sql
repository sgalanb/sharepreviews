DROP INDEX IF EXISTS "unique_idx";--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "pathname" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_pathname_unique" UNIQUE("pathname");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");