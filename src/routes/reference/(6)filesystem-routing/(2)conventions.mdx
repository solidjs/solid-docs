---
title: "Route conventions"
category: "filesystem-routing"
order: 2
version: "2.0"
description: "Reference for nested and flat route filename conventions."
source_repo: "solidjs/filesystem-routing"
source_ref: "v0.2.1"
source_path: "src/convention.ts"
---

The root `filesystem-routing` import exports two scanners with different filename conventions and the same module convention.

## Nested convention

### `routePathFromFile`

```ts
import { routePathFromFile } from "filesystem-routing";

function routePathFromFile(routeFile: string): string;
```

Converts a root-relative filename without its extension:

- `/index` becomes `/`.
- `/blog/index` becomes `/blog/`.
- `/blog/[id]` becomes `/blog/:id`.
- `/blog/[[page]]` becomes `/blog/:page?`.
- `/docs/[...path]` becomes `/docs/*path`.
- `/(marketing)/about` remains `/(marketing)/about` in the flat manifest.

Route groups remain in manifest paths so tree construction can nest them.
The generated `pageRoutes` view removes groups from URL paths.

Pair a route file with a directory to create nesting.
For example, `blog.tsx` is a layout for routes under `blog/`.

### `PageFileSystemRouter`

```ts
import {
	PageFileSystemRouter,
	type PageFileSystemRouterConfig,
} from "filesystem-routing";

class PageFileSystemRouter extends BaseFileSystemRouter {
	constructor(config: PageFileSystemRouterConfig);
}
```

`PageFileSystemRouter` uses `config.toPath` when provided and otherwise uses `routePathFromFile`.
See [Module convention](#module-convention) for its manifest entries.

## Flat convention

### `flatRoutePathFromFile`

```ts
import { flatRoutePathFromFile } from "filesystem-routing";

function flatRoutePathFromFile(routeFile: string): string | undefined;
```

Converts flat route names:

- `/_index` becomes `/`.
- `/concerts.trending` becomes `/concerts/trending`.
- `/concerts.$city` becomes `/concerts/:city`.
- `/concerts.($page)` becomes `/concerts/:page?`.
- `/files.$` becomes `/files/*splat`.
- `/_auth.login` becomes `/(_auth)/login`, a pathless layout group.
- `/concerts_.mine` becomes `/(concerts_)/concerts/mine`, outside the `concerts` layout.
- `/[sitemap.xml]` becomes `/sitemap.xml`.

Square brackets escape flat-convention characters.
The convention rejects an optional static segment such as `(en)` because the neutral path syntax represents optional parameters only.

A top-level directory contributes only its `route` module.
Other files in that directory and deeper nested directories return `undefined`.

### `FlatFileSystemRouter`

```ts
import { FlatFileSystemRouter } from "filesystem-routing";

class FlatFileSystemRouter extends PageFileSystemRouter;
```

Uses `flatRoutePathFromFile` and inherits the page module convention.

```ts
import { resolve } from "node:path";
import { FlatFileSystemRouter } from "filesystem-routing";
import { fileRoutes } from "filesystem-routing/vite";

fileRoutes({
	router: new FlatFileSystemRouter({
		dir: resolve("src/routes"),
		extensions: ["js", "jsx", "ts", "tsx"],
	}),
});
```

## Module convention

A JavaScript or TypeScript route module participates when it has a default export or a recognized HTTP method export.

- A default export sets `page: true`.
- `$component` lazily selects same-named local runtime exports, `default`, and `$css`.
  It excludes the `route` export and recognized HTTP handlers.
- An exported `route` value creates the eager `$$route` ref.
- Recognized uppercase handler exports create `$GET`, `$POST`, and equivalent refs.
- A recognized `GET` also creates `$HEAD` selecting `GET` unless the module exports `HEAD`.
- A handler-only module sets `page: false` and has no component ref.
- The scanner treats `.md` and `.mdx` files as pages when the configuration includes those extensions.

Set `components: false` to omit component refs while retaining page status and route configuration.
Set `httpMethods: true` to recognize the standard method set.

### `HTTP_METHODS`

```ts
import { HTTP_METHODS } from "filesystem-routing";

const HTTP_METHODS = [
	"HEAD",
	"GET",
	"POST",
	"PUT",
	"DELETE",
	"PATCH",
	"OPTIONS",
] as const;
```

### `PageFileSystemRouterConfig`

```ts
interface PageFileSystemRouterConfig extends FileSystemRouterConfig {
	components?: boolean;
	httpMethods?: boolean | readonly string[];
}
```

`components` defaults to `true`.
`httpMethods` defaults to `false`; `true` selects `HTTP_METHODS`, and an array selects only the listed export names.
