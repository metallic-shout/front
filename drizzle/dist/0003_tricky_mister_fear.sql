DO $$ BEGIN
 CREATE TYPE "style" AS ENUM('double-struck');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "styled_metal_atoms" (
	"id" integer NOT NULL,
	"type" "style" NOT NULL,
	"body" varchar(40) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "metal_atoms" RENAME COLUMN "full_name" TO "name";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "styled_metal_atoms_id_type_index" ON "styled_metal_atoms" ("id","type");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "styled_metal_atoms" ADD CONSTRAINT "styled_metal_atoms_id_metal_atoms_id_fk" FOREIGN KEY ("id") REFERENCES "metal_atoms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
