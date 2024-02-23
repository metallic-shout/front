CREATE TABLE IF NOT EXISTS "metal_atoms" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_name" char(2) NOT NULL,
	"full_name" varchar(20) NOT NULL,
	CONSTRAINT "metal_atoms_id_name_unique" UNIQUE("id_name")
);
