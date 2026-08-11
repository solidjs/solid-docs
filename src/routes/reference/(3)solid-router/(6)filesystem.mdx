---
title: "File-system adapter"
version: "2.0"
description: "Reference for converting a file-routes manifest and typing Solid Router route-module configuration."
source_repo: "solidjs/solid-router"
source_ref: "next"
source_path: "src/fs.ts"
---

## Import

```ts
import { defineFileRoute, fileRoutes } from "@solidjs/router/fs";
```

## `fileRoutes`

Converts nested file-route manifest entries into a route-definition tuple.

```ts
function fileRoutes<const T extends readonly FileRouteEntry[]>(
	entries: T
): FileRoutesFrom<T>;
```

```tsx
import { pageRoutes } from "virtual:file-routes";
import { createRouter } from "@solidjs/router";
import { fileRoutes } from "@solidjs/router/fs";

const Router = createRouter({
	routes: fileRoutes(pageRoutes),
});
```

For each entry, the adapter:

- Uses the manifest `path`.
- Loads the module's default export as `component`.
- Spreads the module's named `route` export into the definition.
- Adds `filesystem: true` to `info`.
- Recursively converts `children`.

Code-split component references become `lazy` components and use their source as `moduleUrl`.
The adapter passes eager component references through without a `lazy` wrapper.
The adapter reuses lazy components by source URL within one `fileRoutes` call.

## `defineFileRoute`

Types a route module's named `route` export from a path-pattern witness.

```ts
function defineFileRoute<
	S extends string,
	T = unknown,
	const F = DefinedRouteFilters<S>,
	Sch extends StandardSchemaV1<any, any> | undefined = undefined,
>(
	path: S,
	config: {
		matchFilters?: F;
		preload?: (args: RoutePreloadFuncArgs<RouteParams<S>>) => T;
		search?: Sch;
		info?: RouteInfo;
	}
): FileRouteConfig<S, T, F, Sch>;
```

```tsx
export const route = defineFileRoute("/blog/:id", {
	matchFilters: { id: int },
	preload: ({ params }) => getPost(params.id),
});

export default function Post(props: RouteProps<typeof route>) {
	return <h1>{props.data.title}</h1>;
}
```

The `path` argument is a type witness.
The manifest entry supplies the runtime path.

## Manifest types

```ts
interface FileRouteEntry {
	path: string;
	page?: boolean;
	$component?: FileRouteLazyRef<any> | FileRouteEagerRef<any>;
	$$route?: FileRouteEagerRef<any>;
	children?: readonly FileRouteEntry[];
}

interface FileRouteLazyRef<M = Record<string, unknown>> {
	src: string;
	import(): Promise<M>;
}

interface FileRouteEagerRef<M = Record<string, unknown>> {
	src?: string;
	require(): M;
}
```

`FileRouteFrom<E>` maps one manifest entry to its route type.
`FileRoutesFrom<T>` maps the full entry tuple while preserving literal paths and route-module configuration.

## Related

- [Route definitions](/reference/solid-router/routes-and-paths)
- [File-system routing guide](/routing/solid-router/route-definitions#convert-a-file-system-manifest)
