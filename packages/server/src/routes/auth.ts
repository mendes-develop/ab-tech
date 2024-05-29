import { Elysia, t } from "elysia";
import { createUser } from "../db/drizzle/orm/users/user";
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

    if (error || !data.user?.id) throw new Error("/signup: " + error ? error?.message : "no data");

    const [user] = await createUser(req.body.name, req.body?.email, data.user?.id);
    console.log("user created", user);
    return {
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    };
  })
    .post("/login", async (req) => {
      console.log("login", req.body);

      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: req.body.email,
        password: req.body.password,
      });

      if (error) throw new Error("/login:" + error.message);

      // find the user in the DB

      // const user = await createUser(req.body?.name, req.body.email as string);
      // get on the user DB 
      console.log("user logged", data);

      return {
        user: {
          name: data.user.id,
          email: data.user.email,
        },
      };
    }))
