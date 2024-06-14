'use client'
import { useGetVideoCommentsQuery } from "@/lib/api/api"
import { useParams } from 'next/navigation'
import { CommentSectionLoading, CommentTile } from "./CommentTile"

export const CommentsList = () => {
  const params = useParams<{ "videoId": string; }>()
  const { data, isLoading } = useGetVideoCommentsQuery(params["videoId"])
  // hydration warning comes from here
  // https://github.com/TanStack/query/discussions/5357#discussioncomment-8861154

  return (
    isLoading ?
      <CommentSectionLoading /> :
      <>
        {data?.data.comments.map((comment: any) =>
          <CommentTile
            key={comment.id}
            comment={comment.content}
            user_id={comment.user_id}
          />)}
      </>
  )
}