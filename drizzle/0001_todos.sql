CREATE TYPE "public"."todo_status" AS ENUM('pending', 'in_progress', 'completed');--> statement-breakpoint
CREATE TABLE "todos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"assignedTo" integer,
	"pending" "todo_status" DEFAULT 'pending' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"completedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "todos" ADD CONSTRAINT "todos_assignedTo_users_id_fk" FOREIGN KEY ("assignedTo") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;