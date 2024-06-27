"use client";
import React from "react";
import ReactPlayer from "react-player";
import { VideoListProps } from "../VideoListComponent";

export type VideoFrameProps = Omit<VideoListProps, "num_comments" | "id">;

export const VideoFrame: React.FC<VideoFrameProps> = ({
	title,
	description,
	url,
}) => {
	return (
		<>
			<div className="w-full h-3/6 px-2 py-2 rounded-sm bg-black">
				<ReactPlayer
					width={"100%"}
					height={"100%"}
					url={url}
					playing
					controls
					//  video frame has its own state
					fallback={<div className="text-white">Hello WOrld</div>}
				/>
			</div>
			<div className="p-4 pt-6 bottom-b-2 border">
				<h1 className="text-lg font-bold">{title}</h1>
				<p className="text-sm">{description}</p>
			</div>
		</>
	);
};
