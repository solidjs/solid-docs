---
title: solidStart
use_cases: >-
  solidstart configuration, vite plugin, ssr mode, middleware, serialization,
  environment variables, server functions, app root, development toolbar
tags:
  - config
  - vite
  - plugin
  - ssr
  - middleware
  - environment
version: "2.0"
description: >-
  Configure the SolidStart v2 Vite plugin and its application options.
---

`solidStart` returns the Vite plugins that build and run a SolidStart application with Vite's Environment API.

## Import

```tsx
import { solidStart } from "@solidjs/start/config";
```

## Type

```tsx
function solidStart(options?: SolidStartOptions): PluginOption[];
```

## Basic configuration

Use `solidStart()` together with a server plugin such as Nitro v3.

```tsx title="vite.config.ts"
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { solidStart } from "@solidjs/start/config";

export default defineConfig({
	plugins: [solidStart(), nitro()],
});
```

Nitro settings do not belong inside `solidStart()`. Configure them with the top-level `nitro` property. See [`vite.config.ts`](/solid-start/v2/reference/entrypoints/vite-config).

## Options

### `appRoot`

- **Type:** `string`
- **Default:** `"./src"`

Path to the directory that contains `app.tsx` or `app.jsx`. Relative paths such as `routeDir` are resolved from this directory.

### `ssr`

- **Type:** `boolean`
- **Default:** `true`

Set to `false` for client-side rendering. SolidStart swaps its server and client entrypoints to their SPA implementations while retaining file routing and server functions.

### `devOverlay`

- **Type:** `boolean`
- **Default:** `true`

Controls the development toolbar, which shows application errors and server function calls. Set it to `false` to hide the toolbar during development.

### `experimental.islands`

- **Type:** `false`
- **Default:** `false`

Reserved for islands architecture support. Islands are not currently supported, so this option only accepts `false`.

### `routeDir`

- **Type:** `string`
- **Default:** `"./routes"`

Route directory relative to `appRoot`.

### `extensions`

- **Type:** `string[]`
- **Default:** `[]`

Additional file extensions that the filesystem router and Solid compiler should process.

### `middleware`

- **Type:** `string`

Path to the module that default-exports middleware created with [`createMiddleware`](/solid-start/v2/reference/server/create-middleware).

```tsx
solidStart({ middleware: "./src/middleware/index.ts" });
```

### `serialization`

- **Type:** `{ mode?: "json" | "js"; plugins?: string }`
- **Default:** `{ mode: "json" }`

Controls server-function argument and result serialization. `json` avoids `eval` and works with a strict Content Security Policy. `js` produces a smaller payload but requires `unsafe-eval`.

The `plugins` option points to a module containing custom Seroval plugins for values that Seroval does not support by default.

Built-in serialization of `Temporal` values requires a compatible global `Temporal` implementation on both the client and server. SolidStart does not install a polyfill.

See [Serialization](/solid-start/v2/advanced/serialization).

### `solid`

- **Type:** `Partial<SolidOptions>`

Options forwarded to `vite-plugin-solid`.

### `serverFunctions.filter`

- **Type:** `{ include?: FilterPattern; exclude?: FilterPattern }`

Customizes which files the `"use server"` compiler scans. By default, it includes source JavaScript and TypeScript files under `src` and excludes `node_modules`.

```tsx
solidStart({
	serverFunctions: {
		filter: {
			include: ["src/**/*.{ts,tsx}", "packages/shared/**/*.ts"],
			exclude: ["**/*.test.ts"],
		},
	},
});
```

### `serverFunctions.onError`

- **Type:** `string`

Path to a module whose default export handles values thrown by server functions before SolidStart serializes them into a response. Only calls arriving over the network reach it. The module is bundled only into the server, so it can import server-only code.

The handler can report the original value and provide a safer replacement for the client. It may be `async`: SolidStart awaits it before serializing the response, so a monitoring service can flush first. If the handler itself throws or rejects, the original value is sent as if no handler were configured.

- Return `undefined` or `null` to preserve the original value.
- Return a `Response` unchanged to pass it through, which keeps a thrown `redirect` working. See [Return Responses](/solid-start/v2/advanced/return-responses).
- Return any other value to send it in place of the original, serialized to the client along with its own properties.

```tsx title="vite.config.ts"
solidStart({
	serverFunctions: {
		onError: "src/server-function-error.ts",
	},
});
```

The module it names, `src/server-function-error.ts`:

```ts title="src/server-function-error.ts"
import type { ServerFunctionErrorHandler } from "@solidjs/start/server";
import { captureException } from "./your-monitoring-client";

const onServerFunctionError: ServerFunctionErrorHandler = (thrown) => {
	// redirect() throws a Response, so returning it preserves that control flow.
	if (thrown instanceof Response) {
		return thrown;
	}

	captureException(thrown); // or console.error, or any reporter

	return new Error("The server function failed.");
};

export default onServerFunctionError;
```

### `env`

Configures SolidStart's environment-variable virtual modules.

By default:

- `env:server` exposes build-time variables prefixed with `SERVER_` and fails if imported by client code.
- `env:client` exposes build-time variables prefixed with `CLIENT_` to both environments.
- `env:server/runtime` reads runtime variables from `process.env` and is server-only.

```tsx title="vite.config.ts"
solidStart({
	env: {
		server: { prefix: "PRIVATE_", runtime: "node" },
		client: { prefix: "PUBLIC_" },
	},
});
```

The `server.runtime` option also accepts `"cloudflare-workers"`, `"netlify-edge"`, or custom loader source code. `server.load` and `client.load` can provide custom build-time values for the current mode.

## Environment boundaries

SolidStart v2 recognizes `server-only` and `client-only` marker imports. Add one to a module to make an accidental import from the wrong Vite environment fail during development or build.

```ts title="src/lib/db.ts"
import "server-only";

export const db = createDatabaseClient();
```

`@solidjs/start/http` and `@solidjs/start/middleware` are already marked server-only.
