ALTER TABLE "projects" ADD COLUMN "plan" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "suscription_item_id" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "images_created" integer DEFAULT 0 NOT NULL;