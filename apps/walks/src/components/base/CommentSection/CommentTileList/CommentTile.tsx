import { Skeleton } from "@/components/ui/skeleton";
export const CommentSectionLoading = () => {
	return (
		<div className="w-full h-full flex flex-col items-end gap-4">
			<Skeleton className="h-20 w-full" />
			<Skeleton className="h-20 w-full" />
		</div>
	);
};

export const CommentTile = ({ comment, user_id }: any) => {
	return (
		<div className="flex flex-row gap-2 bg-white p-2 rounded-md mb-4 border">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={`https://api.dicebear.com/8.x/initials/svg?radius=50&seed=${user_id}`}
				alt="avatar"
				width={20}
				height={20}
			/>
			<div>
				<p className="text-sm">{user_id}</p>
				<p>{comment}</p>
			</div>
		</div>
	);
};
