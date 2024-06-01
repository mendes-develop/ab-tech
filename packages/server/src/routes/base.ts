import { jwtMiddleware } from "@/src/plugins/jtw";
import Elysia, { t } from "elysia";
import { supabaseClient } from "../db/supabase/spabaseClient";

export const base_app = new Elysia()
  .use(jwtMiddleware)
  .derive({ as: 'global' }, async ({ jwt, cookie: { access } }) => {
    console.log({ access: access.value })
    const { data, error } = await supabaseClient.auth.getUser(access.value);

    console.log(data.user, access.value)

    return ({ user: data?.user?.email })
  })
  .guard({
    cookie: t.Cookie({
      "access": t.String(),
      "refresh": t.String()
    })
  })