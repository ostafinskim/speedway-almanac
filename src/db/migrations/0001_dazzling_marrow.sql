CREATE TABLE "club" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"logo" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rider" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"photo" text,
	"current_club_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rider_clubs" (
	"id" text PRIMARY KEY NOT NULL,
	"rider_id" text NOT NULL,
	"club_id" text NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "rider" ADD CONSTRAINT "rider_current_club_id_club_id_fk" FOREIGN KEY ("current_club_id") REFERENCES "public"."club"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rider_clubs" ADD CONSTRAINT "rider_clubs_rider_id_rider_id_fk" FOREIGN KEY ("rider_id") REFERENCES "public"."rider"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rider_clubs" ADD CONSTRAINT "rider_clubs_club_id_club_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."club"("id") ON DELETE cascade ON UPDATE no action;