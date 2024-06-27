import * as elements from "typed-html";

export const AddNewTodo = () => (
	<div>
		<div class="h-full border flex justify-center items-center">
			<button
				hx-post="/clicked"
				hx-swap="outerHTML"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
			>
				Button Click Me
			</button>
		</div>
	</div>
);
