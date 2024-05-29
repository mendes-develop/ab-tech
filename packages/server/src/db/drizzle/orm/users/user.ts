import { db } from "../../dbConnection";
import { users } from "../../schema";

export function createUser(name: string, email: string) {
  return db.insert(users).values({ name: 'Alex', email: '<EMAIL>' });
}

