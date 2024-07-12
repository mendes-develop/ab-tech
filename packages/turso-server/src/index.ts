import Elysia from "elysia";
import { authRoute } from "./routes/auth/route";

const PORT = Bun.env.PORT || 2000;

new Elysia()
  .use(authRoute)
  .listen(PORT);

console.log(`🦊 Server is running on port ${PORT}`);