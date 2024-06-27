import { Elysia } from "elysia";
import { auth } from "./routes/auth.js";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
	.use(swagger())
	.use(cors({ origin: true }))
	.get("/", () => "hello")
	.get("/hi", () => ({
		hello: 123,
	}))
	.use(auth)
	.listen(4001);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,)

export type App = typeof app;
