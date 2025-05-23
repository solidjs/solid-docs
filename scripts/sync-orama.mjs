import { readFileSync } from "node:fs";
import { globSync } from "glob";
import { generalPurposeCrawler } from "@orama/crawly";
import { CloudManager } from "@oramacloud/client";
import "dotenv/config";

const ORAMA_PRIVATE_API_KEY = process.env.ORAMA_PRIVATE_API_KEY;
const ORAMA_PRIVATE_INDEX_ID = process.env.ORAMA_PRIVATE_INDEX_ID;

const baseURL = new URL("../dist", import.meta.url).pathname;
const HTMLFiles = globSync("**/*.html", { cwd: baseURL });

const pagesToIndex = HTMLFiles.flatMap((file) => {
	const path = file.replace(/\.html$/, "");
	const pageContent = readFileSync(
		new URL(`../dist/${file}`, import.meta.url),
		"utf8"
	);

	const productionDocsURL = `https://docs.solidjs.com/${path}`;

	return {
		...generalPurposeCrawler(productionDocsURL, pageContent, {
			parseCodeBlocks: false,
		})[0],
		contentWithCode: generalPurposeCrawler(productionDocsURL, pageContent)?.[0]
			?.content,
	};
});

const cloudManager = new CloudManager({
	apiKey: ORAMA_PRIVATE_API_KEY,
});

const indexManager = cloudManager.index({
	indexId: ORAMA_PRIVATE_INDEX_ID,
});

async function upsertFreshData() {
	const batches = [];
	const batchesSize = 25;

	for (let i = 0; i < pagesToIndex.length; i += batchesSize) {
		const batch = pagesToIndex.slice(i, i + batchesSize);
		batches.push(batch);
	}

	for (let i = 0; i < batches.length; i++) {
		const batch = batches[i];

		await indexManager.upsertDocuments(batch);
	}
}

await indexManager.empty();
await upsertFreshData();
await indexManager.deploy();
