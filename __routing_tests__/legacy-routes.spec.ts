import { describe, test, expect } from "vitest";
import { LEGACY_ROUTES } from "../src/middleware/legacy-redirects/legacy-routes";

const baseUrl = process.env.TEST_URL || "http://localhost:3000";

describe("testing legacy routes redirect", () => {
	for (const route of Object.values(LEGACY_ROUTES)) {
		test.concurrent(`${route} must be 200`, async () => {
			const resp = await fetch(`${baseUrl}${route}`);
			expect(resp.ok).toBeTruthy();
		});
	}
});
