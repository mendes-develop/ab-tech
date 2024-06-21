'use client';
import { useSignUp } from "../../api";
import { Button } from "../../../@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../@/components/ui/form";
import { Input } from "../../../@/components/ui/input";
import { useCreateUserHookForm } from "./hookForm";
import { ReloadIcon } from "@radix-ui/react-icons"

export function SignUpPage() {
  // from from react-hook-form and zod
  const { mutate, isPending } = useSignUp()
  const form = useCreateUserHookForm()

  const handleSubmit = (data: {
    email: string;
    password: string;
  }) => {
    console.log("handle", data)
    mutate(data)
  }

  return (
    <div className={"flex flex-col gap-4 rounded-sm p-40 w-96 border"}>
      <h1 className="text-3xl font-bold">Sign Up Ui </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(data => handleSubmit(data))}
          className="space-y-4 grid grid-1">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={isPending} type="email" placeholder="john@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input disabled={isPending} type="password" placeholder="****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              className="w-full"
              type="submit"
              disabled={!form.formState.isValid || isPending}
            >
              {isPending ?

                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />

                : 'Sign Up'}

            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}