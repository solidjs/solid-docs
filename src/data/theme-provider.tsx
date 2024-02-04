import { computerDesktop, moon, sun } from "solid-heroicons/solid";
import {
	Accessor,
	JSX,
	ParentProps,
	Setter,
	createContext,
	createEffect,
	createSignal,
	useContext,
} from "solid-js";
import { isServer } from "solid-js/web";
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
const ThemeCtx = createContext<ThemeContext>();

export const ThemeProvider = (props: ParentProps) => {
	const systemTheme =
		!isServer && window.matchMedia("(prefers-color-scheme: dark)").matches
			? { value: "dark", theme: "material-theme-ocean" }
			: { value: "light", theme: "min-light" };

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
	const [selectedTheme, setSelectedTheme] = createSignal<Theme>(themes[2]);
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
