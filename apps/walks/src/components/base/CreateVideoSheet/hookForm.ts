"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createVideoSchema = z.object({
	title: z.string().min(3, { message: "Title required" }),
	description: z.string().min(3, { message: "Description is required" }),
	video_url: z.string().url({ message: "Url is required" }),
});

type Inputs = z.infer<typeof createVideoSchema>;

export const useCreateVideoHookForm = () => {
	return useForm<Inputs>({
		resolver: zodResolver(createVideoSchema),
		defaultValues: {
			title: "",
			description: "",
			video_url: "",
		},
	});
};
