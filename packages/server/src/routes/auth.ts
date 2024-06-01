import { Elysia, t, Cookie } from "elysia";
import { createUser, getUser } from "../db/drizzle/orm/users/user";
import { supabaseClient } from "../db/supabase/spabaseClient";
import { SwaggerTags, jwtMiddleware } from "../plugins/jtw";
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
      .post("/signup", async ({ jwt, body, cookie: { access, refresh } }) => {

        const { data, error } = await supabaseClient.auth.signUp({
          email: body.email,
          password: body.password,
        });

        if (error) throw new Error("/signup: " + error?.message);
        if (!data.user?.id) throw new Error("no user id");

        const [user] = await createUser(body?.email, body?.email, data.user?.id);
        if (!user) throw new Error("Error creating user");

        // const JTW_TOKEN = await jwt.sign({ auth_id: data.user.id })
        // console.log({ JTW_TOKEN })
        const refreshToken = data.session?.refresh_token!
        const accessToken = data.session?.access_token!

        console.log(data.session?.user)

        storeCookie(access, accessToken);
        storeCookie(refresh, refreshToken);

        return {
          user: data,
        };

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

        // console.log(data.session.access_token)
        const accessToken = data.session.access_token!

        storeCookie(access, accessToken);
        storeCookie(refresh, data.session.refresh_token!)

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
        // console.log({
        //   refresh: refresh.value,
        //   access: access.value,
        // })
        // take the refresh token and make the new token
        const { data, error } = await supabaseClient.auth.refreshSession({ refresh_token: refresh.value })

        if (error) return set.status = "Unauthorized"
        if (!data.session?.access_token) return set.status = "Unauthorized"
        if (!data.session?.refresh_token) return set.status = "Unauthorized"

        const accessToken = data.session?.access_token
        const refreshToken = data.session?.refresh_token

        // console.log(data.session.user)

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
