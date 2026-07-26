export type NavigationTab = "learn" | "reference";

export function getNavigationTabForPath(pathname: string): NavigationTab {
	return /(^|\/)reference(\/|$)/.test(pathname) ? "reference" : "learn";
}
