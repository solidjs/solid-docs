import { SolidBaseRoot } from "@kobalte/solidbase/client";
import { createRouter } from "@solidjs/router";
import { fileRoutes } from "@solidjs/router/fs";
import { pageRoutes } from "virtual:file-routes";

import "./index.css";

const Router = createRouter({ routes: fileRoutes(pageRoutes) });

export default function App() {
	return (
		<Router>
			{(props) => <SolidBaseRoot>{props.children}</SolidBaseRoot>}
		</Router>
	);
}
