import UpstreamRepl, { type ReplProps } from "solid-repl";
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

export default function Repl(
	props: Omit<ReplProps, "compiler" | "formatter" | "linter">
) {
	return (
		<UpstreamRepl
			{...props}
			compiler={compiler}
			formatter={formatter}
			linter={linter}
		/>
	);
}
