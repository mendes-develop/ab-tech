import { varchar } from 'drizzle-orm/pg-core';
import { Elysia } from "elysia";
import { auth } from "./routes/auth";

const app = new Elysia()
  .get("/", ({ cookie: auth_id }) => {

    // @ts-ignore
    // auth_id.value = "1234";

    console.log(auth_id.value);


    return {
      cookie: auth_id.value,
      resp: "Hello Elysia"
    }
  })
  .use(auth)
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
