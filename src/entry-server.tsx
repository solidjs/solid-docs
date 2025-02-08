import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => {
			return (
				<html lang="en">
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
						<script>
							{`
							function getCookie(name, cookieString) {
								if (!name || !cookieString) return "system";
								const match = cookieString.match(new RegExp(\`\\\\W?\${name}=(?<theme>\\\\w+)\`));
								return match?.groups?.theme || "system";
							}

							const getUserTheme = () => getCookie("theme", document.cookie);

							const getSystemTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches
								? {value: "dark", theme: "material-theme-ocean" }
								: {value: "light", theme: "min-light" };

							const systemTheme = getSystemTheme();
							const themes = [
								{ value: "light", theme: "min-light" },
								{ value: "dark", theme: "material-theme-ocean" },
								{
									value: systemTheme.value,
									theme: systemTheme.theme,
								},
							];
							const themeName = getUserTheme();
							const theme = themes.find((t) => t.value == themeName) ?? themes[2];

							document.documentElement.classList.add(theme.value);
							document.documentElement.setAttribute('data-theme', theme.theme);
						`}
						</script>
						<script src="/scripts/browser-specific.js" type="module" />
						{assets}
					</head>
					<body class="min-h-screen dark:bg-slate-900 bg-slate-50">
						<div id="app">{children}</div>
						{scripts}
					</body>
				</html>
			);
		}}
	/>
));
