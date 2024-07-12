import { eq } from "drizzle-orm";
import { db } from "../../db/connection";
import { authTable, type InsertAuth } from "../../db/schema";
import { UsersDTO } from "../users/usersDTO";

const userDTO = new UsersDTO();

type CreateAuthArgs = Pick<InsertAuth, 'email' | 'password'>;
export class AuthDTO {
  constructor() { }

  private hashPassword(password: string) {
    return Bun.password.hash(password);
  }

  returnToken({ authId, userId, email }: {
    authId: number,
    userId: number,
    email: string,
  }) {
    return {
      authId,
      userId,
      email,
    }
  }

  async createAuth({ email, password }: CreateAuthArgs) {
    const hashPassword = await this.hashPassword(password);
    const [auth] = await db.insert(authTable)
      .values({
        email,
        password: hashPassword,
      }).returning();

    if (!auth) throw new Error("Could not create auth")
    // create a user as well
    const [user] = await userDTO.createUser(auth.id, auth.email);
    // from here I can need the:
    // user id, auth id and user email
    return this.returnToken({
      authId: auth.id,
      userId: user.id,
      email: auth.email,
    });
  }

  async getAuthByEmail(email: string) {
    return db.select().from(authTable)
      .where(eq(authTable.email, email));
  }

  async comparePassword(password: string, hashPassword: string) {
    return Bun.password.verify(password, hashPassword);
  }

}