import type * as Schema from "./schema";
import type {
  PgTable,
  PgSelectBase,
  SubqueryWithSelection,
} from "drizzle-orm/pg-core";

type InferQueryBase<T> = T extends PgTable<infer U>
  ? PgSelectBase<U["name"], U["columns"], "single">
  : never;
type InferQuery<T> = T extends PgTable<infer U>
  ? SubqueryWithSelection<U["columns"], "sq">
  : never;

// export type MetalAtomsSubQuery = InferQuery<typeof Schema.metalAtoms> | SQL;
export type MetalAtomsSubQueryBase = InferQueryBase<typeof Schema.metalAtoms>;
export type MetalAtomsSubQuery = InferQuery<typeof Schema.metalAtoms>;
