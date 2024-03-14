import { codeToHtml } from "shiki";
import { createResource } from "solid-js";

export const counterTxt = `import { createSignal } from "solid-js";

function Counter() {
	const [count, setCount] = createSignal(0);

	setInterval(() => setCount((prev) => prev + 1), 1000);

	return (
		<div>
			<p>Count: {count()}</p>
		</div>
	);
}`;

export const snippetLines = counterTxt.split("\n");

const renderCode = async () => {
	const code = `import { createSignal } from "solid-js";

function Counter() {
	const [count, setCount] = createSignal(0);

	setInterval(() => setCount((prev) => prev + 1), 1000);

	return (
		<div>
			<p>Count: {count()}</p>
		</div>
	);
}`.trim();
	return codeToHtml(code, {
		lang: "javascript",
		theme: "material-theme-ocean",
	});
};

export default function CodeSnippet() {
	const [code] = createResource(renderCode);

	return <div innerHTML={code()} />;
}
