import { SolidBaseRoot } from "@kobalte/solidbase/client";
import { createRouter, intentPreload } from "@solidjs/router";
import { fileRoutes } from "@solidjs/router/fs";
import { pageRoutes } from "virtual:file-routes";

import "./index.css";

const Router = createRouter({
	routes: fileRoutes(pageRoutes),
	// Fetch a page's chunk when a link is hovered or focused, before the click.
	preloadLinks: intentPreload(),
});

export default function App() {
	return (
		<Router>
			{(props) => <SolidBaseRoot>{props.children}</SolidBaseRoot>}
		</Router>
	);
}
