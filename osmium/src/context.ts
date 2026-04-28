import { createSignal } from "solid-js";
import { createContextProvider } from "@solid-primitives/context";
import { useOsmiumThemeFrontmatter } from "./frontmatter";

const [OsmiumThemeStateProvider, useOsmiumThemeStateContext] =
	createContextProvider(() => {
		const [sidebarOpen, setSidebarOpen] = createSignal(false);
		const [tocOpen, setTocOpen] = createSignal(false);
		const [navOpen, setNavOpen] = createSignal(false);
		const frontmatter = useOsmiumThemeFrontmatter();

		return {
			sidebarOpen,
			setSidebarOpen,
			tocOpen,
			setTocOpen,
			navOpen,
			setNavOpen,
			frontmatter,
		};
	});

export function useOsmiumThemeState() {
	return (
		useOsmiumThemeStateContext() ??
		(() => {
			throw new Error(
				"useOsmiumThemeState must be used within a OsmiumThemeStateProvider"
			);
		})()
	);
}

export { OsmiumThemeStateProvider };
