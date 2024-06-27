import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateMessageHookForm } from "./hookForm";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { createComment } from "@/lib/api/axios";
import { useParams } from "next/navigation";
import { QUERY_KEYS } from "@/lib/api/api";
import { getQueryClient } from "@repo/ui/query-provider";
import { useToast } from "@/components/ui/use-toast";

export const CommentForm = () => {
	const form = useCreateMessageHookForm();

	const params = useParams<{ ["videoId"]: string }>();
	const { toast } = useToast();

	const queryClient = getQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: createComment,
		// onError: handle error
		onSuccess: async () => {
			form.reset();
			const refetchParams = {
				queryKey: [QUERY_KEYS.getVideoCommentsQuery, params.videoId],
			} as const;

			await queryClient.invalidateQueries(refetchParams);
			await queryClient.refetchQueries(refetchParams);

			toast({ title: "Created successfully." });
		},
	});

	return (
		<div className="grid w-full gap-1">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((data) =>
						mutate({
							video_id: params.videoId,
							content: data.content,
						}),
					)}
					className="space-y-4 grid grid-1"
				>
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Comments</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Type your comment here"
										id="message"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-end">
						<Button
							className="w-48"
							type="submit"
							disabled={!form.formState.isValid || isPending}
						>
							Send Comment
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
