---
title: "Build an observability adapter"
version: "2.0"
description: "Connect an error monitor or a tracing SDK to a Solid app through the runtime's hooks and channels, with nothing wrapped, patched, or rewritten."
---

You maintain an error monitor or a tracing SDK, and a team running Solid asks for an integration.
For most frameworks that means a component wrapper for error boundaries, a router integration for navigation spans, a middleware to inject trace headers into the HTML, and a per-host preload for the server.
Solid's runtime exposes each of those as a hook or a channel, so an adapter is one `init()` on each platform that subscribes.
This guide is the contract behind those hooks: what fires, when, with what, and what your listener may do.

:::advanced[For tool authors]
An app author enabling an existing tool wants [Observability](/guides/observability).
This page is for whoever writes the tool.
:::

## What an adapter is made of

| You need                                                            | Solid provides                                                                                 | Build   |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------- |
| Errors a boundary caught, in the browser                            | `configureClientErrors` from `solid-js`                                                        | every   |
| Every failure the server handled or failed on                       | `configureServerErrors` from `@solidjs/web`                                                    | every   |
| Boundary waits, server-function executions and calls, frame streams | `OBSERVE.records.subscribe(type, listener)`                                                    | observe |
| User interactions, navigations, holds, re-runs                      | `attribution.enable()` and `attribution.subscribe(type, listener)` from `solid-js/attribution` | observe |
| The runtime's findings as issues                                    | `OBSERVE.diagnostics.subscribe(listener)`                                                      | observe |
| Your trace ids on the request, carried to the browser               | `OBSERVE.server.trace.provide(provider)`                                                       | observe |
| Your own UI kept out of the data                                    | `OBSERVE.exclude(owner)`                                                                       | observe |

Import from `solid-js` and `@solidjs/web` only.
Both packages resolve to the build the app chose, so your adapter sees the same `OBSERVE` the app does; `@solidjs/signals`, the engine underneath, is not a public surface.

## Errors: once per object, from the hook alone

Both hooks are called once per error object, the first time the runtime meets it.
The client hook fires when an error boundary renders its fallback; an uncaught error halts the reactive system and reaches `reportError`, which your global handler already covers, so the hook does not repeat it.
The server hook fires for every failure the server runtime handles or fails on; `kind` and `handling` on the context say which, and [Observability](/guides/observability#hear-every-failure-the-server-handles) tabulates them.

Both contexts carry `ownerPath`, where the error was thrown, and `boundaryPath`, where it was met, as root-first label arrays.
Join them for grouping; keep them apart for display.

The error hook is the one place an adapter captures an exception.
The records below carry the same error object beside a failed invocation or call, and a runtime that hands one object to two listeners invites a double report: whichever listener runs first wins any once-per-object guard your SDK keeps, and that order is the runtime's, not yours.
Set a status on the span from the record; capture from the hook.

On the server, a returned value replaces what the client receives.
An adapter that offers this — a reference the user can quote — owns the promise that nothing from the original error crosses the wire; an adapter that does not returns nothing.

## Records: settled, serializable, delivered inside the runtime

`OBSERVE.records` delivers four record types, described in [Observability](/guides/observability#see-what-the-runtime-did).
The contract that shapes a span builder:

- A record is complete when you receive it, with `at` on the `performance.now()` clock and durations in milliseconds.
  Build the span after the fact with an explicit start and end: `epochSeconds = (performance.timeOrigin + at) / 1000`.
- A record is plain data.
  Anything live — the request, the response, the arguments, the result, the error as thrown — is the second argument, `live`, and stays in the process.
- The listener runs synchronously inside the runtime.
  It must not write signals; defer span creation to a microtask so the SDK's own bookkeeping never runs inside a Solid flush.
  A listener that throws is reported to the console and does not stop the others.
- Server records are delivered during the request, so a Node SDK whose active span is the request's parents them without anything passing a parent around.
- A client `"call"` and the server `"invocation"` it caused share `id`.
  An invocation made during a boundary's render pass carries `boundary`, the `id` of that boundary's record.

```ts
import { OBSERVE } from "solid-js";

const unsubscribe = OBSERVE?.records.subscribe("invocation", (event, live) => {
	queueMicrotask(() => {
		const span = startSpan({
			name: event.id,
			startTime: (performance.timeOrigin + event.at) / 1000,
			attributes: { direct: event.direct, outcome: event.outcome },
		});
		if (event.outcome === "error") span.setStatus("error");
		span.end((performance.timeOrigin + event.at + event.durationMs) / 1000);
	});
	void live;
});
```

The channel exists once per process under a registered symbol.
Subscribe before the app's runtime loads and the subscription still receives its records; subscribe from a second bundled copy of the core and it reaches the same listener set.
Keep the returned `unsubscribe`: an SDK initialized twice (tests, hot reload) should drop its previous subscriptions rather than stack them.

## Attribution: the interaction behind the write

The attribution engine is a separate entry, `solid-js/attribution`, that installs into `OBSERVE.attribution` and delivers its records through its own `subscribe`.
`enable()` first; every subscription is dropped by `disable()`.

```ts
import { attribution } from "solid-js/attribution";

attribution.enable();

attribution.subscribe("interaction", (event) => {
	// event.holds and event.navigations are settled; event.origin is the identity below
});
attribution.subscribe("navigation", (event) => {});
attribution.subscribe("hold", (event) => {});
attribution.subscribe("rerun", (event) => {});
```

Each record arrives when it settles.
An interaction's record already holds its `holds` and `navigations`, so a listener building a span tree receives the children before, or inside, the parent; a navigation or hold no interaction performed arrives on its own.
Fold `"rerun"` records into a per-interaction hot list rather than shipping one per run; the `nodeId` on a re-run is a number, not a node.

Records join by identity, not by time.
The `origin` object on an interaction is the same object the runtime stamps on a client `"call"` record made under that interaction's handler, and on the holds and navigations it caused.
Keep a `WeakMap` from origin to span and a call finds its parent without a clock comparison.
The stamp is read at dispatch: a call made synchronously in the handler carries it even when the response lands after the interaction settled, which is the usual shape of `onClick={async () => set(await call())}`; a call made after an `await` in the handler carries nothing, the same escape a write there has.

Routers declare their navigations to the engine with `OBSERVE.attribution.withOrigin`, so navigation records carry the matched route pattern as `name`; an adapter needs no router code.

## Trace context: answer once, the runtime carries it

On the server, install a provider and the runtime asks it once per request:

```ts
import { OBSERVE } from "solid-js";

OBSERVE?.server.trace.provide((request) => {
	const span = activeSpan();
	if (!span) return undefined;
	return {
		traceId: span.traceId,
		spanId: span.spanId,
		parentId: span.spanId,
		sampled: true,
		entries: {
			"my-trace": `${span.traceId}-${span.spanId}`,
			"my-baggage": baggageFor(span),
		},
	};
});
```

The fields you return replace the runtime's derivation; `entries` merge by name over the runtime's `traceparent`; `undefined` leaves the derivation alone.
The runtime emits every entry on a `Server-Timing` header on every response and as `<meta name content>` tags in an HTML shell's head, so your browser SDK's pageload continues the server's trace from the document it already parses, and a frame stream or a server-function response with no `<head>` is joined through the header.
Set `parentId` when your SDK continues from a different header than the runtime does; the browser may send two, and the provider is where your view wins.

## Diagnostics: issues, not spans

`OBSERVE.diagnostics.subscribe(listener)` delivers the runtime's findings: a hold nothing acknowledged (`SILENT_HOLD`), a scope re-running hot (`HOT_SCOPE_RERUNS`), a waterfall of dependent requests (`ASYNC_WATERFALL`), a render error the server contained (`SSR_RENDER_ERROR_CONTAINED`).
A finding has a stable identity and recurs, so it is an issue: fingerprint by `code` and `ownerPath`, and let the count grow.
Severity is the runtime's — `info`, `warn`, `error` — and `info` findings never reach the console in any build, so an adapter decides whether to forward them.
`data.error` on the server's render-error findings is the error as thrown; the error hook has captured it already.

## Keep the adapter out of its own data

An adapter that renders inside the app it watches would report its own effects, stores, and holds as findings about the app.
Mark the root as the adapter's own as it is created:

```ts
import { createRoot, getOwner, OBSERVE } from "solid-js";

createRoot(() => {
	OBSERVE?.exclude(getOwner()!);
	// the adapter's own signals, stores, effects
});
```

Under an excluded owner, diagnostics about the subtree are neither delivered nor reported, and the engine records no runs for its computations.
The signals and stores created under it stay excluded wherever their writes come from, so the writes need no `runWithOwner` and must not use one: a write under an owner is a write in an owned scope, which the dev build flags.

## Test against the observe build

Unit tests resolve `solid-js` and `@solidjs/web` the way any bundler does.
A test runner that applies the `development` condition by default gives you the dev build, which is a superset of observe, so a green test there does not prove the adapter runs on observe.
Point the tests at the observe artifacts explicitly, and keep both packages inside one module loader: a copy of `@solidjs/signals` your runner loads natively beside a copy it transforms is two `OBSERVE` objects, and the one your adapter subscribed to is not the one the app writes to.

## Recap

- Import from `solid-js` and `@solidjs/web`; the app's build decides which `OBSERVE` you both see.
- Capture exceptions from the error hooks only; set span status from records.
- Records are settled and serializable, delivered synchronously inside the runtime; build spans in a microtask from `at` and `durationMs`, and keep `live` in the process.
- Join a call to its interaction by the identity of `origin`, not by time; a call dispatched in the handler carries it even when it lands after the interaction settled.
- Answer `OBSERVE.server.trace.provide` once per request; the runtime carries the entries to the browser on `Server-Timing` and `<meta>`.
- Treat diagnostics as issues fingerprinted by `code` and `ownerPath`.
- `OBSERVE.exclude` the adapter's own root; keep the `unsubscribe` handles and drop them on re-init.

## Next steps

- [Observability](/guides/observability): what an app author enables, and the tables of error sites and record types this page relies on.
- [`OBSERVE` reference](/reference/solid-js/advanced/diagnostics-dev-hooks/observe): every record field and channel method.
- [Attribution reference](/reference/solid-js/advanced/diagnostics-dev-hooks/attribution): the interaction, navigation, hold, and re-run record shapes.
- [Debugging reactivity](/guides/debugging-reactivity): the diagnostic codes and what each one means.
