import { CommentSection } from "@/components/base/CommentSection";
import { VideoFrame, VideoFrameProps } from "@/components/base/VideoFrame";
import { redirect } from "next/navigation";
import { getCookieUserId } from "@/cookies/cookies";

type VideoDetailPageProps = {
	params: { videoId: string };
	searchParams: VideoFrameProps;
};

export default async function VideoDetailPage({
	params,
	searchParams,
}: VideoDetailPageProps) {
	const userId = await getCookieUserId();

	if (!userId?.value) {
		redirect("/login");
	}

	return (
		<div className="flex flex-1 flex-col h-full">
			<VideoFrame {...searchParams} />
			<CommentSection />
		</div>
	);
}
