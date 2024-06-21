// import { auth } from '@/src/routes/auth';
// import { jwtMiddleware, refreshMiddleware } from "@/src/plugins/jtw";
// import Elysia, { Cookie, t } from "elysia";
import { Cookie, Elysia, t } from "elysia";
// import { supabaseClient } from "../db/supabase/supabaseClient";
// import Elysia from "elysia";
import { jwtMiddleware, refreshMiddleware } from "../plugins/jtw.js";

const storeCookie = <T>(cookie: Cookie<T>, JTW_TOKEN: string) => {
  cookie.set({
    value: JTW_TOKEN,
    path: "/",
    httpOnly: true,
    // expires: !exp ? undefined : new Date(Date.now() + time_exp[exp]),
  })
}


export const base_app = new Elysia()
  .use(jwtMiddleware)
  .use(refreshMiddleware)
  .derive({ as: 'global' }, async ({ set, jwt, jtwRefresh, headers, cookie: { access, refresh } }) => {
    console.log("derived")

    if (!access?.value || !refresh?.value) return ({ user: null })

    const accessPayload = await jwt.verify(access.value)
    const refreshPayload = await jtwRefresh.verify(refresh.value)

    console.log({
      accessPayload,
      refreshPayload,
    })

    if (accessPayload) {
      console.log("access valid")
      return ({ user: accessPayload })
    }

    if (refreshPayload && refreshPayload.auth_id && refreshPayload.user_id) {
      console.log("refreshing")
      const access_token = await jwt.sign({
        auth_id: refreshPayload.auth_id,
        user_id: refreshPayload.user_id,
      })

      const refresh_token = await jtwRefresh.sign({
        auth_id: refreshPayload.auth_id,
        user_id: refreshPayload.user_id,
      })

      storeCookie(access, access_token);
      storeCookie(refresh, refresh_token)
      set.headers['Authorization'] = access_token

      return ({ user: access_token })
    }

    access.remove()
    refresh.remove()

    return ({ user: null })
  })
  .guard({
    cookie: t.Cookie({
      "access": t.String(),
      "refresh": t.String()
    })
  })