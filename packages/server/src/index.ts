import { Elysia } from "elysia";
import { auth } from "./routes/auth";

const app = new Elysia().get("/", () => "Hello Elysia")
  .get("/hello", () => "Hello hello")
  .use(auth)
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
