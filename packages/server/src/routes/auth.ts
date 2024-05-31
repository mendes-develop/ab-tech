import { Elysia, t, Cookie } from "elysia";
import { createUser, getUser } from "../db/drizzle/orm/users/user";
import { supabaseClient } from "../db/supabase/spabaseClient";
import { jwtMiddleware } from "../plugins/jtw";

const storeCookie = <T>(cookie: Cookie<T>, JTW_TOKEN: string) => {
  console.log({ cookie })
  cookie.set({
    value: JTW_TOKEN,
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000)
  })
}

export const auth = new Elysia({ prefix: "/auth" })
  .use(jwtMiddleware)
  .get("/", async ({ cookie: { auth_id }, jwt }) => {
    console.log(auth_id.value)
    console.log(auth_id.expires)
    console.log(auth_id.path)

    const verifyResult = await jwt.verify(auth_id.value)

    console.log({ verifyResult })

    return {
      cookie: verifyResult,
      resp: "Hello Elysia"
    }
  })
  .guard({
    cookies: {
      "auth_id": t.String(),
    },
    body: t.Object({
      password: t.String(),
      email: t.String(),
    })
  }, (app) => app.post("/signup", async ({ jwt, body, cookie: { auth_id } }) => {

    const { data, error } = await supabaseClient.auth.signUp({
      email: body.email,
      password: body.password,
    });

    if (error) throw new Error("/signup: " + error?.message);
    if (!data.user?.id) throw new Error("no user id");

    const [user] = await createUser(body?.email, body?.email, data.user?.id);
    if (!user) throw new Error("Error creating user");

    const JTW_TOKEN = await jwt.sign({ auth_id: data.user.id })
    console.log({ JTW_TOKEN })

    storeCookie(auth_id, JTW_TOKEN);

    return {
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
        cookie: auth_id.value,
      },
    };
  })
    .post("/login", async ({ jwt, body, cookie: { auth_id } }) => {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: body.email,
        password: body.password,
      });
      if (error) throw new Error("/login:" + error.message);

      const [user] = await getUser(data.user.id);
      if (!user) throw new Error("Error getting user");

      const JTW_TOKEN = await jwt.sign({ auth_id: data.user.id })
      // auth_id.value = data.user.id;
      console.log({ JTW_TOKEN })
      storeCookie(auth_id, JTW_TOKEN);

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          cookie: auth_id.value,
        },
      };
    }))
