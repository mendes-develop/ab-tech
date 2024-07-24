import swagger from "@elysiajs/swagger";
import { authRoute } from "@repo/turso-server/authRoute";
import Elysia from "elysia";
import { Modal } from "@repo/htmx-ui/ui"

new Elysia()
  .use(swagger())
  .use(authRoute)
  .get("/", ({ jwt_token }) => {

    return Modal();
  })
  .listen(3000)

console.log("Bun is running on port 3000");