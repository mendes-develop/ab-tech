import { auth } from "@/src/routes/auth";
import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import { appEvents } from "./routes/private/events";

const app = new Elysia()
	.use(swagger())
	.get("/", () => {
		return {
			resp: "Hello Elysia",
		};
	})
	.use(auth)
	.use(appEvents)
	.listen(4002);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
