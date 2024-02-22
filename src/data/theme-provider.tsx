import { computerDesktop, moon, sun } from "solid-heroicons/solid";
import {
	Accessor,
	JSX,
	ParentProps,
	Setter,
	createContext,
	createEffect,
	createSignal,
	onMount,
	useContext,
} from "solid-js";
import { getRequestEvent, isServer } from "solid-js/web";
export interface Theme {
	name: string;
	value: string;
	icon: {
		path: JSX.Element;
		outline?: boolean;
		mini?: boolean;
	};
	theme: string;
}
type ThemeContext = {
	selectedTheme: Accessor<Theme>;
	setSelectedTheme: Setter<Theme>;
	themes: Theme[];
};

function getCookie(name: string, cookieString: string) {
	let value = `; ${cookieString}`;
	let parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()!.split(";").shift() || "system";
}

const ThemeCtx = createContext<ThemeContext>();
const getUserTheme = () => {
	if (isServer) {
		const e = getRequestEvent();
		return getCookie("theme", e?.request.headers.get("cookie")!);
	}
	return getCookie("theme", document.cookie);
};
const getSystemTheme = () =>
	!isServer && window.matchMedia("(prefers-color-scheme: dark)").matches
		? { value: "dark", theme: "material-theme-ocean" }
		: { value: "light", theme: "min-light" };

export const ThemeProvider = (props: ParentProps) => {
	const systemTheme = getSystemTheme();
	const themes: Theme[] = [
		{ name: "Light", value: "light", icon: sun, theme: "min-light" },
		{ name: "Dark", value: "dark", icon: moon, theme: "material-theme-ocean" },
		{
			name: "System",
			value: systemTheme.value,
			icon: computerDesktop,
			theme: systemTheme.theme,
		},
	];
	const themeName = getUserTheme();
	const theme = themes.find((t) => t.value == themeName);
	const [selectedTheme, setSelectedTheme] = createSignal<Theme>(
		theme ?? themes[0]
	);
	onMount(() => {
		// If the user has no theme cookie, set to their system theme on mount
		if (theme) return;
		setSelectedTheme(themes[2]);
	});
	createEffect(() => {
		document.cookie = `theme=${selectedTheme().value}`;
	});
	return (
		<ThemeCtx.Provider
			value={{ selectedTheme: selectedTheme, themes, setSelectedTheme }}
		>
			{props.children}
		</ThemeCtx.Provider>
	);
};

export const useThemeContext = () => {
	return useContext(ThemeCtx)!;
};
