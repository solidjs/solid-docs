---
title: Serialization
use_cases: >-
  server function payloads, data transfer, csp, security, performance
tags:
  - serialization
  - server-functions
  - csp
  - security
  - performance
version: "1.0"
description: >-
  Understand how SolidStart serializes server function payloads, supported
  types, and CSP tradeoffs.
---

SolidStart serializes server function arguments and return values so they can travel between server and client. It uses Seroval under the hood and streams payloads to keep responses responsive.

## Configuration

Configure serialization in your `app.config.ts` with `defineConfig`:

```tsx tab title="v1"
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
	serialization: {
		mode: "js",
	},
});
```

```tsx tab title="v2"
import { defineConfig } from "vite";
import { solidStart } from "@solidjs/start";

export default defineConfig({
	plugins: [
		solidStart({
			serialization: {
				mode: "json",
			},
		}),
	],
});
```

See the full config reference in [`defineConfig`](/solid-start/reference/config/define-config#serialization).

## Modes

- `json`: Uses `JSON.parse` on the client. Best for strict CSP because it avoids `eval`. Payloads can be slightly larger.
- `js`: Uses Seroval's JS serializer for smaller payloads and better performance, but it requires `unsafe-eval` in CSP.

:::caution[v2 Breaking Change: Defaults]
SolidStart v1 defaults to `js` for backwards compatibility. SolidStart v2 defaults to `json` for CSP compatibility.
:::

## Supported types (default)

SolidStart enables Seroval plus a default set of web platform plugins. These plugins add support for:

- `AbortSignal`, `CustomEvent`, `DOMException`, `Event`
- `FormData`, `Headers`, `ReadableStream`
- `Request`, `Response`
- `URL`, `URLSearchParams`

Seroval supports additional value types. The compatibility list is broader than what SolidStart enables by default, so treat it as a superset. See the [Seroval compatibility docs](https://github.com/lxsmnsyc/seroval/blob/main/docs/COMPATIBILITY.md).

## Limits and exclusions

- `RegExp` is disabled by default.
- JSON mode enforces a maximum serialization depth of 64. If you exceed this, flatten the structure or return a simpler payload.

## Related guidance

- Configure modes and defaults in [`defineConfig`](/solid-start/reference/config/define-config#serialization).
- CSP implications and nonce examples live in the [Security guide](/solid-start/guides/security#content-security-policy-csp).
