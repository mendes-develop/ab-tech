import { client } from "./axios"

const userSignUp = async (email: string, password: string) => {
  return await client.auth.signup.post({
    email,
    password,
  })
}

const userSignIn = async (email: string, password: string) => {
  return await client.auth.login.post({
    email,
    password,
  })
}