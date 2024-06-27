import { useSearchParams } from "next/navigation";
export const useSheetState = () => {
	const searchParams = useSearchParams();

	function closeSheet() {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("sheet-open");

		window.history.pushState(null, "", `?${params.toString()}`);
	}

	function openSheet() {
		const params = new URLSearchParams(searchParams.toString());
		params.set("sheet-open", "true");

		window.history.pushState(null, "", `?${params.toString()}`);
	}

	return {
		openSheet,
		closeSheet,
		isSheetOpen: searchParams.get("sheet-open") === "true",
	};
};
