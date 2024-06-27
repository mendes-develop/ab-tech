import * as elements from "typed-html";
import { NavBar } from "./todos/components/Navigation";
import { HTML } from "./html";

interface LayoutProps extends elements.Children {
	route: string;
}

export const Layout = (props: LayoutProps) => {
	return (
		<HTML>
			<body class={`h-screen`}>
				<div class="border h-full border-gray-300 rounded-md flex flex-row gap-4 overflow-y-scroll overflow-x-hidden bg-blue-1">
					<NavBar route={props.route} />
					{props.children}
				</div>
			</body>
		</HTML>
	);
};
