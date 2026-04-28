import { createHandler, StartServer } from "@solidjs/start/server";
import { getHtmlProps } from "@kobalte/solidbase/server";

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => {
			return (
				<html {...getHtmlProps()}>
					<head>
						<meta charset="utf-8" />
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1"
						/>
						<link rel="icon" href="/favicon.ico" />
						<link
							rel="alternate icon"
							href="/favicon.svg"
							type="image/svg+xml"
						/>
						<script src="/scripts/browser-specific.js" type="module" />
						{assets}
					</head>
					<body class="min-h-screen bg-slate-50 dark:bg-slate-900">
						<div id="app">{children}</div>
						{scripts}
					</body>
				</html>
			);
		}}
	/>
));
