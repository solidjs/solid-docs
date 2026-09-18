---
title: "Observability"
version: "2.0"
description: "Report the errors your boundaries catch in production, follow a request from the server into the browser, and see what each user interaction cost, without wrapping a component."
---

The checkout form throws inside an `Errored` boundary in production.
The fallback renders, the shopper reloads and tries again, and nothing tells you it happened: the browser's global error handler never saw the error, because the boundary caught it.
Or a click on "Place order" feels slow for some shoppers, and the browser's own timing says how long the page was unresponsive but not which write waited on what.

Solid's runtime carries the answers to both.
On every build, an error hook on each platform hears every failure the runtime handled, once, with the component that threw and the boundary that caught it.
On the observe build, the runtime also publishes what it did as plain records — a `Loading` boundary that waited on the server, a server-function call and the execution it caused, a user interaction and the writes it held — and carries a request's trace into the browser on its own.
This guide shows how to turn each of those on and what each one costs.

## Three builds

Solid ships three builds of every runtime package, selected by export condition.

| Build   | Condition     | Carries                                                                                                                                   | `OBSERVE` | `DEV`     |
| ------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------- |
| prod    | default       | The runtime and the error hooks.                                                                                                          | undefined | undefined |
| observe | `observe`     | prod, plus the records channel, the diagnostics channel, the attribution slot, and the server's trace slot. No console output, no checks. | object    | undefined |
| dev     | `development` | observe, plus the development checks and the console reporter. Unminified.                                                                | object    | object    |

The builds nest: whatever works on the observe build works on the dev build.
In Solid's size suite, the observe build's cap for a small client-rendered app is 16.80 KB against 15.25 KB for the production build (brotli), and enabling the attribution engine on top raises the cap to 27.25 KB; the engine is a separate entry, so an observe build that never imports it never ships it.

Opt into the observe build in the Vite plugin:

```ts title="vite.config.ts"
import solid from "@solidjs/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [solid({ ssr: true, observe: true })],
});
```

`observe: true` adds the `observe` condition to every environment and turns on the compiler's `componentNames` option, so component labels such as `<Checkout>` survive minification and the paths below name components rather than `computed`.
Under `vite dev` the `development` condition still wins; the dev build is a superset, so what you observe there holds in production.
Without the plugin, set `resolve.conditions` in your bundler (or `node --conditions=observe` for an unbundled server) and the compiler option yourself.

:::note[Errors report on every build]
The two error hooks are part of the runtime, not of `OBSERVE`.
A production app with no observability tooling at all still gets them; the observe build is for the records and the traces.
:::

## Hear the errors your boundaries catch

In the browser, an error that reaches nothing halts the reactive system and is handed to `reportError`, which `window.onerror` and every error monitor already listen on.
An error a boundary caught takes the other road: the fallback renders, the app keeps running, and no global handler hears about it.
`configureClientErrors` is where the runtime reports that road:

```ts title="src/monitor.ts"
import { configureClientErrors } from "solid-js";

configureClientErrors({
	onError(error, { ownerPath, boundaryPath }) {
		report(error, {
			thrownIn: ownerPath?.join(" › "),
			caughtBy: boundaryPath?.join(" › "),
		});
	},
});
```

Click "Place order" with a broken price and the `Errored` fallback appears; the hook fires once, with `ownerPath` reading `<App> › <Checkout> › <OrderSummary> › computed` and `boundaryPath` reading `<App> › <Checkout> › <Errored>`.
The two paths answer different questions: where the code broke, and what the shopper saw instead.
A boundary's `reset()` recomputing the same failing node collects the same error object again and does not report it again.
The paths are present where the runtime keeps owner names, which is the observe and dev builds; on the production build the hook still fires and the paths are `undefined`.

A root can carry its own hook ahead of the ambient one: `render(App, el, { onError })` and `hydrate(App, el, { onError })` take the same function, and the nearest root wins.

## Hear every failure the server handles

The server has more ways to handle a failure than the client, and a global handler sees none of them: an `Errored` fallback rendered into the stream, a `Loading` fragment that rejected and was handed to the client to re-render, a server function that threw, a hydration value that would not serialize, and the failure that fails the request.
`configureServerErrors` hears all of them, once per error object, with the site that met it:

```ts title="src/instrument.ts"
import { configureServerErrors } from "@solidjs/web";

configureServerErrors({
	onError(
		error,
		{ kind, handling, ownerPath, boundaryPath, functionId, direct }
	) {
		report(error, {
			site: `${kind}/${handling}`,
			thrownIn: ownerPath?.join(" › "),
			caughtBy: boundaryPath?.join(" › "),
			serverFunction: functionId,
			duringRender: direct,
		});
	},
});
```

`kind` and `handling` say which road the failure took:

| `kind`            | `handling`  | What happened                                                                       |
| ----------------- | ----------- | ----------------------------------------------------------------------------------- |
| `render`          | `fallback`  | An `Errored` boundary rendered its fallback.                                        |
| `render`          | `client`    | A `Loading` fragment rejected; the client re-renders that subtree.                  |
| `render`          | `failed`    | Nothing contained it; the request fails.                                            |
| `render`          | `serialize` | A value written to the hydration stream would not serialize.                        |
| `server-function` | `thrown`    | The function threw. `direct` is `true` for an in-process call during a render.      |
| `server-function` | `channel`   | A rejection escaped through a returned stream or iterable after the head committed. |

The hook runs inside the request scope, so `getRequestEvent()` works in it.
`renderToStream(App, { onError })` and `renderToString(App, { onError })` take a per-request hook that wins over the ambient one for that request.
A monitoring SDK's `init()` has to run before the modules it patches load; the plugin's [`start.instrument`](/building-apps/app-structure#loading-instrumentation-first) option is where a plugin-hosted app puts it, and the module above is the shape it takes.

:::danger[The return value goes on the wire]
The hook receives the error as thrown.
What the client receives — the serialized error in an `Errored` fallback, the body of a failed server-function call — is the runtime's sanitized value, a generic `Error` outside the dev build.
Return a value from the hook and that value replaces it.
Return the error itself and its message, stack, and any secret they carry reach the browser.
Return a reference the shopper can quote back to you, or nothing.
:::

```ts
configureServerErrors({
	onError(error, context) {
		const ref = report(error, context);
		// The shopper sees "Something went wrong (ref 4f2a)"; the log has the rest.
		return new Error(`Something went wrong (ref ${ref})`);
	},
});
```

## Follow a request into the browser

A request arrives with a W3C `traceparent` header, or without one.
The server continues the trace it was given or originates one, and every `getTraceContext()` call during the request, in-process server-function calls included, reads the same context.
Forward it from a server function to the services it calls:

```ts
import { getTraceContext } from "@solidjs/web";

export async function chargeCard(orderId: string) {
	"use server";
	return fetch(paymentsUrl, {
		method: "POST",
		headers: { ...getTraceContext()?.entries },
		body: JSON.stringify({ orderId }),
	});
}
```

The runtime also tells the browser which trace the page belongs to, on two carriers it already owns: a `Server-Timing` header on every response, and `<meta>` tags in an HTML shell's head, one per named entry.
A frame stream and a server-function response have no `<head>`, so the header is what makes those joinable; no middleware rewrites the document.
The browser is told when the incoming `traceparent` was sampled or when a provider answered; an unsampled or originated trace stays server-side, so a page with no tracing tool sees no change to its responses.

On the observe build, a tracing tool provides the trace instead of the header:

```ts
import { OBSERVE } from "solid-js";

OBSERVE?.server.trace.provide((request) => {
	const span = activeSpan();
	if (!span) return undefined;
	return {
		traceId: span.traceId,
		spanId: span.spanId,
		entries: { "my-trace": `${span.traceId}-${span.spanId}` },
	};
});
```

The provider is called once per request, during the request, at the shell flush or the first `getTraceContext()` read, whichever comes first.
The fields it returns replace the runtime's derivation; its `entries` merge by name over the runtime's `traceparent`; `undefined` leaves the derivation alone.

## See what the runtime did

`OBSERVE.records` delivers a plain record each time the runtime finishes something worth attributing, on both platforms:

| Type           | Platform | One record per                                                                                       |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `"boundary"`   | server   | A `Loading` boundary that waited during a render; one that rendered on its first pass emits nothing. |
| `"invocation"` | server   | A server-function execution, from HTTP dispatch or an in-process call.                               |
| `"call"`       | client   | A server-function call the page made, as the caller awaited it.                                      |
| `"frame"`      | both     | A frame stream produced (server) or applied (client).                                                |

Log the boundaries that kept a shopper waiting:

```ts
import { OBSERVE } from "solid-js";

OBSERVE?.records.subscribe("boundary", (event) => {
	if (event.durationMs < 200) return;
	console.log(
		`<Loading> at ${event.ownerPath?.join(" › ")} waited ${Math.round(event.durationMs)}ms`,
		event.outcome
	);
});
```

Render `/orders` with a slow database and the line reads `<Loading> at <App> › <Orders> › <Loading> waited 640ms settled`.
A record is data: ids, names, an outcome, `at` on the `performance.now()` clock, durations, counts.
Anything live — the request, the response, the arguments, the error as thrown — travels in a second argument to the listener, never on the record, so a record can leave the process as it is.
A client `"call"` and the server `"invocation"` it caused share an `id`; the difference between their durations is the wire.
An invocation made during a boundary's render pass names that boundary, so a wait can be read as the calls it consisted of.

Listeners run synchronously inside the runtime, the moment the record is complete.
A listener must not write signals; one that throws is reported to the console and the others still run.
Subscribe from a module that loads before the app; the channel exists once per process, so the subscription reaches records from every copy of the runtime a host bundles.

## What each interaction cost

The attribution engine answers the second question from the opening: a click felt slow, and on what did it wait.
It is the same engine [Debugging reactivity](/guides/debugging-reactivity#something-updates-too-often) uses in development, and on the observe build it runs in production when you enable it:

```ts
import { attribution } from "solid-js/attribution";

attribution.enable();

attribution.subscribe("interaction", (event) => {
	if (event.settledMs === undefined || event.settledMs < 300) return;
	console.log(
		`${event.name} on ${event.target} took ${Math.round(event.settledMs)}ms to settle:`,
		event.holds.map(
			(hold) => `${hold.blockers.join(", ")} held ${Math.round(hold.holdMs)}ms`
		)
	);
});
```

Click "Place order" and the line reads `click on button#place-order "Place order" took 840ms to settle: ["placeOrder held 812ms"]`.
An interaction record carries the handler's own time, the writes it made, the re-runs and creations they caused, when the last effect that traces back to it ran (`settledMs`), and the holds and navigations it performed, each settled before the interaction is.
A hold names what blocked the write, how long, and whether the screen acknowledged the wait with `isPending`, `latest`, or an optimistic value; a hold nothing acknowledged is what the shopper experiences as a dead click.
A router that wraps its location write in `OBSERVE.attribution.withOrigin` gives its navigations the matched route pattern as their name, so `/orders/:id` folds together across shoppers.

The engine records; the tables are separate.
`feedback()`, `costs()`, `why()`, and `subscriptions()` are their own exports of `solid-js/attribution`, so a build that only subscribes to records ships none of them.

## What leaves the process

Records name things: component labels, the `name` option you gave a scope, store paths, route patterns, server-function ids.
Beyond names, four fields carry data from the page, and a tool that ships records off the device decides what to do with each:

- `target` on an interaction and on a call's origin: the element as `tag#id "text"`, with up to 30 characters of its text content.
- `prev` and `value` on a change record and on a held write: previews of the values, strings cut at 40 characters.
- `to`, `from`, and `params` on a navigation: the concrete URL and the bound parameters.
- `data.error` on the server's render-error findings: the error as thrown.

A tool that renders inside the app it watches — a diagnostics panel, devtools — marks its root as its own, so its effects and stores never appear as findings about the app:

```ts
import { createRoot, getOwner, OBSERVE } from "solid-js";

createRoot(() => {
	OBSERVE?.exclude(getOwner()!);
	// the panel's signals, stores, and effects
});
```

## Common problems

### `OBSERVE` is `undefined` in production

The production build was resolved.
Check that the bundler applied the `observe` condition to the environment that is undefined; `solid({ observe: true })` applies it to every environment, and a custom server that runs unbundled needs `node --conditions=observe`.

### The paths say `computed` and `effect` but never a component

The compiler's `componentNames` option is off, so components have no labels to record.
`solid({ observe: true })` turns it on; with another setup, pass `componentNames: true` to the compiler.
Under `vite dev` the labels are always present.

### No `Server-Timing` entry and no `<meta>` on the page

Nothing told the runtime the trace was recorded: the incoming `traceparent` had no sampled flag, or there was none and no provider answered.
Install a provider, or send a sampled `traceparent` from the edge.

### My tool's own effects show up as findings

Mark the tool's root with `OBSERVE.exclude(getOwner()!)` as it is created.
Writes into the excluded subtree stay excluded wherever they come from; do not route them through `runWithOwner`, which makes them writes in an owned scope.

## Recap

- Errors report on every build through `configureClientErrors` and `configureServerErrors`, once per error object, with where the error was thrown (`ownerPath`) and where it was met (`boundaryPath`).
- The server hook's return value is what the client receives; return a reference, not the error.
- Records, traces, and attribution need the observe build: `solid({ observe: true })`, or the `observe` condition and `componentNames` by hand.
- `OBSERVE.records` delivers settled, serializable records; live handles travel beside them, and a listener must not write signals.
- The runtime carries a sampled or provided trace into the browser on `Server-Timing` and `<meta>`; no middleware.
- `attribution.enable()` then `attribution.subscribe("interaction", …)` says what each click waited on; the fold tables are separate exports you pay for only when you import them.
- Mark a tool's own root with `OBSERVE.exclude` so it never reports on itself.

## Next steps

- [Build an observability adapter](/guides/observability-adapters): the contracts a tool author relies on, for an error monitor or a tracing SDK.
- [Debugging reactivity](/guides/debugging-reactivity): the same records read at a console in development, and the diagnostics they feed.
- [Arguments and security](/building-apps/server-functions/arguments-and-security): what a server function can trust from the request, including the trace it forwards.
- [Boundaries](/concepts/boundaries): what `Errored` and `Loading` do with a failure before the hook hears about it.
