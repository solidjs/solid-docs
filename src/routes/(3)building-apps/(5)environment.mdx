---
title: "Environment"
version: "2.0"
description: "Declare environment variables once, read secrets on the server and public values in the browser through typed modules, and let the build fail when a secret would leak."
---

The session cookie from [Sessions and auth](/building-apps/sessions-and-auth) is signed with `SESSION_SECRET`, and the store's header shows a name that changes between the staging and production deploys.
The first value must never reach the browser; the second is fine to ship and useful to have typed.
Vite's `import.meta.env` handles the second kind.
Start mode adds a layer that handles both, with one schema, two import paths, and a build that refuses to cross them.

This page uses the two variables the `fullstack` project shape declares.
The layer belongs to start mode and is not enabled by `ssr: true` alone.

Most apps need the first section and the failure list after it.
The table, the `.env` rules, and the schema location are for checking a detail; the module markers at the end apply the same boundary to your own files.

## Declare, then import

Put an `env.ts` at the project root.
It default-exports a `server` map and a `client` map of validators; any [Standard Schema](https://standardschema.dev/) library works, even mixed per key.

::::tab-group[validation-library]

:::tab[Valibot]

```ts
// env.ts
import * as v from "valibot";

export default {
	server: {
		SESSION_SECRET: v.pipe(v.string(), v.minLength(32)),
	},
	client: {
		VITE_APP_NAME: v.optional(
			v.pipe(v.string(), v.minLength(1)),
			"Solid Store"
		),
	},
};
```

:::

:::tab[Zod]

```ts
// env.ts
import { z } from "zod";

export default {
	server: {
		SESSION_SECRET: z.string().min(32),
	},
	client: {
		VITE_APP_NAME: z.string().min(1).default("Solid Store"),
	},
};
```

:::

::::

Read each side from its own module:

```ts
// src/server/session.ts
import { env } from "virtual:env/server";

const secret = env.SESSION_SECRET; // string, at least 32 characters
```

```tsx
// src/App.tsx
import { env } from "virtual:env/client";

<Title>{env.VITE_APP_NAME}</Title>; // string, "Solid Store" when unset
```

Hover `env.SESSION_SECRET` in the editor and its type is `string`, inferred from the validator's output; a key that is not in the schema is a type error.
The plugin writes `solid-env.d.ts` next to the schema when dev or a build starts.
Keep that file in the TypeScript project and do not edit it.

The place a read happens decides which module it may import:

```tsx
// Avoid: a server value read from a component module
import { env } from "virtual:env/server";

export function Footer() {
	return <p>Signed with a {env.SESSION_SECRET.length} character secret</p>;
}

// Prefer: the read lives in a module only server code reaches
import { env } from "virtual:env/server";

export const secrets = env.SESSION_SECRET.split(",");
```

The `Avoid` version, in `src/components/Footer.tsx`, does not build.
The error is `virtual:env/server is server-only and was imported from the client module graph (by src/components/Footer.tsx)`, because a component module is part of the browser bundle even when it also renders on the server.
The `Prefer` version lives in `src/server/session.ts`, and a `"use server"` function in a module the browser also loads may import it, as the template's data layer does: the compiler keeps the function body and its imports out of the browser bundle.

## What happens when you get it wrong

The layer is easiest to understand from its failures.

### `virtual:env/server` is imported from a component

The build fails and names the importing file, as above.
Move the read into a [server function](/building-apps/server-functions), middleware, or a module reached only from those.

### A secret is in the `client` map

The build succeeds and the secret ships to every visitor.
Nothing can protect a value once it is in the browser bundle; the `client` map is a statement that the value is public.
Client keys must carry Vite's public prefix (`VITE_` by default) so the intent is visible in the name, and the plugin rejects a `client` key without it at config time.

:::danger[The client map is a publication, not a setting]
Every value in `client` is serialized as plain JSON into the JavaScript the browser downloads.
Moving a key from `server` to `client` to make a build error go away publishes that value.
:::

### `SESSION_SECRET` is missing in production

The build passes with a warning and the server fails at boot with `server env validation failed at boot`, naming the key and the validator's message.
Server values are read from `process.env` when the server starts, not baked in at build time, so a build machine without secrets can still produce the artifact and a host can rotate the secret without a rebuild.

### `VITE_APP_NAME` is invalid

The build fails.
Client values are validated at build time because that is when they are serialized into the bundle.
The validator library does not ship to the browser; only the validated values do.

### A server string shows up in the client bundle

The production client build scans non-vendor chunks for exact quoted copies of validated server strings of at least eight characters and fails with `server env values leaked into client chunks` if it finds one.
This is a backstop for a copy-paste mistake, not a security boundary; the module split above is the control.

## Rules in one place

|                        | `server` map                                             | `client` map             |
| ---------------------- | -------------------------------------------------------- | ------------------------ |
| Import from            | `virtual:env/server`                                     | `virtual:env/client`     |
| Allowed in             | server-only modules                                      | anywhere                 |
| Read from              | `process.env` at server boot                             | build-time environment   |
| Validated              | at boot (and in dev, since the dev server is the server) | at build                 |
| Key prefix             | any                                                      | `VITE_` (or `envPrefix`) |
| Rotate without rebuild | yes                                                      | no                       |

`virtual:env/server` also exposes the client values, so server code does not need two imports.

## `.env` files

The layer loads `.env`, `.env.local`, `.env.[mode]`, and `.env.[mode].local` from Vite's environment directory and folds them into `process.env` for dev and builds.
A value already in the process wins over one from a file, which is what you want on a host that injects real secrets.
Because the values land in `process.env`, a database client or session library that reads `process.env` itself sees them too, with no `loadEnv` in `vite.config.ts`.

:::tip[Start from the example file]
The `fullstack` shape ships a `.env.example` with every declared key and a comment on each.
Copy it to `.env` and fill in `SESSION_SECRET`; `openssl rand -base64 32` produces one.
`.env` is in `.gitignore`, and the template's `start` script loads it with `--env-file-if-exists`.
:::

## Schema location

Start mode probes `env.ts` or `env.js` at the Vite root.
`start.env` changes that:

```ts
solid({
	start: {
		env: "./config/env.ts", // another path inside the Vite root
		// env: true   → error if no schema exists
		// env: false  → turn the layer off even if a schema exists
	},
});
```

## Mark a module server-only or client-only

The env modules enforce their own boundary.
For your own modules, the `server-only` and `client-only` markers do the same, and they work even with start mode and server functions off:

```ts
// src/server/db.ts
import "server-only";

export function listOrders(customerId: string) {
	// Database access.
}
```

If any path pulls this module into the client bundle, the build fails with `Attempt to import 'server-only' in a client module`, naming the importer.
In a server graph the marker resolves to an empty module.

```ts
import "client-only";

export function readPreference() {
	return localStorage.getItem("preference");
}
```

`client-only` is the mirror: the build fails if the module enters a server graph.

The markers assert where a module may be bundled.
They do not split a module in two, add a runtime check, or un-leak a value already copied into client code.
Put the marker in the module that holds the sensitive code, not in the module that imports it.

If TypeScript does not already know these module names, add the plugin's declarations:

```ts
/// <reference types="@solidjs/vite-plugin/boundary-modules" />
```

## Common problems

### `env.SESSION_SECRET` is typed `unknown` or the key is missing

`solid-env.d.ts` has not been regenerated; start dev or a build once.
If it is regenerated and still wrong, the type is the validator's output type, so check the schema.

### The dev server reports a validation error for a server variable

The dev server is the server, so boot validation runs there.
Add the value to `.env` or the shell.

### A `server-only` module fails the build on a cold `dev` start

Vite's dependency scanner can walk imports before the `"use server"` transform runs and hit the marker.
It skips pre-bundling for that path and dev proceeds; the build-time guard is unaffected.

### The client value is stale after changing it on the host

Client values are serialized at `vite build`.
Set them on the machine that runs the build, and rebuild; only `server` values are read at boot.

## Recap

- Declare every variable once in `env.ts`, in the `server` map or the `client` map.
- Import `virtual:env/server` only from modules that server code alone reaches; a component import fails the build and names the file.
- Treat the `client` map as public: its values are JSON in the browser bundle, and its keys carry the `VITE_` prefix to say so.
- Server values are read and validated from `process.env` at boot, so secrets rotate without a rebuild; client values are fixed at build time.
- Put local values in `.env`; a value already in the process wins over the file.
- Mark your own sensitive modules with `import "server-only"` so a client import fails at build time rather than at runtime.
- Keep `solid-env.d.ts` in the project and let the plugin regenerate it.

## Next steps

- [Sessions and auth](/building-apps/sessions-and-auth): signing the cookie with `SESSION_SECRET` from this layer.
- [Server functions](/building-apps/server-functions): the usual place a server value is read.
- [Deployment](/building-apps/deployment): how each host supplies server variables at boot and why client values are fixed at build time.
