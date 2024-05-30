import { Elysia, t } from "elysia";
import { createUser, getUser } from "../db/drizzle/orm/users/user";
import { supabaseClient } from "../db/supabase/spabaseClient";

export const auth = new Elysia({ prefix: "/auth" })
  .get("/", () => "Hello Elysia")
  .guard({
    cookies: {
      "auth_id": t.String(),
    },
    body: t.Object({
      password: t.String(),
      name: t.String(),
      email: t.String(),
    })
  }, (app) => app.post("/signup", async ({ body, cookie: { auth_id } }) => {

    const { data, error } = await supabaseClient.auth.signUp({
      email: body.email,
      password: body.password,
    });

    if (error) throw new Error("/signup: " + error?.message);
    if (!data.user?.id) throw new Error("no user id");

    const [user] = await createUser(body.name, body?.email, data.user?.id);
    if (!user) throw new Error("Error creating user");

    auth_id.value = data.user.id;
    console.log(auth_id.value);

    return {
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
        cookie: auth_id.value,
      },
    };
  })
    .post("/login", async ({ body, cookie: { auth_id } }) => {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: body.email,
        password: body.password,
      });
      if (error) throw new Error("/login:" + error.message);


      const [user] = await getUser(data.user.id);
      if (!user) throw new Error("Error getting user");

      auth_id.value = data.user.id;
      console.log(auth_id.value);

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          cookie: auth_id.value,
        },
      };
    }))
