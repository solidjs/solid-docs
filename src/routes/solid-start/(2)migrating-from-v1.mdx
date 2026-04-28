---
title: Migrating from v1
use_cases: >-
  existing project, migration, upgrade
tags:
  - setup
  - installation
  - starter
  - template
  - quickstart
  - init
version: "2.0"
description: >-
  Migrate your SolidStart project from v1 to v2.
---

This is a migration guide of how to upgrade your v1 SolidStart app to our new v2 version.

Please note that some third-party packages may not be compatible with v2 yet.

## Migration steps

### Update dependencies

```package-install
@solidjs/start@2.0.0-alpha.2 @solidjs/vite-plugin-nitro-2 vite@7
```

```package-remove
vinxi
```

### Configuration files

- Remove `app.config.ts`
- Create `vite.config.ts`

```tsx title="vite.config.ts"
import { solidStart } from "@solidjs/start/config";
import { defineConfig } from "vite";
import { nitroV2Plugin } from "@solidjs/vite-plugin-nitro-2";

export default defineConfig(() => {
	return {
		plugins: [
			solidStart({
				middleware: "./src/middleware/index.ts",
			}),
			nitroV2Plugin(),
		],
	};
});
```

Compile-time environment variables are now handled by Vite's environment API.

```tsx title="vite.config.ts"
// ...
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		// ...
		environments: {
			ssr: {
				define: {
					"process.env.DATABASE_URL": JSON.stringify(env.DATABASE_URL),
				},
			},
		},
	};
});
```

Update the build/dev commands to use native Vite instead of vinxi.

```json
"scripts": {
  "dev": "vite dev",
  "build": "vite build",
  "start": "vite preview"
}
```

### Environment types

Only the `types` entry is new in v2. Everything else can remain unchanged.

```json
"compilerOptions": {
  "types": ["@solidjs/start/env"]
}
```

## Server runtime helpers

- Replace all imports from `vinxi/http` with `@solidjs/start/http`
- Optional: update the middleware syntax to the newer [H3 syntax](https://h3.dev/guide/basics/middleware)
