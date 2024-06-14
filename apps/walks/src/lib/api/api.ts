import { useQuery } from "@tanstack/react-query"
import { getVideoComment, getVideos } from "./axios"
import { getQueryClient } from "@/provider"

export const QUERY_KEYS = {
  getVideosQuery: "videos",
  getVideoCommentsQuery: "video-comments"
} as const;

const queryClient = getQueryClient()

export const getVideosQuery = () => {
  return queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.getVideosQuery],
    queryFn: getVideos,
  })
}

export const getVideoCommentsQuery = async (videoId: string) => {
  return await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.getVideoCommentsQuery, videoId],
    queryFn: () => getVideoComment(videoId),
  })
}

export const useGetVideosQuery = (userId?: string | null) => {
  return useQuery({
    queryKey: [QUERY_KEYS.getVideosQuery],
    queryFn: getVideos,
    enabled: !!userId,
  })
}

export const useGetVideoCommentsQuery = (videoId: string) => {
  return useQuery({
    queryKey: [
      QUERY_KEYS.getVideoCommentsQuery, videoId],
    queryFn: () => getVideoComment(videoId),
    enabled: !!videoId,
  })
}


