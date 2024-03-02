DO $$ BEGIN
 CREATE TYPE "style" AS ENUM('double-struck');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metal_atoms" (
	"id" serial PRIMARY KEY NOT NULL,
	"element_code" char(2) NOT NULL,
	"name" varchar(20) NOT NULL,
	CONSTRAINT "metal_atoms_element_code_unique" UNIQUE("element_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "styled_metal_atoms" (
	"id" integer NOT NULL,
	"type" "style" NOT NULL,
	"body" varchar(40) NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "metal_atom_element_code_index" ON "metal_atoms" ("element_code");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "styled_metal_atoms_id_type_index" ON "styled_metal_atoms" ("id","type");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "styled_metal_atoms" ADD CONSTRAINT "styled_metal_atoms_id_metal_atoms_id_fk" FOREIGN KEY ("id") REFERENCES "metal_atoms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
