import { PersonIcon } from "@radix-ui/react-icons";
import { getCookieUserId } from "@/cookies/cookies";
import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";

export const Auth = async () => {
	const cookie = await getCookieUserId();

	return (
		<>
			{cookie?.value ? (
				<SignOut>
					<button className="cursor-pointer" role="button" aria-label="Profile">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={`https://api.dicebear.com/8.x/initials/svg?radius=50&seed=${cookie.value}`}
							alt="avatar"
							width={20}
							height={20}
						/>
					</button>
				</SignOut>
			) : (
				<SignIn>
					<button role="button" aria-label="Sign in">
						<PersonIcon className="stroke-primary" height={20} width={20} />
					</button>
				</SignIn>
			)}
		</>
	);
};
