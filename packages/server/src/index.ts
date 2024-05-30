import { auth } from '@/src/routes/auth';
import { Elysia } from "elysia";
import swagger from '@elysiajs/swagger';

const app = new Elysia()
  .use(swagger())
  .get("/", ({ cookie: { auth_id } }) => {
    console.log(auth_id.value)

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
