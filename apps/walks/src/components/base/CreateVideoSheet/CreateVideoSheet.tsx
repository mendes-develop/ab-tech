'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useCreateVideoHookForm } from "./hookForm"
import { useMutation } from "@tanstack/react-query"
import { createVideo } from "@/lib/api/axios"
import { useSheetState } from "./hooks"
import { QUERY_KEYS } from "@/lib/api/api"
import { getQueryClient } from "@repo/ui/query-provider"
import { toast, useToast } from "@/components/ui/use-toast"

export function CreateVideoSheet() {
  const form = useCreateVideoHookForm()

  const { closeSheet, isSheetOpen } = useSheetState()
  const { toast } = useToast()

  const queryClient = getQueryClient()
  const { mutate, } = useMutation({
    mutationFn: createVideo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getVideosQuery] })
      await queryClient.refetchQueries({ queryKey: [QUERY_KEYS.getVideosQuery] })

      form.reset()
      closeSheet()

      toast({ title: "Created successfully." })
    }
  })

  return (
    <Sheet
      onOpenChange={() => closeSheet()}
      open={isSheetOpen}>
      <SheetContent side={"top"}>
        <SheetHeader>
          <SheetTitle>Add new video</SheetTitle>
          <SheetDescription>
            Insert video information here.
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-1 gap-4 py-4">

          <Form {...form}>
            <form onSubmit={form.handleSubmit(data => mutate(data))} className="space-y-4 grid grid-1">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} className="col-span-6" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="This is public description" {...field} className="col-span-6" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="video_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://youtu.be/ZvwUzcMvKiI?si=cmG5UC8kSk2wwsbT" {...field} className="col-span-6" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit Video</Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
