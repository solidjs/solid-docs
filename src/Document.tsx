import { getHtmlProps } from "@kobalte/solidbase/server";
import { HydrationScript } from "@solidjs/web";
import type { ParentProps } from "solid-js";

// Document shell for @solidjs/vite-plugin start mode: the app arrives as
// children and the client entry script is injected into <head>.
export default function Document(props: ParentProps) {
	return (
		<html {...getHtmlProps()}>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="alternate icon" href="/favicon.svg" type="image/svg+xml" />
				<script src="/scripts/browser-specific.js" type="module" />
				<HydrationScript />
			</head>
			<body class="min-h-screen bg-slate-50 dark:bg-slate-900">
				<div id="app">{props.children}</div>
			</body>
		</html>
	);
}
