import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { dbConnection } from "./db";

(async () => {
  await dbConnection.useMigrate();
  await migrate(dbConnection.db, { migrationsFolder: "./drizzle/dist" });
  dbConnection.close();
})();
