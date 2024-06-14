'use client'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { usePopoverState } from "./hooks"
import { Button } from "@/components/ui/button"
import { UserInput, useCreateUserHookForm } from "./hookForm"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { createCookie } from "@/cookies/cookies"
import { useGetVideosQuery } from "@/lib/api/api"

export function SignIn({ children }: { children: React.ReactNode }) {
  const {
    isPopoverOpen,
    closePopover,
    openPopover,
  } = usePopoverState()

  const form = useCreateUserHookForm()

  const { refetch } = useGetVideosQuery()

  const handleSubmit = async (data: UserInput) => {
    await createCookie(data)
    closePopover()
    refetch()
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={(open) => !open && closePopover()}>
      <PopoverTrigger asChild onClick={openPopover}>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Sign in</h4>
            <p className="text-sm text-muted-foreground">
              Please use your first and last name.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2 grid grid-1">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        className="col-span-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} className="col-span-6" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant={"outline"}
                disabled={!form.formState.isValid}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  )
}