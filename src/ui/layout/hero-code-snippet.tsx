
import { cache, createAsync } from "@solidjs/router";
import { codeToHtml } from "shiki";

export const counterTxt = `import { createSignal } from "solid-js";

function Counter() {
	const [count, setCount] = createSignal(0);

	return (
		<button
		  onClick={() => setCount((n) => n + 1)}
		>
		  Count: {count()}
		</button>
	);
}`;

export const snippetLines = counterTxt.split("\n");

const renderCode = cache(async () => {
	"use server";
	const code = counterTxt.trim();
	return codeToHtml(code, {
		lang: "tsx",
		theme: "material-theme-ocean",
	});
}, "render-code");

export default function CodeSnippet() {
	const code = createAsync(() => renderCode());

	// eslint-disable-next-line solid/no-innerhtml
	return <div innerHTML={code()} />;
}
