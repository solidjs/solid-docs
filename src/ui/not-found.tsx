import { Title } from "@solidjs/meta";
import { Layout } from "./layout";
import { HttpStatusCode } from "@solidjs/start";
import { A } from "~/ui/i18n-anchor";
import { useProjectTitle } from "./use-project";

export function NotFound() {
	const projectTitle = useProjectTitle();

	return (
		<>
			<Title>Not Found - {projectTitle()}</Title>
			<Layout isError>
				<HttpStatusCode code={404} />
				<div class="flex flex-col items-center">
					<h1 class="inline bg-gradient-to-r from-indigo-200 via-blue-400 to-indigo-200 bg-clip-text pb-1 text-5xl tracking-tight text-transparent">
						Page Not Found
					</h1>
					<A href="/">Take me back.</A>
				</div>
			</Layout>
		</>
	);
}
