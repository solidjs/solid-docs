import { createHandler, StartServer } from "@solidjs/start/server";
import { useThemeContext } from "./data/theme-provider";

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => {
			const ctx = useThemeContext();
			return (
				<html lang="en" class={ctx.selectedTheme().value}>
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
					{assets}
				</head>
				<body>
					<div id="app">{children}</div>
					{scripts}
				</body>
			</html>
			)
		}
		}
	/>
));