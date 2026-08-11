---
title: "Routes and typed paths"
version: "2.0"
description: "Reference for route definitions, path patterns, typed path nodes, match filters, and router matching."
source_repo: "solidjs/solid-router"
source_ref: "next"
source_path: "src/types.ts"
---

## `RouteDefinition`

```ts
type RouteDefinition<S extends string | string[] = any, T = any> = {
	path?: S;
	matchFilters?: MatchFilters<S>;
	preload?: RoutePreloadFunc<T>;
	children?: RouteDefinition | readonly RouteDefinition[] | LazyRouteChildren;
	component?: RouteSectionComponent<T>;
	search?: StandardSchemaV1<any, any>;
	info?: RouteInfo;
};
```

### Path syntax

- `/users` is a static path.
- `/:id` is a required parameter.
- `/:id?` is an optional parameter.
- `/*rest` captures the remaining path.
- A path array assigns several patterns to one route definition.
- An omitted path creates a pathless route.

A wildcard must be the final segment.

### `children`

Inline children accept one route or a readonly route array.
Lazy children accept a deterministic thunk:

```ts
type LazyRouteChildren = () =>
	| readonly RouteDefinition[]
	| Promise<
			| readonly RouteDefinition[]
			| { default: readonly RouteDefinition[] }
			| { routes: readonly RouteDefinition[] }
	  >;
```

### `component` props

```ts
interface RouteSectionProps<T = unknown, P extends Params = Params> {
	params: P;
	location: Location;
	data: T;
	children?: JSX.Element;
}
```

`data` is the route preload's return value.
`children` is the next matched route section.

### `preload`

```ts
type RoutePreloadFunc<T = unknown, P extends Params = Params> = (
	args: RoutePreloadFuncArgs<P>
) => T;

interface RoutePreloadFuncArgs<P extends Params = Params> {
	params: P;
	location: Location;
	intent: "initial" | "native" | "navigate" | "preload";
}
```

## Match filters

```ts
type MatchFilter = readonly string[] | RegExp | ((value: string) => boolean);

type MatchFilters<P extends string | readonly string[] = any> = {
	[K in PathParams<P>[number]]?: MatchFilter;
};
```

### `int`

Matches integer URL segments and types the corresponding path-builder argument as `number`.

```ts
import { int } from "@solidjs/router";

const route = defineRoute({
	path: "/users/:id",
	matchFilters: { id: int },
});
```

Runtime route parameters remain strings.

## `Router.paths`

`Router.paths` has type `RoutePaths<typeof routes>`.
Static properties append segments, calls bind parameters, and a zero-argument or search-object call returns a string.

```ts
Router.paths.users(42).settings();
Router.paths.search({ q: "solid" }, "results");
String(Router.paths.about);
```

All path nodes implement:

```ts
interface TypedPath<P extends Params = Params>
	extends JSX.SerializableAttributeValue {
	toString(): string;
}
```

Route ends additionally accept search and hash arguments:

```ts
type PathEnd<
	Sch extends {
		input: any;
		output: any;
	} = DefaultSearchTypes,
	P extends Params = Params,
> = TypedPath<P> &
	TypedSearchPath<Sch["input"], Sch["output"]> & {
		(): string;
		(search: Sch["input"], hash?: string): string;
	};
```

## `Router.match`

Matches an arbitrary URL against the instance without rendering.

```ts
match(url: string): OutputMatch[];
```

```ts
interface OutputMatch {
	path: string;
	pattern: string;
	match: string;
	params: Params;
	info?: RouteInfo;
}
```

Returns matches from root to leaf.
Returns `[]` when no route matches.
The router's `transformUrl`, `base`, and resolved lazy subtrees apply.

## Route component types

Simplified public shape:

```ts
type RouteProps<
	Path,
	T = /* inferred preload data */ unknown,
> = RouteSectionProps<T, /* params derived from Path */ Params>;

type RouteComponent<Path, T = unknown> = Component<RouteProps<Path, T>>;
```

`Path` can be a typed path node, a literal pattern string, or a `defineFileRoute` result.

```ts
const User: RouteComponent<typeof Router.paths.users> = props => (
  <h1>{props.params.id}</h1>
);
```

## `RouteInfo`

An augmentable metadata interface used by route `info`, `Router.match`, and `useRouteMatches`.

```ts
interface RouteInfo {
	[key: string]: any;
}
```

```ts
declare module "@solidjs/router" {
	interface RouteInfo {
		breadcrumb?: string;
	}
}
```

## Related

- [`defineRoute` and `defineRoutes`](/reference/solid-router/router-factory)
- [Navigation primitives](/reference/solid-router/navigation)
- [File-system adapter](/reference/solid-router/filesystem)
