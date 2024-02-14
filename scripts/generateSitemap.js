import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import entries from "../.solid/entriesList.js";
import fs from "fs";

const generateLinkArray = (routes) => {
	return routes.reduce((acc, route) => {
		return [...acc, { url: route, priority: route == "/" ? 1 : 0.7, changefreq: "weekly" }];
	}, []);
};

(async () => {
	const referencesRoutes = entries.references.map(({ path }) => path);
	const learnRoutes = entries.learn.map(({ path }) => path);
	const links = [
		...generateLinkArray(learnRoutes),
		...generateLinkArray(referencesRoutes),
	];
	const stream = new SitemapStream({ hostname: "https://docs.solidjs.com/" });
	return streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
		fs.writeFileSync("public/sitemap.xml", data, { encoding: "utf-8" })
	);
})();
