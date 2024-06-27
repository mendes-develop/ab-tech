import { CreateVideoSheet } from "@/components/base/CreateVideoSheet/CreateVideoSheet";
import { VideoList } from "@/components/base/VideoListComponent/VideoListComponent";
import { getCookieUserId } from "@/cookies/cookies";

export default async function Home() {
	const userId = await getCookieUserId();

	return (
		<main className="flex  flex-col items-center justify-between">
			<div className="w-full max-w-5xl items-center justify-between  text-sm  py-4 p-2">
				<VideoList userId={userId?.value} />
				<CreateVideoSheet />
			</div>
		</main>
	);
}
