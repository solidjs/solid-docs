import { test, expect } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const main = page.locator("article");
  await expect(main).toHaveText(/^Welcome/);
});
