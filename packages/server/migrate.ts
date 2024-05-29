import { migrate } from "drizzle-orm/postgres-js/migrator";
import { connection, db } from "@/src/db/drizzle/dbConnection";
// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: "./src/db/drizzle/migrations" });
// Don't forget to close the connection, otherwise the script will hang
await connection.end();
