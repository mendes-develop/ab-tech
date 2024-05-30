ALTER TABLE "users" ADD COLUMN "user_id" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_user_id_unique" UNIQUE("user_id");