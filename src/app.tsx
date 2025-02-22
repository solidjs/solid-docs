// @refresh reload
import { Router } from "@solidjs/router";
import { SolidBaseRoot } from "@kobalte/solidbase/client";
import { FileRoutes } from "@solidjs/start/router";
import "~/styles.css";
import { Suspense } from "solid-js";

export default function App() {
	return (
		<Suspense>
			<Router root={SolidBaseRoot}>
				<FileRoutes />
			</Router>
		</Suspense>
	);
}
