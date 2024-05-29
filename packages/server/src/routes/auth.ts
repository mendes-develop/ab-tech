import { Elysia } from "elysia";
import { createUser } from "../db/drizzle/orm/users/user";

export const auth = new Elysia({ prefix: "/auth" })
  .get("/", () => "Hello Elysia")
  .post("/login", async (req) => {
    console.log("creating user", req.body);

    const user = await createUser("req.body?.name", "req.body?.email" as string);
    console.log("user created", user);

    return {
      user: {
        name: "Elysia",
        email: "<EMAIL>",
        password: "<PASSWORD>",
      },
    };
  })
  .post("/signup", async (req) => {
    console.log("creating user", req.body);
    // @ts-ignore
    const user = await createUser(req.body?.name, req.body.email as string);
    console.log("user created", user);

    return {
      user: {
        name: "Elysia",
        email: "<EMAIL>",
        password: "<PASSWORD>",
      },
    };
  })