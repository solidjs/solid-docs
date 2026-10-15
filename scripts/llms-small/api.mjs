// One line per public runtime export of `solid-js`, for llms-small.txt.
// Names follow packages/solid/src/index.ts in the solidjs/solid repository;
// purposes follow packages/solid/CHEATSHEET.md and the reference pages under
// src/routes/reference/(1)solid-js. Exports marked `@internal` upstream or
// hidden by scripts/extract-solid-ref.mjs (compiler and renderer ABI such as
// `createComponent`, `createOwner`, `enableHydration`, `$PROXY`) stay out.
// When an export is added or removed upstream, change this list and the
// reference pages together.

export const API_SECTIONS = [
	{
		title: "Signals and memos",
		exports: [
			[
				"createSignal",
				"`[get, set]` reactive value; `createSignal(fn)` is a writable derived value",
			],
			[
				"createMemo",
				"read-only derived value; a returned Promise is pending until it lands",
			],
			[
				"createDeferred",
				"async memo that keeps its last value while a refetch is in flight",
			],
			["untrack", "run `fn` without subscribing to the reads inside it"],
			["flush", "apply queued writes now instead of on the next microtask"],
			["isEqual", "default equality of signals and memos"],
		],
	},
	{
		title: "Effects and lifecycle",
		exports: [
			[
				"createEffect",
				"`(compute, apply)`: compute tracks, apply runs effects and may return a cleanup",
			],
			[
				"onSettled",
				"run once after the current activity settles; return a cleanup (replaces `onMount`)",
			],
			[
				"onCleanup",
				"cleanup tied to a reactive run or owner disposal; for primitive authors",
			],
			[
				"createRenderEffect",
				"effect that runs during render, for DOM bindings; app code uses `createEffect`",
			],
			[
				"createTrackedEffect",
				"single-callback effect that tracks and applies in one scope; rare",
			],
			[
				"createReaction",
				"one-shot tracked callback: `track(() => dep())` runs `fn` on the next change",
			],
		],
	},
	{
		title: "Stores",
		exports: [
			[
				"createStore",
				"deep reactive object; `set(draft => { ... })` writes through the draft",
			],
			[
				"createProjection",
				"read-only derived store; `{ key }` gives keyed reconciliation",
			],
			[
				"reconcile",
				"`reconcile(data, key)(draft.part)` merges new data into a store sub-tree by key",
			],
			[
				"deep",
				"track every nested level of a store (default tracking is per property)",
			],
			[
				"snapshot",
				"plain untracked copy of a store for JSON, storage and tests (replaces `unwrap`)",
			],
			["isWrappable", "whether a value would become a store proxy"],
			[
				"merge",
				"merge props-like objects into one reactive proxy (replaces `mergeProps`)",
			],
			[
				"omit",
				"reactive proxy of props without the listed keys (replaces `splitProps`)",
			],
		],
	},
	{
		title: "Async, actions and transitions",
		exports: [
			[
				"action",
				"generator mutation: optimistic writes, `yield` async work, `refresh`; reverts on failure",
			],
			[
				"createOptimistic",
				"signal whose writes inside an action show now and revert when it settles",
			],
			["createOptimisticStore", "store form of `createOptimistic`"],
			[
				"isPending",
				"true while a change to the values read inside `fn` is in flight",
			],
			[
				"latest",
				"read the in-flight value during a transition instead of the committed one",
			],
			[
				"refresh",
				"re-run one source after a server write; quiet unless `affects` was declared",
			],
			[
				"affects",
				"mark a source or store slot as pending while in-flight work will change it",
			],
			[
				"until",
				"Promise for the first time a reactive predicate turns truthy; `yield` it in an action",
			],
			[
				"resolve",
				"Promise for the first settled value of a reactive expression (tests)",
			],
			[
				"NotReadyError",
				"thrown by a read of an async source before its first value; boundaries handle it",
			],
			["TimeoutError", "rejection from `until` when its `timeout` passes"],
			[
				"enableExternalSource",
				"adapter so Solid tracks reads of another reactive system (MobX, Vue)",
			],
		],
	},
	{
		title: "Components and context",
		exports: [
			["children", "resolve `props.children` once; `.toArray()` helper"],
			[
				"flatten",
				"resolve nested accessors and arrays in a children tree (`children` memoizes it)",
			],
			[
				"createContext",
				"context for a subtree; `<Ctx value={v}>` is the provider; no default means no provider throws",
			],
			["useContext", "read the nearest context value"],
			[
				"lazy",
				"code-split component; pending through `<Loading>` while its chunk loads",
			],
			[
				"lazyModule",
				"cached dynamic import of a non-component module; `.preload()` and `.peek()`",
			],
			[
				"dynamicComponent",
				"component that re-resolves `fn` to a component; the factory behind `dynamic`",
			],
			[
				"createUniqueId",
				"stable id that matches between server and client (`for`, `aria-labelledby`)",
			],
		],
	},
	{
		title: "Flow components",
		exports: [
			[
				"For",
				"keyed list; callback gets `(item, i())`, or `(item(), i)` with `keyed={false}`",
			],
			["Repeat", "render `count` times; `i` is a plain number"],
			[
				"Show",
				"render children when `when` is truthy; a function child gets a narrowed accessor",
			],
			["Switch", "render the first `<Match>` whose `when` is truthy"],
			["Match", "one branch of `<Switch>`"],
			[
				"Loading",
				"async boundary (replaces `Suspense`); `on={deps}` re-arms it",
			],
			[
				"Errored",
				"error boundary (replaces `ErrorBoundary`); `fallback={(err, reset) => ...}`",
			],
			[
				"Reveal",
				"reveal order of sibling `<Loading>` boundaries (replaces `SuspenseList`)",
			],
			[
				"mapArray",
				"reactive array map behind `<For>`; reuses entries for unchanged items",
			],
			["repeat", "reactive count-based render behind `<Repeat>`"],
		],
	},
	{
		title: "Owners and roots",
		exports: [
			[
				"createRoot",
				"owned reactive scope with `dispose()`; tests and library entry points",
			],
			[
				"getOwner",
				"current owner, to capture across an async gap in library code",
			],
			[
				"runWithOwner",
				"run `fn` under an owner; `runWithOwner(null, fn)` detaches a root",
			],
			["getObserver", "the currently tracking computation, or `null`"],
			["isDisposed", "whether an owner has been disposed, to ignore late work"],
		],
	},
	{
		title: "Hydration (advanced)",
		exports: [
			["NoHydration", "opt a subtree out of client hydration"],
			["Hydration", "opt a subtree back in under `<NoHydration>`"],
			["isHydrating", "whether code runs while claiming server-rendered DOM"],
			[
				"isHydratable",
				"whether the calling owner sits where hydration applies",
			],
			[
				"onHydrationEnd",
				"run once after the root pass and every streamed boundary have resumed",
			],
		],
	},
	{
		title: "Dev and observability",
		exports: [
			[
				"DEV",
				"dev tier: devtools hooks, graph traversal, diagnostics reporting; dev builds only",
			],
			[
				"OBSERVE",
				"observe tier: records channel, diagnostics channel, attribution slot",
			],
			[
				"configureClientErrors",
				"hook called once per error when a boundary renders its fallback",
			],
		],
	},
];
