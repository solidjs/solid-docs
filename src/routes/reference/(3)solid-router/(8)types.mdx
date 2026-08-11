---
title: "Types"
version: "2.0"
description: "Inventory of application-facing types exported by Solid Router 2."
source_repo: "solidjs/solid-router"
source_ref: "next"
source_path: "src/index.tsx"
---

Import these types from `@solidjs/router` unless another entry is shown.

```ts
import type {
	Location,
	NavigateOptions,
	RouteDefinition,
	RouteProps,
	RouterInstance,
} from "@solidjs/router";
```

## Router factory

- `RouterConfig<R>` is the `createRouter` options object.
- `RouterInstance<R>` is the provider component with `paths`, `routes`, `config`, and `match`.
- `RouterProps` contains the server-only `url` and root render-prop `children`.
- `DefinedRoute<S, T, F, C, Sch>` is the preserved return type of `defineRoute`.

See [Router factory](/reference/solid-router/router-factory) for signatures.

## Route definitions

- `RouteDefinition<S, T>` describes a route config object.
- `RoutePreloadFunc<T, P>` is a route preload function.
- `RoutePreloadFuncArgs<P>` contains `params`, `location`, and `intent`.
- `RouteSectionProps<T, P>` contains route component props.
- `RouteProps<Path, T>` derives route props from a path witness.
- `RouteComponent<Path, T>` is a component typed from a path witness.
- `RouteParams<S>` derives runtime parameter strings from a path pattern.
- `RouteInfo` is the augmentable route metadata interface.
- `RouteDescription` is a compiled route description exposed through `RouteMatch`.
- `RouteMatch` combines a compiled route description with matched path and params.
- `OutputMatch` is one result from `Router.match(url)`.

```ts
interface PathMatch<P extends Params = Params> {
	params: P;
	path: string;
}

interface RouteMatch extends PathMatch {
	route: RouteDescription;
}

interface OutputMatch {
	path: string;
	pattern: string;
	match: string;
	params: Params;
	info?: RouteInfo;
}
```

## Paths and filters

- `Params` is `Record<string, string | undefined>`.
- `SetParams` accepts string, number, boolean, null, or undefined values by key.
- `MatchFilter` is a string array, regular expression, or predicate.
- `MatchFilters<P>` maps route parameter names to match filters.
- `TypedMatchFilter<T>` carries a path-builder input type on a runtime filter.
- `TypedPath<P>` is the serializable path-node interface.
- `RoutePaths<R>` derives the router path proxy from a literal route tuple.
- `PathEnd<Sch, P>` is a terminating typed path node.
- `PathParamsOf<N>` extracts the runtime parameter record from a path node.

```ts
type Params = Record<string, string | undefined>;

type MatchFilter = readonly string[] | RegExp | ((value: string) => boolean);
```

## Search parameters

- `SearchParams` contains raw string, string-array, or undefined values by key.
- `SetSearchParams` accepts string, number, boolean, arrays of those values, null, or undefined by key.
- `TypedSearchPath<In, Out>` carries a route's search input and output types.
- `DefaultSearchTypes` uses `SetSearchParams` for input and `SearchParams` for output.
- `StandardSchemaV1<Input, Output>` is the validator contract accepted by route `search`.

```ts
interface StandardSchemaV1<Input = unknown, Output = Input> {
	readonly "~standard": {
		readonly version: 1;
		readonly vendor: string;
		readonly validate: (
			value: unknown
		) => StandardSchemaResult<Output> | Promise<StandardSchemaResult<Output>>;
		readonly types?: {
			readonly input: Input;
			readonly output: Output;
		};
	};
}
```

Solid Router accepts a Standard Schema promise in the shared type, but `useSearchParams(path)` rejects an asynchronous validation result at runtime.

## Location and navigation

- `Location<S>` is the reactive location read by `useLocation`.
- `LocationChange<S>` is a history adapter write.
- `NavigateOptions<S>` configures resolution, replacement, scrolling, and state.
- `Navigator` is returned by `useNavigate`.
- `PathMatch<P>` is returned by `useMatch`.
- `LinkState` is returned by `useLinkState`.
- `BeforeLeaveEventArgs` is passed to `useBeforeLeave`.

See [Navigation primitives](/reference/solid-router/navigation) for signatures.

## History integration

- `RouterHistory` is the history adapter contract.
- `MemoryHistoryAdapter` extends `RouterHistory` with `go`, `back`, `forward`, and `listen`.
- `RouterIntegration` is the signal-and-utilities contract used by the router core.
- `RouterUtils` contains optional history rendering, parsing, traversal, leave-guard, params, and query adapters.

See [History adapters](/reference/solid-router/history) for the supported built-in adapters.

## Data

- `CachedFunction<T>` is returned by `query`.
- `Action<T, U, V>` is returned by `action`.
- `Submission<T, U>` is a settled action record.

See [Data APIs](/reference/solid-router/data) for signatures.

## Other package entries

`@solidjs/router/fs` exports:

- `FileRouteConfig`
- `FileRouteEntry`
- `FileRouteLazyRef`
- `FileRouteEagerRef`
- `FileRouteFrom`
- `FileRoutesFrom`

`@solidjs/router/server` exports:

- `FlightDataCollectorOptions`
- `CollectFlightDataHook`
- `ServerFunctionOutcome`

See the [file-system adapter](/reference/solid-router/filesystem) and [server integration](/reference/solid-router/server) pages.
