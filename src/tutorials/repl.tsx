import UpstreamRepl, { type ReplProps } from "solid-repl";
import CompilerWorker from "solid-repl/dist/compiler.js?worker";
import FormatterWorker from "solid-repl/dist/formatter.js?worker";
import "solid-repl/dist/bundle.css";

// One set of workers for every lesson; this module only loads in the browser.
const compiler = new CompilerWorker();
const formatter = new FormatterWorker();

if (import.meta.hot) {
	import.meta.hot.dispose(() => {
		compiler.terminate();
		formatter.terminate();
	});
}

export default function Repl(props: Omit<ReplProps, "compiler" | "formatter">) {
	return <UpstreamRepl {...props} compiler={compiler} formatter={formatter} />;
}
