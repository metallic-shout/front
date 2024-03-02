import { config } from "dotenv";
import * as schema from "./schema";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import type { Sql } from "postgres";

class DBConnection {
  public db!:
    | PostgresJsDatabase<typeof schema>
    | VercelPgDatabase<typeof schema>;
  private connection!: Sql;
  async useNormal() {
    if (process.env.NODE_ENV === "production") {
      const loader = Promise.all([
        import("drizzle-orm/vercel-postgres"),
        import("@vercel/postgres"),
      ]);
      const [{ drizzle }, { sql }] = await loader;
      this.db = drizzle(sql);
      return;
    }
    config({ path: "./.env.dev" });
    const loader = Promise.all([
      import("drizzle-orm/postgres-js"),
      import("postgres"),
    ]);
    const [{ drizzle }, { default: postgres }] = await loader;
    const client = postgres(
      "postgres://metallic_user:pass@0.0.0.0:5432/metallic_db"
    );
    this.db = drizzle(client, { schema });
    this.connection = client;
  }
  async useMigrate() {
    if (process.env.NODE_ENV === "production") {
      config({ path: "./.env.local" });
      const loader = Promise.all([
        import("drizzle-orm/vercel-postgres"),
        import("@vercel/postgres"),
      ]);
      const [{ drizzle }, { sql }] = await loader;
      this.db = drizzle(sql);
      this.connection = { end: () => {} } as Sql;
      return;
    }
    config({ path: "./.env.dev" });
    const loader = Promise.all([
      import("drizzle-orm/postgres-js"),
      import("postgres"),
    ]);
    const [{ drizzle }, { default: postgres }] = await loader;
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
