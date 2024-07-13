import swagger from "@elysiajs/swagger";
import { DBConnection } from "@repo/turso-server/DBConnection";
import { createAuthRoute } from "@repo/turso-server/authRoute";
import Elysia from "elysia";

console.log({
  env: process.env.TURSO_CONNECTION_URL,
  token: process.env.TURSO_AUTH_TOKEN
})

const dbConnection = new DBConnection(
  process.env.TURSO_CONNECTION_URL!,
  process.env.TURSO_AUTH_TOKEN!);

new Elysia()
  .use(swagger())
  .use(createAuthRoute(dbConnection))
  .listen(3000)

console.log("Bun is running on port 3000");