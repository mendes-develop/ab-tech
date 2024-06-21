import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createUserId = z.object({
  email: z.string().email().min(3, { message: "First name required" }),
  password: z.string().min(3, { message: "Last name is required" }),
})

export type UserInput = z.infer<typeof createUserId>;

export const useCreateUserHookForm = () => {
  return useForm<UserInput>({
    resolver: zodResolver(createUserId),
    defaultValues: {
      email: "",
      password: "",
    }
  })
}