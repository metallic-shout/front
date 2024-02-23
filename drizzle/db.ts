import "dotenv/config";
import * as schema from "./schema";
import type { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import type { Sql } from "postgres";
import type postgres from "postgres";

type Drizzle = typeof drizzle;
type Postgres = typeof postgres;

class DBConnection {
  public db!: PostgresJsDatabase<typeof schema>;
  private connection!: Sql;
  async useNormal() {
    if (process.env.PRODUCTION) {
      console.log("TODO!");
      return;
    }
    const loader = Promise.all([
      import("drizzle-orm/postgres-js"),
      import("postgres"),
    ]);
    const [{ drizzle }, { default: postgres }] = (await loader) as [
      { drizzle: Drizzle },
      { default: Postgres }
    ];
    const client = postgres(
      "postgres://metallic_user:pass@0.0.0.0:5432/metallic_db"
    );
    this.db = drizzle(client, { schema });
    this.connection = client;
  }
  async useMigrate() {
    if (process.env.PRODUCTION) {
      console.log("TODO!");
      return;
    }
    const loader = Promise.all([
      import("drizzle-orm/postgres-js"),
      import("postgres"),
    ]);
    const [{ drizzle }, { default: postgres }] = (await loader) as [
      { drizzle: Drizzle },
      { default: Postgres }
    ];
    const client = postgres(
      "postgres://metallic_user:pass@0.0.0.0:5432/metallic_db",
      { max: 1 }
    );
    this.db = drizzle(client, { schema });
    this.connection = client;
  }
  close() {
    this.connection.end();
  }
}

export const dbConnection = new DBConnection();
