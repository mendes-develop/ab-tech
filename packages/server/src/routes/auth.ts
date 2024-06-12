import { Elysia, t, Cookie } from "elysia";
import { createUser, getUser } from "../db/drizzle/orm/users/user";
import { supabaseClient } from "../db/supabase/spabaseClient";
import { SwaggerTags } from "../plugins/jtw";
import { base_app } from "./base";

const storeCookie = <T>(cookie: Cookie<T>, JTW_TOKEN: string) => {
  cookie.set({
    value: JTW_TOKEN,
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000)
  })
}

export const auth =
  base_app.group("/auth", (app) =>
    app
      .get("/", async ({ user }) => {
        return {
          user,
        }
      }, {
        detail: SwaggerTags.Auth,
      })
      .post("/signup", async ({ jwt, set, body, cookie: { access, refresh } }) => {

        const { data, error } = await supabaseClient.auth.signUp({
          email: body.email,
          password: body.password,
        });

        if (error && !data.user) throw new Error("/signup: " + error?.message);
        if (!data.user?.id) throw new Error("no user id");

        const [user] = await createUser(body?.email, body?.email, data.user?.id);
        if (!user) throw new Error("Error creating user");

        const access_token = await jwt.sign({
          auth_id: data.user.id,
          user_id: user.id,
          exp: Math.floor(Date.now() / 1000),

        })

        const refresh_token = await jwt.sign({
          auth_id: data.user.id,
          user_id: user.id,
        })

        storeCookie(access, access_token);
        storeCookie(refresh, refresh_token);
        set.headers['Authorization'] = access_token

        return { user, access_token, refresh_token }
      }
        , {
          detail: SwaggerTags.Auth,
          body: t.Object({
            password: t.String(),
            email: t.String(),
          })
        })
      .post("/login", async ({ jwt, body, cookie: { access, refresh } }) => {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email: body.email,
          password: body.password,
        });

        if (error) throw new Error("/login:" + error.message);

        const [user] = await getUser(data.user.id);
        if (!user) throw new Error("Error getting user");

        storeCookie(access, data.session.access_token);
        storeCookie(refresh, data.session.refresh_token)

        return {
          user: data,
        };
      }, {
        detail: SwaggerTags.Auth,
        body: t.Object({
          password: t.String(),
          email: t.String(),
        })
      })
      .post('/refresh-token', async ({ jwt, set, cookie: { access, refresh }, user }) => {
        const { data, error } = await supabaseClient.auth.refreshSession({ refresh_token: refresh.value })

        if (error) return set.status = "Unauthorized"
        if (!data.session?.access_token) return set.status = "Unauthorized"
        if (!data.session?.refresh_token) return set.status = "Unauthorized"

        // create your own token and access token
        const accessToken = data.session?.access_token
        const refreshToken = data.session?.refresh_token

        storeCookie(access, accessToken);
        storeCookie(refresh, data.session.refresh_token)

        return {
          accessToken,
          refreshToken,
        }
      },
        {
          detail: SwaggerTags.Auth,
        })
      .delete('/logout', async ({ jwt, set, cookie: { access, refresh } }) => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) return set.status = "Unauthorized"

        supabaseClient.auth.signOut()
      }, {
        detail: SwaggerTags.Auth,
      })
  )
