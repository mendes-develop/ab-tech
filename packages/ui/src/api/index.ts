import { App } from "@ab-labs/api/server";
import { treaty } from "@elysiajs/eden";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../../@/components/ui/use-toast";

const client = treaty<App>("localhost:4001");

export const auth = {
	signup: (body: Parameters<typeof client.auth.login.post>[0]) => {
		return client.auth.signup.post(body);
	},
	login: (body: Parameters<typeof client.auth.login.post>[0]) => {
		return client.auth.login.post(body);
	},
};

export const useSignUp = () => {
	return useMutation({
		mutationFn: auth.signup,
		onSettled(data, error, variables, context) {
			console.log("settle");
			if (data?.status === 200) {
				toast({ title: "Created successfully." });
				window.history.pushState("/", "", "/");
			}

			data?.error && toast({ title: "error" });
		},
	});
};
