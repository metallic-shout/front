import {
  pgTable,
  serial,
  varchar,
  char,
  index,
  integer,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const metalAtoms = pgTable(
  "metal_atoms",
  {
    id: serial("id").primaryKey().notNull(),
    elementCode: char("element_code", { length: 2 }).unique().notNull(),
    name: varchar("name", { length: 20 }).notNull(),
  },
  (table) => ({
    elementCodeIndex: index("metal_atom_element_code_index").on(
      table.elementCode
    ),
  })
);

export const styleEnum = pgEnum("style", ["double-struck"]);

export const styledMetalAtoms = pgTable(
  "styled_metal_atoms",
  {
    base: integer("id")
      .references(() => metalAtoms.id)
      .notNull(),
    type: styleEnum("type").notNull(),
    body: varchar("body", { length: 40 }).notNull(),
  },
  (table) => ({
    unq: uniqueIndex().on(table.base, table.type),
  })
);

export type MetalAtoms = InferSelectModel<typeof metalAtoms>;
export type NewMetalAtoms = InferInsertModel<typeof metalAtoms>;
export type StyledMetalAtoms = InferSelectModel<typeof styledMetalAtoms>;
export type NewStyledMetalAtoms = InferInsertModel<typeof styledMetalAtoms>;
