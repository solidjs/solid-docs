import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { cwd } from "process";

export async function createSolidCollectionDir() {
	const collectionDir = path.resolve(cwd(), ".solid");

	if (!existsSync(collectionDir)) {
		fs.mkdir(path.resolve(cwd(), ".solid"));
	}
}
