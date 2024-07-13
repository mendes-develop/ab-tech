import { Elysia, t } from "elysia";
import { AuthDTO } from "./auth.dto";
import { JWTRefreshToken, JWToken } from "../../plugins/jwt";

const body = t.Object({
  email: t.String(),
  password: t.String(),
})

const authDTO = new AuthDTO();

export const authRoute = new Elysia({ prefix: "/auth" })
  .use(JWTRefreshToken)
  .use(JWToken)
  .get("/sign", async ({ }) => {
    //  const token = await jwt_token.get();
    //  return token;
    // return a form for signin
  })
  .post("/signup", async ({ body, error, jwt_token, refresh_token }) => {
    // get the email, try to find the email
    const [email] = await authDTO.getAuthByEmail(body.email);
    // if it does, return an error
    if (email) return error(422, "Email already exists");
    // if it doesn't exist, create a new user
    const pretoken = await authDTO.createAuth(body);

    const token = await jwt_token.sign(pretoken);
    const refreshToken = await refresh_token.sign(pretoken);

    return {
      token,
      refreshToken,
    };
  }, { body })
  .post("/login", async ({ body, error, jwt_token, refresh_token }) => {
    // get the email, try to find the user
    const [email] = await authDTO.getAuthByEmail(body.email);
    if (!email) return error(422, "Account doesn't exist");
    // see if the password matches
    const isPasswordCorrect = await authDTO.comparePassword(body.password, email.password);
    // if it doesn't exist, return an error
    if (!isPasswordCorrect) return error(422, "Password doesn't match");

    const pretoken = authDTO.returnToken({
      authId: email.id,
      userId: email.userId!, // this should not be null
      email: email.email,
    });

    const token = await jwt_token.sign(pretoken);
    const refreshToken = await refresh_token.sign(pretoken);

    return {
      token,
      refreshToken,
    };
  }, { body });