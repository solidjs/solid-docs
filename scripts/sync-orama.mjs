import { readFileSync } from "node:fs";
import { glob } from "node:fs/promises";
import { OramaCloud } from "@orama/core";
import { generalPurposeCrawler } from "@orama/crawly";
import "dotenv/config";

const ORAMA_PRIVATE_API_KEY = process.env.ORAMA_PRIVATE_API_KEY;
const ORAMA_DATASOURCE_ID = process.env.ORAMA_DATASOURCE_ID;
const ORAMA_PROJECT_ID = process.env.ORAMA_PROJECT_ID;
const siteOrigin =
	process.env.SITE_URL ??
	process.env.DEPLOY_PRIME_URL ??
	"https://docs.solidjs.com";

if (!ORAMA_PRIVATE_API_KEY || !ORAMA_DATASOURCE_ID || !ORAMA_PROJECT_ID) {
	throw new Error(
		"ORAMA_PRIVATE_API_KEY, ORAMA_DATASOURCE_ID, and ORAMA_PROJECT_ID are required."
	);
}

const baseURL = new URL("../dist", import.meta.url).pathname;
const HTMLFiles = await Array.fromAsync(glob("**/*.html", { cwd: baseURL }));

const pagesToIndex = HTMLFiles.flatMap((file) => {
	const path = file.replace(/\.html$/, "");
	const pageContent = readFileSync(
		new URL(`../dist/${file}`, import.meta.url),
		"utf8"
	);

	const pageURL = new URL(`/${path}`, siteOrigin).toString();

	const content = generalPurposeCrawler(pageURL, pageContent, {
		parseCodeBlocks: false,
	})[0];
	const contentWithCode = generalPurposeCrawler(pageURL, pageContent, {
		parseCodeBlocks: true,
	})[0];

	const fullContent = {
		title: content.title,
		path: content.path,
		content: content.content,
		contentWithCode: contentWithCode.content,
	};

	if (content?.category) {
		fullContent.category = `enum('${content.category}')`;
	}

	if (content?.section) {
		fullContent.section = `enum('${content.section}')`;
	}

	return fullContent;
});

const orama = new OramaCloud({
	apiKey: ORAMA_PRIVATE_API_KEY,
	projectId: ORAMA_PROJECT_ID,
});

const index = orama.index.set(ORAMA_DATASOURCE_ID);

console.log(`[Orama] - Indexing ${pagesToIndex.length} documents to Orama...`);

const tempIndexId = `tempIndex-${Date.now()}`;
await index.createTemporaryIndex(tempIndexId);
const tempIdx = orama.index.set(tempIndexId);
await tempIdx.insertDocuments(pagesToIndex);
await index.swapTemporaryIndex(ORAMA_DATASOURCE_ID, tempIndexId);
await orama.index.delete(tempIndexId);

console.log(`[Orama] - Indexed ${pagesToIndex.length} documents to Orama.`);
