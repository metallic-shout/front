import "dotenv/config";
import type { Config } from "drizzle-kit";
export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/dist",
  driver: "pg",
  dbCredentials: {
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME as string,
  },
} satisfies Config;
