import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";

export async function createSolidCollectionDir() {
	const collectionDir = path.resolve(process.cwd(), ".solid");

	if (!existsSync(collectionDir)) {
		fs.mkdir(path.resolve(process.cwd(), ".solid"));
	}
}
