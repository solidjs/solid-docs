import { test, expect } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";

test("basic test", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await injectAxe(page);
  await checkA11y(page);
  const main = page.locator("article");
  await expect(main).toHaveText(/^Welcome/);
});
