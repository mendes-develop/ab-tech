import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = Bun.env.DB_CONNECTION;

if (!connectionString) {
	throw new Error("Database URL is missing.");
}

// Disable prefetch as it is not supported for "Transaction" pool mode
export const connection = postgres(connectionString, { prepare: false });
export const db = drizzle(connection, { schema }); //{ schema });
