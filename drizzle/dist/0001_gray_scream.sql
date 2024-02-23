ALTER TABLE "metal_atoms" RENAME COLUMN "id_name" TO "element_code";--> statement-breakpoint
ALTER TABLE "metal_atoms" DROP CONSTRAINT "metal_atoms_id_name_unique";--> statement-breakpoint
ALTER TABLE "metal_atoms" ADD CONSTRAINT "metal_atoms_element_code_unique" UNIQUE("element_code");