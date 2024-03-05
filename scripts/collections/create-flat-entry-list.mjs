/**
 *
 * @param {Awaited<ReturnType<typeof createNavTree>>} tree
 * @param {object} entryMap
 */
export function createFlatEntryList(tree, entryMap) {
	for (const item of tree) {
		if (item.type === "markdown") {
			if (entryMap.findIndex((e) => e.slug === item.slug) > -1) {
				console.error(`Duplicated entry found: ${item.slug}`);
				break;
			}
			entryMap.push(item);
		} else {
			createFlatEntryList(item.children, entryMap);
		}
	}

	return entryMap;
}
