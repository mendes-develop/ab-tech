import swagger from "@elysiajs/swagger";
import { authRoute } from "@repo/turso-server/authRoute";
import Elysia from "elysia";

new Elysia()
  .use(swagger())
  .use(authRoute)
  .listen(3000)

console.log("Bun is running on port 3000");