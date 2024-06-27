import { eq } from "drizzle-orm";
import { db } from "../../dbConnection.js";
import { users } from "../../schema.js";

export function createUser(name: string, email: string, user_id: string) {
	return db.insert(users).values({ name, email, user_id }).returning();
}

export function getUser(user_id: string) {
	return db.select().from(users).where(eq(users.user_id, user_id));
}
