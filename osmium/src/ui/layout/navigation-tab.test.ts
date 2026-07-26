import { test } from "node:test";
import assert from "node:assert/strict";

import { getNavigationTabForPath } from "./navigation-tab";

test("selects reference tab for direct reference page loads", () => {
	assert.equal(
		getNavigationTabForPath("/reference/secondary-primitives/create-selector"),
		"reference"
	);
});

test("selects reference tab for localized direct reference page loads", () => {
	assert.equal(
		getNavigationTabForPath(
			"/fr/reference/secondary-primitives/create-selector"
		),
		"reference"
	);
});

test("selects learn tab for non-reference page loads", () => {
	assert.equal(getNavigationTabForPath("/learn/quick-start"), "learn");
});
