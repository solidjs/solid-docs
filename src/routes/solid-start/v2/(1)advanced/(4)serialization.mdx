---
title: Serialization
use_cases: >-
  server function payloads, data transfer, custom types, seroval plugins, csp,
  security, performance
tags:
  - serialization
  - server-functions
  - csp
  - security
  - performance
version: "2.0"
description: >-
  How SolidStart serializes server function payloads and the CSP tradeoff
  between json and js modes.
---

Server function arguments and return values are serialized so they can travel between server and client.

## Configuration

Set the mode on `solidStart()` in `vite.config.ts`:

```tsx title="vite.config.ts"
import { defineConfig } from "vite";
import { solidStart } from "@solidjs/start/config";

export default defineConfig({
	plugins: [
		solidStart({
			serialization: { mode: "json" },
		}),
	],
});
```

## Modes

- `json`: deserializes with `JSON.parse` on the client. It avoids `eval`, so it fits a strict CSP. This is the default.
- `js`: a smaller binary format that needs `eval` on the client, which a strong CSP blocks.

If your app enforces a Content Security Policy, keep `json`.

## Temporal values

SolidStart preserves JavaScript [`Temporal`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) values in server function and action payloads. The value is reconstructed as the same Temporal type on the receiving side.

SolidStart does not install a Temporal implementation. Native server-runtime availability is:

| Runtime | Unflagged global `Temporal` support                              |
| ------- | ---------------------------------------------------------------- |
| Node.js | [26 and later](https://nodejs.org/en/blog/release/v26.0.0/)      |
| Deno    | [2.7 and later](https://deno.com/blog/v2.7)                      |
| Bun     | [No stable release](https://github.com/oven-sh/bun/issues/15853) |

Server-runtime support does not guarantee browser support. Both the client and server must provide a compatible global `Temporal` before a payload is serialized or deserialized. Check `typeof globalThis.Temporal !== "undefined"` in each target environment.

If any runtime targeted by your app does not provide `Temporal` natively, install a global polyfill:

```sh
pnpm add temporal-polyfill
```

```ts title="src/temporal.ts"
import "temporal-polyfill/global";
```

Import the shared module before application initialization in both entrypoints:

```tsx title="src/entry-client.tsx and src/entry-server.tsx"
import "./temporal";
```

Use the polyfill's global entrypoint. A local import such as `import { Temporal } from "temporal-polyfill"` does not define the global that serialization requires. Without a compatible global on either side, sending a Temporal value causes serialization or deserialization to fail.

## Custom types

Use a custom Seroval plugin when a server function needs to accept or return a value that Seroval does not support, such as a database identifier, decimal type, or another custom class.

Set `serialization.plugins` to a module whose default export is an array of plugins:

```tsx title="vite.config.ts"
import { defineConfig } from "vite";
import { solidStart } from "@solidjs/start/config";

export default defineConfig({
	plugins: [
		solidStart({
			serialization: {
				plugins: "src/seroval-plugins.ts",
			},
		}),
	],
});
```

Create plugins with the API exported by `@solidjs/start/serialization`. The entrypoint exports `createPlugin`, `OpaqueReference`, and the related plugin types. Importing from it keeps the plugin on the same Seroval version that SolidStart uses.

```ts title="src/seroval-plugins.ts"
import { createPlugin } from "@solidjs/start/serialization";
import { Money } from "./lib/money";

const moneyPlugin = createPlugin<Money, { cents: any }>({
	tag: "app/Money",
	test: (value) => value instanceof Money,
	parse: {
		sync: (value, ctx) => ({ cents: ctx.parse(value.cents) }),
		async: async (value, ctx) => ({
			cents: await ctx.parse(value.cents),
		}),
		stream: (value, ctx) => ({ cents: ctx.parse(value.cents) }),
	},
	serialize: (node, ctx) =>
		`new globalThis.Money(${ctx.serialize(node.cents)})`,
	deserialize: (node, ctx) => new Money(ctx.deserialize(node.cents) as number),
});

export default [moneyPlugin];
```

SolidStart bundles the plugin module into both the client and server builds, so it must not import server-only code. Built-in SolidStart plugins run before custom plugins.

Custom plugins apply to server function and action payloads. They do not affect the hydration payload produced by `solid-js/web`.

With the default `json` mode, `deserialize` rebuilds the value. If you use `js` mode, the code returned by `serialize` can only refer to globals available in the client. In the example above, `Money` must be assigned to `globalThis.Money` before deserialization.

## Server function payloads

SolidStart applies extra handling for certain payload types so file uploads and binary data can flow without being serialized by Seroval. This applies to both server function arguments and return values. SolidStart bypasses Seroval for:

- `FormData`
- `URLSearchParams`
- `Uint8Array`
- `ArrayBuffer`
- `Blob`
- `File`
- `string`

Because these values are transferred directly, this can yield smaller payloads for these cases.

## Related

- [Data fetching](/solid-start/v2/building-your-application/data-fetching)
- [Data mutation](/solid-start/v2/building-your-application/data-mutation)
