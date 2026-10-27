import UpstreamRepl, {
	DEFAULT_SOLID_VERSION,
	IMPORT_MAP_FILE,
	type ReplProps,
	type Tab,
} from "solid-repl";
import CompilerWorker from "solid-repl/dist/compiler.mjs?worker";
import FormatterWorker from "solid-repl/dist/formatter.mjs?worker";
import LinterWorker from "solid-repl/dist/linter.mjs?worker";
import "solid-repl/dist/bundle.css";

// One set of workers for every lesson; this module only loads in the browser.
const compiler = new CompilerWorker();
const formatter = new FormatterWorker();
const linter = new LinterWorker();

if (import.meta.hot) {
	import.meta.hot.dispose(() => {
		compiler.terminate();
		formatter.terminate();
		linter.terminate();
	});
}

// esm.sh serves production builds unless asked for `dev`, and lessons rely on
// Solid's dev warnings. Pin the Solid packages to their development builds.
const esm = (path: string, external: string) =>
	`https://esm.sh/${path}?external=${external}&dev`;
const devImportMap: Tab = {
	name: IMPORT_MAP_FILE,
	source: JSON.stringify({
		imports: {
			"solid-js": esm(
				`solid-js@${DEFAULT_SOLID_VERSION}`,
				"solid-js/internal,@solidjs/web"
			),
			"solid-js/internal": esm(
				`solid-js@${DEFAULT_SOLID_VERSION}/internal`,
				"@solidjs/web"
			),
			"@solidjs/web": esm(
				`@solidjs/web@${DEFAULT_SOLID_VERSION}`,
				"solid-js,solid-js/internal"
			),
		},
		pinned: ["solid-js", "solid-js/internal", "@solidjs/web"],
	}),
};

export default function Repl(
	props: Omit<ReplProps, "compiler" | "formatter" | "linter">
) {
	return (
		<UpstreamRepl
			{...props}
			tabs={
				props.tabs.some((tab) => tab.name === IMPORT_MAP_FILE)
					? props.tabs
					: [...props.tabs, devImportMap]
			}
			compiler={compiler}
			formatter={formatter}
			linter={linter}
		/>
	);
}
