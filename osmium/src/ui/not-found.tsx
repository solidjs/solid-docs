import { Title } from "@solidjs/meta";
import { Layout } from "./layout";
import { HttpStatusCode } from "@solidjs/start";
import { useCurrentProject } from "~/utils";

export function NotFound() {
	const project = useCurrentProject();

	return (
		<>
			<Title>Not Found - {project()?.name}</Title>
			<Layout isError>
				<HttpStatusCode code={404} />
				<div class="flex flex-col items-center">
					<h1 class="inline bg-gradient-to-r from-indigo-200 via-blue-400 to-indigo-200 bg-clip-text pb-1 text-5xl tracking-tight text-transparent">
						Page Not Found
					</h1>
					<a href="/">Take me back.</a>
				</div>
			</Layout>
		</>
	);
}
