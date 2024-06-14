'use client'
import { CommentForm } from "./CommentForm"
import { CommentsList } from "./CommentTileList/CommentTileList"

export const CommentSection = () => {
  return (
    <div className='w-full flex-1 p-4 overflow-y-scroll flex flex-col gap-4'>
      <CommentForm />
      <CommentsList />
    </div>
  )
}