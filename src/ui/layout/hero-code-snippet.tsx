import { codeToHtml } from "shiki";
import { createResource } from "solid-js";

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

const renderCode = async () => {
	const code = counterTxt.trim();
	return codeToHtml(code, {
		lang: "tsx",
		theme: "material-theme-ocean",
	});
};

export default function CodeSnippet() {
	const [code] = createResource(renderCode);

	return <div innerHTML={code()} />;
}
