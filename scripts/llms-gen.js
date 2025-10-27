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
		.map((link) => `- [${link.title}](${link.url})`)
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
> Solid is a JavaScript library built around signals. It prioritizes a simple and predictable development experience, making it a great choice for developers of all skill levels. These are the documention for the main official projects.
> - SolidJS: The core library for building reactive user interfaces.
> - SolidStart: A full-stack framework for building web applications.
> - Solid Router: A routing library for building web applications.
> - Solid Meta: A library for managing the HTML head and meta tags.

${formatSection("SolidJS", coreLinks)}

${formatSection("SolidStart", startLinks)}

${formatSection("Solid Router", routerLinks)}

${formatSection("Solid Meta", metaLinks)}
`;

	fs.writeFileSync("public/llms.txt", output, { encoding: "utf-8" });
})();
