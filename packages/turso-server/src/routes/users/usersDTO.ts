import { db } from "../../db/connection";
import { usersTable } from "../../db/schema";

export class UsersDTO {
  constructor() { }

  async createUser(authId: number, email: string) {
    return db.insert(usersTable)
      .values({
        authId,
        email,
      }).returning();
  }

}