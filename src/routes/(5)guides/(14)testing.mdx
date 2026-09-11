---
title: "Testing"
version: "2.0"
description: "Write a component test that clicks a button and asserts the label, run it in jsdom or a real browser, and test fullstack server code in a separate Node project."
---

The first test most people write for a Solid component clicks the counter from the Quick start and asserts the label.
The click fires, the assertion runs on the next line, and the DOM still says `Clicks: 0`.
Nothing is broken: Solid applies writes in a batch after the current code finishes, and the test asserted before the batch landed.
One call fixes it, and it is the one Solid-specific thing in a component test.

Beyond that call, testing a Solid app is a question of picking the smallest environment that exercises the behavior under test:

1. Start component tests in jsdom.
   The `basic` template uses this configuration for component DOM tests.
2. Use [Vitest browser mode](https://vitest.dev/guide/browser/) when the test depends on browser layout, CSS, focus, selection, or browser APIs.
   The browser-mode template runs the same component test in Chromium.
3. Add a separate Node project for server code in a fullstack app.
   The `fullstack` template keeps DOM component tests and request-scoped server tests in different Vitest projects.

:::tip[Assert what the user sees]
Query by an accessible role and assert visible text or state.
Do not inspect signal values, effect counts, or compiled output when the public behavior gives the same evidence.
This follows the [Testing Library guiding principles](https://testing-library.com/docs/guiding-principles/).
:::

## Test components in jsdom

The `basic` template ships Vitest, jsdom, Solid Testing Library, and the jest-dom matchers.
Add the same development dependencies to an existing Solid project:

```sh
pnpm add -D vitest jsdom @solidjs/testing-library @testing-library/jest-dom
```

The template's `package.json` is the record of which versions are known to work together.

Add a test script to `package.json`:

```json
{
	"scripts": {
		"test": "vitest"
	}
}
```

Import `defineConfig` from `vitest/config` in the Vite configuration.
Keep the existing Solid plugin and add the `test` block:

```ts
import { defineConfig } from "vitest/config";
import solid from "@solidjs/vite-plugin";

export default defineConfig({
	plugins: [solid()],
	test: {
		environment: "jsdom",
		globals: false,
		setupFiles: ["./vitest-setup.ts"],
		// Remove this option when tests need module isolation.
		isolate: false,
	},
});
```

Register the jest-dom matchers in `vitest-setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

:::caution[isolate: false shares module state between files]
The template sets `isolate: false` as a performance setting for a small suite.
With it, module state can survive from one test file to the next.
Remove the setting when tests mutate module-level state, or reset that state after each test.
:::

### Test a user-visible interaction

This component exposes its state through the button label:

```tsx
import { createSignal } from "solid-js";

export default function Counter() {
	const [count, setCount] = createSignal(0);

	return (
		<button type="button" onClick={() => setCount(count() + 1)}>
			Clicks: {count()}
		</button>
	);
}
```

Pass a function to `render` so Solid Testing Library creates the component under a reactive owner.
Query the button by role, interact with it, and assert the label that the user sees:

```tsx
import { cleanup, fireEvent, render } from "@solidjs/testing-library";
import { flush } from "solid-js";
import { afterEach, describe, expect, test } from "vitest";

import Counter from "./Counter";

afterEach(cleanup);

describe("<Counter />", () => {
	test("increments on click", () => {
		const { getByRole } = render(() => <Counter />);
		const button = getByRole("button");

		expect(button).toHaveTextContent("Clicks: 0");
		fireEvent.click(button);
		flush();
		expect(button).toHaveTextContent("Clicks: 1");
	});
});
```

Run it and the test passes.
Remove the `flush()` line and it fails on the last assertion with the label still at `Clicks: 0`:

```tsx
// Avoid: asserting before the staged write has landed
fireEvent.click(button);
expect(button).toHaveTextContent("Clicks: 1");

// Prefer: apply staged writes and run effects, then assert
fireEvent.click(button);
flush();
expect(button).toHaveTextContent("Clicks: 1");
```

The click event stages the signal update, and ordinary reads continue to return the last committed value until the batch lands.
[`flush()`](/reference/solid-js/reactivity/flush) commits the staged value and drains queued work so the DOM is current when the assertion runs.
It does not wait for async work: for behavior that is asynchronous by contract, such as an async memo, use the asynchronous queries or [`resolve(fn)`](/reference/solid-js/advanced/interop-async/resolve) rather than `flush()`.

Solid Testing Library tracks mounted containers and exports `cleanup`.
It can register cleanup automatically when the test runner exposes a global `afterEach`.
The configuration above sets `globals: false`, so the explicit `afterEach(cleanup)` keeps disposal independent of test-runner globals.

## Test components in a real browser

Choose browser mode when jsdom cannot provide the behavior that the test needs.
The maintained browser-mode template uses the Playwright provider with headless Chromium.

:::note[Browser mode still needs jsdom installed]
When `test.environment` is unset, `@solidjs/vite-plugin` supplies a jsdom environment and Vitest resolves that dependency before it starts the browser pool.
Without jsdom, the Chromium test can pass while the Vitest command exits with a missing-dependency error.
:::

For a new test setup, install the complete dependency set:

```sh
pnpm add -D vitest jsdom @solidjs/testing-library @testing-library/jest-dom @vitest/browser-playwright playwright
pnpm exec playwright install chromium
```

Replace the jsdom environment in the `test` block:

```ts
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";
import solid from "@solidjs/vite-plugin";

export default defineConfig({
	plugins: [solid()],
	test: {
		globals: false,
		setupFiles: ["./vitest-setup.ts"],
		browser: {
			enabled: true,
			provider: playwright(),
			headless: true,
			instances: [{ browser: "chromium" }],
		},
	},
});
```

The `Counter` test above runs unchanged in this configuration.
The component still renders through Solid Testing Library, and `flush()` still drains the staged DOM update after the click.
The difference is the host environment: Vitest runs the test in a Chromium page instead of a simulated jsdom document.
Run the browser suite once and exit with:

```sh
pnpm test --run
```

The templates demonstrate component tests, not browser-wide end-to-end flows.
See the [Vitest browser-mode guide](https://vitest.dev/guide/browser/) for browser locators, interactions, and browser-mode limitations when a component test needs those APIs.

## Test server code in a Node project

A fullstack app needs separate client and server test environments.
Use [Vitest projects](https://vitest.dev/guide/projects.html) to keep `*.test.tsx` component files in jsdom and `src/server/**/*.test.ts` files in Node.

The fullstack template uses this project shape:

```ts
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import solid from "@solidjs/vite-plugin";

export default defineConfig({
	plugins: [solid({ start: true, ssr: true })],
	test: {
		globals: false,
		setupFiles: ["./vitest-setup.ts"],
		projects: [
			{
				extends: true,
				test: {
					name: "client",
					environment: "jsdom",
					include: ["src/**/*.test.tsx"],
				},
			},
			{
				extends: true,
				test: {
					name: "server",
					environment: "node",
					include: ["src/server/**/*.test.ts"],
					server: { deps: { inline: [/@solidjs[+/]web/] } },
					alias: [
						{
							find: /^@solidjs\/web$/,
							replacement: fileURLToPath(
								new URL(
									"./node_modules/@solidjs/web/dist/server.js",
									import.meta.url
								)
							),
						},
						{
							find: /^@solidjs\/web\/storage$/,
							replacement: fileURLToPath(
								new URL(
									"./node_modules/@solidjs/web/storage/dist/storage.js",
									import.meta.url
								)
							),
						},
						{
							find: "virtual:env/server",
							replacement: fileURLToPath(
								new URL("./vitest-env-server-stub.ts", import.meta.url)
							),
						},
					],
				},
			},
		],
	},
});
```

The Node project compiles server code and resolves the server runtime.
The fullstack template also inlines and aliases its `@solidjs/web` entries so the request helper and request-event storage use the same server-build instance.
Keep the server include pattern separate from the client pattern so a server test does not run under jsdom.

### Stub the server environment module

The fullstack template imports session secrets from `virtual:env/server`.
Vitest runs the session test outside the start mode server, so the template aliases that virtual module to this test stub:

```ts
export const env: Record<string, unknown> = new Proxy(
	{},
	{
		get: (_, key) => {
			if (typeof key !== "string") return undefined;
			const value = process.env[key];
			if (key === "SESSION_SECRET") {
				return value?.split(",").map((secret) => secret.trim());
			}
			return value;
		},
	}
);
```

The proxy reads `process.env` when code accesses a property and reproduces the schema's parsed output for the signing-key list.
This behavior lets a test set `process.env.SESSION_SECRET` before it imports the session module.
The stub only supplies the module contract needed by the template test.
It does not validate key length or run the start mode server boot process, so use a realistic test key that satisfies the production schema.

### Exercise a session across requests

Test request-scoped helpers through the server runtime instead of replacing the request event with a plain object.
This concise version of the fullstack template pattern creates an event, provides it to the handler, commits the outgoing response, and carries the response cookie into the next request:

```ts
import { commitEventResponse, createRequestEvent } from "@solidjs/web";
import { provideRequestEvent } from "@solidjs/web/storage";
import { afterEach, expect, test, vi } from "vitest";

type SessionModule = typeof import("./session");

async function loadSession(secret: string): Promise<SessionModule> {
	process.env.SESSION_SECRET = secret;
	vi.resetModules();
	return import("./session");
}

async function runRequest<T>(
	request: Request,
	handler: () => Promise<T>
): Promise<{ result: T; response: Response }> {
	const event = createRequestEvent(request);

	return provideRequestEvent(event, async () => {
		const result = await handler();
		const response = commitEventResponse(new Response("ok"), event);
		return { result, response };
	});
}

afterEach(() => {
	delete process.env.SESSION_SECRET;
});

test("reads a session on the next request", async () => {
	const session = await loadSession(
		"test-session-key-with-at-least-32-characters"
	);
	const login = await runRequest(new Request("http://localhost/login"), () =>
		session.setSession({ userId: "user_1" })
	);
	const cookie = login.response.headers
		.getSetCookie()
		.find((value) => value.startsWith("session="))
		?.split(";")[0];

	expect(cookie).toBeDefined();

	const current = await runRequest(
		new Request("http://localhost/me", {
			headers: { cookie: cookie! },
		}),
		() => session.getSession()
	);

	expect(current.result).toEqual({ userId: "user_1" });
});
```

Run it and the second request returns `{ userId: "user_1" }` from the cookie the first request set.
The test asserts the public request-to-response contract: one request writes a cookie, and the next request reads the session.
Reset modules before importing code that captures environment values at module initialization.
Restore fake timers and mocks, delete changed environment variables, and dispose any other process-wide state in `afterEach`.

## Common problems

### The assertion after `fireEvent` sees the old DOM

The write is staged and the batch has not landed when the next line runs.
Call `flush()` after the event and before the assertion.
For an async source, `flush()` does not help; await `resolve(() => value())` or use an asynchronous query.

### The Chromium test passes but Vitest exits with a missing-dependency error

jsdom is not installed.
`@solidjs/vite-plugin` supplies a jsdom environment when `test.environment` is unset, and Vitest resolves that dependency before starting the browser pool.
Keep `jsdom` in the development dependencies alongside the browser provider.

### A server test runs under jsdom

The server file matches the client project's `include` pattern.
Keep `src/server/**/*.test.ts` and `src/**/*.test.tsx` as separate patterns so each file lands in one project.

### The session module ignores the `SESSION_SECRET` set in the test

The module captured the environment at import time, before the test set the variable.
Set `process.env.SESSION_SECRET`, call `vi.resetModules()`, and import the module after both, as `loadSession` above does.

### State leaks from one test file into the next

`isolate: false` lets module state survive between files.
Remove the setting, or reset the module-level state in `afterEach`.

## Recap

- Test in the smallest environment that exercises the behavior: jsdom for component DOM, browser mode for layout and browser APIs, a Node project for server code.
- Pass a function to `render` so the component has a reactive owner, and query by role.
- Call `flush()` after `fireEvent` and before the assertion; it lands the staged write and does not wait for async work.
- Register `afterEach(cleanup)` when `globals` is off.
- Keep jsdom installed in browser mode; the plugin resolves it before the browser pool starts.
- Give client and server tests separate `include` patterns in separate Vitest projects.
- Set environment variables and reset modules before importing code that reads them at import time, and undo both in `afterEach`.

## Next steps

- [Debugging reactivity](/guides/debugging-reactivity#the-test-sees-the-old-dom): `flush()` in full, `resolve` for async values, and the one place `flush()` is not allowed.
- [Sessions and auth](/building-apps/sessions-and-auth): the session module the server test above exercises.
- [Environment](/building-apps/environment): why server code that reads `virtual:env/server` needs the module reset the last section describes.
