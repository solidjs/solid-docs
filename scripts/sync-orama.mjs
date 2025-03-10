import { readFileSync } from "node:fs";
import { globSync } from "glob";
import { generalPurposeCrawler } from "@orama/crawly";
import "dotenv/config";
import { env } from "process";

const ORAMA_PRIVATE_API_KEY = env.ORAMA_PRIVATE_API_KEY;
const ORAMA_PRIVATE_INDEX_ID = env.ORAMA_PRIVATE_INDEX_ID;

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

async function emptyIndex() {
	await fetch(
		`https://api.oramasearch.com/api/v1/webhooks/${ORAMA_PRIVATE_INDEX_ID}/snapshot`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${ORAMA_PRIVATE_API_KEY}`,
			},
			body: JSON.stringify([]),
		}
	);
}

async function upsertFreshData() {
	const batches = [];
	const batchesSize = 25;

	for (let i = 0; i < pagesToIndex.length; i += batchesSize) {
		const batch = pagesToIndex.slice(i, i + batchesSize);
		batches.push(batch);
	}

	for (let i = 0; i < batches.length; i++) {
		const batch = batches[i];

		await fetch(
			`https://api.oramasearch.com/api/v1/webhooks/${ORAMA_PRIVATE_INDEX_ID}/notify`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${ORAMA_PRIVATE_API_KEY}`,
				},
				body: JSON.stringify({
					upsert: batch,
				}),
			}
		);
	}
}

async function deployIndex() {
	await fetch(
		`https://api.oramasearch.com/api/v1/webhooks/${ORAMA_PRIVATE_INDEX_ID}/deploy`,
		{
			method: "POST",
			headers: {
				authorization: `Bearer ${ORAMA_PRIVATE_API_KEY}`,
			},
		}
	);

	console.log("Index deployed");
}

await emptyIndex();
await upsertFreshData();
await deployIndex();
