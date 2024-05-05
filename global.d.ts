declare module "solid:collection" {
	import coreTree from ".solid/tree";
	import startTree from ".solid/solid-router-tree";
	import routerTree from ".solid/solid-start-tree";
	import metaTree from ".solid/solid-meta-tree";
	import coreEntries from ".solid/flat-entries";
	import routerEntries from ".solid/solid-start-flat-entries";
	import startEntries from ".solid/solid-router-flat-entries";
	import metaEntries from ".solid/solid-meta-flat-entries";

	export {
		coreEntries,
		routerEntries,
		startEntries,
		metaEntries,
		coreTree,
		routerTree,
		startTree,
		metaTree,
	};
}
