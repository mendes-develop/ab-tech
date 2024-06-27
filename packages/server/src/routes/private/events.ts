import { base_app } from "../base";

export const appEvents = base_app.guard(
	{
		async beforeHandle({ set, user }) {
			if (!user) return (set.status = "Unauthorized");
		},
	},
	(app) =>
		app.group("/events", (app) =>
			app.get("/my-events", async ({ user }) => {
				return {
					user,
					resp: "Events List",
				};
			}),
		),
);
