'use client'
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { generateComment } from "@/lib/faker";

const createMessage = z.object({
  content: z.string().min(3, { message: "Content required" }),
})

type Inputs = z.infer<typeof createMessage>;
const DEV = true;
// send to another function api
export const useCreateMessageHookForm = () => {
  return useForm<Inputs>({
    resolver: zodResolver(createMessage),
    defaultValues: {
      content: "",
    }
  })
}