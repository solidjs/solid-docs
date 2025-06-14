import { highlightedCode } from "solid:hero-code-snippet";
import counterTxt from "./hero-code-snippet.code?raw";

export const snippetLines = counterTxt.split("\n");

export default function CodeSnippet() {
	return <div innerHTML={highlightedCode} />;
}
