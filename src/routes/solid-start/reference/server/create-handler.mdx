---
title: createHandler
use_cases: >-
  server entry, request handler, rendering mode
tags:
  - server
  - handler
  - rendering
version: "1.0"
description: >-
  createHandler creates the server handler.
---

`createHandler` creates the handler used by the server entry.

## Import

```tsx
import { createHandler } from "@solidjs/start/server";
```

## Type

```tsx
type HandlerOptions = {
	mode?: "sync" | "async" | "stream";
	nonce?: string;
	renderId?: string;
	onCompleteAll?: (options: { write: (value: any) => void }) => void;
	onCompleteShell?: (options: { write: (value: any) => void }) => void;
};

function createHandler(
	fn: (context: PageEvent) => unknown,
	options?:
		| HandlerOptions
		| ((context: PageEvent) => HandlerOptions | Promise<HandlerOptions>),
	routerLoad?: (event: FetchEvent) => Promise<void>
): EventHandler<EventHandlerRequest, Promise<any>>;
```

## Parameters

### `fn`

- **Type:** `(context: PageEvent) => unknown`
- **Required:** Yes

Function that returns the server-rendered document.

### `options`

- **Type:** `HandlerOptions | ((context: PageEvent) => HandlerOptions | Promise<HandlerOptions>)`
- **Default:** `{}`
- **Required:** No

Rendering options or a function that returns rendering options.
The supported options are:

The `options` object supports these fields:

| Name              | Type                                                 | Required | Default    | Description                                     |
| ----------------- | ---------------------------------------------------- | -------- | ---------- | ----------------------------------------------- |
| `mode`            | `"sync" \| "async" \| "stream"`                      | No       | `"stream"` | Rendering mode.                                 |
| `nonce`           | `string`                                             | No       | None       | Nonce assigned to the page event.               |
| `renderId`        | `string`                                             | No       | None       | Render identifier passed to the render context. |
| `onCompleteAll`   | `(options: { write: (value: any) => void }) => void` | No       | None       | Callback used when all stream content is ready. |
| `onCompleteShell` | `(options: { write: (value: any) => void }) => void` | No       | None       | Callback used when the shell stream is ready.   |

### `routerLoad`

- **Type:** `(event: FetchEvent) => Promise<void>`
- **Required:** No

Function called with the fetch event before API route matching and page rendering.

## Return value

- **Type:** `EventHandler<EventHandlerRequest, Promise<any>>`

Returns a Vinxi event handler.

## Behavior

- Calls `createBaseHandler(fn, createPageEvent, options, routerLoad)`.
- When `routerLoad` is provided, it runs before API route matching and page rendering.
- Matching API routes run before page rendering. For `HEAD` requests, the route `HEAD` export is used, with fallback to `GET`.
- Synchronous mode and disabled SSR render with `renderToString` and return the HTML string.
- Async mode returns the `renderToStream` result.
- Stream mode is the default and returns a readable stream.
- If page rendering sets a `Location` response header, the handler sends or writes a redirect response depending on the render phase.

## Examples

### Basic usage

```tsx
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler((event) => <StartServer document={Document} />);
```

## Related

- [`StartServer`](/solid-start/reference/server/start-server)
