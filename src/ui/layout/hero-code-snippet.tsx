import { createResource } from "solid-js";
import { isServer } from "solid-js/web";

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
	if (isServer) {
		const { codeToHtml } = await import("shiki");
		return codeToHtml(counterTxt.trim(), {
			lang: "tsx",
			theme: "material-theme-ocean",
		});
	} else return "";
};

export default function CodeSnippet() {
	const [code] = createResource(() => renderCode());

	// eslint-disable-next-line solid/no-innerhtml
	return <div innerHTML={code()} />;
}
