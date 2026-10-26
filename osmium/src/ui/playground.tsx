import { compressToURL } from "@amoutonbrady/lz-string";
import { createMemo } from "solid-js";

const PLAYGROUND_URL =
	import.meta.env.VITE_PLAYGROUND_URL ?? "https://playground.solidjs.com/";
const DEFAULT_SOLID_VERSION = "2.0.0-rc.18";

export type PlaygroundProps = {
	code?: string;
	files?: Record<string, string>;
	solidVersion?: string;
	title?: string;
	height?: string;
};

export const Playground = (props: PlaygroundProps) => {
	const src = createMemo(() => {
		const files = props.files ?? { "main.tsx": props.code ?? "" };
		const version = props.solidVersion ?? DEFAULT_SOLID_VERSION;
		const tabs = Object.entries(files).map(([name, source]) => ({
			name,
			source,
		}));
		// The playground runs the Solid version that import_map.json pins for solid-js.
		tabs.push({
			name: "import_map.json",
			source: JSON.stringify(
				{ imports: { "solid-js": `https://esm.sh/solid-js@${version}` } },
				null,
				2
			),
		});
		return `${PLAYGROUND_URL}#${compressToURL(JSON.stringify(tabs))}`;
	});

	return (
		<figure class="my-6">
			<iframe
				src={src()}
				title={props.title ?? "Solid playground"}
				loading="lazy"
				class="w-full rounded-lg border border-slate-300 dark:border-slate-700"
				style={{ height: props.height ?? "560px" }}
			/>
			<figcaption class="mt-2 text-sm">
				<a href={src()} target="_blank" rel="noopener">
					Open in the Solid Playground
				</a>
			</figcaption>
		</figure>
	);
};
