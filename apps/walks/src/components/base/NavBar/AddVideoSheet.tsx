"use client";
import { usePathname } from "next/navigation";
import { PlusIcon } from "@radix-ui/react-icons";
import { useSheetState } from "../CreateVideoSheet/hooks";
export const AddVideoSheet = () => {
	const { openSheet } = useSheetState();
	const pathname = usePathname();

	return !pathname.includes("video-detail") ? (
		<div
			data-testid={"PlusIcon"}
			className="cursor-pointer"
			onClick={openSheet}
		>
			<PlusIcon className="stroke-primary" height={20} width={20} />
		</div>
	) : null;
};
