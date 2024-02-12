import { test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";

test("basic test", async ({ page }) => {
	await page.goto("http://localhost:3000");
	await injectAxe(page);
	await checkA11y(
		page,
		null,
		{
			axeOptions: {},
			detailedReport: true,
			detailedReportOptions: { html: true },
		},
		true
	);
});
