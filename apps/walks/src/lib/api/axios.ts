import axios from "axios"
import { randomNameSlug } from "../faker"
import { getCookieUserId } from "@/cookies/cookies"
import { App } from "@repo/api/server"
import { treaty } from "@elysiajs/eden";

type CreateVideoInput = {
  title: string
  description: string
  video_url: string
}

type CreateCommentInput = {
  video_id: string
  content: string
}

export const client = treaty<App>("localhost:3000")

const axiosInstance = axios.create({
  baseURL: "https://take-home-assessment-423502.uc.r.appspot.com/api",
})

const userSignUp = async (email: string, password: string) => {
  return await client.auth.signup.post({
    email,
    password,
  })
}

export const getVideos = async () => {
  const user_id = await getCookieUserId()
  if (!user_id?.value) return null

  return axiosInstance.get(`/videos?user_id=${user_id?.value}`)
}
export const getVideoComment = async (videoId: string) => {
  return await axiosInstance.get(`/videos/comments?video_id=${videoId}`)
}

export const createVideo = async (data: CreateVideoInput) => {
  const user_id = await getCookieUserId()
  axiosInstance.post(
    `/videos`,
    { ...data, user_id: user_id?.value },
  )
}

export const createComment = async (data: CreateCommentInput) => {
  const user_id = randomNameSlug()
  axiosInstance.post(
    `/videos/comments`,
    { ...data, user_id },
  )
}