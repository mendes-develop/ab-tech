import * as elements from "typed-html";
export const HTML = (props: elements.Children) => /*html*/ `
  <!doctype html>
<html lang="pt">
	<head>
		<title>htmx server</title>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="icon" type="image/x-icon" href="/public/albert.ico" />
		<script src="https://unpkg.com/htmx.org/dist/htmx.js"></script>
		<script src="https://cdn.tailwindcss.com"></script>
		<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
		<script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
		<link rel="stylesheet" href="/public/css/styles.css" />

	</head>
		${props.children}
		<script>
			document.addEventListener('DOMContentLoaded', (event) => {
				document.body.addEventListener('htmx:beforeSend', (evt) => {
					console.log(evt);
				});

				document.body.addEventListener('htmx:beforeSwap', (evt) => {
					console.log({ evt });
					evt.detail.shouldSwap = true;
					evt.detail.isError = false;
				});
			});
		</script>
</html>
`;
