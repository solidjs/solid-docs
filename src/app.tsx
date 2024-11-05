// @refresh reload
import { Router } from "@solidjs/router";
import { SolidBaseRoot } from "@kobalte/solidbase/client";
import { FileRoutes } from "@solidjs/start/router";
import "~/styles.css";

export default function App() {
	return (
		<Router root={SolidBaseRoot}>
			<FileRoutes />
		</Router>
	);
}
