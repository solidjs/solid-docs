import entries from "../.solid/entriesList.js";
import startEntries from "../.solid/solid-start-flat-entries.js";
import routerEntries from "../.solid/solid-router-flat-entries.js";
import metaEntries from "../.solid/solid-meta-flat-entries.js";
import fs from "fs";

const generateLinkArray = (routes) => {
	return routes.map((route) => ({
		title: route.title,
		url: `https://docs.solidjs.com${route.path}`,
	}));
};

const formatSection = (title, links) => {
	const formattedLinks = links
		.map((link) => `${link.title}: ${link.url}`)
		.join("\n");
	return `## ${title}\n\n${formattedLinks}`;
};

(async () => {
	// SolidJS Core
	const coreLinks = [
		...generateLinkArray(entries.learn),
		...generateLinkArray(entries.reference),
	];

	// SolidStart
	const startLinks = [
		...generateLinkArray(startEntries.learn),
		...generateLinkArray(startEntries.reference),
	];

	// Solid Router
	const routerLinks = [
		...generateLinkArray(routerEntries.learn),
		...generateLinkArray(routerEntries.reference),
	];

	// Solid Meta
	const metaLinks = [
		...generateLinkArray(metaEntries.learn),
		...generateLinkArray(metaEntries.reference),
	];

	const output = `# SolidJS Documentation

${formatSection("SolidJS", coreLinks)}

${formatSection("SolidStart", startLinks)}

${formatSection("Solid Router", routerLinks)}

${formatSection("Solid Meta", metaLinks)}
`;

	fs.writeFileSync("public/llm.txt", output, { encoding: "utf-8" });
})();
