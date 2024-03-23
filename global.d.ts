declare module "solid:collection/tree" {
	import coreTree from ".solid/tree";
	import startTree from ".solid/solid-router-tree";
	import routerTree from ".solid/solid-start-tree";
	// eslint-disable-next-line
	export { coreTree, routerTree, startTree };
}

declare module "solid:collection/flat-entries" {
	import coreEntries from ".solid/flat-entries";
	import routerEntries from ".solid/solid-start-flat-entries";
	import startEntries from ".solid/solid-router-flat-entries";

	export { coreEntries, routerEntries, startEntries };
}
