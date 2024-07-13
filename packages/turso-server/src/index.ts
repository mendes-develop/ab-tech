import Elysia from "elysia";
import { createAuthRoute } from "./routes/auth/route";
import { swagger } from "@elysiajs/swagger";
import { rootdb } from "./db/connection";

const PORT = Bun.env.PORT || 2000;

new Elysia()
  .use(swagger())
  .use(createAuthRoute(rootdb))
  .listen(PORT);

console.log(`🦊 Server is running on port ${PORT}`);