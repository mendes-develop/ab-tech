import { Elysia, t, Cookie } from "elysia";
import { base_app } from "./base.js";
import { SwaggerTags } from "../plugins/jtw.js";
import { supabaseClient } from "../db/supabase/supabaseClient.js";
import { createUser, getUser } from "../db/drizzle/orm/users/user.js";
// import { base_app } from "./base";
// import { createUser, getUser } from "../db/drizzle/orm/users/user";
// import { supabaseClient } from "../db/supabase/supabaseClient";
// import { SwaggerTags } from "../plugins/jtw";
// import { base_app } from "./base";

const time_exp = {
	One_Minute: 1000 * 60,
	Five_Minutes: 1000 * 60 * 5,
} as const;

// const One_Minute = 1000 * 60;
// const Five_Minutes = One_Minute * 5;

const storeCookie = <T>(
	cookie: Cookie<T>,
	JTW_TOKEN: string,
	exp?: keyof typeof time_exp,
) => {
	cookie.set({
		value: JTW_TOKEN,
		path: "/",
		httpOnly: true,
		// expires: !exp ? undefined : new Date(Date.now() + time_exp[exp]),
	});
};

export const auth = base_app.group("/auth", (app) =>
	app
		.get(
			"/",
			async ({ user }) => {
				return {
					user,
				};
			},
			{
				detail: SwaggerTags.Auth,
			},
		)
		.post(
			"/signup",
			async ({ jwt, jtwRefresh, set, body, cookie: { access, refresh } }) => {
				const { data, error } = await supabaseClient.auth.signUp({
					email: body.email,
					password: body.password,
				});

				if (error && !data.user) return new Error("/signup: " + error?.message);
				if (!data.user?.id) return new Error("no user id");

				const [user] = await createUser(
					body?.email,
					body?.email,
					data.user?.id,
				);
				if (!user) throw new Error("Error creating user");

				const access_token = await jwt.sign({
					auth_id: data.user.id,
					user_id: user.id,
					exp: Math.floor(Date.now() / 1000),
				});

				const refresh_token = await jtwRefresh.sign({
					auth_id: data.user.id,
					user_id: user.id,
				});

				storeCookie(access, access_token, "One_Minute");
				storeCookie(refresh, refresh_token);
				set.headers["Authorization"] = access_token;

				return { user, access_token, refresh_token };
			},
			{
				detail: SwaggerTags.Auth,
				body: t.Object({
					password: t.String(),
					email: t.String(),
				}),
			},
		)
		.post(
			"/login",
			async ({ set, jtwRefresh, jwt, body, cookie: { access, refresh } }) => {
				const { data, error } = await supabaseClient.auth.signInWithPassword({
					email: body.email,
					password: body.password,
				});

				if (error) throw new Error("/login:" + error.message);

				const [user] = await getUser(data.user.id);
				if (!user) throw new Error("Error getting user");

				const access_token = await jwt.sign({
					auth_id: data.user.id,
					user_id: user.id,
				});

				const refresh_token = await jtwRefresh.sign({
					auth_id: data.user.id,
					user_id: user.id,
				});

				storeCookie(access, access_token, "One_Minute");
				storeCookie(refresh, refresh_token);
				set.headers["Authorization"] = access_token;

				return { user, access_token, refresh_token };
			},
			{
				detail: SwaggerTags.Auth,
				body: t.Object({
					email: t.String(),
					password: t.String(),
				}),
			},
		)
		.post(
			"/refresh-token",
			async ({ jwt, set, cookie: { access, refresh }, user }) => {
				const { data, error } = await supabaseClient.auth.refreshSession({
					refresh_token: refresh.value,
				});

				if (error) return (set.status = "Unauthorized");
				if (!data.session?.access_token) return (set.status = "Unauthorized");
				if (!data.session?.refresh_token) return (set.status = "Unauthorized");

				// create your own token and access token
				const accessToken = data.session?.access_token;
				const refreshToken = data.session?.refresh_token;

				storeCookie(access, accessToken, "One_Minute");
				storeCookie(refresh, data.session.refresh_token);

				return {
					accessToken,
					refreshToken,
				};
			},
			{
				detail: SwaggerTags.Auth,
			},
		)
		.delete(
			"/logout",
			async ({ jwt, set, cookie: { access, refresh } }) => {
				const { error } = await supabaseClient.auth.signOut();
				if (error) return (set.status = "Unauthorized");

				supabaseClient.auth.signOut();
			},
			{
				detail: SwaggerTags.Auth,
			},
		),
);
