import { Elysia, t } from "elysia";
import { createUser, getUser } from "../db/drizzle/orm/users/user";
import { supabaseClient } from "../db/supabase/spabaseClient";

export const auth = new Elysia({ prefix: "/auth" })
  .get("/", () => "Hello Elysia")
  .guard({
    body: t.Object({
      password: t.String(),
      name: t.String(),
      email: t.String(),
    })
  }, (app) => app.post("/signup", async (req) => {

    const { data, error } = await supabaseClient.auth.signUp({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) throw new Error("/signup: " + error?.message);
    if (!data.user?.id) throw new Error("no user id");

    const [user] = await createUser(req.body.name, req.body?.email, data.user?.id);
    if (!user) throw new Error("Error creating user");

    return {
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    };
  })
    .post("/login", async (req) => {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: req.body.email,
        password: req.body.password,
      });
      if (error) throw new Error("/login:" + error.message);

      const [user] = await getUser(data.user.id);
      if (!user) throw new Error("Error getting user");

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    }))
