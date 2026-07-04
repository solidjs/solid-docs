---
title: createMiddleware
use_cases: >-
  request middleware, response middleware, h3 middleware
tags:
  - server
  - middleware
  - request
  - response
version: "1.0"
description: >-
  createMiddleware creates middleware definitions.
---

`createMiddleware` wraps request and response middleware functions with fetch events.

## Import

```tsx
import { createMiddleware } from "@solidjs/start/middleware";
```

## Type

```tsx
type RequestMiddleware = (
	event: FetchEvent
) => Response | Promise<Response> | void | Promise<void | Response>;

type ResponseMiddleware = (
	event: FetchEvent,
	response: { body?: unknown }
) => Response | Promise<Response> | void | Promise<void>;

function createMiddleware(args: {
	onRequest?: RequestMiddleware | RequestMiddleware[];
	onBeforeResponse?: ResponseMiddleware | ResponseMiddleware[];
}): {
	onRequest?: _RequestMiddleware | _RequestMiddleware[];
	onBeforeResponse?: _ResponseMiddleware | _ResponseMiddleware[];
};
```

## Parameters

### `args`

- **Type:** `{ onRequest?: RequestMiddleware | RequestMiddleware[]; onBeforeResponse?: ResponseMiddleware | ResponseMiddleware[] }`
- **Required:** Yes

Middleware functions grouped by request phase.

## Return value

- **Type:** `{ onRequest?: _RequestMiddleware | _RequestMiddleware[]; onBeforeResponse?: _ResponseMiddleware | _ResponseMiddleware[] }`

Returns the value from Vinxi `defineMiddleware`.

## Behavior

- `onRequest` functions are wrapped so that a returned response ends the middleware.
- `onBeforeResponse` functions are wrapped with the current fetch event and response object.
- Single middleware inputs produce single wrapped functions.
- Array inputs are mapped to arrays of wrapped functions.

## Examples

### Basic usage

```tsx
import { createMiddleware } from "@solidjs/start/middleware";

export default createMiddleware({
	onRequest: async (event) => {
		event.response.headers.set(
			"x-request-path",
			new URL(event.request.url).pathname
		);
	},
});
```
